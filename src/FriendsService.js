// No dependencies on Angular2
export class FriendsService {

  getAll() {
    console.log('FriendsService.getAll!!!', items);
    return new Promise(resolve => {
        resolve(items);
      });
  }

  add(name:string) {
    console.log('FriendsService.add!!!', items, name);
    return new Promise(resolve => {
      var item = {name: name};
      items.push(item);
      resolve(item);
    });
  }

  remove(item){
    console.log('FriendsService.remove!!!');
    return new Promise(resolve => {
      if (contains(items, item)) {
        remove(items, item);
      }
      resolve(item);
    });
  }

}

var items = [];


function contains(list, el) {
  return list.indexOf(el) !== -1;
}

function remove(list, el) {
  var index = list.indexOf(el);
  if (index > -1) {
    list.splice(index, 1);
    return true;
  }
  return false;
}
