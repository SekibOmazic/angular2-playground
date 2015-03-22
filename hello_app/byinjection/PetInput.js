import {Component, Template, If} from 'angular2/angular2';
import {Inject} from 'angular2/di';
import {Parent} from 'angular2/src/core/annotations/visibility';

import {PetList} from 'hello_app/byinjection/PetList';

@Component({
  selector: 'pet-input',
  directives: [PetList]
})
@Template({
  url: `hello_app/byinjection/pet_input.html`,
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
      this.petList.add('' + this.name);
    }
  }

}
