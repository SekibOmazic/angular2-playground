import {Component, Template} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {FriendsService} from 'hello_app/FriendsService';

@Component({
  selector: 'friend-input'
})
@Template({
  url: `hello_app/friend_input.html`
})
export class FriendInput {

  name:string;
  friendsService:FriendsService;

  constructor(@Inject(FriendsService)friendsService:FriendsService) {
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
