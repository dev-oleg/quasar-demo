import type { Album } from 'src/types';
import { api } from 'boot/axios';

export function fetchAlbums(userId: number) {
  return api<Array<Album>>({
    url: `/users/${userId}/albums`,
    method: 'GET',
  });
}
