import type { Todo, TodoToCreate } from 'src/types';
import { api } from 'boot/axios';

export function fetchTodos(userId: number) {
  return api<Array<Todo>>({
    url: `/users/${userId}/todos`,
    method: 'GET',
  });
}

export function createTodo(todo: TodoToCreate) {
  return api({
    url: '/todos',
    method: 'POST',
    data: todo,
  });
}
