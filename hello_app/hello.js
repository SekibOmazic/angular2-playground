import {Component, Template, If} from 'angular2/angular2';

import {Greeter} from 'hello_app/Greeter';
import {ChangeLog} from 'hello_app/ChangeLog';

import {FriendsService} from 'hello_app/FriendsService';
import {FriendInput} from 'hello_app/FriendInput';
import {FriendList} from 'hello_app/FriendList';

@Component({
  selector: 'hello',
  services: [FriendsService]
})
@Template({
  url: `hello_app/hello.html`,
  directives: [Greeter, ChangeLog, FriendInput, FriendList]
})
export class Hello {

  constructor() {
  }

}
