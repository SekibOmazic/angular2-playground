System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/forms"], function($__export) {
  "use strict";
  var assert,
      ddescribe,
      describe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      el,
      ControlGroup,
      Control,
      required,
      compose,
      controlGroupValidator,
      nullValidator;
  function main() {
    function validator(key, error) {
      assert.argumentTypes(key, assert.type.string, error, assert.type.any);
      return function(c) {
        assert.argumentTypes(c, Control);
        var r = {};
        r[key] = error;
        return r;
      };
    }
    Object.defineProperty(validator, "parameters", {get: function() {
        return [[assert.type.string], [assert.type.any]];
      }});
    describe("Validators", (function() {
      describe("required", (function() {
        it("should error on an empty string", (function() {
          expect(required(new Control(""))).toEqual({"required": true});
        }));
        it("should error on null", (function() {
          expect(required(new Control(null))).toEqual({"required": true});
        }));
        it("should not error on a non-empty string", (function() {
          expect(required(new Control("not empty"))).toEqual(null);
        }));
      }));
      describe("compose", (function() {
        it("should collect errors from all the validators", (function() {
          var c = compose([validator("a", true), validator("b", true)]);
          expect(c(new Control(""))).toEqual({
            "a": true,
            "b": true
          });
        }));
        it("should run validators left to right", (function() {
          var c = compose([validator("a", 1), validator("a", 2)]);
          expect(c(new Control(""))).toEqual({"a": 2});
        }));
        it("should return null when no errors", (function() {
          var c = compose([nullValidator, nullValidator]);
          expect(c(new Control(""))).toEqual(null);
        }));
      }));
      describe("controlGroupValidator", (function() {
        it("should collect errors from the child controls", (function() {
          var one = new Control("one", validator("a", true));
          var two = new Control("one", validator("b", true));
          var g = new ControlGroup({
            "one": one,
            "two": two
          });
          expect(controlGroupValidator(g)).toEqual({
            "a": [one],
            "b": [two]
          });
        }));
        it("should not include controls that have no errors", (function() {
          var one = new Control("one", validator("a", true));
          var two = new Control("two");
          var g = new ControlGroup({
            "one": one,
            "two": two
          });
          expect(controlGroupValidator(g)).toEqual({"a": [one]});
        }));
        it("should return null when no errors", (function() {
          var g = new ControlGroup({"one": new Control("one")});
          expect(controlGroupValidator(g)).toEqual(null);
        }));
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      ddescribe = $__m.ddescribe;
      describe = $__m.describe;
      it = $__m.it;
      iit = $__m.iit;
      xit = $__m.xit;
      expect = $__m.expect;
      beforeEach = $__m.beforeEach;
      afterEach = $__m.afterEach;
      el = $__m.el;
    }, function($__m) {
      ControlGroup = $__m.ControlGroup;
      Control = $__m.Control;
      required = $__m.required;
      compose = $__m.compose;
      controlGroupValidator = $__m.controlGroupValidator;
      nullValidator = $__m.nullValidator;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=angular2/test/forms/validators_spec.map

//# sourceMappingURL=../../../angular2/test/forms/validators_spec.js.map