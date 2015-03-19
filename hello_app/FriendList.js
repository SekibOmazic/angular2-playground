import {Component, Template, Foreach} from '../angular2/angular2';
import {Inject} from 'angular2/di';
import {FriendsService} from './FriendsService';

@Component({
  selector: 'friend-list'
})
@Template({
  inline: `<ul><li *foreach="#friend in friends">{{friend.name}}</li></ul>`,
  directives: [Foreach]
})
export class FriendList {

  friendsService:FriendsService;

  constructor(@Inject(FriendsService)friendsService:FriendsService) {
    this.friendsService = friendsService;
  }

  get friends() {
    console.log('FriendList.friends() returns', this.friendsService.friendList());
    return this.friendsService.friendList();
  }

}
