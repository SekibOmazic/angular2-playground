import {Component, View, If} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {Parent} from 'angular2/src/core/annotations/visibility';

import {PetList} from 'byinjection/PetList';

@Component({
  selector: 'pet-input'
})
@View({
  templateUrl: `byinjection/pet_input.html`,
  directives: [If]
})
export class PetInput {

  name: string;
  petList: PetList;

  constructor(@Parent() petList:PetList) {
    this.petList = petList;
    this.name = '';
  }

  update(input) {
    this.name = input;
  }

  add() {
    if (this.name !== undefined && this.name !== '') {
      this.petList.addItem('' + this.name);
    }
  }

}
