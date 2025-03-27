import type { Photo } from 'src/types';
import { api } from 'boot/axios';

export function fetchPhotos(albumId: number) {
  return api<Array<Photo>>({
    url: `/albums/${albumId}/photos`,
    method: 'GET',
  });
}
