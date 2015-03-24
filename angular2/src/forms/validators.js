System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "./model"], function($__export) {
  "use strict";
  var assert,
      isBlank,
      isPresent,
      List,
      ListWrapper,
      StringMapWrapper,
      modelModule;
  function required(c) {
    assert.argumentTypes(c, modelModule.Control);
    return isBlank(c.value) || c.value == "" ? {"required": true} : null;
  }
  function nullValidator(c) {
    assert.argumentTypes(c, modelModule.Control);
    return null;
  }
  function compose(validators) {
    assert.argumentTypes(validators, assert.genericType(List, Function));
    return assert.returnType((function(c) {
      assert.argumentTypes(c, modelModule.Control);
      var res = ListWrapper.reduce(validators, (function(res, validator) {
        var errors = validator(c);
        return isPresent(errors) ? StringMapWrapper.merge(res, errors) : res;
      }), {});
      return StringMapWrapper.isEmpty(res) ? null : res;
    }), Function);
  }
  function controlGroupValidator(c) {
    assert.argumentTypes(c, modelModule.ControlGroup);
    var res = {};
    StringMapWrapper.forEach(c.controls, (function(control, name) {
      if (c.contains(name) && isPresent(control.errors)) {
        StringMapWrapper.forEach(control.errors, (function(value, error) {
          if (!StringMapWrapper.contains(res, error)) {
            res[error] = [];
          }
          ListWrapper.push(res[error], control);
        }));
      }
    }));
    return StringMapWrapper.isEmpty(res) ? null : res;
  }
  $__export("required", required);
  $__export("nullValidator", nullValidator);
  $__export("compose", compose);
  $__export("controlGroupValidator", controlGroupValidator);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      modelModule = $__m;
    }],
    execute: function() {
      Object.defineProperty(required, "parameters", {get: function() {
          return [[modelModule.Control]];
        }});
      Object.defineProperty(nullValidator, "parameters", {get: function() {
          return [[modelModule.Control]];
        }});
      Object.defineProperty(compose, "parameters", {get: function() {
          return [[assert.genericType(List, Function)]];
        }});
      Object.defineProperty(controlGroupValidator, "parameters", {get: function() {
          return [[modelModule.ControlGroup]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/forms/validators.map

//# sourceMappingURL=../../../angular2/src/forms/validators.js.map