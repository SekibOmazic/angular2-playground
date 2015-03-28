System.register("FriendsService", [], function($__export) {
  "use strict";
  var __moduleName = "FriendsService";
  var FriendsService,
      items;
  function contains(list, el) {
    return list.indexOf(el) !== -1;
  }
  function remove(list, el) {
    var index = list.indexOf(el);
    if (index > -1) {
      list.splice(index, 1);
      return true;
    }
    return false;
  }
  return {
    setters: [],
    execute: function() {
      FriendsService = $__export("FriendsService", (function() {
        var FriendsService = function FriendsService() {};
        return ($traceurRuntime.createClass)(FriendsService, {
          getAll: function() {
            return new Promise((function(resolve) {
              resolve(items);
            }));
          },
          add: function(name) {
            return new Promise((function(resolve) {
              var item = {name: name};
              items.push(item);
              resolve(item);
            }));
          },
          remove: function(item) {
            return new Promise((function(resolve) {
              if (contains(items, item)) {
                remove(items, item);
              }
              resolve(item);
            }));
          }
        }, {});
      }()));
      Object.defineProperty(FriendsService.prototype.add, "parameters", {get: function() {
          return [[$traceurRuntime.type.string]];
        }});
      items = [];
    }
  };
});
