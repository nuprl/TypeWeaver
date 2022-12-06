# TODO: These should be unit tests.


print(templatize_function("function(x, y, z) { return x + y + z; }"))
print(templatize_function("function(x) { return x + y + z; }"))
print(templatize_function("function() { return x + y + z; }"))
print(templatize_function("function(x, y, z) { return x + y + z; }"))
