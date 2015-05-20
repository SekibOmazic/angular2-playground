System.register("byevents/GadgetList", ["angular2/angular2", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var __moduleName = "byevents/GadgetList";
  var Component,
      View,
      NgFor,
      List,
      ListWrapper,
      GadgetList;
  return {
    setters: [function($__m) {
      Component = $__m.ComponentAnnotation;
      View = $__m.ViewAnnotation;
      NgFor = $__m.NgFor;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }],
    execute: function() {
      GadgetList = (function() {
        function GadgetList() {
          this.gadgets = [];
        }
        return ($traceurRuntime.createClass)(GadgetList, {
          onAddItem: function(item) {
            ListWrapper.push(this.gadgets, {name: item});
          },
          delete: function(item) {
            if (ListWrapper.contains(this.gadgets, item)) {
              ListWrapper.remove(this.gadgets, item);
            }
          }
        }, {});
      }());
      $__export("GadgetList", GadgetList);
      Object.defineProperty(GadgetList, "annotations", {get: function() {
          return [new Component({
            selector: 'gadget-list',
            hostListeners: {'store': 'onAddItem($event)'}
          }), new View({
            templateUrl: "byevents/gadget_list.html",
            directives: [NgFor]
          })];
        }});
      Object.defineProperty(GadgetList.prototype.onAddItem, "parameters", {get: function() {
          return [[$traceurRuntime.type.string]];
        }});
    }
  };
});
