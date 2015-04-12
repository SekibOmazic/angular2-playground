System.register("byinjection/PetInput", ["angular2/angular2", "angular2/di", "angular2/src/core/annotations/visibility", "byinjection/PetList"], function($__export) {
  "use strict";
  var __moduleName = "byinjection/PetInput";
  var Component,
      Template,
      If,
      Inject,
      Parent,
      PetList,
      PetInput;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      Template = $__m.Template;
      If = $__m.If;
    }, function($__m) {
      Inject = $__m.Inject;
    }, function($__m) {
      Parent = $__m.Parent;
    }, function($__m) {
      PetList = $__m.PetList;
    }],
    execute: function() {
      PetInput = (function() {
        function PetInput(petList) {
          this.petList = petList;
          this.name = '';
        }
        return ($traceurRuntime.createClass)(PetInput, {
          update: function(input) {
            this.name = input;
          },
          add: function() {
            if (this.name !== undefined && this.name !== '') {
              this.petList.addItem('' + this.name);
            }
          }
        }, {});
      }());
      $__export("PetInput", PetInput);
      Object.defineProperty(PetInput, "annotations", {get: function() {
          return [new Component({selector: 'pet-input'}), new Template({
            url: "byinjection/pet_input.html",
            directives: [If]
          })];
        }});
      Object.defineProperty(PetInput, "parameters", {get: function() {
          return [[PetList, new Parent()]];
        }});
    }
  };
});
