import {
    ComponentAnnotation as Component,
    ViewAnnotation as View,
    NgFor
} from 'angular2/angular2';

import {List, ListWrapper} from 'angular2/src/facade/collection';


@Component({
  selector: 'pet-list'
})
@View({
  templateUrl: `byinjection/pet_list.html`,
  directives: [NgFor]
})
export class PetList {

  pets: List;

  constructor() {
    this.pets = [];
  }

  addItem(name) {
    ListWrapper.push(this.pets, {name:name});
  }

  delete(pet) {
    if (ListWrapper.contains(this.pets, pet)) {
      ListWrapper.remove(this.pets, pet);
    }
  }
}
