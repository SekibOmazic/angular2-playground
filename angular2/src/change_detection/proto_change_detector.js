System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "./parser/ast", "./interfaces", "./change_detection_util", "./dynamic_change_detector", "./change_detection_jit_generator", "./pipes/pipe_registry", "./coalesce", "./proto_record"], function($__export) {
  "use strict";
  var assert,
      isPresent,
      isBlank,
      BaseException,
      Type,
      isString,
      List,
      ListWrapper,
      MapWrapper,
      StringMapWrapper,
      AccessMember,
      Assignment,
      AST,
      ASTWithSource,
      AstVisitor,
      Binary,
      Chain,
      Conditional,
      Pipe,
      FunctionCall,
      ImplicitReceiver,
      Interpolation,
      KeyedAccess,
      LiteralArray,
      LiteralMap,
      LiteralPrimitive,
      MethodCall,
      PrefixNot,
      ChangeRecord,
      ChangeDispatcher,
      ChangeDetector,
      ChangeDetectionUtil,
      DynamicChangeDetector,
      ChangeDetectorJITGenerator,
      PipeRegistry,
      coalesce,
      ProtoRecord,
      RECORD_TYPE_SELF,
      RECORD_TYPE_PROPERTY,
      RECORD_TYPE_INVOKE_METHOD,
      RECORD_TYPE_CONST,
      RECORD_TYPE_INVOKE_CLOSURE,
      RECORD_TYPE_PRIMITIVE_OP,
      RECORD_TYPE_KEYED_ACCESS,
      RECORD_TYPE_PIPE,
      RECORD_TYPE_INTERPOLATE,
      ProtoChangeDetector,
      BindingRecord,
      DynamicProtoChangeDetector,
      _jitProtoChangeDetectorClassCounter,
      JitProtoChangeDetector,
      ProtoRecordBuilder,
      _ConvertAstIntoProtoRecords;
  function _arrayFn(length) {
    assert.argumentTypes(length, assert.type.number);
    switch (length) {
      case 0:
        return assert.returnType((ChangeDetectionUtil.arrayFn0), Function);
      case 1:
        return assert.returnType((ChangeDetectionUtil.arrayFn1), Function);
      case 2:
        return assert.returnType((ChangeDetectionUtil.arrayFn2), Function);
      case 3:
        return assert.returnType((ChangeDetectionUtil.arrayFn3), Function);
      case 4:
        return assert.returnType((ChangeDetectionUtil.arrayFn4), Function);
      case 5:
        return assert.returnType((ChangeDetectionUtil.arrayFn5), Function);
      case 6:
        return assert.returnType((ChangeDetectionUtil.arrayFn6), Function);
      case 7:
        return assert.returnType((ChangeDetectionUtil.arrayFn7), Function);
      case 8:
        return assert.returnType((ChangeDetectionUtil.arrayFn8), Function);
      case 9:
        return assert.returnType((ChangeDetectionUtil.arrayFn9), Function);
      default:
        throw new BaseException("Does not support literal maps with more than 9 elements");
    }
  }
  function _mapPrimitiveName(keys) {
    var stringifiedKeys = ListWrapper.join(ListWrapper.map(keys, (function(k) {
      return isString(k) ? ("\"" + k + "\"") : ("" + k);
    })), ", ");
    return ("mapFn([" + stringifiedKeys + "])");
  }
  function _operationToPrimitiveName(operation) {
    assert.argumentTypes(operation, assert.type.string);
    switch (operation) {
      case '+':
        return assert.returnType(("operation_add"), assert.type.string);
      case '-':
        return assert.returnType(("operation_subtract"), assert.type.string);
      case '*':
        return assert.returnType(("operation_multiply"), assert.type.string);
      case '/':
        return assert.returnType(("operation_divide"), assert.type.string);
      case '%':
        return assert.returnType(("operation_remainder"), assert.type.string);
      case '==':
        return assert.returnType(("operation_equals"), assert.type.string);
      case '!=':
        return assert.returnType(("operation_not_equals"), assert.type.string);
      case '<':
        return assert.returnType(("operation_less_then"), assert.type.string);
      case '>':
        return assert.returnType(("operation_greater_then"), assert.type.string);
      case '<=':
        return assert.returnType(("operation_less_or_equals_then"), assert.type.string);
      case '>=':
        return assert.returnType(("operation_greater_or_equals_then"), assert.type.string);
      case '&&':
        return assert.returnType(("operation_logical_and"), assert.type.string);
      case '||':
        return assert.returnType(("operation_logical_or"), assert.type.string);
      default:
        throw new BaseException(("Unsupported operation " + operation));
    }
  }
  function _operationToFunction(operation) {
    assert.argumentTypes(operation, assert.type.string);
    switch (operation) {
      case '+':
        return assert.returnType((ChangeDetectionUtil.operation_add), Function);
      case '-':
        return assert.returnType((ChangeDetectionUtil.operation_subtract), Function);
      case '*':
        return assert.returnType((ChangeDetectionUtil.operation_multiply), Function);
      case '/':
        return assert.returnType((ChangeDetectionUtil.operation_divide), Function);
      case '%':
        return assert.returnType((ChangeDetectionUtil.operation_remainder), Function);
      case '==':
        return assert.returnType((ChangeDetectionUtil.operation_equals), Function);
      case '!=':
        return assert.returnType((ChangeDetectionUtil.operation_not_equals), Function);
      case '<':
        return assert.returnType((ChangeDetectionUtil.operation_less_then), Function);
      case '>':
        return assert.returnType((ChangeDetectionUtil.operation_greater_then), Function);
      case '<=':
        return assert.returnType((ChangeDetectionUtil.operation_less_or_equals_then), Function);
      case '>=':
        return assert.returnType((ChangeDetectionUtil.operation_greater_or_equals_then), Function);
      case '&&':
        return assert.returnType((ChangeDetectionUtil.operation_logical_and), Function);
      case '||':
        return assert.returnType((ChangeDetectionUtil.operation_logical_or), Function);
      default:
        throw new BaseException(("Unsupported operation " + operation));
    }
  }
  function s(v) {
    return isPresent(v) ? ("" + v) : '';
  }
  function _interpolationFn(strings) {
    var length = strings.length;
    var c0 = length > 0 ? strings[0] : null;
    var c1 = length > 1 ? strings[1] : null;
    var c2 = length > 2 ? strings[2] : null;
    var c3 = length > 3 ? strings[3] : null;
    var c4 = length > 4 ? strings[4] : null;
    var c5 = length > 5 ? strings[5] : null;
    var c6 = length > 6 ? strings[6] : null;
    var c7 = length > 7 ? strings[7] : null;
    var c8 = length > 8 ? strings[8] : null;
    var c9 = length > 9 ? strings[9] : null;
    switch (length - 1) {
      case 1:
        return (function(a1) {
          return c0 + s(a1) + c1;
        });
      case 2:
        return (function(a1, a2) {
          return c0 + s(a1) + c1 + s(a2) + c2;
        });
      case 3:
        return (function(a1, a2, a3) {
          return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3;
        });
      case 4:
        return (function(a1, a2, a3, a4) {
          return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 + s(a4) + c4;
        });
      case 5:
        return (function(a1, a2, a3, a4, a5) {
          return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 + s(a4) + c4 + s(a5) + c5;
        });
      case 6:
        return (function(a1, a2, a3, a4, a5, a6) {
          return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 + s(a4) + c4 + s(a5) + c5 + s(a6) + c6;
        });
      case 7:
        return (function(a1, a2, a3, a4, a5, a6, a7) {
          return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 + s(a4) + c4 + s(a5) + c5 + s(a6) + c6 + s(a7) + c7;
        });
      case 8:
        return (function(a1, a2, a3, a4, a5, a6, a7, a8) {
          return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 + s(a4) + c4 + s(a5) + c5 + s(a6) + c6 + s(a7) + c7 + s(a8) + c8;
        });
      case 9:
        return (function(a1, a2, a3, a4, a5, a6, a7, a8, a9) {
          return c0 + s(a1) + c1 + s(a2) + c2 + s(a3) + c3 + s(a4) + c4 + s(a5) + c5 + s(a6) + c6 + s(a7) + c7 + s(a8) + c8 + s(a9) + c9;
        });
      default:
        throw new BaseException("Does not support more than 9 expressions");
    }
  }
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
      BaseException = $__m.BaseException;
      Type = $__m.Type;
      isString = $__m.isString;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      AccessMember = $__m.AccessMember;
      Assignment = $__m.Assignment;
      AST = $__m.AST;
      ASTWithSource = $__m.ASTWithSource;
      AstVisitor = $__m.AstVisitor;
      Binary = $__m.Binary;
      Chain = $__m.Chain;
      Conditional = $__m.Conditional;
      Pipe = $__m.Pipe;
      FunctionCall = $__m.FunctionCall;
      ImplicitReceiver = $__m.ImplicitReceiver;
      Interpolation = $__m.Interpolation;
      KeyedAccess = $__m.KeyedAccess;
      LiteralArray = $__m.LiteralArray;
      LiteralMap = $__m.LiteralMap;
      LiteralPrimitive = $__m.LiteralPrimitive;
      MethodCall = $__m.MethodCall;
      PrefixNot = $__m.PrefixNot;
    }, function($__m) {
      ChangeRecord = $__m.ChangeRecord;
      ChangeDispatcher = $__m.ChangeDispatcher;
      ChangeDetector = $__m.ChangeDetector;
    }, function($__m) {
      ChangeDetectionUtil = $__m.ChangeDetectionUtil;
    }, function($__m) {
      DynamicChangeDetector = $__m.DynamicChangeDetector;
    }, function($__m) {
      ChangeDetectorJITGenerator = $__m.ChangeDetectorJITGenerator;
    }, function($__m) {
      PipeRegistry = $__m.PipeRegistry;
    }, function($__m) {
      coalesce = $__m.coalesce;
    }, function($__m) {
      ProtoRecord = $__m.ProtoRecord;
      RECORD_TYPE_SELF = $__m.RECORD_TYPE_SELF;
      RECORD_TYPE_PROPERTY = $__m.RECORD_TYPE_PROPERTY;
      RECORD_TYPE_INVOKE_METHOD = $__m.RECORD_TYPE_INVOKE_METHOD;
      RECORD_TYPE_CONST = $__m.RECORD_TYPE_CONST;
      RECORD_TYPE_INVOKE_CLOSURE = $__m.RECORD_TYPE_INVOKE_CLOSURE;
      RECORD_TYPE_PRIMITIVE_OP = $__m.RECORD_TYPE_PRIMITIVE_OP;
      RECORD_TYPE_KEYED_ACCESS = $__m.RECORD_TYPE_KEYED_ACCESS;
      RECORD_TYPE_PIPE = $__m.RECORD_TYPE_PIPE;
      RECORD_TYPE_INTERPOLATE = $__m.RECORD_TYPE_INTERPOLATE;
    }],
    execute: function() {
      ProtoChangeDetector = $__export("ProtoChangeDetector", (function() {
        var ProtoChangeDetector = function ProtoChangeDetector() {};
        return ($traceurRuntime.createClass)(ProtoChangeDetector, {
          addAst: function(ast, bindingMemento) {
            var directiveMemento = arguments[2] !== (void 0) ? arguments[2] : null;
            assert.argumentTypes(ast, AST, bindingMemento, assert.type.any, directiveMemento, assert.type.any);
          },
          instantiate: function(dispatcher, bindingRecords) {
            assert.argumentTypes(dispatcher, assert.type.any, bindingRecords, List);
            return assert.returnType((null), ChangeDetector);
          }
        }, {});
      }()));
      Object.defineProperty(ProtoChangeDetector.prototype.addAst, "parameters", {get: function() {
          return [[AST], [assert.type.any], [assert.type.any]];
        }});
      Object.defineProperty(ProtoChangeDetector.prototype.instantiate, "parameters", {get: function() {
          return [[assert.type.any], [List]];
        }});
      BindingRecord = $__export("BindingRecord", (function() {
        var BindingRecord = function BindingRecord(ast, bindingMemento, directiveMemento) {
          assert.argumentTypes(ast, AST, bindingMemento, assert.type.any, directiveMemento, assert.type.any);
          this.ast = ast;
          this.bindingMemento = bindingMemento;
          this.directiveMemento = directiveMemento;
        };
        return ($traceurRuntime.createClass)(BindingRecord, {}, {});
      }()));
      Object.defineProperty(BindingRecord, "parameters", {get: function() {
          return [[AST], [assert.type.any], [assert.type.any]];
        }});
      DynamicProtoChangeDetector = $__export("DynamicProtoChangeDetector", (function($__super) {
        var DynamicProtoChangeDetector = function DynamicProtoChangeDetector(pipeRegistry) {
          assert.argumentTypes(pipeRegistry, PipeRegistry);
          $traceurRuntime.superConstructor(DynamicProtoChangeDetector).call(this);
          this._pipeRegistry = pipeRegistry;
        };
        return ($traceurRuntime.createClass)(DynamicProtoChangeDetector, {
          instantiate: function(dispatcher, bindingRecords) {
            assert.argumentTypes(dispatcher, assert.type.any, bindingRecords, List);
            this._createRecordsIfNecessary(bindingRecords);
            return new DynamicChangeDetector(dispatcher, this._pipeRegistry, this._records);
          },
          _createRecordsIfNecessary: function(bindingRecords) {
            assert.argumentTypes(bindingRecords, List);
            if (isBlank(this._records)) {
              var recordBuilder = new ProtoRecordBuilder();
              ListWrapper.forEach(bindingRecords, (function(r) {
                recordBuilder.addAst(r.ast, r.bindingMemento, r.directiveMemento);
              }));
              this._records = coalesce(recordBuilder.records);
            }
          }
        }, {}, $__super);
      }(ProtoChangeDetector)));
      Object.defineProperty(DynamicProtoChangeDetector, "parameters", {get: function() {
          return [[PipeRegistry]];
        }});
      Object.defineProperty(DynamicProtoChangeDetector.prototype.instantiate, "parameters", {get: function() {
          return [[assert.type.any], [List]];
        }});
      Object.defineProperty(DynamicProtoChangeDetector.prototype._createRecordsIfNecessary, "parameters", {get: function() {
          return [[List]];
        }});
      _jitProtoChangeDetectorClassCounter = assert.type(0, assert.type.number);
      JitProtoChangeDetector = $__export("JitProtoChangeDetector", (function($__super) {
        var JitProtoChangeDetector = function JitProtoChangeDetector(pipeRegistry) {
          $traceurRuntime.superConstructor(JitProtoChangeDetector).call(this);
          this._pipeRegistry = pipeRegistry;
          this._factory = null;
        };
        return ($traceurRuntime.createClass)(JitProtoChangeDetector, {
          instantiate: function(dispatcher, bindingRecords) {
            assert.argumentTypes(dispatcher, assert.type.any, bindingRecords, List);
            this._createFactoryIfNecessary(bindingRecords);
            return this._factory(dispatcher, this._pipeRegistry);
          },
          _createFactoryIfNecessary: function(bindingRecords) {
            assert.argumentTypes(bindingRecords, List);
            if (isBlank(this._factory)) {
              var recordBuilder = new ProtoRecordBuilder();
              ListWrapper.forEach(bindingRecords, (function(r) {
                recordBuilder.addAst(r.ast, r.bindingMemento, r.directiveMemento);
              }));
              var c = _jitProtoChangeDetectorClassCounter++;
              var records = coalesce(recordBuilder.records);
              var typeName = ("ChangeDetector" + c);
              this._factory = new ChangeDetectorJITGenerator(typeName, records).generate();
            }
          }
        }, {}, $__super);
      }(ProtoChangeDetector)));
      Object.defineProperty(JitProtoChangeDetector.prototype.instantiate, "parameters", {get: function() {
          return [[assert.type.any], [List]];
        }});
      Object.defineProperty(JitProtoChangeDetector.prototype._createFactoryIfNecessary, "parameters", {get: function() {
          return [[List]];
        }});
      ProtoRecordBuilder = (function() {
        var ProtoRecordBuilder = function ProtoRecordBuilder() {
          this.records = [];
        };
        return ($traceurRuntime.createClass)(ProtoRecordBuilder, {addAst: function(ast, bindingMemento) {
            var directiveMemento = arguments[2] !== (void 0) ? arguments[2] : null;
            assert.argumentTypes(ast, AST, bindingMemento, assert.type.any, directiveMemento, assert.type.any);
            var last = ListWrapper.last(this.records);
            if (isPresent(last) && last.directiveMemento == directiveMemento) {
              last.lastInDirective = false;
            }
            var pr = _ConvertAstIntoProtoRecords.convert(ast, bindingMemento, directiveMemento, this.records.length);
            if (!ListWrapper.isEmpty(pr)) {
              var last = ListWrapper.last(pr);
              last.lastInBinding = true;
              last.lastInDirective = true;
              this.records = ListWrapper.concat(this.records, pr);
            }
          }}, {});
      }());
      Object.defineProperty(ProtoRecordBuilder.prototype.addAst, "parameters", {get: function() {
          return [[AST], [assert.type.any], [assert.type.any]];
        }});
      _ConvertAstIntoProtoRecords = (function() {
        var _ConvertAstIntoProtoRecords = function _ConvertAstIntoProtoRecords(bindingMemento, directiveMemento, contextIndex, expressionAsString) {
          assert.argumentTypes(bindingMemento, assert.type.any, directiveMemento, assert.type.any, contextIndex, assert.type.number, expressionAsString, assert.type.string);
          this.protoRecords = [];
          this.bindingMemento = bindingMemento;
          this.directiveMemento = directiveMemento;
          this.contextIndex = contextIndex;
          this.expressionAsString = expressionAsString;
        };
        return ($traceurRuntime.createClass)(_ConvertAstIntoProtoRecords, {
          visitImplicitReceiver: function(ast) {
            assert.argumentTypes(ast, ImplicitReceiver);
            return 0;
          },
          visitInterpolation: function(ast) {
            assert.argumentTypes(ast, Interpolation);
            var args = this._visitAll(ast.expressions);
            return this._addRecord(RECORD_TYPE_INTERPOLATE, "interpolate", _interpolationFn(ast.strings), args, ast.strings, 0);
          },
          visitLiteralPrimitive: function(ast) {
            assert.argumentTypes(ast, LiteralPrimitive);
            return this._addRecord(RECORD_TYPE_CONST, "literal", ast.value, [], null, 0);
          },
          visitAccessMember: function(ast) {
            assert.argumentTypes(ast, AccessMember);
            var receiver = ast.receiver.visit(this);
            return this._addRecord(RECORD_TYPE_PROPERTY, ast.name, ast.getter, [], null, receiver);
          },
          visitMethodCall: function(ast) {
            assert.argumentTypes(ast, MethodCall);
            var receiver = ast.receiver.visit(this);
            var args = this._visitAll(ast.args);
            return this._addRecord(RECORD_TYPE_INVOKE_METHOD, ast.name, ast.fn, args, null, receiver);
          },
          visitFunctionCall: function(ast) {
            assert.argumentTypes(ast, FunctionCall);
            var target = ast.target.visit(this);
            var args = this._visitAll(ast.args);
            return this._addRecord(RECORD_TYPE_INVOKE_CLOSURE, "closure", null, args, null, target);
          },
          visitLiteralArray: function(ast) {
            assert.argumentTypes(ast, LiteralArray);
            var primitiveName = ("arrayFn" + ast.expressions.length);
            return this._addRecord(RECORD_TYPE_PRIMITIVE_OP, primitiveName, _arrayFn(ast.expressions.length), this._visitAll(ast.expressions), null, 0);
          },
          visitLiteralMap: function(ast) {
            assert.argumentTypes(ast, LiteralMap);
            return this._addRecord(RECORD_TYPE_PRIMITIVE_OP, _mapPrimitiveName(ast.keys), ChangeDetectionUtil.mapFn(ast.keys), this._visitAll(ast.values), null, 0);
          },
          visitBinary: function(ast) {
            assert.argumentTypes(ast, Binary);
            var left = ast.left.visit(this);
            var right = ast.right.visit(this);
            return this._addRecord(RECORD_TYPE_PRIMITIVE_OP, _operationToPrimitiveName(ast.operation), _operationToFunction(ast.operation), [left, right], null, 0);
          },
          visitPrefixNot: function(ast) {
            assert.argumentTypes(ast, PrefixNot);
            var exp = ast.expression.visit(this);
            return this._addRecord(RECORD_TYPE_PRIMITIVE_OP, "operation_negate", ChangeDetectionUtil.operation_negate, [exp], null, 0);
          },
          visitConditional: function(ast) {
            assert.argumentTypes(ast, Conditional);
            var c = ast.condition.visit(this);
            var t = ast.trueExp.visit(this);
            var f = ast.falseExp.visit(this);
            return this._addRecord(RECORD_TYPE_PRIMITIVE_OP, "cond", ChangeDetectionUtil.cond, [c, t, f], null, 0);
          },
          visitPipe: function(ast) {
            assert.argumentTypes(ast, Pipe);
            var value = ast.exp.visit(this);
            return this._addRecord(RECORD_TYPE_PIPE, ast.name, ast.name, [], null, value);
          },
          visitKeyedAccess: function(ast) {
            assert.argumentTypes(ast, KeyedAccess);
            var obj = ast.obj.visit(this);
            var key = ast.key.visit(this);
            return this._addRecord(RECORD_TYPE_KEYED_ACCESS, "keyedAccess", ChangeDetectionUtil.keyedAccess, [key], null, obj);
          },
          _visitAll: function(asts) {
            assert.argumentTypes(asts, List);
            var res = ListWrapper.createFixedSize(asts.length);
            for (var i = 0; i < asts.length; ++i) {
              res[i] = asts[i].visit(this);
            }
            return res;
          },
          _addRecord: function(type, name, funcOrValue, args, fixedArgs, context) {
            var selfIndex = ++this.contextIndex;
            ListWrapper.push(this.protoRecords, new ProtoRecord(type, name, funcOrValue, args, fixedArgs, context, selfIndex, this.bindingMemento, this.directiveMemento, this.expressionAsString, false, false));
            return selfIndex;
          }
        }, {convert: function(ast, bindingMemento, directiveMemento, contextIndex) {
            assert.argumentTypes(ast, AST, bindingMemento, assert.type.any, directiveMemento, assert.type.any, contextIndex, assert.type.number);
            var c = new _ConvertAstIntoProtoRecords(bindingMemento, directiveMemento, contextIndex, ast.toString());
            ast.visit(c);
            return c.protoRecords;
          }});
      }());
      Object.defineProperty(_ConvertAstIntoProtoRecords, "parameters", {get: function() {
          return [[assert.type.any], [assert.type.any], [assert.type.number], [assert.type.string]];
        }});
      Object.defineProperty(_ConvertAstIntoProtoRecords.convert, "parameters", {get: function() {
          return [[AST], [assert.type.any], [assert.type.any], [assert.type.number]];
        }});
      Object.defineProperty(_ConvertAstIntoProtoRecords.prototype.visitImplicitReceiver, "parameters", {get: function() {
          return [[ImplicitReceiver]];
        }});
      Object.defineProperty(_ConvertAstIntoProtoRecords.prototype.visitInterpolation, "parameters", {get: function() {
          return [[Interpolation]];
        }});
      Object.defineProperty(_ConvertAstIntoProtoRecords.prototype.visitLiteralPrimitive, "parameters", {get: function() {
          return [[LiteralPrimitive]];
        }});
      Object.defineProperty(_ConvertAstIntoProtoRecords.prototype.visitAccessMember, "parameters", {get: function() {
          return [[AccessMember]];
        }});
      Object.defineProperty(_ConvertAstIntoProtoRecords.prototype.visitMethodCall, "parameters", {get: function() {
          return [[MethodCall]];
        }});
      Object.defineProperty(_ConvertAstIntoProtoRecords.prototype.visitFunctionCall, "parameters", {get: function() {
          return [[FunctionCall]];
        }});
      Object.defineProperty(_ConvertAstIntoProtoRecords.prototype.visitLiteralArray, "parameters", {get: function() {
          return [[LiteralArray]];
        }});
      Object.defineProperty(_ConvertAstIntoProtoRecords.prototype.visitLiteralMap, "parameters", {get: function() {
          return [[LiteralMap]];
        }});
      Object.defineProperty(_ConvertAstIntoProtoRecords.prototype.visitBinary, "parameters", {get: function() {
          return [[Binary]];
        }});
      Object.defineProperty(_ConvertAstIntoProtoRecords.prototype.visitPrefixNot, "parameters", {get: function() {
          return [[PrefixNot]];
        }});
      Object.defineProperty(_ConvertAstIntoProtoRecords.prototype.visitConditional, "parameters", {get: function() {
          return [[Conditional]];
        }});
      Object.defineProperty(_ConvertAstIntoProtoRecords.prototype.visitPipe, "parameters", {get: function() {
          return [[Pipe]];
        }});
      Object.defineProperty(_ConvertAstIntoProtoRecords.prototype.visitKeyedAccess, "parameters", {get: function() {
          return [[KeyedAccess]];
        }});
      Object.defineProperty(_ConvertAstIntoProtoRecords.prototype._visitAll, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(_arrayFn, "parameters", {get: function() {
          return [[assert.type.number]];
        }});
      Object.defineProperty(_mapPrimitiveName, "parameters", {get: function() {
          return [[List]];
        }});
      Object.defineProperty(_operationToPrimitiveName, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(_operationToFunction, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(_interpolationFn, "parameters", {get: function() {
          return [[List]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/change_detection/proto_change_detector.map

//# sourceMappingURL=../../../angular2/src/change_detection/proto_change_detector.js.map