System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "../view", "angular2/change_detection", "./compile_step", "./compile_element", "./compile_control", "../shadow_dom_strategy"], function($__export) {
  "use strict";
  var assert,
      isPresent,
      BaseException,
      ListWrapper,
      MapWrapper,
      ProtoView,
      ChangeDetection,
      CompileStep,
      CompileElement,
      CompileControl,
      ShadowDomStrategy,
      ProtoViewBuilder;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isPresent = $__m.isPresent;
      BaseException = $__m.BaseException;
    }, function($__m) {
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      ProtoView = $__m.ProtoView;
    }, function($__m) {
      ChangeDetection = $__m.ChangeDetection;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }],
    execute: function() {
      ProtoViewBuilder = $__export("ProtoViewBuilder", (function($__super) {
        var ProtoViewBuilder = function ProtoViewBuilder(changeDetection, shadowDomStrategy) {
          assert.argumentTypes(changeDetection, ChangeDetection, shadowDomStrategy, ShadowDomStrategy);
          $traceurRuntime.superConstructor(ProtoViewBuilder).call(this);
          this._shadowDomStrategy = shadowDomStrategy;
          this.changeDetection = changeDetection;
        };
        return ($traceurRuntime.createClass)(ProtoViewBuilder, {process: function(parent, current, control) {
            assert.argumentTypes(parent, CompileElement, current, CompileElement, control, CompileControl);
            var inheritedProtoView = null;
            if (current.isViewRoot) {
              var protoChangeDetector = this.changeDetection.createProtoChangeDetector('dummy');
              inheritedProtoView = new ProtoView(current.element, protoChangeDetector, this._shadowDomStrategy);
              if (isPresent(parent)) {
                if (isPresent(parent.inheritedElementBinder.nestedProtoView)) {
                  throw new BaseException('Only one nested view per element is allowed');
                }
                parent.inheritedElementBinder.nestedProtoView = inheritedProtoView;
                if (isPresent(parent.variableBindings)) {
                  MapWrapper.forEach(parent.variableBindings, (function(mappedName, varName) {
                    inheritedProtoView.bindVariable(varName, mappedName);
                  }));
                }
              }
            } else if (isPresent(parent)) {
              inheritedProtoView = parent.inheritedProtoView;
            }
            if (isPresent(current.variableBindings)) {
              MapWrapper.forEach(current.variableBindings, (function(mappedName, varName) {
                MapWrapper.set(inheritedProtoView.protoContextLocals, mappedName, null);
              }));
            }
            current.inheritedProtoView = inheritedProtoView;
          }}, {}, $__super);
      }(CompileStep)));
      Object.defineProperty(ProtoViewBuilder, "parameters", {get: function() {
          return [[ChangeDetection], [ShadowDomStrategy]];
        }});
      Object.defineProperty(ProtoViewBuilder.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/pipeline/proto_view_builder.map

//# sourceMappingURL=../../../../../angular2/src/core/compiler/pipeline/proto_view_builder.js.map