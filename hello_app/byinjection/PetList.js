import {Component, Template, Foreach} from 'angular2/angular2';
import {List, ListWrapper} from 'angular2/src/facade/collection';


@Component({
  selector: 'pet-list'
})
@Template({
  url: `hello_app/byinjection/pet_list.html`,
  directives: [Foreach]
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
