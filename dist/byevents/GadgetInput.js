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
      Component = $__m.Component;
      View = $__m.View;
      If = $__m.If;
      Observable = $__m.Observable;
      EventEmitter = $__m.EventEmitter;
    }],
    execute: function() {
      GadgetInput = (function() {
        function GadgetInput() {
          this.name = '';
          this.addItem = new EventEmitter();
        }
        return ($traceurRuntime.createClass)(GadgetInput, {
          update: function(username) {
            this.name = username;
            console.log('update', this.name);
          },
          add: function() {
            console.log('GadgetInput.add called with', this.name);
            if (this.name !== undefined && this.name !== '') {
              this.addItem.next('' + this.name);
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
    }
  };
});
