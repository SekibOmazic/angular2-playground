import {ComponentAnnotation as Component, ViewAnnotation as View, NgFor} from 'angular2/angular2';
import {List, ListWrapper} from 'angular2/src/facade/collection';

@Component({
  selector: 'gadget-list',
  hostListeners: {
    'store': 'onAddItem($event)'
  }
})
@View({
  templateUrl: `byevents/gadget_list.html`,
  directives: [NgFor]
})
export class GadgetList {

  gadgets: List;

  constructor() {
    this.gadgets = [];
  }

  onAddItem(item:string) {
    ListWrapper.push(this.gadgets, {name:item});
  }

  delete(item) {
    if (ListWrapper.contains(this.gadgets, item)) {
      ListWrapper.remove(this.gadgets, item);
    }
  }
}
