import {ComponentAnnotation as Component, ViewAnnotation as View, NgFor} from 'angular2/angular2';
import {InjectAnnotation as Inject} from 'angular2/di';
import {FriendsService} from 'FriendsService';

@Component({
  selector: 'friend-list'
})
@View({
  templateUrl: `byservice/friend_list.html`,
  directives: [NgFor]
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
