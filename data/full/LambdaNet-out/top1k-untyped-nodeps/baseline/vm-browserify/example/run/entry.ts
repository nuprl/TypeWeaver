var vm: string = require('vm');

window.addEventListener('load', function () {
    var res: number = vm.runInNewContext('a + 5', { a : 100 });
    document.querySelector('#res').textContent = res;
});
