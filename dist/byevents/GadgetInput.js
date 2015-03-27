System.register("byevents/GadgetInput", ["angular2/angular2", "angular2/src/core/annotations/di"], function($__export) {
  "use strict";
  var __moduleName = "byevents/GadgetInput";
  var Component,
      Template,
      If,
      EventEmitter,
      GadgetInput;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      Template = $__m.Template;
      If = $__m.If;
    }, function($__m) {
      EventEmitter = $__m.EventEmitter;
    }],
    execute: function() {
      GadgetInput = $__export("GadgetInput", (function() {
        var GadgetInput = function GadgetInput(addHandler) {
          this.name = '';
          this.addHandler = addHandler;
        };
        return ($traceurRuntime.createClass)(GadgetInput, {
          update: function(username) {
            this.name = username;
          },
          add: function() {
            if (this.name !== undefined && this.name !== '') {
              this.addHandler('' + this.name);
            }
          }
        }, {});
      }()));
      Object.defineProperty(GadgetInput, "annotations", {get: function() {
          return [new Component({selector: 'gadget-input'}), new Template({
            url: "byevents/gadget_input.html",
            directives: [If]
          })];
        }});
      Object.defineProperty(GadgetInput, "parameters", {get: function() {
          return [[Function, new EventEmitter('add')]];
        }});
    }
  };
});
