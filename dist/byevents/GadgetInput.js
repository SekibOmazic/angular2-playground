System.register("byevents/GadgetInput", ["angular2/angular2", "angular2/src/core/annotations/di"], function($__export) {
  "use strict";
  var __moduleName = "byevents/GadgetInput";
  var Component,
      View,
      If,
      EventEmitter,
      GadgetInput;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      View = $__m.View;
      If = $__m.If;
    }, function($__m) {
      EventEmitter = $__m.EventEmitter;
    }],
    execute: function() {
      GadgetInput = (function() {
        function GadgetInput(addHandler) {
          this.name = '';
          this.addHandler = addHandler;
        }
        return ($traceurRuntime.createClass)(GadgetInput, {
          update: function(username) {
            this.name = username;
            console.log('update', this.name);
          },
          add: function() {
            console.log('add clicked', this.name);
            if (this.name !== undefined && this.name !== '') {
              this.addHandler('' + this.name);
            }
          }
        }, {});
      }());
      $__export("GadgetInput", GadgetInput);
      Object.defineProperty(GadgetInput, "annotations", {get: function() {
          return [new Component({selector: 'gadget-input'}), new View({
            templateUrl: "byevents/gadget_input.html",
            directives: [If]
          })];
        }});
      Object.defineProperty(GadgetInput, "parameters", {get: function() {
          return [[Function, new EventEmitter('add')]];
        }});
    }
  };
});
