System.register(["angular2/test_lib", "angular2/src/dom/dom_adapter", "angular2/src/facade/collection", "angular2/di", "angular2/src/core/compiler/compiler", "angular2/src/core/compiler/template_resolver", "angular2/src/core/annotations/template", "angular2/src/core/annotations/annotations", "angular2/src/mock/template_resolver_mock", "angular2/src/directives/foreach"], function($__export) {
  "use strict";
  var AsyncTestCompleter,
      beforeEach,
      beforeEachBindings,
      ddescribe,
      describe,
      el,
      expect,
      iit,
      inject,
      it,
      xit,
      DOM,
      ListWrapper,
      Injector,
      Compiler,
      TemplateResolver,
      Template,
      Decorator,
      Component,
      Viewport,
      MockTemplateResolver,
      Foreach,
      bind,
      Foo,
      TestComponent;
  function main() {
    describe('foreach', (function() {
      var view,
          cd,
          compiler,
          component,
          tplResolver;
      beforeEachBindings((function() {
        return [bind(TemplateResolver).toClass(MockTemplateResolver)];
      }));
      beforeEach(inject([Compiler, TemplateResolver], (function(c, t) {
        compiler = c;
        tplResolver = t;
      })));
      function createView(pv) {
        component = new TestComponent();
        view = pv.instantiate(null, null);
        view.hydrate(new Injector([]), null, component);
        cd = view.changeDetector;
      }
      function compileWithTemplate(html) {
        var template = new Template({
          inline: html,
          directives: [Foreach]
        });
        tplResolver.setTemplate(TestComponent, template);
        return compiler.compile(TestComponent);
      }
      var TEMPLATE = '<div><copy-me template="foreach #item in items">{{item.toString()}};</copy-me></div>';
      it('should reflect initial elements', inject([AsyncTestCompleter], (function(async) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('1;2;');
          async.done();
        }));
      })));
      it('should reflect added elements', inject([AsyncTestCompleter], (function(async) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          ListWrapper.push(component.items, 3);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('1;2;3;');
          async.done();
        }));
      })));
      it('should reflect removed elements', inject([AsyncTestCompleter], (function(async) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          ListWrapper.removeAt(component.items, 1);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('1;');
          async.done();
        }));
      })));
      it('should reflect moved elements', inject([AsyncTestCompleter], (function(async) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          ListWrapper.removeAt(component.items, 0);
          ListWrapper.push(component.items, 1);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('2;1;');
          async.done();
        }));
      })));
      it('should reflect a mix of all changes (additions/removals/moves)', inject([AsyncTestCompleter], (function(async) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          component.items = [0, 1, 2, 3, 4, 5];
          cd.detectChanges();
          component.items = [6, 2, 7, 0, 4, 8];
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('6;2;7;0;4;8;');
          async.done();
        }));
      })));
      it('should iterate over an array of objects', (function() {
        compileWithTemplate('<ul><li template="foreach #item in items">{{item["name"]}};</li></ul>').then((function(pv) {
          createView(pv);
          component.items = [{'name': 'misko'}, {'name': 'shyam'}];
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('misko;shyam;');
          ListWrapper.push(component.items, {'name': 'adam'});
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('misko;shyam;adam;');
          ListWrapper.removeAt(component.items, 2);
          ListWrapper.removeAt(component.items, 0);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('shyam;');
        }));
      }));
      it('should gracefully handle nulls', inject([AsyncTestCompleter], (function(async) {
        compileWithTemplate('<ul><li template="foreach #item in null">{{item}};</li></ul>').then((function(pv) {
          createView(pv);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('');
          async.done();
        }));
      })));
      it('should gracefully handle ref changing to null and back', inject([AsyncTestCompleter], (function(async) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('1;2;');
          component.items = null;
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('');
          component.items = [1, 2, 3];
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('1;2;3;');
          async.done();
        }));
      })));
      it('should throw on ref changing to string', inject([AsyncTestCompleter], (function(async) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('1;2;');
          component.items = 'whaaa';
          expect((function() {
            return cd.detectChanges();
          })).toThrowError();
          async.done();
        }));
      })));
      it('should works with duplicates', inject([AsyncTestCompleter], (function(async) {
        compileWithTemplate(TEMPLATE).then((function(pv) {
          createView(pv);
          var a = new Foo();
          component.items = [a, a];
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('foo;foo;');
          async.done();
        }));
      })));
      it('should repeat over nested arrays', inject([AsyncTestCompleter], (function(async) {
        compileWithTemplate('<div><div template="foreach #item in items">' + '<div template="foreach #subitem in item">' + '{{subitem}};' + '</div>|</div></div>').then((function(pv) {
          createView(pv);
          component.items = [['a', 'b'], ['c', 'd']];
          cd.detectChanges();
          cd.detectChanges();
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('a;b;|c;d;|');
          async.done();
        }));
      })));
      it('should display indices correctly', inject([AsyncTestCompleter], (function(async) {
        var INDEX_TEMPLATE = '<div><copy-me template="foreach: var item in items; var i=index">{{i.toString()}}</copy-me></div>';
        compileWithTemplate(INDEX_TEMPLATE).then((function(pv) {
          createView(pv);
          component.items = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('0123456789');
          component.items = [1, 2, 6, 7, 4, 3, 5, 8, 9, 0];
          cd.detectChanges();
          expect(DOM.getText(view.nodes[0])).toEqual('0123456789');
          async.done();
        }));
      })));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      AsyncTestCompleter = $__m.AsyncTestCompleter;
      beforeEach = $__m.beforeEach;
      beforeEachBindings = $__m.beforeEachBindings;
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      el = $__m.el;
      expect = $__m.expect;
      iit = $__m.iit;
      inject = $__m.inject;
      it = $__m.it;
      xit = $__m.xit;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      Injector = $__m.Injector;
      bind = $__m.bind;
    }, function($__m) {
      Compiler = $__m.Compiler;
    }, function($__m) {
      TemplateResolver = $__m.TemplateResolver;
    }, function($__m) {
      Template = $__m.Template;
    }, function($__m) {
      Decorator = $__m.Decorator;
      Component = $__m.Component;
      Viewport = $__m.Viewport;
    }, function($__m) {
      MockTemplateResolver = $__m.MockTemplateResolver;
    }, function($__m) {
      Foreach = $__m.Foreach;
    }],
    execute: function() {
      Foo = (function() {
        var Foo = function Foo() {};
        return ($traceurRuntime.createClass)(Foo, {toString: function() {
            return 'foo';
          }}, {});
      }());
      TestComponent = (function() {
        var TestComponent = function TestComponent() {
          this.items = [1, 2];
        };
        return ($traceurRuntime.createClass)(TestComponent, {}, {});
      }());
      Object.defineProperty(TestComponent, "annotations", {get: function() {
          return [new Component({selector: 'test-cmp'})];
        }});
    }
  };
});

//# sourceMappingURL=angular2/test/directives/foreach_spec.map

//# sourceMappingURL=../../../angular2/test/directives/foreach_spec.js.map