System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/facade/lang", "angular2/src/dom/dom_adapter", "angular2/src/facade/collection", "angular2/src/core/compiler/pipeline/element_binder_builder", "angular2/src/core/compiler/pipeline/compile_pipeline", "angular2/src/core/compiler/pipeline/compile_element", "angular2/src/core/compiler/pipeline/compile_step", "angular2/src/core/compiler/pipeline/compile_control", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/core/annotations/annotations", "angular2/src/core/compiler/view", "angular2/src/core/compiler/element_injector", "angular2/src/core/compiler/directive_metadata_reader", "angular2/change_detection", "angular2/di"], function($__export) {
  "use strict";
  var assert,
      describe,
      beforeEach,
      it,
      expect,
      iit,
      ddescribe,
      el,
      isPresent,
      normalizeBlank,
      DOM,
      ListWrapper,
      MapWrapper,
      Map,
      StringMap,
      StringMapWrapper,
      ElementBinderBuilder,
      CompilePipeline,
      CompileElement,
      CompileStep,
      CompileControl,
      NativeShadowDomStrategy,
      Decorator,
      Component,
      Viewport,
      ProtoView,
      ElementPropertyMemento,
      DirectivePropertyMemento,
      ProtoElementInjector,
      DirectiveMetadataReader,
      ChangeDetector,
      Lexer,
      Parser,
      DynamicProtoChangeDetector,
      PipeRegistry,
      Pipe,
      Injector,
      SomeDecoratorDirective,
      SomeDecoratorDirectiveWithBinding,
      SomeDecoratorWithEvent,
      SomeDecoratorDirectiveWith2Bindings,
      SomeViewportDirective,
      SomeViewportDirectiveWithBinding,
      SomeComponentDirective,
      SomeComponentDirectiveWithBinding,
      DirectiveWithBindingsThatHavePipes,
      DoublePipe,
      DoublePipeFactory,
      Context,
      MockStep;
  function main() {
    describe('ElementBinderBuilder', (function() {
      var evalContext,
          view,
          changeDetector;
      function createPipeline() {
        var $__1 = arguments[0] !== (void 0) ? arguments[0] : {},
            textNodeBindings = $__1.textNodeBindings,
            propertyBindings = $__1.propertyBindings,
            eventBindings = $__1.eventBindings,
            directives = $__1.directives,
            protoElementInjector = $__1.protoElementInjector,
            registry = $__1.registry;
        var reflector = new DirectiveMetadataReader();
        var parser = new Parser(new Lexer());
        return new CompilePipeline([new MockStep((function(parent, current, control) {
          var hasBinding = false;
          if (isPresent(DOM.getAttribute(current.element, 'text-binding'))) {
            MapWrapper.forEach(textNodeBindings, (function(v, k) {
              current.addTextNodeBinding(k, parser.parseBinding(v, null));
            }));
            hasBinding = true;
          }
          if (isPresent(DOM.getAttribute(current.element, 'prop-binding'))) {
            if (isPresent(propertyBindings)) {
              MapWrapper.forEach(propertyBindings, (function(v, k) {
                current.addPropertyBinding(k, parser.parseBinding(v, null));
              }));
            }
            hasBinding = true;
          }
          if (isPresent(DOM.getAttribute(current.element, 'event-binding'))) {
            MapWrapper.forEach(eventBindings, (function(v, k) {
              current.addEventBinding(k, parser.parseAction(v, null));
            }));
            hasBinding = true;
          }
          if (isPresent(DOM.getAttribute(current.element, 'directives'))) {
            hasBinding = true;
            for (var i = 0; i < directives.length; i++) {
              var dirMetadata = reflector.read(directives[i]);
              current.addDirective(dirMetadata);
            }
          }
          if (hasBinding) {
            current.hasBindings = true;
            DOM.addClass(current.element, 'ng-binding');
          }
          if (isPresent(protoElementInjector) && (isPresent(DOM.getAttribute(current.element, 'text-binding')) || isPresent(DOM.getAttribute(current.element, 'prop-binding')) || isPresent(DOM.getAttribute(current.element, 'directives')) || isPresent(DOM.getAttribute(current.element, 'event-binding')))) {
            current.inheritedProtoElementInjector = protoElementInjector;
          }
          if (isPresent(DOM.getAttribute(current.element, 'viewroot'))) {
            current.isViewRoot = true;
            current.inheritedProtoView = new ProtoView(current.element, new DynamicProtoChangeDetector(normalizeBlank(registry)), new NativeShadowDomStrategy(null));
          } else if (isPresent(parent)) {
            current.inheritedProtoView = parent.inheritedProtoView;
          }
        })), new ElementBinderBuilder(parser)]);
      }
      function instantiateView(protoView) {
        evalContext = new Context();
        view = protoView.instantiate(null, null);
        view.hydrate(new Injector([]), null, evalContext);
        changeDetector = view.changeDetector;
      }
      it('should not create an ElementBinder for elements that have no bindings', (function() {
        var pipeline = createPipeline();
        var results = pipeline.process(el('<div viewroot><span></span></div>'));
        var pv = results[0].inheritedProtoView;
        expect(pv.elementBinders.length).toBe(0);
      }));
      it('should create an ElementBinder for elements that have bindings', (function() {
        var pipeline = createPipeline();
        var results = pipeline.process(el('<div viewroot prop-binding><span prop-binding></span></div>'));
        var pv = results[0].inheritedProtoView;
        expect(pv.elementBinders.length).toBe(2);
        expect(pv.elementBinders[1]).not.toBe(pv.elementBinders[0]);
      }));
      it('should inherit ElementBinders to children that have no bindings', (function() {
        var pipeline = createPipeline();
        var results = pipeline.process(el('<div viewroot prop-binding><span></span></div>'));
        var pv = results[0].inheritedProtoView;
        expect(pv.elementBinders.length).toBe(1);
        expect(results[0].inheritedElementBinder).toBe(results[1].inheritedElementBinder);
      }));
      it('should store the current protoElementInjector', (function() {
        var directives = [SomeDecoratorDirective];
        var protoElementInjector = new ProtoElementInjector(null, 0, directives);
        var pipeline = createPipeline({
          protoElementInjector: protoElementInjector,
          directives: directives
        });
        var results = pipeline.process(el('<div viewroot directives></div>'));
        var pv = results[0].inheritedProtoView;
        expect(pv.elementBinders[0].protoElementInjector).toBe(protoElementInjector);
      }));
      it('should not store the parent protoElementInjector', (function() {
        var directives = [SomeDecoratorDirective];
        var eventBindings = MapWrapper.createFromStringMap({'event1': '1+1'});
        var pipeline = createPipeline({
          directives: directives,
          eventBindings: eventBindings
        });
        var results = pipeline.process(el('<div viewroot directives><div event-binding></div></div>'));
        var pv = results[0].inheritedProtoView;
        expect(pv.elementBinders[1].protoElementInjector).toBeNull();
      }));
      it('should store the component directive', (function() {
        var directives = [SomeComponentDirective];
        var pipeline = createPipeline({
          protoElementInjector: null,
          directives: directives
        });
        var results = pipeline.process(el('<div viewroot directives></div>'));
        var pv = results[0].inheritedProtoView;
        expect(pv.elementBinders[0].componentDirective.type).toBe(SomeComponentDirective);
      }));
      it('should store the template directive', (function() {
        var directives = [SomeViewportDirective];
        var pipeline = createPipeline({
          protoElementInjector: null,
          directives: directives
        });
        var results = pipeline.process(el('<div viewroot directives></div>'));
        var pv = results[0].inheritedProtoView;
        expect(pv.elementBinders[0].viewportDirective.type).toBe(SomeViewportDirective);
      }));
      it('should bind text nodes', (function() {
        var textNodeBindings = MapWrapper.create();
        MapWrapper.set(textNodeBindings, 0, 'prop1');
        MapWrapper.set(textNodeBindings, 2, 'prop2');
        var pipeline = createPipeline({textNodeBindings: textNodeBindings});
        var results = pipeline.process(el('<div viewroot text-binding>{{}}<span></span>{{}}</div>'));
        var pv = results[0].inheritedProtoView;
        expect(sortArr(pv.elementBinders[0].textNodeIndices)).toEqual([0, 2]);
        instantiateView(pv);
        evalContext.prop1 = 'a';
        evalContext.prop2 = 'b';
        changeDetector.detectChanges();
        expect(view.nodes[0].childNodes[0].nodeValue).toEqual('a');
        expect(view.nodes[0].childNodes[2].nodeValue).toEqual('b');
      }));
      it('should bind element properties', (function() {
        var propertyBindings = MapWrapper.createFromStringMap({
          'value': 'prop1',
          'hidden': 'prop2'
        });
        var pipeline = createPipeline({propertyBindings: propertyBindings});
        var results = pipeline.process(el('<input viewroot prop-binding>'));
        var pv = results[0].inheritedProtoView;
        expect(pv.elementBinders[0].hasElementPropertyBindings).toBe(true);
        instantiateView(pv);
        evalContext.prop1 = 'a';
        evalContext.prop2 = false;
        changeDetector.detectChanges();
        expect(view.nodes[0].value).toEqual('a');
        expect(view.nodes[0].hidden).toEqual(false);
      }));
      it('should bind element properties where attr name and prop name do not match', (function() {
        var propertyBindings = MapWrapper.createFromStringMap({'tabindex': 'prop1'});
        var pipeline = createPipeline({propertyBindings: propertyBindings});
        var results = pipeline.process(el('<div viewroot prop-binding></div>'));
        var pv = results[0].inheritedProtoView;
        expect(pv.elementBinders[0].hasElementPropertyBindings).toBe(true);
        instantiateView(pv);
        evalContext.prop1 = 1;
        changeDetector.detectChanges();
        expect(view.nodes[0].tabIndex).toEqual(1);
        evalContext.prop1 = 0;
        changeDetector.detectChanges();
        expect(view.nodes[0].tabIndex).toEqual(0);
      }));
      it('should bind to aria-* attributes when exp evaluates to strings', (function() {
        var propertyBindings = MapWrapper.createFromStringMap({'aria-label': 'prop1'});
        var pipeline = createPipeline({propertyBindings: propertyBindings});
        var results = pipeline.process(el('<div viewroot prop-binding></div>'));
        var pv = results[0].inheritedProtoView;
        expect(pv.elementBinders[0].hasElementPropertyBindings).toBe(true);
        instantiateView(pv);
        evalContext.prop1 = 'some label';
        changeDetector.detectChanges();
        expect(DOM.getAttribute(view.nodes[0], 'aria-label')).toEqual('some label');
        evalContext.prop1 = 'some other label';
        changeDetector.detectChanges();
        expect(DOM.getAttribute(view.nodes[0], 'aria-label')).toEqual('some other label');
        evalContext.prop1 = null;
        changeDetector.detectChanges();
        expect(DOM.getAttribute(view.nodes[0], 'aria-label')).toBeNull();
      }));
      it('should bind to aria-* attributes when exp evaluates to booleans', (function() {
        var propertyBindings = MapWrapper.createFromStringMap({'aria-busy': 'prop1'});
        var pipeline = createPipeline({propertyBindings: propertyBindings});
        var results = pipeline.process(el('<div viewroot prop-binding></div>'));
        var pv = results[0].inheritedProtoView;
        expect(pv.elementBinders[0].hasElementPropertyBindings).toBe(true);
        instantiateView(pv);
        evalContext.prop1 = true;
        changeDetector.detectChanges();
        expect(DOM.getAttribute(view.nodes[0], 'aria-busy')).toEqual('true');
        evalContext.prop1 = false;
        changeDetector.detectChanges();
        expect(DOM.getAttribute(view.nodes[0], 'aria-busy')).toEqual('false');
      }));
      it('should bind to ARIA role attribute', (function() {
        var propertyBindings = MapWrapper.createFromStringMap({'role': 'prop1'});
        var pipeline = createPipeline({propertyBindings: propertyBindings});
        var results = pipeline.process(el('<div viewroot prop-binding></div>'));
        var pv = results[0].inheritedProtoView;
        expect(pv.elementBinders[0].hasElementPropertyBindings).toBe(true);
        instantiateView(pv);
        evalContext.prop1 = 'alert';
        changeDetector.detectChanges();
        expect(DOM.getAttribute(view.nodes[0], 'role')).toEqual('alert');
        evalContext.prop1 = 'alertdialog';
        changeDetector.detectChanges();
        expect(DOM.getAttribute(view.nodes[0], 'role')).toEqual('alertdialog');
        evalContext.prop1 = null;
        changeDetector.detectChanges();
        expect(DOM.getAttribute(view.nodes[0], 'role')).toBeNull();
      }));
      it('should throw for a non-string ARIA role', (function() {
        var propertyBindings = MapWrapper.createFromStringMap({'role': 'prop1'});
        var pipeline = createPipeline({propertyBindings: propertyBindings});
        var results = pipeline.process(el('<div viewroot prop-binding></div>'));
        var pv = results[0].inheritedProtoView;
        instantiateView(pv);
        expect((function() {
          evalContext.prop1 = 1;
          changeDetector.detectChanges();
        })).toThrowError("Invalid role attribute, only string values are allowed, got '1'");
      }));
      it('should bind class with a dot', (function() {
        var propertyBindings = MapWrapper.createFromStringMap({'class.bar': 'prop1'});
        var pipeline = createPipeline({propertyBindings: propertyBindings});
        var results = pipeline.process(el('<input class="foo" viewroot prop-binding>'));
        var pv = results[0].inheritedProtoView;
        expect(pv.elementBinders[0].hasElementPropertyBindings).toBe(true);
        instantiateView(pv);
        evalContext.prop1 = true;
        changeDetector.detectChanges();
        expect(view.nodes[0].className).toEqual('foo ng-binding bar');
        evalContext.prop1 = false;
        changeDetector.detectChanges();
        expect(view.nodes[0].className).toEqual('foo ng-binding');
      }));
      it('should bind style with a dot', (function() {
        var propertyBindings = MapWrapper.createFromStringMap({'style.color': 'prop1'});
        var pipeline = createPipeline({propertyBindings: propertyBindings});
        var results = pipeline.process(el('<div viewroot prop-binding>'));
        var pv = results[0].inheritedProtoView;
        expect(pv.elementBinders[0].hasElementPropertyBindings).toBe(true);
        instantiateView(pv);
        evalContext.prop1 = 'red';
        changeDetector.detectChanges();
        expect(DOM.getStyle(view.nodes[0], 'color')).toEqual('red');
        evalContext.prop1 = 'blue';
        changeDetector.detectChanges();
        expect(DOM.getStyle(view.nodes[0], 'color')).toEqual('blue');
      }));
      it('should bind style with a dot and suffix', (function() {
        var propertyBindings = MapWrapper.createFromStringMap({'style.font-size.px': 'prop1'});
        var pipeline = createPipeline({propertyBindings: propertyBindings});
        var results = pipeline.process(el('<div viewroot prop-binding>'));
        var pv = results[0].inheritedProtoView;
        expect(pv.elementBinders[0].hasElementPropertyBindings).toBe(true);
        instantiateView(pv);
        evalContext.prop1 = 10;
        changeDetector.detectChanges();
        expect(DOM.getStyle(view.nodes[0], 'font-size')).toEqual('10px');
        evalContext.prop1 = 20;
        changeDetector.detectChanges();
        expect(DOM.getStyle(view.nodes[0], 'font-size')).toEqual('20px');
        evalContext.prop1 = null;
        changeDetector.detectChanges();
        expect(DOM.getStyle(view.nodes[0], 'font-size')).toEqual('');
      }));
      it('should bind events', (function() {
        var eventBindings = MapWrapper.createFromStringMap({'event1': '1+1'});
        var pipeline = createPipeline({eventBindings: eventBindings});
        var results = pipeline.process(el('<div viewroot event-binding></div>'));
        var pv = results[0].inheritedProtoView;
        var eventMap = StringMapWrapper.get(pv.elementBinders[0].events, 'event1');
        var ast = MapWrapper.get(eventMap, -1);
        expect(ast.eval(null)).toBe(2);
      }));
      it('should bind directive events', (function() {
        var directives = [SomeDecoratorWithEvent];
        var protoElementInjector = new ProtoElementInjector(null, 0, directives, true);
        var pipeline = createPipeline({
          directives: directives,
          protoElementInjector: protoElementInjector
        });
        var results = pipeline.process(el('<div viewroot directives></div>'));
        var pv = results[0].inheritedProtoView;
        var directiveEvents = pv.elementBinders[0].events;
        var eventMap = StringMapWrapper.get(directiveEvents, 'event');
        var ast = MapWrapper.get(eventMap, 0);
        var context = new SomeDecoratorWithEvent();
        expect(ast.eval(context)).toEqual('onEvent() callback');
      }));
      it('should bind directive properties', (function() {
        var propertyBindings = MapWrapper.createFromStringMap({
          'boundprop1': 'prop1',
          'boundprop2': 'prop2',
          'boundprop3': 'prop3'
        });
        var directives = [SomeComponentDirectiveWithBinding, SomeViewportDirectiveWithBinding, SomeDecoratorDirectiveWith2Bindings];
        var protoElementInjector = new ProtoElementInjector(null, 0, directives, true);
        var pipeline = createPipeline({
          propertyBindings: propertyBindings,
          directives: directives,
          protoElementInjector: protoElementInjector
        });
        var results = pipeline.process(el('<div viewroot prop-binding directives></div>'));
        var pv = results[0].inheritedProtoView;
        results[0].inheritedElementBinder.nestedProtoView = new ProtoView(el('<div></div>'), new DynamicProtoChangeDetector(null), new NativeShadowDomStrategy(null));
        instantiateView(pv);
        evalContext.prop1 = 'a';
        evalContext.prop2 = 'b';
        evalContext.prop3 = 'c';
        changeDetector.detectChanges();
        expect(view.elementInjectors[0].get(SomeDecoratorDirectiveWith2Bindings).decorProp).toBe('a');
        expect(view.elementInjectors[0].get(SomeDecoratorDirectiveWith2Bindings).decorProp2).toBe('b');
        expect(view.elementInjectors[0].get(SomeViewportDirectiveWithBinding).templProp).toBe('b');
        expect(view.elementInjectors[0].get(SomeComponentDirectiveWithBinding).compProp).toBe('c');
      }));
      it('should bind directive properties with pipes', (function() {
        var propertyBindings = MapWrapper.createFromStringMap({'boundprop': 'prop1'});
        var directives = [DirectiveWithBindingsThatHavePipes];
        var protoElementInjector = new ProtoElementInjector(null, 0, directives, true);
        var registry = new PipeRegistry({"double": [new DoublePipeFactory()]});
        var pipeline = createPipeline({
          propertyBindings: propertyBindings,
          directives: directives,
          protoElementInjector: protoElementInjector,
          registry: registry
        });
        var results = pipeline.process(el('<div viewroot prop-binding directives></div>'));
        var pv = results[0].inheritedProtoView;
        results[0].inheritedElementBinder.nestedProtoView = new ProtoView(el('<div></div>'), new DynamicProtoChangeDetector(registry), new NativeShadowDomStrategy(null));
        instantiateView(pv);
        evalContext.prop1 = 'a';
        changeDetector.detectChanges();
        expect(view.elementInjectors[0].get(DirectiveWithBindingsThatHavePipes).compProp).toEqual('aa');
      }));
      it('should bind directive properties for sibling elements', (function() {
        var propertyBindings = MapWrapper.createFromStringMap({'boundprop1': 'prop1'});
        var directives = [SomeDecoratorDirectiveWithBinding];
        var protoElementInjector = new ProtoElementInjector(null, 0, directives);
        var pipeline = createPipeline({
          propertyBindings: propertyBindings,
          directives: directives,
          protoElementInjector: protoElementInjector
        });
        var results = pipeline.process(el('<div viewroot><div prop-binding directives>' + '</div><div prop-binding directives></div></div>'));
        var pv = results[0].inheritedProtoView;
        instantiateView(pv);
        evalContext.prop1 = 'a';
        changeDetector.detectChanges();
        expect(view.elementInjectors[1].get(SomeDecoratorDirectiveWithBinding).decorProp).toBe('a');
      }));
      it('should bind to string literals', (function() {
        var directives = [SomeDecoratorDirectiveWithBinding];
        var protoElementInjector = new ProtoElementInjector(null, 0, directives);
        var pipeline = createPipeline({
          directives: directives,
          protoElementInjector: protoElementInjector
        });
        var results = pipeline.process(el('<div viewroot directives boundprop1="foo"></div>'));
        var pv = results[0].inheritedProtoView;
        instantiateView(pv);
        changeDetector.detectChanges();
        expect(view.elementInjectors[0].get(SomeDecoratorDirectiveWithBinding).decorProp).toEqual('foo');
      }));
      describe('errors', (function() {
        it('should not throw any errors if there is no element property bindings for a directive ' + 'property binding', (function() {
          var pipeline = createPipeline({
            propertyBindings: MapWrapper.create(),
            directives: [SomeDecoratorDirectiveWithBinding]
          });
          pipeline.process(el('<div viewroot prop-binding directives>'));
        }));
      }));
    }));
  }
  function sortArr(arr) {
    var arr2 = ListWrapper.clone(arr);
    arr2.sort();
    return arr2;
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      describe = $__m.describe;
      beforeEach = $__m.beforeEach;
      it = $__m.it;
      expect = $__m.expect;
      iit = $__m.iit;
      ddescribe = $__m.ddescribe;
      el = $__m.el;
    }, function($__m) {
      isPresent = $__m.isPresent;
      normalizeBlank = $__m.normalizeBlank;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      Map = $__m.Map;
      StringMap = $__m.StringMap;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      ElementBinderBuilder = $__m.ElementBinderBuilder;
    }, function($__m) {
      CompilePipeline = $__m.CompilePipeline;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      NativeShadowDomStrategy = $__m.NativeShadowDomStrategy;
    }, function($__m) {
      Decorator = $__m.Decorator;
      Component = $__m.Component;
      Viewport = $__m.Viewport;
    }, function($__m) {
      ProtoView = $__m.ProtoView;
      ElementPropertyMemento = $__m.ElementPropertyMemento;
      DirectivePropertyMemento = $__m.DirectivePropertyMemento;
    }, function($__m) {
      ProtoElementInjector = $__m.ProtoElementInjector;
    }, function($__m) {
      DirectiveMetadataReader = $__m.DirectiveMetadataReader;
    }, function($__m) {
      ChangeDetector = $__m.ChangeDetector;
      Lexer = $__m.Lexer;
      Parser = $__m.Parser;
      DynamicProtoChangeDetector = $__m.DynamicProtoChangeDetector;
      PipeRegistry = $__m.PipeRegistry;
      Pipe = $__m.Pipe;
    }, function($__m) {
      Injector = $__m.Injector;
    }],
    execute: function() {
      SomeDecoratorDirective = (function() {
        var SomeDecoratorDirective = function SomeDecoratorDirective() {};
        return ($traceurRuntime.createClass)(SomeDecoratorDirective, {}, {});
      }());
      Object.defineProperty(SomeDecoratorDirective, "annotations", {get: function() {
          return [new Decorator()];
        }});
      SomeDecoratorDirectiveWithBinding = (function() {
        var SomeDecoratorDirectiveWithBinding = function SomeDecoratorDirectiveWithBinding() {
          this.decorProp = null;
          this.decorProp2 = null;
        };
        return ($traceurRuntime.createClass)(SomeDecoratorDirectiveWithBinding, {}, {});
      }());
      Object.defineProperty(SomeDecoratorDirectiveWithBinding, "annotations", {get: function() {
          return [new Decorator({bind: {'decorProp': 'boundprop1'}})];
        }});
      SomeDecoratorWithEvent = (function() {
        var SomeDecoratorWithEvent = function SomeDecoratorWithEvent() {
          this.$event = 'onEvent';
        };
        return ($traceurRuntime.createClass)(SomeDecoratorWithEvent, {onEvent: function(event) {
            return (event + "() callback");
          }}, {});
      }());
      Object.defineProperty(SomeDecoratorWithEvent, "annotations", {get: function() {
          return [new Decorator({events: {'event': 'onEvent($event)'}})];
        }});
      SomeDecoratorDirectiveWith2Bindings = (function() {
        var SomeDecoratorDirectiveWith2Bindings = function SomeDecoratorDirectiveWith2Bindings() {
          this.decorProp = null;
          this.decorProp2 = null;
        };
        return ($traceurRuntime.createClass)(SomeDecoratorDirectiveWith2Bindings, {}, {});
      }());
      Object.defineProperty(SomeDecoratorDirectiveWith2Bindings, "annotations", {get: function() {
          return [new Decorator({bind: {
              'decorProp': 'boundprop1',
              'decorProp2': 'boundprop2'
            }})];
        }});
      SomeViewportDirective = (function() {
        var SomeViewportDirective = function SomeViewportDirective() {};
        return ($traceurRuntime.createClass)(SomeViewportDirective, {}, {});
      }());
      Object.defineProperty(SomeViewportDirective, "annotations", {get: function() {
          return [new Viewport()];
        }});
      SomeViewportDirectiveWithBinding = (function() {
        var SomeViewportDirectiveWithBinding = function SomeViewportDirectiveWithBinding() {
          this.templProp = null;
        };
        return ($traceurRuntime.createClass)(SomeViewportDirectiveWithBinding, {}, {});
      }());
      Object.defineProperty(SomeViewportDirectiveWithBinding, "annotations", {get: function() {
          return [new Viewport({bind: {'templProp': 'boundprop2'}})];
        }});
      SomeComponentDirective = (function() {
        var SomeComponentDirective = function SomeComponentDirective() {};
        return ($traceurRuntime.createClass)(SomeComponentDirective, {}, {});
      }());
      Object.defineProperty(SomeComponentDirective, "annotations", {get: function() {
          return [new Component()];
        }});
      SomeComponentDirectiveWithBinding = (function() {
        var SomeComponentDirectiveWithBinding = function SomeComponentDirectiveWithBinding() {
          this.compProp = null;
        };
        return ($traceurRuntime.createClass)(SomeComponentDirectiveWithBinding, {}, {});
      }());
      Object.defineProperty(SomeComponentDirectiveWithBinding, "annotations", {get: function() {
          return [new Component({bind: {'compProp': 'boundprop3'}})];
        }});
      DirectiveWithBindingsThatHavePipes = (function() {
        var DirectiveWithBindingsThatHavePipes = function DirectiveWithBindingsThatHavePipes() {
          this.compProp = null;
        };
        return ($traceurRuntime.createClass)(DirectiveWithBindingsThatHavePipes, {}, {});
      }());
      Object.defineProperty(DirectiveWithBindingsThatHavePipes, "annotations", {get: function() {
          return [new Component({bind: {'compProp': 'boundprop | double'}})];
        }});
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
      Context = (function() {
        var Context = function Context() {
          this.prop1 = null;
          this.prop2 = null;
          this.prop3 = null;
        };
        return ($traceurRuntime.createClass)(Context, {}, {});
      }());
      MockStep = (function($__super) {
        var MockStep = function MockStep(process) {
          $traceurRuntime.superConstructor(MockStep).call(this);
          this.processClosure = process;
        };
        return ($traceurRuntime.createClass)(MockStep, {process: function(parent, current, control) {
            assert.argumentTypes(parent, CompileElement, current, CompileElement, control, CompileControl);
            this.processClosure(parent, current, control);
          }}, {}, $__super);
      }(CompileStep));
      Object.defineProperty(MockStep.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/pipeline/element_binder_builder_spec.map

//# sourceMappingURL=../../../../../angular2/test/core/compiler/pipeline/element_binder_builder_spec.js.map