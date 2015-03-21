import {Component, Template, Foreach} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {FriendsService} from 'hello_app/FriendsService';

@Component({
  selector: 'friend-list'
})
@Template({
  url: `hello_app/byservice/friend_list.html`,
  directives: [Foreach]
})
export class FriendList {

  friendsService:FriendsService;

  constructor(@Inject(FriendsService)friendsService:FriendsService) {
    this.friendsService = friendsService;
    this.init();
  }

  init() {
    this.friendsService.getAll().then(
      items => { this.friends = items; }
    );
  }

  delete(item) {
    this.friendsService.remove(item);
  }

}
