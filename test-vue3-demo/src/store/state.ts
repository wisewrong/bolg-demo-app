// state.ts
import { RootState } from '../types/store';
import { TodoItem } from '../types/todo-list';

const state: RootState = {
  userInfo: {
    user: '',
    password: '',
  },
  todoList: [] as Array<TodoItem>,
  todoListMap: {},
};

export default state;
