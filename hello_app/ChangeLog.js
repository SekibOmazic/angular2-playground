import {Component, Template, Foreach} from '../angular2/angular2';

import {Greeter} from './Greeter';

@Component({
  selector: 'change-log'
})
@Template({
  inline: `<ul (log)="pushLog($event)"><li *foreach="#log in logs">{{log.msg}}</li></ul>`,
  directives: [Foreach, Greeter]
})
export class ChangeLog {

  constructor() {
    this.logs = [];
  }

  pushLog(logEntry) {
  	console.log('pushLog', logEntry);
    this.logs.push({msg:logEntry});
  }

}
