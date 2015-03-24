System.register(["rtts_assert/rtts_assert", "angular2/core", "angular2/forms"], function($__export) {
  "use strict";
  var assert,
      Decorator,
      ControlDirective,
      validators,
      RequiredValidatorDirective;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Decorator = $__m.Decorator;
    }, function($__m) {
      ControlDirective = $__m.ControlDirective;
      validators = $__m;
    }],
    execute: function() {
      RequiredValidatorDirective = $__export("RequiredValidatorDirective", (function() {
        var RequiredValidatorDirective = function RequiredValidatorDirective(c) {
          assert.argumentTypes(c, ControlDirective);
          c.validator = validators.compose([c.validator, validators.required]);
        };
        return ($traceurRuntime.createClass)(RequiredValidatorDirective, {}, {});
      }()));
      Object.defineProperty(RequiredValidatorDirective, "annotations", {get: function() {
          return [new Decorator({selector: '[required]'})];
        }});
      Object.defineProperty(RequiredValidatorDirective, "parameters", {get: function() {
          return [[ControlDirective]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/forms/validator_directives.map

//# sourceMappingURL=../../../angular2/src/forms/validator_directives.js.map