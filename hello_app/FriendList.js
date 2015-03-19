import {Component, Template, Foreach} from '../angular2/angular2';

import {FriendsService} from './FriendsService';

@Component({
  selector: 'friend-list',
  services: [FriendsService]
})
@Template({
  inline: `<ul><li *foreach="#friend in friends">{{friend.name}}</li></ul>`,
  directives: [Foreach]
})
export class FriendList {

  friendsService:FriendsService;

  constructor(friendsService:FriendsService) {
    this.friendsService = friendsService;
  }

  get friends() {
    console.log('FriendList.friends() returns', this.friendsService.friendList());
    return this.friendsService.friendList();
  }

}
