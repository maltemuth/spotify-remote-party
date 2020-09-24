import { User } from '../model/user';
import { create } from './store';

const userStore = create<User>();

const { get, set, has, remove } = userStore;

export { get, set, has, remove };
