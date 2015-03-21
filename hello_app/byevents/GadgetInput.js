import {Component, Template, If} from 'angular2/angular2';
import {EventEmitter} from 'angular2/src/core/annotations/di';

@Component({
  selector: 'gadget-input'
})
@Template({
  url: `hello_app/byevents/gadget_input.html`,
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
  }

  add() {
    if (this.name !== undefined && this.name !== '') {
      this.addHandler(''+this.name);
      //this.name='';
    }
  }

}
