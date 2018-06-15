<template>
  <div id="container">
    <title-bar 
      v-bind:title="title"
      v-on:menu-click="toggleSidebar"/>
    <side-bar
      v-model="sidebarIsOpen"/>
    <md-layout md-row class="main-container">
      <fixed-side-bar/>
      <main-content/> 
    </md-layout>
    <div v-if="loading" class="spinner-container">
      <md-spinner
        :md-size="125" 
        md-indeterminate
        class="md-warn"></md-spinner>
    </div>
  </div>
</template>

<script>
import TitleBar from '@/components/Layout/TitleBar';
import SideBar from '@/components/Layout/SideBar';
import FixedSideBar from '@/components/Layout/FixedSideBar';
import MainContent from '@/components/MainContent';

export default {
  name: 'app',
  components: {
    TitleBar,
    SideBar,
    FixedSideBar,
    MainContent,
  },
  data() {
    return {
      title: 'Octoferm',
      sidebarIsOpen: false,
      showLogin: false,
      loggedIn: false,
      loading: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarIsOpen = !this.sidebarIsOpen;
    },
  },
};
</script>

<style>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);
  @import url(https://fonts.googleapis.com/css?family=Roboto:300);
  @import url(https://fonts.googleapis.com/css?family=Roboto:400,900);
  @import url(https://fonts.googleapis.com/css?family=Open+Sans:300);
  @import url(https://fonts.googleapis.com/css?family=Open+Sans:600);
  @import url(https://fonts.googleapis.com/icon?family=Material+Icons);

  @import './assets/FjallaOne.css';
  @import './assets/FjallaOne_400.css';
  @import './assets/Oswald.css';
  @import './assets/Oswald_300.css';
  @import './assets/Oswald_400_900.css';
  
  .dark-primary-color    { background: #455A64; }
  .default-primary-color { background: #607D8B; }
  .mid-primary-color     { background: #8198a3; }
  .light-primary-color   { background: #CFD8DC; }
  .text-primary-color    { color: #FFFFFF; }
  .accent-color          { background: #00BCD4; }
  .primary-text-color    { color: #212121; }
  .secondary-text-color  { color: #757575; }
  .divider-color         { border-color: #BDBDBD; }

  #container {
    height: 100%;  
  }

  .spinner-container {
    width: 100%;
    height: calc(100% - 64px);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .fixed-side-bar {
    width: 260px;
  }

  .main-container {
    width: 100%;
    height: calc(100% - 64px);
  }

  .main-content {
    width: calc(100% - 260px);
  }
</style>
