import {Component, Template, Foreach} from 'angular2/angular2';
import {FriendsService} from 'hello_app/FriendsService';

@Component({
  selector: 'friends',
  services: [FriendsService]
})
@Template({
  url: `hello_app/friends.html`
})
export class Friends {
  friendsService:FriendsService;

  constructor(friendsService:FriendsService) {
    this.friendsService = friendsService;
  }

}
