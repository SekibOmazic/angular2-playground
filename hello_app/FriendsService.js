export class FriendsService {

  constructor() {
    this.friends = [{name: 'Sekib'}];
  }

  friendList() {
    return this.friends;
  }
  
  addFriend(name:string) {
    this.friends.push({name: name});
    console.log('FriendsService:', this.friends);
  }

}