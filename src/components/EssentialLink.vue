<template>
  <q-item :to="to" :disable="disabled" exact>
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import type { RouteLocationNamedRaw } from 'vue-router';

export interface EssentialLinkProps {
  title: string;
  icon?: string;
  to?: RouteLocationNamedRaw;
  disabled?: boolean;
}

defineProps<EssentialLinkProps>();
</script>
