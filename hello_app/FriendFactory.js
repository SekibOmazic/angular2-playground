import {Component, Template} from '../angular2/angular2';
import {FriendsService} from './FriendsService';

@Component({
  selector: 'friend-factory',
  services: [FriendsService]
})
@Template({
  url: `hello_app/friend_factory.html`
})
export class FriendFactory {

  name:string;
  friendsService:FriendsService;

  constructor(friendsService:FriendsService) {
    this.friendsService = friendsService;
    this.name = '';
  }

  update(friend) {
    this.name = friend;
  }

  add() {
    if (this.name !== undefined && this.name !== '') {
      // need to copy this.name?
      this.friendsService.addFriend('' + this.name);
      //this.name='';
    }
  }

}
