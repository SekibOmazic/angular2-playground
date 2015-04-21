import {Component, View, If, Observable, EventEmitter} from 'angular2/angular2';

@Component({
  selector: 'gadget-input'
  //events: ['add-item']
})
@View({
  templateUrl: `byevents/gadget_input.html`,
  directives: [If]
})
export class GadgetInput {

  name:string;
  addItem: EventEmitter;

  constructor() {
    this.name = '';
    this.addItem = new EventEmitter();
  }

  update(username) {
    this.name = username;
    console.log('update', this.name);
  }

  add() {
    console.log('GadgetInput.add called with', this.name);
    if (this.name !== undefined && this.name !== '') {

      this.addItem.next(''+this.name);
    }
  }

}
