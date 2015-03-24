System.register(["angular2/test_lib", "angular2/src/dom/dom_adapter", "angular2/di", "angular2/change_detection", "angular2/src/core/compiler/compiler", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/core/compiler/template_loader", "angular2/src/core/compiler/component_url_mapper", "angular2/src/core/compiler/url_resolver", "angular2/src/core/compiler/style_url_resolver", "angular2/src/core/compiler/css_processor", "angular2/src/core/annotations/annotations", "angular2/src/core/annotations/template", "angular2/src/mock/template_resolver_mock", "angular2/src/directives/if"], function($__export) {
  "use strict";
  var AsyncTestCompleter,
      beforeEach,
      ddescribe,
      describe,
      el,
      expect,
      iit,
      inject,
      IS_DARTIUM,
      it,
      xit,
      DOM,
      Injector,
      Lexer,
      Parser,
      ChangeDetector,
      dynamicChangeDetection,
      Compiler,
      CompilerCache,
      DirectiveMetadataReader,
      NativeShadowDomStrategy,
      TemplateLoader,
      ComponentUrlMapper,
      UrlResolver,
      StyleUrlResolver,
      CssProcessor,
      Component,
      Template,
      MockTemplateResolver,
      If,
      TestComponent;
  function main() {
    describe('if directive', (function() {
      var view,
          cd,
          compiler,
          component,
          tplResolver;
      beforeEach((function() {
        var urlResolver = new UrlResolver();
        tplResolver = new MockTemplateResolver();
        compiler = new Compiler(dynamicChangeDetection, new TemplateLoader(null, null), new DirectiveMetadataReader(), new Parser(new Lexer()), new CompilerCache(), new NativeShadowDomStrategy(new StyleUrlResolver(urlResolver)), tplResolver, new ComponentUrlMapper(), urlResolver, new CssProcessor(null));
      }));
      function createView(pv) {
        component = new TestComponent();
        view = pv.instantiate(null, null);
        view.hydrate(new Injector([]), null, component);
        cd = view.changeDetector;
      }
      function compileWithTemplate(html) {
        var template = new Template({
          inline: html,
          directives: [If]
        });
        tplResolver.setTemplate(TestComponent, template);
        return compiler.compile(TestComponent);
      }
      it('should work in a template attribute', inject([AsyncTestCompleter], (function(async) {
        compileWithTemplate('<div><copy-me template="if booleanCondition">hello</copy-me></div>').then((function(pv) {
          createView(pv);
          cd.detectChanges();
          expect(DOM.querySelectorAll(view.nodes[0], 'copy-me').length).toEqual(1);
          expect(DOM.getText(view.nodes[0])).toEqual('hello');
          async.done();
        }));
      })));
      it('should work in a template element', inject([AsyncTestCompleter], (function(async) {
        compileWithTemplate('<div><template [if]="booleanCondition"><copy-me>hello2</copy-me></template></div>').then((function(pv) {
          createView(pv);
          cd.detectChanges();
          expect(DOM.querySelectorAll(view.nodes[0], 'copy-me').length).toEqual(1);
          expect(DOM.getText(view.nodes[0])).toEqual('hello2');
          async.done();
        }));
      })));
      it('should toggle node when condition changes', inject([AsyncTestCompleter], (function(async) {
        compileWithTemplate('<div><copy-me template="if booleanCondition">hello</copy-me></div>').then((function(pv) {
          createView(pv);
          component.booleanCondition = false;
          cd.detectChanges();
          expect(DOM.querySelectorAll(view.nodes[0], 'copy-me').length).toEqual(0);
          expect(DOM.getText(view.nodes[0])).toEqual('');
          component.booleanCondition = true;
          cd.detectChanges();
          expect(DOM.querySelectorAll(view.nodes[0], 'copy-me').length).toEqual(1);
          expect(DOM.getText(view.nodes[0])).toEqual('hello');
          component.booleanCondition = false;
          cd.detectChanges();
          expect(DOM.querySelectorAll(view.nodes[0], 'copy-me').length).toEqual(0);
          expect(DOM.getText(view.nodes[0])).toEqual('');
          async.done();
        }));
      })));
      it('should update several nodes with if', inject([AsyncTestCompleter], (function(async) {
        var templateString = '<div>' + '<copy-me template="if numberCondition + 1 >= 2">helloNumber</copy-me>' + '<copy-me template="if stringCondition == \'foo\'">helloString</copy-me>' + '<copy-me template="if functionCondition(stringCondition, numberCondition)">helloFunction</copy-me>' + '</div>';
        compileWithTemplate(templateString).then((function(pv) {
          createView(pv);
          cd.detectChanges();
          expect(DOM.querySelectorAll(view.nodes[0], 'copy-me').length).toEqual(3);
          expect(DOM.getText(view.nodes[0])).toEqual('helloNumberhelloStringhelloFunction');
          component.numberCondition = 0;
          cd.detectChanges();
          expect(DOM.querySelectorAll(view.nodes[0], 'copy-me').length).toEqual(1);
          expect(DOM.getText(view.nodes[0])).toEqual('helloString');
          component.numberCondition = 1;
          component.stringCondition = "bar";
          cd.detectChanges();
          expect(DOM.querySelectorAll(view.nodes[0], 'copy-me').length).toEqual(1);
          expect(DOM.getText(view.nodes[0])).toEqual('helloNumber');
          async.done();
        }));
      })));
      if (!IS_DARTIUM) {
        it('should leave the element if the condition is a non-empty string (JS)', inject([AsyncTestCompleter], (function(async) {
          compileWithTemplate('<div><copy-me template="if stringCondition">hello</copy-me></div>').then((function(pv) {
            createView(pv);
            cd.detectChanges();
            expect(DOM.querySelectorAll(view.nodes[0], 'copy-me').length).toEqual(1);
            expect(DOM.getText(view.nodes[0])).toEqual('hello');
            async.done();
          }));
        })));
        it('should leave the element if the condition is an object (JS)', inject([AsyncTestCompleter], (function(async) {
          compileWithTemplate('<div><copy-me template="if objectCondition">hello</copy-me></div>').then((function(pv) {
            createView(pv);
            cd.detectChanges();
            expect(DOM.querySelectorAll(view.nodes[0], 'copy-me').length).toEqual(1);
            expect(DOM.getText(view.nodes[0])).toEqual('hello');
            async.done();
          }));
        })));
        it('should remove the element if the condition is null (JS)', inject([AsyncTestCompleter], (function(async) {
          compileWithTemplate('<div><copy-me template="if nullCondition">hello</copy-me></div>').then((function(pv) {
            createView(pv);
            cd.detectChanges();
            expect(DOM.querySelectorAll(view.nodes[0], 'copy-me').length).toEqual(0);
            expect(DOM.getText(view.nodes[0])).toEqual('');
            async.done();
          }));
        })));
        it('should not add the element twice if the condition goes from true to true (JS)', inject([AsyncTestCompleter], (function(async) {
          compileWithTemplate('<div><copy-me template="if numberCondition">hello</copy-me></div>').then((function(pv) {
            createView(pv);
            cd.detectChanges();
            expect(DOM.querySelectorAll(view.nodes[0], 'copy-me').length).toEqual(1);
            expect(DOM.getText(view.nodes[0])).toEqual('hello');
            component.numberCondition = 2;
            cd.detectChanges();
            expect(DOM.querySelectorAll(view.nodes[0], 'copy-me').length).toEqual(1);
            expect(DOM.getText(view.nodes[0])).toEqual('hello');
            async.done();
          }));
        })));
        it('should not recreate the element if the condition goes from true to true (JS)', inject([AsyncTestCompleter], (function(async) {
          compileWithTemplate('<div><copy-me template="if numberCondition">hello</copy-me></div>').then((function(pv) {
            createView(pv);
            cd.detectChanges();
            DOM.addClass(view.nodes[0].childNodes[1], "foo");
            component.numberCondition = 2;
            cd.detectChanges();
            expect(DOM.hasClass(view.nodes[0].childNodes[1], "foo")).toBe(true);
            async.done();
          }));
        })));
      } else {
        it('should not create the element if the condition is not a boolean (DART)', inject([AsyncTestCompleter], (function(async) {
          compileWithTemplate('<div><copy-me template="if numberCondition">hello</copy-me></div>').then((function(pv) {
            createView(pv);
            expect(function() {
              cd.detectChanges();
            }).toThrowError();
            expect(DOM.querySelectorAll(view.nodes[0], 'copy-me').length).toEqual(0);
            expect(DOM.getText(view.nodes[0])).toEqual('');
            async.done();
          }));
        })));
      }
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      AsyncTestCompleter = $__m.AsyncTestCompleter;
      beforeEach = $__m.beforeEach;
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      el = $__m.el;
      expect = $__m.expect;
      iit = $__m.iit;
      inject = $__m.inject;
      IS_DARTIUM = $__m.IS_DARTIUM;
      it = $__m.it;
      xit = $__m.xit;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Injector = $__m.Injector;
    }, function($__m) {
      Lexer = $__m.Lexer;
      Parser = $__m.Parser;
      ChangeDetector = $__m.ChangeDetector;
      dynamicChangeDetection = $__m.dynamicChangeDetection;
    }, function($__m) {
      Compiler = $__m.Compiler;
      CompilerCache = $__m.CompilerCache;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      NativeShadowDomStrategy = $__m.NativeShadowDomStrategy;
    }, function($__m) {
      TemplateLoader = $__m.TemplateLoader;
    }, function($__m) {
      ComponentUrlMapper = $__m.ComponentUrlMapper;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }, function($__m) {
      StyleUrlResolver = $__m.StyleUrlResolver;
    }, function($__m) {
      CssProcessor = $__m.CssProcessor;
    }, function($__m) {
      Component = $__m.Component;
    }, function($__m) {
      Template = $__m.Template;
    }, function($__m) {
      MockTemplateResolver = $__m.MockTemplateResolver;
    }, function($__m) {
      If = $__m.If;
    }],
    execute: function() {
      TestComponent = (function() {
        var TestComponent = function TestComponent() {
          this.booleanCondition = true;
          this.numberCondition = 1;
          this.stringCondition = "foo";
          this.functionCondition = function(s, n) {
            return s == "foo" && n == 1;
          };
          this.objectCondition = {};
          this.nullCondition = null;
        };
        return ($traceurRuntime.createClass)(TestComponent, {}, {});
      }());
      Object.defineProperty(TestComponent, "annotations", {get: function() {
          return [new Component({selector: 'test-cmp'})];
        }});
    }
  };
});

//# sourceMappingURL=angular2/test/directives/if_spec.map

//# sourceMappingURL=../../../angular2/test/directives/if_spec.js.map