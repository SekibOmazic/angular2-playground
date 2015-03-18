export class FriendsService {

  constructor() {
    this.friends = [{name: 'Sekib'}];
  }

  friendList() {
    return this.friends;
  }
  
  addFriend(name:string) {
    console.log('Service gets', name);
    this.friends.push({name: name});
  }

}