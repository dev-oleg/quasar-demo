import type { Comment } from 'src/types';
import { api } from 'boot/axios';

export function fetchComments(postId: number) {
  return api<Array<Comment>>({
    url: `/posts/${postId}/comments`,
    method: 'GET',
  });
}
