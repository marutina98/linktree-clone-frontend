<script setup lang="ts">

  import { ref, computed, useTemplateRef } from 'vue';

  import DashboardLinksEditor from './DashboardLinksEditor.vue';
  import DashboardProfileEditor from './DashboardProfileEditor.vue';

  const tabs = [
    { name: 'Profile', component: DashboardProfileEditor },
    { name: 'Links', component: DashboardLinksEditor }
  ]

  const currentTab = ref(0);

  const changeCurrentTab = (tabIndex: number) => {
    currentTab.value = tabIndex;
    makeCurrentTabActive(tabIndex);
  }

  const makeCurrentTabActive = (tabIndex: number) => {

    const tabElements = document.querySelectorAll('.tab');
    const tabElementsArray = Array.from(tabElements);

    const activeTabClass = `tab-${tabIndex}`;

    tabElementsArray.forEach((element: HTMLElement) => {

      const isActiveTab = [...element.classList].includes(activeTabClass);

      if (isActiveTab) {
        element.classList.add('active');
      } else {
        element.classList.remove('active');
      }

    });

  }

</script>

<template>

  <div class="container">

    <ul class="tabs">
      <template v-for="(tab, index) of tabs" key="index">
        <li v-if="index === currentTab" @click="changeCurrentTab(index)" :class="['tab', `tab-${index}`, 'active']">{{ tab.name }}</li>
        <li v-else="index === currentTab" @click="changeCurrentTab(index)" :class="['tab', `tab-${index}`]">{{ tab.name }}</li>
      </template>
    </ul>

    <component :is="tabs[currentTab].component"></component>

  </div>

</template>

<style scoped>

  .active {
    background-color: red;
  }

</style>