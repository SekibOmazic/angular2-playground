System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/dom/dom_adapter", "angular2/src/facade/lang", "angular2/src/facade/async", "angular2/di", "angular2/change_detection", "angular2/src/core/compiler/compiler", "angular2/src/core/compiler/directive_metadata_reader", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/core/compiler/template_loader", "angular2/src/mock/template_resolver_mock", "angular2/src/core/compiler/binding_propagation_config", "angular2/src/core/compiler/component_url_mapper", "angular2/src/core/compiler/url_resolver", "angular2/src/core/compiler/style_url_resolver", "angular2/src/core/compiler/css_processor", "angular2/src/core/annotations/annotations", "angular2/src/core/annotations/template", "angular2/src/core/annotations/visibility", "angular2/src/core/annotations/di", "angular2/src/directives/if", "angular2/src/core/compiler/view_container"], function($__export) {
  "use strict";
  var assert,
      AsyncTestCompleter,
      beforeEach,
      ddescribe,
      describe,
      el,
      expect,
      iit,
      inject,
      it,
      xit,
      DOM,
      Type,
      isPresent,
      BaseException,
      assertionsEnabled,
      isJsObject,
      PromiseWrapper,
      Injector,
      Lexer,
      Parser,
      dynamicChangeDetection,
      DynamicChangeDetection,
      Pipe,
      PipeRegistry,
      Compiler,
      CompilerCache,
      DirectiveMetadataReader,
      NativeShadowDomStrategy,
      TemplateLoader,
      MockTemplateResolver,
      BindingPropagationConfig,
      ComponentUrlMapper,
      UrlResolver,
      StyleUrlResolver,
      CssProcessor,
      Decorator,
      Component,
      Viewport,
      Template,
      Parent,
      Ancestor,
      EventEmitter,
      If,
      ViewContainer,
      MyDir,
      PushBasedComp,
      MyComp,
      ComponentWithPipes,
      ChildComp,
      SomeDirective,
      CompWithParent,
      CompWithAncestor,
      ChildComp2,
      SomeViewport,
      MyService,
      DoublePipe,
      DoublePipeFactory,
      DecoratorEmitingEvent,
      DecoratorListeningEvent,
      IdComponent;
  function main() {
    describe('integration tests', function() {
      var compiler,
          tplResolver;
      function createCompiler(tplResolver, changedDetection) {
        var urlResolver = new UrlResolver();
        return new Compiler(changedDetection, new TemplateLoader(null, null), new DirectiveMetadataReader(), new Parser(new Lexer()), new CompilerCache(), new NativeShadowDomStrategy(new StyleUrlResolver(urlResolver)), tplResolver, new ComponentUrlMapper(), urlResolver, new CssProcessor(null));
      }
      beforeEach((function() {
        tplResolver = new MockTemplateResolver();
        compiler = createCompiler(tplResolver, dynamicChangeDetection);
      }));
      describe('react to record changes', function() {
        var view,
            ctx,
            cd;
        function createView(pv) {
          ctx = new MyComp();
          view = pv.instantiate(null, null);
          view.hydrate(new Injector([]), null, ctx);
          cd = view.changeDetector;
        }
        it('should consume text node changes', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setTemplate(MyComp, new Template({inline: '<div>{{ctxProp}}</div>'}));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            ctx.ctxProp = 'Hello World!';
            cd.detectChanges();
            expect(DOM.getInnerHTML(view.nodes[0])).toEqual('Hello World!');
            async.done();
          }));
        })));
        it('should consume element binding changes', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setTemplate(MyComp, new Template({inline: '<div [id]="ctxProp"></div>'}));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            ctx.ctxProp = 'Hello World!';
            cd.detectChanges();
            expect(view.nodes[0].id).toEqual('Hello World!');
            async.done();
          }));
        })));
        it('should consume binding to aria-* attributes', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setTemplate(MyComp, new Template({inline: '<div [aria-label]="ctxProp"></div>'}));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            ctx.ctxProp = 'Initial aria label';
            cd.detectChanges();
            expect(DOM.getAttribute(view.nodes[0], 'aria-label')).toEqual('Initial aria label');
            ctx.ctxProp = 'Changed aria label';
            cd.detectChanges();
            expect(DOM.getAttribute(view.nodes[0], 'aria-label')).toEqual('Changed aria label');
            async.done();
          }));
        })));
        it('should consume binding to property names where attr name and property name do not match', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setTemplate(MyComp, new Template({inline: '<div [tabindex]="ctxNumProp"></div>'}));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            cd.detectChanges();
            expect(view.nodes[0].tabIndex).toEqual(0);
            ctx.ctxNumProp = 5;
            cd.detectChanges();
            expect(view.nodes[0].tabIndex).toEqual(5);
            async.done();
          }));
        })));
        it('should consume binding to camel-cased properties using dash-cased syntax in templates', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setTemplate(MyComp, new Template({inline: '<input [read-only]="ctxBoolProp">'}));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            cd.detectChanges();
            expect(view.nodes[0].readOnly).toBeFalsy();
            ctx.ctxBoolProp = true;
            cd.detectChanges();
            expect(view.nodes[0].readOnly).toBeTruthy();
            async.done();
          }));
        })));
        it('should consume binding to inner-html', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setTemplate(MyComp, new Template({inline: '<div inner-html="{{ctxProp}}"></div>'}));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            ctx.ctxProp = 'Some <span>HTML</span>';
            cd.detectChanges();
            expect(DOM.getInnerHTML(view.nodes[0])).toEqual('Some <span>HTML</span>');
            ctx.ctxProp = 'Some other <div>HTML</div>';
            cd.detectChanges();
            expect(DOM.getInnerHTML(view.nodes[0])).toEqual('Some other <div>HTML</div>');
            async.done();
          }));
        })));
        it('should consume directive watch expression change.', inject([AsyncTestCompleter], (function(async) {
          var tpl = '<div>' + '<div my-dir [elprop]="ctxProp"></div>' + '<div my-dir elprop="Hi there!"></div>' + '<div my-dir elprop="Hi {{\'there!\'}}"></div>' + '<div my-dir elprop="One more {{ctxProp}}"></div>' + '</div>';
          tplResolver.setTemplate(MyComp, new Template({
            inline: tpl,
            directives: [MyDir]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            ctx.ctxProp = 'Hello World!';
            cd.detectChanges();
            expect(view.elementInjectors[0].get(MyDir).dirProp).toEqual('Hello World!');
            expect(view.elementInjectors[1].get(MyDir).dirProp).toEqual('Hi there!');
            expect(view.elementInjectors[2].get(MyDir).dirProp).toEqual('Hi there!');
            expect(view.elementInjectors[3].get(MyDir).dirProp).toEqual('One more Hello World!');
            async.done();
          }));
        })));
        it("should support pipes in bindings and bind config", inject([AsyncTestCompleter], (function(async) {
          tplResolver.setTemplate(MyComp, new Template({
            inline: '<component-with-pipes #comp [prop]="ctxProp | double"></component-with-pipes>',
            directives: [ComponentWithPipes]
          }));
          var registry = new PipeRegistry({"double": [new DoublePipeFactory()]});
          var changeDetection = new DynamicChangeDetection(registry);
          var compiler = createCompiler(tplResolver, changeDetection);
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            ctx.ctxProp = 'a';
            cd.detectChanges();
            var comp = view.contextWithLocals.get("comp");
            expect(comp.prop).toEqual('aaaa');
            async.done();
          }));
        })));
        it('should support nested components.', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setTemplate(MyComp, new Template({
            inline: '<child-cmp></child-cmp>',
            directives: [ChildComp]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            cd.detectChanges();
            expect(view.nodes[0].shadowRoot.childNodes[0].nodeValue).toEqual('hello');
            async.done();
          }));
        })));
        it('should support different directive types on a single node', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setTemplate(MyComp, new Template({
            inline: '<child-cmp my-dir [elprop]="ctxProp"></child-cmp>',
            directives: [MyDir, ChildComp]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            ctx.ctxProp = 'Hello World!';
            cd.detectChanges();
            var elInj = view.elementInjectors[0];
            expect(elInj.get(MyDir).dirProp).toEqual('Hello World!');
            expect(elInj.get(ChildComp).dirProp).toEqual(null);
            async.done();
          }));
        })));
        it('should support directives where a binding attribute is not given', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setTemplate(MyComp, new Template({
            inline: '<p my-dir></p>',
            directives: [MyDir]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            async.done();
          }));
        })));
        it('should support directives where a selector matches property binding', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setTemplate(MyComp, new Template({
            inline: '<p [id]="ctxProp"></p>',
            directives: [IdComponent]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            ctx.ctxProp = 'some_id';
            cd.detectChanges();
            expect(view.nodes[0].id).toEqual('some_id');
            expect(DOM.getInnerHTML(view.nodes[0].shadowRoot.childNodes[0])).toEqual('Matched on id with some_id');
            ctx.ctxProp = 'other_id';
            cd.detectChanges();
            expect(view.nodes[0].id).toEqual('other_id');
            expect(DOM.getInnerHTML(view.nodes[0].shadowRoot.childNodes[0])).toEqual('Matched on id with other_id');
            async.done();
          }));
        })));
        it('should support template directives via `<template>` elements.', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setTemplate(MyComp, new Template({
            inline: '<div><template some-viewport var-greeting="some-tmpl"><copy-me>{{greeting}}</copy-me></template></div>',
            directives: [SomeViewport]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            cd.detectChanges();
            var childNodesOfWrapper = view.nodes[0].childNodes;
            expect(childNodesOfWrapper.length).toBe(3);
            expect(childNodesOfWrapper[1].childNodes[0].nodeValue).toEqual('hello');
            expect(childNodesOfWrapper[2].childNodes[0].nodeValue).toEqual('again');
            async.done();
          }));
        })));
        it('should support template directives via `template` attribute.', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setTemplate(MyComp, new Template({
            inline: '<div><copy-me template="some-viewport: var greeting=some-tmpl">{{greeting}}</copy-me></div>',
            directives: [SomeViewport]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            cd.detectChanges();
            var childNodesOfWrapper = view.nodes[0].childNodes;
            expect(childNodesOfWrapper.length).toBe(3);
            expect(childNodesOfWrapper[1].childNodes[0].nodeValue).toEqual('hello');
            expect(childNodesOfWrapper[2].childNodes[0].nodeValue).toEqual('again');
            async.done();
          }));
        })));
        it('should assign the component instance to a var-', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setTemplate(MyComp, new Template({
            inline: '<p><child-cmp var-alice></child-cmp></p>',
            directives: [ChildComp]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            expect(view.contextWithLocals).not.toBe(null);
            expect(view.contextWithLocals.get('alice')).toBeAnInstanceOf(ChildComp);
            async.done();
          }));
        })));
        it('should assign two component instances each with a var-', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setTemplate(MyComp, new Template({
            inline: '<p><child-cmp var-alice></child-cmp><child-cmp var-bob></p>',
            directives: [ChildComp]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            expect(view.contextWithLocals).not.toBe(null);
            expect(view.contextWithLocals.get('alice')).toBeAnInstanceOf(ChildComp);
            expect(view.contextWithLocals.get('bob')).toBeAnInstanceOf(ChildComp);
            expect(view.contextWithLocals.get('alice')).not.toBe(view.contextWithLocals.get('bob'));
            async.done();
          }));
        })));
        it('should assign the component instance to a var- with shorthand syntax', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setTemplate(MyComp, new Template({
            inline: '<child-cmp #alice></child-cmp>',
            directives: [ChildComp]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            expect(view.contextWithLocals).not.toBe(null);
            expect(view.contextWithLocals.get('alice')).toBeAnInstanceOf(ChildComp);
            async.done();
          }));
        })));
        it('should assign the element instance to a user-defined variable', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setTemplate(MyComp, new Template({inline: '<p><div var-alice><i>Hello</i></div></p>'}));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            expect(view.contextWithLocals).not.toBe(null);
            var value = view.contextWithLocals.get('alice');
            expect(value).not.toBe(null);
            expect(value.tagName.toLowerCase()).toEqual('div');
            async.done();
          }));
        })));
        it('should provide binding configuration config to the component', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setTemplate(MyComp, new Template({
            inline: '<push-cmp #cmp></push-cmp>',
            directives: [[[PushBasedComp]]]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            var cmp = view.contextWithLocals.get('cmp');
            cd.detectChanges();
            expect(cmp.numberOfChecks).toEqual(1);
            cd.detectChanges();
            expect(cmp.numberOfChecks).toEqual(1);
            cmp.propagate();
            cd.detectChanges();
            expect(cmp.numberOfChecks).toEqual(2);
            async.done();
          }));
        })));
        it('should create a component that injects a @Parent', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setTemplate(MyComp, new Template({
            inline: '<some-directive><cmp-with-parent #child></cmp-with-parent></some-directive>',
            directives: [SomeDirective, CompWithParent]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            var childComponent = view.contextWithLocals.get('child');
            expect(childComponent.myParent).toBeAnInstanceOf(SomeDirective);
            async.done();
          }));
        })));
        it('should create a component that injects an @Ancestor', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setTemplate(MyComp, new Template({
            inline: "\n            <some-directive>\n              <p>\n                <cmp-with-ancestor #child></cmp-with-ancestor>\n              </p>\n            </some-directive>",
            directives: [SomeDirective, CompWithAncestor]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            var childComponent = view.contextWithLocals.get('child');
            expect(childComponent.myAncestor).toBeAnInstanceOf(SomeDirective);
            async.done();
          }));
        })));
        it('should create a component that injects an @Ancestor through viewport directive', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setTemplate(MyComp, new Template({
            inline: "\n            <some-directive>\n              <p *if=\"true\">\n                <cmp-with-ancestor #child></cmp-with-ancestor>\n              </p>\n            </some-directive>",
            directives: [SomeDirective, CompWithAncestor, If]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            cd.detectChanges();
            var subview = view.viewContainers[0].get(0);
            var childComponent = subview.contextWithLocals.get('child');
            expect(childComponent.myAncestor).toBeAnInstanceOf(SomeDirective);
            async.done();
          }));
        })));
        it('should support events', inject([AsyncTestCompleter], (function(async) {
          tplResolver.setTemplate(MyComp, new Template({
            inline: '<div emitter listener></div>',
            directives: [DecoratorEmitingEvent, DecoratorListeningEvent]
          }));
          compiler.compile(MyComp).then((function(pv) {
            createView(pv);
            var injector = view.elementInjectors[0];
            var emitter = injector.get(DecoratorEmitingEvent);
            var listener = injector.get(DecoratorListeningEvent);
            expect(emitter.msg).toEqual('');
            expect(listener.msg).toEqual('');
            emitter.fireEvent('fired !');
            expect(emitter.msg).toEqual('fired !');
            expect(listener.msg).toEqual('fired !');
            async.done();
          }));
        })));
      });
      if (assertionsEnabled()) {
        var expectCompileError = function(inlineTpl, errMessage, done) {
          tplResolver.setTemplate(MyComp, new Template({inline: inlineTpl}));
          PromiseWrapper.then(compiler.compile(MyComp), (function(value) {
            throw new BaseException("Test failure: should not have come here as an exception was expected");
          }), (function(err) {
            expect(err.message).toEqual(errMessage);
            done();
          }));
        };
        it('should raise an error if no directive is registered for an unsupported DOM property', inject([AsyncTestCompleter], (function(async) {
          expectCompileError('<div [some-prop]="foo"></div>', 'Missing directive to handle \'some-prop\' in MyComp: <div [some-prop]="foo">', (function() {
            return async.done();
          }));
        })));
        it('should raise an error if no directive is registered for a template with template bindings', inject([AsyncTestCompleter], (function(async) {
          expectCompileError('<div><div template="if: foo"></div></div>', 'Missing directive to handle \'if\' in <div template="if: foo">', (function() {
            return async.done();
          }));
        })));
        it('should raise an error for missing template directive (1)', inject([AsyncTestCompleter], (function(async) {
          expectCompileError('<div><template foo></template></div>', 'Missing directive to handle: <template foo>', (function() {
            return async.done();
          }));
        })));
        it('should raise an error for missing template directive (2)', inject([AsyncTestCompleter], (function(async) {
          expectCompileError('<div><template *if="condition"></template></div>', 'Missing directive to handle: <template *if="condition">', (function() {
            return async.done();
          }));
        })));
        it('should raise an error for missing template directive (3)', inject([AsyncTestCompleter], (function(async) {
          expectCompileError('<div *if="condition"></div>', 'Missing directive to handle \'if\' in MyComp: <div *if="condition">', (function() {
            return async.done();
          }));
        })));
      }
    });
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      AsyncTestCompleter = $__m.AsyncTestCompleter;
      beforeEach = $__m.beforeEach;
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
      Type = $__m.Type;
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
      assertionsEnabled = $__m.assertionsEnabled;
      isJsObject = $__m.isJsObject;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      Injector = $__m.Injector;
    }, function($__m) {
      Lexer = $__m.Lexer;
      Parser = $__m.Parser;
      dynamicChangeDetection = $__m.dynamicChangeDetection;
      DynamicChangeDetection = $__m.DynamicChangeDetection;
      Pipe = $__m.Pipe;
      PipeRegistry = $__m.PipeRegistry;
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
      MockTemplateResolver = $__m.MockTemplateResolver;
    }, function($__m) {
      BindingPropagationConfig = $__m.BindingPropagationConfig;
    }, function($__m) {
      ComponentUrlMapper = $__m.ComponentUrlMapper;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }, function($__m) {
      StyleUrlResolver = $__m.StyleUrlResolver;
    }, function($__m) {
      CssProcessor = $__m.CssProcessor;
    }, function($__m) {
      Decorator = $__m.Decorator;
      Component = $__m.Component;
      Viewport = $__m.Viewport;
    }, function($__m) {
      Template = $__m.Template;
    }, function($__m) {
      Parent = $__m.Parent;
      Ancestor = $__m.Ancestor;
    }, function($__m) {
      EventEmitter = $__m.EventEmitter;
    }, function($__m) {
      If = $__m.If;
    }, function($__m) {
      ViewContainer = $__m.ViewContainer;
    }],
    execute: function() {
      MyDir = (function() {
        var MyDir = function MyDir() {
          this.dirProp = '';
        };
        return ($traceurRuntime.createClass)(MyDir, {}, {});
      }());
      Object.defineProperty(MyDir, "annotations", {get: function() {
          return [new Decorator({
            selector: '[my-dir]',
            bind: {'dirProp': 'elprop'}
          })];
        }});
      PushBasedComp = (function() {
        var PushBasedComp = function PushBasedComp(bpc) {
          assert.argumentTypes(bpc, BindingPropagationConfig);
          this.numberOfChecks = 0;
          this.bpc = bpc;
          bpc.shouldBePropagated();
        };
        return ($traceurRuntime.createClass)(PushBasedComp, {
          get field() {
            this.numberOfChecks++;
            return "fixed";
          },
          propagate: function() {
            this.bpc.shouldBePropagatedFromRoot();
          }
        }, {});
      }());
      Object.defineProperty(PushBasedComp, "annotations", {get: function() {
          return [new Component({selector: 'push-cmp'}), new Template({inline: '{{field}}'})];
        }});
      Object.defineProperty(PushBasedComp, "parameters", {get: function() {
          return [[BindingPropagationConfig]];
        }});
      MyComp = (function() {
        var MyComp = function MyComp() {
          this.ctxProp = 'initial value';
          this.ctxNumProp = 0;
          this.ctxBoolProp = false;
        };
        return ($traceurRuntime.createClass)(MyComp, {}, {});
      }());
      Object.defineProperty(MyComp, "annotations", {get: function() {
          return [new Component()];
        }});
      ComponentWithPipes = (function() {
        var ComponentWithPipes = function ComponentWithPipes() {};
        return ($traceurRuntime.createClass)(ComponentWithPipes, {}, {});
      }());
      Object.defineProperty(ComponentWithPipes, "annotations", {get: function() {
          return [new Component({
            selector: 'component-with-pipes',
            bind: {"prop": "prop | double"}
          }), new Template({inline: ''})];
        }});
      ChildComp = (function() {
        var ChildComp = function ChildComp(service) {
          assert.argumentTypes(service, MyService);
          this.ctxProp = service.greeting;
          this.dirProp = null;
        };
        return ($traceurRuntime.createClass)(ChildComp, {}, {});
      }());
      Object.defineProperty(ChildComp, "annotations", {get: function() {
          return [new Component({
            selector: 'child-cmp',
            services: [MyService]
          }), new Template({
            directives: [MyDir],
            inline: '{{ctxProp}}'
          })];
        }});
      Object.defineProperty(ChildComp, "parameters", {get: function() {
          return [[MyService]];
        }});
      SomeDirective = (function() {
        var SomeDirective = function SomeDirective() {};
        return ($traceurRuntime.createClass)(SomeDirective, {}, {});
      }());
      Object.defineProperty(SomeDirective, "annotations", {get: function() {
          return [new Decorator({selector: 'some-directive'})];
        }});
      CompWithParent = (function() {
        var CompWithParent = function CompWithParent(someComp) {
          assert.argumentTypes(someComp, SomeDirective);
          this.myParent = someComp;
        };
        return ($traceurRuntime.createClass)(CompWithParent, {}, {});
      }());
      Object.defineProperty(CompWithParent, "annotations", {get: function() {
          return [new Component({selector: 'cmp-with-parent'}), new Template({
            inline: '<p>Component with an injected parent</p>',
            directives: [SomeDirective]
          })];
        }});
      Object.defineProperty(CompWithParent, "parameters", {get: function() {
          return [[SomeDirective, new Parent()]];
        }});
      CompWithAncestor = (function() {
        var CompWithAncestor = function CompWithAncestor(someComp) {
          assert.argumentTypes(someComp, SomeDirective);
          this.myAncestor = someComp;
        };
        return ($traceurRuntime.createClass)(CompWithAncestor, {}, {});
      }());
      Object.defineProperty(CompWithAncestor, "annotations", {get: function() {
          return [new Component({selector: 'cmp-with-ancestor'}), new Template({
            inline: '<p>Component with an injected ancestor</p>',
            directives: [SomeDirective]
          })];
        }});
      Object.defineProperty(CompWithAncestor, "parameters", {get: function() {
          return [[SomeDirective, new Ancestor()]];
        }});
      ChildComp2 = (function() {
        var ChildComp2 = function ChildComp2(service) {
          assert.argumentTypes(service, MyService);
          this.ctxProp = service.greeting;
          this.dirProp = null;
        };
        return ($traceurRuntime.createClass)(ChildComp2, {}, {});
      }());
      Object.defineProperty(ChildComp2, "annotations", {get: function() {
          return [new Component({
            selector: '[child-cmp2]',
            services: [MyService]
          })];
        }});
      Object.defineProperty(ChildComp2, "parameters", {get: function() {
          return [[MyService]];
        }});
      SomeViewport = (function() {
        var SomeViewport = function SomeViewport(container) {
          assert.argumentTypes(container, ViewContainer);
          container.create().setLocal('some-tmpl', 'hello');
          container.create().setLocal('some-tmpl', 'again');
        };
        return ($traceurRuntime.createClass)(SomeViewport, {}, {});
      }());
      Object.defineProperty(SomeViewport, "annotations", {get: function() {
          return [new Viewport({selector: '[some-viewport]'})];
        }});
      Object.defineProperty(SomeViewport, "parameters", {get: function() {
          return [[ViewContainer]];
        }});
      MyService = (function() {
        var MyService = function MyService() {
          this.greeting = 'hello';
        };
        return ($traceurRuntime.createClass)(MyService, {}, {});
      }());
      DoublePipe = (function($__super) {
        var DoublePipe = function DoublePipe() {
          $traceurRuntime.superConstructor(DoublePipe).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(DoublePipe, {
          supports: function(obj) {
            return true;
          },
          transform: function(value) {
            return ("" + value + value);
          }
        }, {}, $__super);
      }(Pipe));
      DoublePipeFactory = (function() {
        var DoublePipeFactory = function DoublePipeFactory() {};
        return ($traceurRuntime.createClass)(DoublePipeFactory, {
          supports: function(obj) {
            return true;
          },
          create: function() {
            return new DoublePipe();
          }
        }, {});
      }());
      DecoratorEmitingEvent = (function() {
        var DecoratorEmitingEvent = function DecoratorEmitingEvent(emitter) {
          assert.argumentTypes(emitter, Function);
          this.msg = '';
          this.emitter = emitter;
        };
        return ($traceurRuntime.createClass)(DecoratorEmitingEvent, {
          fireEvent: function(msg) {
            assert.argumentTypes(msg, assert.type.string);
            this.emitter(msg);
          },
          onEvent: function(msg) {
            assert.argumentTypes(msg, assert.type.string);
            this.msg = msg;
          }
        }, {});
      }());
      Object.defineProperty(DecoratorEmitingEvent, "annotations", {get: function() {
          return [new Decorator({
            selector: '[emitter]',
            events: {'event': 'onEvent($event)'}
          })];
        }});
      Object.defineProperty(DecoratorEmitingEvent, "parameters", {get: function() {
          return [[Function, new EventEmitter('event')]];
        }});
      Object.defineProperty(DecoratorEmitingEvent.prototype.fireEvent, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(DecoratorEmitingEvent.prototype.onEvent, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      DecoratorListeningEvent = (function() {
        var DecoratorListeningEvent = function DecoratorListeningEvent() {
          this.msg = '';
        };
        return ($traceurRuntime.createClass)(DecoratorListeningEvent, {onEvent: function(msg) {
            assert.argumentTypes(msg, assert.type.string);
            this.msg = msg;
          }}, {});
      }());
      Object.defineProperty(DecoratorListeningEvent, "annotations", {get: function() {
          return [new Decorator({
            selector: '[listener]',
            events: {'event': 'onEvent($event)'}
          })];
        }});
      Object.defineProperty(DecoratorListeningEvent.prototype.onEvent, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      IdComponent = (function() {
        var IdComponent = function IdComponent() {};
        return ($traceurRuntime.createClass)(IdComponent, {}, {});
      }());
      Object.defineProperty(IdComponent, "annotations", {get: function() {
          return [new Component({
            selector: '[id]',
            bind: {'id': 'id'}
          }), new Template({inline: '<div>Matched on id with {{id}}</div>'})];
        }});
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/integration_spec.map

//# sourceMappingURL=../../../../angular2/test/core/compiler/integration_spec.js.map