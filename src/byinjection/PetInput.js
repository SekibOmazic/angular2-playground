import {
    ComponentAnnotation as Component,
    ViewAnnotation as View,
    ParentAnnotation as Parent,
    NgIf
} from 'angular2/angular2';

import {PetList} from 'byinjection/PetList';

@Component({
  selector: 'pet-input'
})
@View({
  templateUrl: `byinjection/pet_input.html`,
  directives: [NgIf]
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
