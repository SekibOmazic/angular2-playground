import {Component, View, For} from 'angular2/angular2';
import {List, ListWrapper} from 'angular2/src/facade/collection';

@Component({
  selector: 'gadget-list'
})
@View({
  templateUrl: `byevents/gadget_list.html`,
  directives: [For]
})
export class GadgetList {

  gadgets: List;

  constructor() {
    this.gadgets = [];
  }

  addItem(item) {
    ListWrapper.push(this.gadgets, {name:item});
  }

  delete(item) {
    if (ListWrapper.contains(this.gadgets, item)) {
      ListWrapper.remove(this.gadgets, item);
    }
  }
}
