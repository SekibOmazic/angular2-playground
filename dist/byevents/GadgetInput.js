System.register("byevents/GadgetInput", ["angular2/angular2"], function($__export) {
  "use strict";
  var __moduleName = "byevents/GadgetInput";
  var Component,
      View,
      If,
      Observable,
      EventEmitter,
      GadgetInput;
  return {
    setters: [function($__m) {
      Component = $__m.ComponentAnnotation;
      View = $__m.ViewAnnotation;
      If = $__m.If;
      Observable = $__m.Observable;
      EventEmitter = $__m.EventEmitter;
    }],
    execute: function() {
      GadgetInput = (function() {
        function GadgetInput() {
          this.name = '';
          this.store = new EventEmitter();
        }
        return ($traceurRuntime.createClass)(GadgetInput, {
          update: function(username) {
            this.name = username;
            console.log('update', this.name);
          },
          add: function() {
            if (this.name !== undefined && this.name !== '') {
              this.store.next('' + this.name);
            }
          }
        }, {});
      }());
      $__export("GadgetInput", GadgetInput);
      Object.defineProperty(GadgetInput, "annotations", {get: function() {
          return [new Component({
            selector: 'gadget-input',
            events: ['store']
          }), new View({
            templateUrl: "byevents/gadget_input.html",
            directives: [If]
          })];
        }});
    }
  };
});
