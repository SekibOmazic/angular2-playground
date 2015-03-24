System.register(["rtts_assert/rtts_assert", "angular2/src/dom/dom_adapter", "angular2/src/facade/lang", "angular2/src/facade/collection", "./pipeline/compile_step", "./pipeline/compile_element", "./pipeline/compile_control", "./shadow_dom_strategy", "./directive_metadata"], function($__export) {
  "use strict";
  var assert,
      DOM,
      isPresent,
      List,
      CompileStep,
      CompileElement,
      CompileControl,
      ShadowDomStrategy,
      DirectiveMetadata,
      CssProcessor,
      CssTransformer,
      _CssProcessorStep;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      List = $__m.List;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }],
    execute: function() {
      CssProcessor = $__export("CssProcessor", (function() {
        var CssProcessor = function CssProcessor(transformers) {
          assert.argumentTypes(transformers, assert.genericType(List, CssTransformer));
          this._transformers = transformers;
        };
        return ($traceurRuntime.createClass)(CssProcessor, {getCompileStep: function(cmpMetadata, shadowDomStrategy, templateUrl) {
            assert.argumentTypes(cmpMetadata, DirectiveMetadata, shadowDomStrategy, ShadowDomStrategy, templateUrl, assert.type.string);
            var strategyStep = shadowDomStrategy.getStyleCompileStep(cmpMetadata, templateUrl);
            return new _CssProcessorStep(strategyStep, this._transformers);
          }}, {});
      }()));
      Object.defineProperty(CssProcessor, "parameters", {get: function() {
          return [[assert.genericType(List, CssTransformer)]];
        }});
      Object.defineProperty(CssProcessor.prototype.getCompileStep, "parameters", {get: function() {
          return [[DirectiveMetadata], [ShadowDomStrategy], [assert.type.string]];
        }});
      CssTransformer = $__export("CssTransformer", (function() {
        var CssTransformer = function CssTransformer() {};
        return ($traceurRuntime.createClass)(CssTransformer, {transform: function(styleElement) {}}, {});
      }()));
      _CssProcessorStep = (function($__super) {
        var _CssProcessorStep = function _CssProcessorStep(strategyStep, transformers) {
          assert.argumentTypes(strategyStep, CompileStep, transformers, assert.genericType(List, CssTransformer));
          $traceurRuntime.superConstructor(_CssProcessorStep).call(this);
          this._strategyStep = strategyStep;
          this._transformers = transformers;
        };
        return ($traceurRuntime.createClass)(_CssProcessorStep, {process: function(parent, current, control) {
            assert.argumentTypes(parent, CompileElement, current, CompileElement, control, CompileControl);
            if (DOM.tagName(current.element) == 'STYLE') {
              current.ignoreBindings = true;
              if (isPresent(this._transformers)) {
                var styleEl = current.element;
                for (var i = 0; i < this._transformers.length; i++) {
                  this._transformers[i].transform(styleEl);
                }
              }
              if (isPresent(this._strategyStep)) {
                this._strategyStep.process(parent, current, control);
              }
            }
          }}, {}, $__super);
      }(CompileStep));
      Object.defineProperty(_CssProcessorStep, "parameters", {get: function() {
          return [[CompileStep], [assert.genericType(List, CssTransformer)]];
        }});
      Object.defineProperty(_CssProcessorStep.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/css_processor.map

//# sourceMappingURL=../../../../angular2/src/core/compiler/css_processor.js.map