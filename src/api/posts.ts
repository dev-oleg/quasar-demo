import type { Post, PostToCreate } from 'src/types';
import { api } from 'boot/axios';

export function fetchPosts(userId: number) {
  return api<Array<Post>>({
    url: '/posts',
    method: 'GET',
    params: {
      userId,
    },
  });
}

export function createPost(post: PostToCreate) {
  return api({
    url: '/posts',
    method: 'POST',
    data: post,
  });
}

export function deletePost(id: number) {
  return api({
    url: `/posts/${id}`,
    method: 'DELETE',
  });
}
