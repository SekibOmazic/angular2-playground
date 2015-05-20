import {
    ComponentAnnotation as Component,
    ViewAnnotation as View,
    bootstrap
} from 'angular2/angular2';


import {FriendsService} from 'FriendsService';

import {FriendInput} from 'byservice/FriendInput';
import {FriendList} from 'byservice/FriendList';

import {GadgetInput} from 'byevents/GadgetInput';
import {GadgetList} from 'byevents/GadgetList';

import {PetList} from 'byinjection/PetList';
import {PetInput} from 'byinjection/PetInput';


@Component({
  selector: 'hello',
  appInjector: [FriendsService]
})
@View({
  templateUrl: `hello.html`,
  directives: [GadgetInput, GadgetList, FriendInput, FriendList, PetInput, PetList]
})
class Hello {

  constructor() {
  }

}


bootstrap(Hello);
