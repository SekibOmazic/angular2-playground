System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/dom/dom_adapter", "angular2/change_detection", "./compile_step", "./compile_element", "./compile_control"], function($__export) {
  "use strict";
  var assert,
      RegExpWrapper,
      StringWrapper,
      isPresent,
      DOM,
      Parser,
      CompileStep,
      CompileElement,
      CompileControl,
      TextInterpolationParser;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      RegExpWrapper = $__m.RegExpWrapper;
      StringWrapper = $__m.StringWrapper;
      isPresent = $__m.isPresent;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Parser = $__m.Parser;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }],
    execute: function() {
      TextInterpolationParser = $__export("TextInterpolationParser", (function($__super) {
        var TextInterpolationParser = function TextInterpolationParser(parser) {
          assert.argumentTypes(parser, Parser);
          $traceurRuntime.superConstructor(TextInterpolationParser).call(this);
          this._parser = parser;
        };
        return ($traceurRuntime.createClass)(TextInterpolationParser, {
          process: function(parent, current, control) {
            assert.argumentTypes(parent, CompileElement, current, CompileElement, control, CompileControl);
            if (!current.compileChildren || current.ignoreBindings) {
              return ;
            }
            var element = current.element;
            var childNodes = DOM.childNodes(DOM.templateAwareRoot(element));
            for (var i = 0; i < childNodes.length; i++) {
              var node = childNodes[i];
              if (DOM.isTextNode(node)) {
                this._parseTextNode(current, node, i);
              }
            }
          },
          _parseTextNode: function(pipelineElement, node, nodeIndex) {
            var ast = this._parser.parseInterpolation(DOM.nodeValue(node), pipelineElement.elementDescription);
            if (isPresent(ast)) {
              DOM.setText(node, ' ');
              pipelineElement.addTextNodeBinding(nodeIndex, ast);
            }
          }
        }, {}, $__super);
      }(CompileStep)));
      Object.defineProperty(TextInterpolationParser, "parameters", {get: function() {
          return [[Parser]];
        }});
      Object.defineProperty(TextInterpolationParser.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/pipeline/text_interpolation_parser.map

//# sourceMappingURL=../../../../../angular2/src/core/compiler/pipeline/text_interpolation_parser.js.map