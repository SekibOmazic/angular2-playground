System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/change_detection", "./compile_step", "./compile_element", "./compile_control"], function($__export) {
  "use strict";
  var assert,
      isPresent,
      isBlank,
      RegExpWrapper,
      BaseException,
      MapWrapper,
      Parser,
      AST,
      ExpressionWithSource,
      CompileStep,
      CompileElement,
      CompileControl,
      BIND_NAME_REGEXP,
      PropertyBindingParser;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      RegExpWrapper = $__m.RegExpWrapper;
      BaseException = $__m.BaseException;
    }, function($__m) {
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      Parser = $__m.Parser;
      AST = $__m.AST;
      ExpressionWithSource = $__m.ExpressionWithSource;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }],
    execute: function() {
      BIND_NAME_REGEXP = RegExpWrapper.create('^(?:(?:(bind)|(var)|(on))-(.+))|\\[([^\\]]+)\\]|\\(([^\\)]+)\\)|(#)(.+)');
      PropertyBindingParser = $__export("PropertyBindingParser", (function($__super) {
        var PropertyBindingParser = function PropertyBindingParser(parser) {
          assert.argumentTypes(parser, Parser);
          $traceurRuntime.superConstructor(PropertyBindingParser).call(this);
          this._parser = parser;
        };
        return ($traceurRuntime.createClass)(PropertyBindingParser, {
          process: function(parent, current, control) {
            var $__0 = this;
            assert.argumentTypes(parent, CompileElement, current, CompileElement, control, CompileControl);
            if (current.ignoreBindings) {
              return ;
            }
            var attrs = current.attrs();
            var newAttrs = MapWrapper.create();
            var desc = current.elementDescription;
            MapWrapper.forEach(attrs, (function(attrValue, attrName) {
              var bindParts = RegExpWrapper.firstMatch(BIND_NAME_REGEXP, attrName);
              if (isPresent(bindParts)) {
                if (isPresent(bindParts[1])) {
                  current.addPropertyBinding(bindParts[4], $__0._parseBinding(attrValue, desc));
                  MapWrapper.set(newAttrs, bindParts[4], attrValue);
                } else if (isPresent(bindParts[2]) || isPresent(bindParts[7])) {
                  var identifier = (isPresent(bindParts[4]) && bindParts[4] !== '') ? bindParts[4] : bindParts[8];
                  var value = attrValue == '' ? '\$implicit' : attrValue;
                  current.addVariableBinding(identifier, value);
                  MapWrapper.set(newAttrs, identifier, value);
                } else if (isPresent(bindParts[3])) {
                  current.addEventBinding(bindParts[4], $__0._parseAction(attrValue, desc));
                } else if (isPresent(bindParts[5])) {
                  current.addPropertyBinding(bindParts[5], $__0._parseBinding(attrValue, desc));
                  MapWrapper.set(newAttrs, bindParts[5], attrValue);
                } else if (isPresent(bindParts[6])) {
                  current.addEventBinding(bindParts[6], $__0._parseBinding(attrValue, desc));
                }
              } else {
                var ast = $__0._parseInterpolation(attrValue, desc);
                if (isPresent(ast)) {
                  current.addPropertyBinding(attrName, ast);
                }
              }
            }));
            MapWrapper.forEach(newAttrs, (function(attrValue, attrName) {
              MapWrapper.set(attrs, attrName, attrValue);
            }));
          },
          _parseInterpolation: function(input, location) {
            assert.argumentTypes(input, assert.type.string, location, assert.type.string);
            return assert.returnType((this._parser.parseInterpolation(input, location)), AST);
          },
          _parseBinding: function(input, location) {
            assert.argumentTypes(input, assert.type.string, location, assert.type.string);
            return assert.returnType((this._parser.parseBinding(input, location)), AST);
          },
          _parseAction: function(input, location) {
            assert.argumentTypes(input, assert.type.string, location, assert.type.string);
            return assert.returnType((this._parser.parseAction(input, location)), AST);
          }
        }, {}, $__super);
      }(CompileStep)));
      Object.defineProperty(PropertyBindingParser, "parameters", {get: function() {
          return [[Parser]];
        }});
      Object.defineProperty(PropertyBindingParser.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
      Object.defineProperty(PropertyBindingParser.prototype._parseInterpolation, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(PropertyBindingParser.prototype._parseBinding, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      Object.defineProperty(PropertyBindingParser.prototype._parseAction, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/pipeline/property_binding_parser.map

//# sourceMappingURL=../../../../../angular2/src/core/compiler/pipeline/property_binding_parser.js.map