import { computed } from 'vue';
import { useRoute } from 'vue-router';

export function useRouteId() {
  const route = useRoute();

  const userId = computed<number>(() => +(route.params.userId as string));

  return userId;
}
