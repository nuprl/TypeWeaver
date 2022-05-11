from __future__ import print_function # Use a function definition from future version (say 3.x from 2.7 interpreter)
import requests
import os
import sys

import math
import numpy as np
import scipy.sparse
import cntk as C
import pygments

import re
import string
from pygments.lexers import TypeScriptLexer
from pygments.token import Comment, Literal

from enum import Enum, auto, unique

# Hacky state machine definition, so we can output type annotations at the right places
@unique
class State(Enum):
	START = auto()
	FUN_DECL = auto()		# inside function declaration
	FUN_PARAMS = auto()		# inside params list of function declaration
	FOR = auto()			# inside for loop header
	VAR_DECL_1 = auto()		# inside variable declaration, okay to emit type
	VAR_DECL_2 = auto()		# inside variable declaration, don't emit type

regex = re.compile(r"^[^\d\W]\w*$", re.UNICODE)
keywords = ["async", "await", "break", "continue", "class", "extends", "constructor", "super", "extends", "const", "let", "var", "debugger", "delete", "do", "while", "export", "import", "for", "each", "in", "of", "function", "return", "get", "set", "if", "else", "instanceof", "typeof", "null", "undefined", "switch", "case", "default", "this", "true", "false", "try", "catch", "finally", "void", "yield", "any", "boolean", "null", "never", "number", "string", "symbol", "undefined", "void", "as", "is", "enum", "type", "interface", "abstract", "implements", "static", "readonly", "private", "protected", "public", "declare", "module", "namespace", "require", "from", "of", "package"]

if len(sys.argv) < 2:
	print("Not enough arguments, pass file name")
	exit(1)
inp = sys.argv[1]
outp = inp[:len(inp) - inp[::-1].index(".")] + "csv"
ts_outp = inp[:len(inp) - inp[::-1].index(".")] + "ts"
source_file = "tokens.vocab"
target_file = "types.vocab"
model_file = "model.cntk"

# load dictionaries
source_wl = [line.rstrip('\n') for line in open(source_file)]
target_wl = [line.rstrip('\n') for line in open(target_file)]
source_dict = {source_wl[i]:i for i in range(len(source_wl))}
target_dict = {target_wl[i]:i for i in range(len(target_wl))}

# number of words in vocab, slot labels, and intent labels
vocab_size = len(source_dict)
num_labels = len(target_dict)
epoch_size = 17.955*1000*1000
minibatch_size = 5000
emb_dim = 300
hidden_dim = 650
num_epochs = 10

# Create the containers for input feature (x) and the label (y)
x = C.sequence.input_variable(vocab_size, name="x")
y = C.sequence.input_variable(num_labels, name="y")
t = C.sequence.input_variable(hidden_dim, name="t")

def BiRecurrence(fwd, bwd):
	F = C.layers.Recurrence(fwd)
	G = C.layers.Recurrence(bwd, go_backwards=True)
	x = C.placeholder()
	apply_x = C.splice(F(x), G(x))
	return apply_x

