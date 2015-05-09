import {ComponentAnnotation as Component, ViewAnnotation as View, If} from 'angular2/angular2';
import {InjectAnnotation as Inject} from 'angular2/di';
import {FriendsService} from 'FriendsService';

@Component({
  selector: 'friend-input'
})
@View({
  templateUrl: `byservice/friend_input.html`,
  directives: [If]
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
      this.friendsService.add('' + this.name);
    }
  }

}
