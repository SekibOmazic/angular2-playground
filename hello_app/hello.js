import {Component, Template} from '../angular2/angular2';
import {If} from '../angular2/angular2';

import {Greeter} from './Greeter';
import {ChangeLog} from './ChangeLog';

import {FriendsService} from './FriendsService';
import {FriendFactory} from './FriendFactory';
import {FriendList} from './FriendList';

@Component({
  selector: 'hello',
  services: [FriendsService]
})
@Template({
  url: `hello_app/hello.html`,
  directives: [Greeter, ChangeLog, FriendFactory, FriendList]
})
export class Hello {

  constructor() {
  }

}