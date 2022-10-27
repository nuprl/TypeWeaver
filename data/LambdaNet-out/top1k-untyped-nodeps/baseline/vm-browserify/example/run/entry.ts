var vm: String = require('vm');

window.addEventListener('load', function () {
    var res: Number = vm.runInNewContext('a + 5', { a : 100 });
    document.querySelector('#res').textContent = res;
});
