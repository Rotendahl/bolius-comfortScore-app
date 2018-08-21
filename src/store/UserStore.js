import { observable } from 'mobx';

class UserStore {
  @observable address = '';
  @observable currentState = {};
}

const store = window.store = new UserStore();

export default store;
