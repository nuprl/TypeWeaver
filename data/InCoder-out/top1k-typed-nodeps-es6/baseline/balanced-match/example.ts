import balanced from './';

console.log(balanced('{', '}', 'pre{in{nested}}post'))
console.log(balanced('{', '}', 'pre{first}between{second}post'))