System.register("byinjection/PetList", ["angular2/angular2", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var __moduleName = "byinjection/PetList";
  var Component,
      Template,
      For,
      List,
      ListWrapper,
      PetList;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      Template = $__m.Template;
      For = $__m.For;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }],
    execute: function() {
      PetList = $__export("PetList", (function() {
        var PetList = function PetList() {
          this.pets = [];
        };
        return ($traceurRuntime.createClass)(PetList, {
          addItem: function(name) {
            ListWrapper.push(this.pets, {name: name});
          },
          delete: function(pet) {
            if (ListWrapper.contains(this.pets, pet)) {
              ListWrapper.remove(this.pets, pet);
            }
          }
        }, {});
      }()));
      Object.defineProperty(PetList, "annotations", {get: function() {
          return [new Component({selector: 'pet-list'}), new Template({
            url: "byinjection/pet_list.html",
            directives: [For]
          })];
        }});
    }
  };
});
