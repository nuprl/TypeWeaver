function given(str: String, fn: Function): String {
    var args: String = [].slice.call(arguments, 0, -1);
    return jasmine.getEnv().it(str.toString(), function() {
        fn.apply(this, args);
    });
}

beforeEach(function() {
    this.addMatchers(objectDiff.jasmine);
});
