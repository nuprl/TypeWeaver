import vm from 'vm';

window.addEventListener('load', function () {
    var res: any = vm.runInNewContext('a + 5', { a : 100 });
    document.querySelector('#res').textContent = res;
});
