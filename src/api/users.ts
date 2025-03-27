import type { User } from 'src/types';
import { api } from 'boot/axios';

export function fetchUsers() {
  return api<Array<User>>({
    url: '/users',
    method: 'GET',
  });
}
