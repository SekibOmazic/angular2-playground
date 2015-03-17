import {Component, Template, Foreach} from '../angular2/angular2';
import {EventEmitter} from '../angular2/src/core/annotations/di';

@Component({
  selector: 'greeter'
})
@Template({
  url: `hello_app/greeter.html`,
  directives: [Foreach]
})
export class Greeter {

  name:string;
  logHandler:Function;

  constructor(@EventEmitter('log') logHandler:Function) {
    this.name = '';
    this.logHandler = logHandler;
  }

  update(username) {
    this.name = username;
  }

  log() {
    if (this.name !== undefined && this.name !== '') {
      console.log('Greeter will emit ', this.name);
      this.logHandler(this.name);
      //this.name='';
    }
  }

}
