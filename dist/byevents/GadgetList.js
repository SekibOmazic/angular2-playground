System.register("byevents/GadgetList", ["angular2/angular2", "angular2/src/facade/collection"], function($__export) {
  "use strict";
  var __moduleName = "byevents/GadgetList";
  var Component,
      Template,
      For,
      List,
      ListWrapper,
      GadgetList;
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
      GadgetList = (function() {
        function GadgetList() {
          this.gadgets = [];
        }
        return ($traceurRuntime.createClass)(GadgetList, {
          addItem: function(item) {
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
          return [new Component({selector: 'gadget-list'}), new Template({
            url: "byevents/gadget_list.html",
            directives: [For]
          })];
        }});
    }
  };
});
