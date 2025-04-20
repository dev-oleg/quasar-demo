<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>{{ pageTitle }}</q-toolbar-title>

        <div class="q-mr-md">
          <span class="q-mr-xs">{{ $t('users.currentUser.title') }}:</span>

          <span class="text-weight-bold">
            {{ currentUser?.username ?? $t('users.currentUser.notSelected') }}
          </span>
        </div>

        <div>
          <q-select
            v-model="locale"
            :options="localeOptions"
            label="Quasar Language"
            dense
            outlined
            emit-value
            map-options
            options-dense
            class="lang-switch"
            style="min-width: 150px"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer :model-value="true" show-if-above bordered :mini="isDrawerMini">
      <q-list>
        <q-item>
          <q-item-section avatar>
            <q-btn flat dense round icon="menu" class="drawer-btn" @click="toggleDrawerMini" />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-body1">{{ $t('navigation') }}</q-item-label>
          </q-item-section>
        </q-item>

        <EssentialLink v-for="link in linksList" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { storeToRefs } from 'pinia';
import { LocalStorage } from 'quasar';
import EssentialLink, { type EssentialLinkProps } from 'components/EssentialLink.vue';
import { useRouteId } from 'src/composables';
import { useUsersStore } from 'stores/usersStore';

const localeOptions = [
  { value: 'en-US', label: 'English' },
  { value: 'ru', label: 'Русский' },
];

const route = useRoute();

const { locale, t } = useI18n({ useScope: 'global' });

const userId = useRouteId();

const usersStore = useUsersStore();
const { currentUser } = storeToRefs(usersStore);

const isDrawerMini = ref(false);

const pageTitle = computed<string>(() => {
  const page = route.meta.title as string;

  return t(`page.${page}`);
});

const linksList = computed<Array<EssentialLinkProps>>(() => [
  {
    title: t('page.users'),
    icon: 'person',
    to: { name: 'users' },
    active: route.meta.title === 'users',
  },
  {
    title: t('page.posts'),
    icon: 'description',
    to: { name: 'posts', params: { userId: userId.value } },
    disabled: !userId.value,
    active: route.meta.title === 'posts',
  },
  {
    title: t('page.albums'),
    icon: 'photo_library',
    to: { name: 'albums', params: { userId: userId.value } },
    disabled: !userId.value,
    active: route.meta.title === 'albums',
  },
  {
    title: t('page.todos'),
    icon: 'list_alt',
    to: { name: 'todos', params: { userId: userId.value } },
    disabled: !userId.value,
    active: route.meta.title === 'todos',
  },
]);

function toggleDrawerMini() {
  isDrawerMini.value = !isDrawerMini.value;
}

watch(locale, () => {
  LocalStorage.setItem('jsonPlaceholderLang', locale.value);
});

onMounted(async () => {
  const lang = LocalStorage.getItem('jsonPlaceholderLang');

  if (lang) locale.value = lang as string;

  await usersStore.getUsers();
});
</script>

<style scoped lang="scss">
.lang-switch {
  min-width: 150px;
  background-color: #fff;
}

.drawer-btn {
  position: absolute;
  top: 8px;
  left: 12px;
}
</style>
