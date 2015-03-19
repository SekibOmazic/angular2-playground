import {Component, Template} from '../angular2/angular2';
import {Inject} from 'angular2/di';
import {FriendsService} from './FriendsService';

@Component({
  selector: 'friend-factory'
})
@Template({
  url: `hello_app/friend_factory.html`
})
export class FriendFactory {

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
