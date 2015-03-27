System.register("hello", ["angular2/angular2", "FriendsService", "byservice/FriendInput", "byservice/FriendList", "byevents/GadgetInput", "byevents/GadgetList", "byinjection/PetList", "byinjection/PetInput"], function($__export) {
  "use strict";
  var __moduleName = "hello";
  var Component,
      Template,
      bootstrap,
      FriendsService,
      FriendInput,
      FriendList,
      GadgetInput,
      GadgetList,
      PetList,
      PetInput,
      Hello;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      Template = $__m.Template;
      bootstrap = $__m.bootstrap;
    }, function($__m) {
      FriendsService = $__m.FriendsService;
    }, function($__m) {
      FriendInput = $__m.FriendInput;
    }, function($__m) {
      FriendList = $__m.FriendList;
    }, function($__m) {
      GadgetInput = $__m.GadgetInput;
    }, function($__m) {
      GadgetList = $__m.GadgetList;
    }, function($__m) {
      PetList = $__m.PetList;
    }, function($__m) {
      PetInput = $__m.PetInput;
    }],
    execute: function() {
      Hello = (function() {
        var Hello = function Hello() {};
        return ($traceurRuntime.createClass)(Hello, {}, {});
      }());
      Object.defineProperty(Hello, "annotations", {get: function() {
          return [new Component({
            selector: 'hello',
            services: [FriendsService]
          }), new Template({
            url: "hello.html",
            directives: [GadgetInput, GadgetList, FriendInput, FriendList, PetInput, PetList]
          })];
        }});
      bootstrap(Hello);
    }
  };
});
