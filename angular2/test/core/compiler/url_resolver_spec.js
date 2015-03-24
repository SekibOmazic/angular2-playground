System.register(["angular2/test_lib", "angular2/src/core/compiler/url_resolver"], function($__export) {
  "use strict";
  var describe,
      it,
      expect,
      beforeEach,
      ddescribe,
      iit,
      xit,
      el,
      UrlResolver;
  function main() {
    describe('UrlResolver', (function() {
      var resolver = new UrlResolver();
      it('should add a relative path to the base url', (function() {
        expect(resolver.resolve('http://www.foo.com', 'bar')).toEqual('http://www.foo.com/bar');
        expect(resolver.resolve('http://www.foo.com/', 'bar')).toEqual('http://www.foo.com/bar');
        expect(resolver.resolve('http://www.foo.com', './bar')).toEqual('http://www.foo.com/bar');
        expect(resolver.resolve('http://www.foo.com/', './bar')).toEqual('http://www.foo.com/bar');
      }));
      it('should replace the base path', (function() {
        expect(resolver.resolve('http://www.foo.com/baz', 'bar')).toEqual('http://www.foo.com/bar');
        expect(resolver.resolve('http://www.foo.com/baz', './bar')).toEqual('http://www.foo.com/bar');
      }));
      it('should append to the base path', (function() {
        expect(resolver.resolve('http://www.foo.com/baz/', 'bar')).toEqual('http://www.foo.com/baz/bar');
        expect(resolver.resolve('http://www.foo.com/baz/', './bar')).toEqual('http://www.foo.com/baz/bar');
      }));
      it('should support ".." in the path', (function() {
        expect(resolver.resolve('http://www.foo.com/baz/', '../bar')).toEqual('http://www.foo.com/bar');
        expect(resolver.resolve('http://www.foo.com/1/2/3/', '../../bar')).toEqual('http://www.foo.com/1/bar');
        expect(resolver.resolve('http://www.foo.com/1/2/3/', '../biz/bar')).toEqual('http://www.foo.com/1/2/biz/bar');
        expect(resolver.resolve('http://www.foo.com/1/2/baz', '../../bar')).toEqual('http://www.foo.com/bar');
      }));
      it('should ignore the base path when the url has a scheme', (function() {
        expect(resolver.resolve('http://www.foo.com', 'http://www.bar.com')).toEqual('http://www.bar.com');
      }));
      it('should throw when the url start with "/"', (function() {
        expect((function() {
          resolver.resolve('http://www.foo.com/1/2', '/test');
        })).toThrowError();
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      describe = $__m.describe;
      it = $__m.it;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      iit = $__m.iit;
      xit = $__m.xit;
      el = $__m.el;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/url_resolver_spec.map

//# sourceMappingURL=../../../../angular2/test/core/compiler/url_resolver_spec.js.map