def create_model():
	embed = C.layers.Embedding(emb_dim, name='embed')
	encoder = BiRecurrence(C.layers.GRU(hidden_dim//2), C.layers.GRU(hidden_dim//2))
	recoder = BiRecurrence(C.layers.GRU(hidden_dim//2), C.layers.GRU(hidden_dim//2))
	project = C.layers.Dense(num_labels, name='classify')
	do = C.layers.Dropout(0.5)
	
	def recode(x, t):
		inp = embed(x)
		inp = C.layers.LayerNormalization()(inp)
		
		enc = encoder(inp)
		rec = recoder(enc + t)
		proj = project(do(rec))
		
		dec = C.ops.softmax(proj)
		return enc, dec
	return recode

def criterion(model, labels):
	ce	 = -C.reduce_sum(labels*C.ops.log(model))
	errs = C.classification_error(model, labels)
	return ce, errs

def enhance_data(data, enc):
	guesses = enc.eval({x: data[x]})
	inputs = C.ops.argmax(x).eval({x: data[x]})
	tables = []
	for i in range(len(inputs)):
		ts = []
		table = {}
		counts = {}
		for j in range(len(inputs[i])):
			inp = int(inputs[i][j])
			if inp not in table:
				table[inp] = guesses[i][j]
				counts[inp] = 1
			else:
				table[inp] += guesses[i][j]
				counts[inp] += 1
		for inp in table:
			table[inp] /= counts[inp]
		for j in range(len(inputs[i])):
			inp = int(inputs[i][j])
			ts.append(table[inp])
		tables.append(np.array(np.float32(ts)))
	s = C.io.MinibatchSourceFromData(dict(t=(tables, C.layers.typing.Sequence[C.layers.typing.tensor])))
	mems = s.next_minibatch(minibatch_size)
	data[t] = mems[s.streams['t']]

def create_trainer():
	masked_dec = dec*C.ops.clip(C.ops.argmax(y), 0, 1)
	loss, label_error = criterion(masked_dec, y)
	loss *= C.ops.clip(C.ops.argmax(y), 0, 1)

	lr_schedule = C.learning_parameter_schedule_per_sample([1e-4]*2 + [5e-5]*2 + [1e-6], epoch_size=int(epoch_size))
	momentum_as_time_constant = C.momentum_as_time_constant_schedule(1000)
	learner = C.adam(parameters=dec.parameters,
						 lr=lr_schedule,
						 momentum=momentum_as_time_constant,
						 gradient_clipping_threshold_per_sample=15, 
						 gradient_clipping_with_truncation=True)

	progress_printer = C.logging.ProgressPrinter(tag='Training', num_epochs=num_epochs)
	trainer = C.Trainer(dec, (loss, label_error), learner, progress_printer)
	trainer.restore_from_checkpoint(model_file)
	C.logging.log_number_of_parameters(dec)
	return trainer

def prep(tokens):
	ws = []
	clean = []
	for ttype, value in tokens:
		if value.strip() == '':
			clean.append((ttype, value))
			continue
		# TypeScript lexer fails on arrow token
		if len(ws) > 0 and ws[-1] == "=" and value == ">":
			ws[-1] = "=>"
			t, _ = clean[-1]
			clean[-1] = (t, "=>")
			continue
		elif len(ws) > 1 and ws[-2] == "." and ws[-1] == "." and value == ".":
			ws[-2] = "..."
			ws.pop()
			t, _ = clean[-2]
			clean[-2] = (t, "...")
			del clean[-1]
			continue
		elif len(ws) > 1 and ws[-2] == "`" and value == "`":
			ws[-2] = "`" + ws[-1] + "`"
			ws.pop()
			t, _ = clean[-2]
			_, v = clean[-1]
			clean[-2] = (t, "`" + v + "`")
			del clean[-1]
			continue
		clean.append((ttype, value))
		w = "_UNKNOWN_"
		if value.strip() in source_dict:
			w = value.strip()
		elif ttype in Comment:
			continue
		elif ttype in Literal:
			if ttype in Literal.String:
				if value != '`':
					w = "\"s\""
				else:
					w = '`'
			elif ttype in Literal.Number:
				w = "0"
		ws.append(w)
	return ws, clean

# let's run a sequence through
def run_seq(seq):
	tokens = list(pygments.lex(seq, TypeScriptLexer()))
	ws, tokens = prep(tokens)
	# Set up tensors
	inputs = np.zeros(len(ws))
	outputs = np.zeros(len(ws))
	for i in range(len(ws)):
		inputs[i] = source_dict[ws[i]] if ws[i] in source_dict else source_dict["_UNKNOWN_"]
	N = len(inputs)
	if N > 4*minibatch_size:
		return None
	inputs = scipy.sparse.csr_matrix((np.ones(N, np.float32), (range(N), inputs)), shape=(N, vocab_size))
	outputs = scipy.sparse.csr_matrix((np.ones(N, np.float32), (range(N), outputs)), shape=(N, num_labels))
	sIn = C.io.MinibatchSourceFromData(dict(xx=([inputs], C.layers.typing.Sequence[C.layers.typing.tensor]),
											yy=([outputs], C.layers.typing.Sequence[C.layers.typing.tensor])))
	mb = sIn.next_minibatch(N)
	data = {x: mb[sIn.streams['xx']], y: mb[sIn.streams['yy']]}
	
	enhance_data(data, enc)
	pred = dec.eval({x: data[x], t: data[t]})[0]
	
	ts_buf = []
	out_buf = []
	state = State.START
	function_type = None
	last_guess = None
	for_parens = 0			# counter for matching parens in a for loop header
	var_decl_brackets = 0		# counter for matching square brackets in a variable declaration
	var_decl_braces = 0		# counter for matching curly braces in a variable declaration

	ix = 0
	sep = chr(31)
	for tt, v, in tokens:
		## tt is the token type; v is the string value of the token
		# write to csv buffer
		out_buf.append("%s%s%s" % (v.replace("\t", "\\t").replace("\n", "\\n").replace("\r", "\\r"), sep, str(tt)[6:]))
		# write to TypeScript buffer
		ts_buf.append(v)

		if state is State.START:
			if v.strip() == 'function':
				# entering a function declaration
				state = State.FUN_DECL
			elif v.strip() == 'let' or v.strip() == 'const' or v.strip() == 'var':
				# entering a variable declaration (not inside a for loop)
				state = State.VAR_DECL_1
			elif v.strip() == 'for':
				# entering a for loop
				state = State.FOR
		elif state is State.FUN_DECL:
			if v.strip() == '(':
				# entering params list
				state = State.FUN_PARAMS
		elif state is State.FUN_PARAMS:
			if v.strip() == ')':
				# exiting params list: output function type and reset state
				if function_type != None:
					ts_buf.append(": %s" % function_type)
					function_type = None
				state = State.START
		elif state is State.FOR:
			# need to count parens so we know when we've exited the for loop header
			if v.strip() == '(':
				for_parens += 1
			elif v.strip() == ')':
				for_parens -= 1
				if for_parens == 0:
					# exiting for loop header
					state = State.START
		elif state is State.VAR_DECL_1:
			# this state emits types, do we need to stop?
			if v.strip() == '=':
				# on the RHS of a declaration; don't emit type
				state = State.VAR_DECL_2
			if v.strip() == '[':
				# inside a destructuring pattern; don't emit type
				var_decl_brackets += 1
				state = State.VAR_DECL_2
			elif v.strip() == '{':
				# inside a destructuring pattern; don't emit type
				var_decl_braces += 1
				state = State.VAR_DECL_2
			elif v.strip() == ';':
				# NOTE: we require variable declaration statements to end with ;
				state = State.START
		elif state is State.VAR_DECL_2:
			# this state does not emit types, do we need to start?
			if v.strip() == 'function' or v.strip() == '(' or v.strip() == '=>':
				# this is a function expression or arrow function, used in a variable declaration
				# search backwards through the buffer, and remove the last type annotation, since it should go after the function
				for index, item in reversed(list(enumerate(ts_buf))):
					if item.startswith(": "):
						function_type = ts_buf[index][2:]
						del ts_buf[index]
						break
				if v.strip() == 'function':
					# jump out of the var declaration case, now we're in a function declaration
					state = State.FUN_DECL
				elif v.strip() == '(':
					# jump out of the var declaration case, now we're in function params
					state = State.FUN_PARAMS
				elif v.strip() == '=>':
					# this is an arrow function without parens for the single parameter
					# e.g. var f = x => x;
					# need to insert parens and type annotation in the right places
					for index, item in reversed(list(enumerate(ts_buf))):
						# insert ( after the last =
						if item.strip() == '=':
							ts_buf.insert(index + 1, ' (')
							break
					for index, item in reversed(list(enumerate(ts_buf))):
						# insert ) and types before the last =>
						if item.strip() == '=>':
							ts_buf.insert(index, ": %s): %s " % (last_guess, function_type))
							break
			elif v.strip() == ']':
				var_decl_brackets -= 1
				if var_decl_brackets == 0 and var_decl_braces == 0:
					# exiting destructuring pattern
					state = State.VAR_DECL_1
			elif v.strip() == '}':
				var_decl_braces -= 1
				if var_decl_brackets == 0 and var_decl_braces == 0:
					# exiting destructuring pattern
					state = State.VAR_DECL_1
			elif v.strip() == '[':
				var_decl_brackets += 1
			elif v.strip() == '{':
				var_decl_braces += 1
			elif v.strip() == ',' and var_decl_brackets == 0 and var_decl_braces == 0:
				# onto the next variable declaration within the statement
				state = State.VAR_DECL_1
			elif v.strip() == ';':
				# NOTE: we require variable declaration statements to end with ;
				state = State.START

		if v.strip() == '' or tt in Comment:
			# Skip over whitespace and comments
			out_buf.append('\n')
			continue
		pr = pred[ix]
		ix += 1
		if v.strip() in keywords or not bool(regex.match(v.strip())):
			# Skip over keywords and non-identifiers
			out_buf.append('\n')
			continue

		r = [i[0] for i in sorted(enumerate(pr), key=lambda x: x[1], reverse=True)]
		# The top guess for the type
		guess = target_wl[r[0]]
		# List of the top 5 guesses; need to remove the $ delimiters
		gs = [target_wl[r[ix]] for ix in range(5)]
		gs = [g[1:len(g)-1] if g[0]=="$" else g for g in gs]

		if target_wl[r[0]] != "O":
			# save the last guess; also needed for arrow functions
			last_guess = guess[1:len(guess)-1]
			if state is State.FUN_DECL:
				# save the function's type
				function_type = last_guess
			elif state is State.FUN_PARAMS or state is State.VAR_DECL_1:
				# write the type to the buffer
				ts_buf.append(": %s" % last_guess)
		else:
			last_guess = None

		for i in range(len(gs)):
			out_buf.append("%s%s%s%.4f" % (sep, gs[i], sep, pr[r[i]]))
		out_buf.append('\n')

	# write buffer to TypeScrpt file
	with open(ts_outp, 'w', encoding="utf-8") as ts:
		for tt in ts_buf:
			ts.write(tt)
	print("Output to: %s" % ts_outp)
	# write buffer to csv file
	# with open(outp, 'w', encoding="utf-8") as f:
	# 	for tt in out_buf:
	# 		f.write(tt)

model = create_model()
enc, dec = model(x, t)
trainer = create_trainer()

with open(inp, 'r', encoding="utf-8") as f:
	content = f.read()
print()
print("Inferring types for: %s" % inp)
run_seq(content)
