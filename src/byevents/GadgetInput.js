import {Component, View, If} from 'angular2/angular2';
import {EventEmitter} from 'angular2/src/core/annotations/di';

@Component({
  selector: 'gadget-input'
})
@View({
  templateUrl: `byevents/gadget_input.html`,
  directives: [If]
})
export class GadgetInput {

  name:string;
  addHandler:Function;

  constructor(@EventEmitter('add') addHandler:Function) {
    this.name = '';
    this.addHandler = addHandler;
  }

  update(username) {

    this.name = username;
  console.log('update', this.name);
  }

  add() {
    console.log('add clicked', this.name);
    if (this.name !== undefined && this.name !== '') {
      this.addHandler(''+this.name);
      //this.name='';
    }
  }

}
