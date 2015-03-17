System.register(["angular2/test_lib", "angular2/forms"], function($__export) {
  "use strict";
  var ddescribe,
      describe,
      it,
      iit,
      xit,
      expect,
      beforeEach,
      afterEach,
      el,
      Control,
      FormBuilder,
      validations;
  function main() {
    describe("Form Builder", (function() {
      var b;
      beforeEach((function() {
        b = new FormBuilder();
      }));
      it("should create controls from a value", (function() {
        var g = b.group({"login": "some value"});
        expect(g.controls["login"].value).toEqual("some value");
      }));
      it("should create controls from an array", (function() {
        var g = b.group({
          "login": ["some value"],
          "password": ["some value", validations.required]
        });
        expect(g.controls["login"].value).toEqual("some value");
        expect(g.controls["password"].value).toEqual("some value");
        expect(g.controls["password"].validator).toEqual(validations.required);
      }));
      it("should use controls", (function() {
        var g = b.group({"login": b.control("some value", validations.required)});
        expect(g.controls["login"].value).toEqual("some value");
        expect(g.controls["login"].validator).toBe(validations.required);
      }));
      it("should create groups with optional controls", (function() {
        var g = b.group({"login": "some value"}, {"optionals": {"login": false}});
        expect(g.contains("login")).toEqual(false);
      }));
      it("should create groups with a custom validator", (function() {
        var g = b.group({"login": "some value"}, {"validator": validations.nullValidator});
        expect(g.validator).toBe(validations.nullValidator);
      }));
      it("should use default validators when no validators are provided", (function() {
        var g = b.group({"login": "some value"});
        expect(g.controls["login"].validator).toBe(validations.nullValidator);
        expect(g.validator).toBe(validations.controlGroupValidator);
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
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
      Control = $__m.Control;
      FormBuilder = $__m.FormBuilder;
      validations = $__m;
    }],
    execute: function() {
    }
  };
});

//# sourceMappingURL=angular2/test/forms/form_builder_spec.map

//# sourceMappingURL=../../../angular2/test/forms/form_builder_spec.js.map