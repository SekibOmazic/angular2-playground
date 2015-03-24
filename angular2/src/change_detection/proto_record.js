System.register(["rtts_assert/rtts_assert", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var assert,
      List,
      RECORD_TYPE_SELF,
      RECORD_TYPE_CONST,
      RECORD_TYPE_PRIMITIVE_OP,
      RECORD_TYPE_PROPERTY,
      RECORD_TYPE_INVOKE_METHOD,
      RECORD_TYPE_INVOKE_CLOSURE,
      RECORD_TYPE_KEYED_ACCESS,
      RECORD_TYPE_PIPE,
      RECORD_TYPE_INTERPOLATE,
      ProtoRecord;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      List = $__m.List;
    }],
    execute: function() {
      RECORD_TYPE_SELF = $__export("RECORD_TYPE_SELF", 0);
      RECORD_TYPE_CONST = $__export("RECORD_TYPE_CONST", 1);
      RECORD_TYPE_PRIMITIVE_OP = $__export("RECORD_TYPE_PRIMITIVE_OP", 2);
      RECORD_TYPE_PROPERTY = $__export("RECORD_TYPE_PROPERTY", 3);
      RECORD_TYPE_INVOKE_METHOD = $__export("RECORD_TYPE_INVOKE_METHOD", 4);
      RECORD_TYPE_INVOKE_CLOSURE = $__export("RECORD_TYPE_INVOKE_CLOSURE", 5);
      RECORD_TYPE_KEYED_ACCESS = $__export("RECORD_TYPE_KEYED_ACCESS", 6);
      RECORD_TYPE_PIPE = $__export("RECORD_TYPE_PIPE", 8);
      RECORD_TYPE_INTERPOLATE = $__export("RECORD_TYPE_INTERPOLATE", 9);
      ProtoRecord = $__export("ProtoRecord", (function() {
        var ProtoRecord = function ProtoRecord(mode, name, funcOrValue, args, fixedArgs, contextIndex, selfIndex, bindingMemento, directiveMemento, expressionAsString, lastInBinding, lastInDirective) {
          assert.argumentTypes(mode, assert.type.number, name, assert.type.string, funcOrValue, assert.type.any, args, List, fixedArgs, List, contextIndex, assert.type.number, selfIndex, assert.type.number, bindingMemento, assert.type.any, directiveMemento, assert.type.any, expressionAsString, assert.type.string, lastInBinding, assert.type.boolean, lastInDirective, assert.type.boolean);
          this.mode = mode;
          this.name = name;
          this.funcOrValue = funcOrValue;
          this.args = args;
          this.fixedArgs = fixedArgs;
          this.contextIndex = contextIndex;
          this.selfIndex = selfIndex;
          this.bindingMemento = bindingMemento;
          this.directiveMemento = directiveMemento;
          this.lastInBinding = lastInBinding;
          this.lastInDirective = lastInDirective;
          this.expressionAsString = expressionAsString;
        };
        return ($traceurRuntime.createClass)(ProtoRecord, {isPureFunction: function() {
            return assert.returnType((this.mode === RECORD_TYPE_INTERPOLATE || this.mode === RECORD_TYPE_PRIMITIVE_OP), assert.type.boolean);
          }}, {});
      }()));
      Object.defineProperty(ProtoRecord, "parameters", {get: function() {
          return [[assert.type.number], [assert.type.string], [], [List], [List], [assert.type.number], [assert.type.number], [assert.type.any], [assert.type.any], [assert.type.string], [assert.type.boolean], [assert.type.boolean]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/change_detection/proto_record.map

//# sourceMappingURL=../../../angular2/src/change_detection/proto_record.js.map