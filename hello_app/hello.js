import {Component, Template} from '../angular2/angular2';
import {If} from '../angular2/angular2';

import {Greeter} from './Greeter';
import {ChangeLog} from './ChangeLog';


@Component({
  selector: 'hello'
})
@Template({
  url: `hello_app/hello.html`,
  directives: [Greeter, ChangeLog]
})
export class Hello {

  constructor() {
  }

}