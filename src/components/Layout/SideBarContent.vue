<template>
  <div>
    <div class="md-toolbar text-primary-color md-large mid-primary-color">
      <img class="logo logo-img md-whiteframe-2dp" src="../../assets/orange_hand.svg">
      <div class="md-toolbar-container">
        <h3 class="logo-title md-title">Octoferm</h3>
      </div>
    </div>

    <div>
      <md-list>
        <md-list-item @click="devices">Devices</md-list-item>
        <md-list-item @click="newDevice">New</md-list-item>
        <md-divider></md-divider>
        <md-list-item @click="login">Login</md-list-item>
      </md-list>
    </div>
  </div>
</template>

<script>
export default {
  name: 'side-bar-content',
  methods: {
    devices() {
      this.$router.push('/');
    },
    newDevice() {
      this.$router.push('/new');
    },
    login() {
      this.$router.push('/login');
    },
  },
};
</script>

<style>
.logo-img {
  border-radius: 12px;
  width: 125px;
  margin: 0 auto;
  margin-top: 20px;
}
.logo-title.md-title {
  margin: 0 auto !important;
}
#message {
  font-style: italic;
  margin-left: 16px;
  margin-right: 16px;
}
</style>
