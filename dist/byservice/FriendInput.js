System.register("byservice/FriendInput", ["angular2/angular2", "angular2/di", "FriendsService"], function($__export) {
  "use strict";
  var __moduleName = "byservice/FriendInput";
  var Component,
      Template,
      If,
      Inject,
      FriendsService,
      FriendInput;
  return {
    setters: [function($__m) {
      Component = $__m.Component;
      Template = $__m.Template;
      If = $__m.If;
    }, function($__m) {
      Inject = $__m.Inject;
    }, function($__m) {
      FriendsService = $__m.FriendsService;
    }],
    execute: function() {
      FriendInput = $__export("FriendInput", (function() {
        var FriendInput = function FriendInput(friendsService) {
          this.friendsService = friendsService;
          this.name = '';
        };
        return ($traceurRuntime.createClass)(FriendInput, {
          update: function(friend) {
            this.name = friend;
          },
          add: function() {
            if (this.name !== undefined && this.name !== '') {
              this.friendsService.add('' + this.name);
            }
          }
        }, {});
      }()));
      Object.defineProperty(FriendInput, "annotations", {get: function() {
          return [new Component({selector: 'friend-input'}), new Template({
            url: "byservice/friend_input.html",
            directives: [If]
          })];
        }});
      Object.defineProperty(FriendInput, "parameters", {get: function() {
          return [[FriendsService, new Inject(FriendsService)]];
        }});
    }
  };
});
