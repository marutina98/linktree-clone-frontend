<script setup lang="ts">

  import { ref, computed, useTemplateRef, onBeforeMount } from 'vue';

  import { apiService } from '@/services/api.service';

  import DashboardLinksEditor from './DashboardLinksEditor.vue';
  import DashboardProfileEditor from './DashboardProfileEditor.vue';
  
  import type { Ref } from 'vue';
  import type { IUser } from '@/interfaces/user.interface';

  const tabs = [
    { name: 'Profile', component: DashboardProfileEditor },
    { name: 'Links', component: DashboardLinksEditor }
  ]

  const currentTab = ref(0);
  const user: Ref<IUser|null> = ref(null);

  const getUser = computed(() => user.value);

  const changeCurrentTab = (tabIndex: number) => {
    currentTab.value = tabIndex;
    makeCurrentTabActive(tabIndex);
  }

  const makeCurrentTabActive = (tabIndex: number) => {

    const tabElements = document.querySelectorAll('.tab');
    const tabElementsArray = Array.from(tabElements);

    const activeTabClass = `tab-${tabIndex}`;

    tabElementsArray.forEach((element) => {
      const htmlElement = element as HTMLElement;

      const isActiveTab = Array.from(htmlElement.classList)
                          .includes(activeTabClass);

      if (isActiveTab) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }

    });

  }

  onBeforeMount(async () => {

    const request = await apiService.getAuthenticatedUser();

    if (request.ok) {
      const response = await request.json();
      user.value = response;
    }

  });

</script>

<template>

  <div class="container">

    <ul class="tabs">
      <template v-for="(tab, index) of tabs" key="index">
        <li v-if="index === currentTab" @click="changeCurrentTab(index)" :class="['tab', `tab-${index}`, 'active']">{{ tab.name }}</li>
        <li v-else="index === currentTab" @click="changeCurrentTab(index)" :class="['tab', `tab-${index}`]">{{ tab.name }}</li>
      </template>
    </ul>

    <component :user="getUser" class="component" :is="tabs[currentTab].component"></component>

  </div>

</template>

<style scoped>

  @reference 'tailwindcss';

  .container {
    @apply flex flex-col p-8 min-w-full;
  }

  .tabs {
    @apply flex flex-row gap-2;
  }

  .tab {
    @apply bg-white min-w-32 px-4 py-2 text-center;
  }

  .tab:not(.active) {
    @apply bg-gray-100 border-gray-100;
    box-shadow: inset 0px -5px 5px 0px rgba(0,0,0,0.025);
  }

  .tab.active {
    @apply bg-white border-t-4 border-t-amber-400 font-bold pointer-events-none;
  }

  .component {
    @apply bg-white;
  }

</style>