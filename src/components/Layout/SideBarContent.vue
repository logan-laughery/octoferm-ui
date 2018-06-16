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
        <md-list-item @click="login" v-if="!loggedIn">Login</md-list-item>
        <md-list-item @click="logout" v-if="loggedIn">Logout</md-list-item>
      </md-list>
    </div>
  </div>
</template>

<script>
import accountService from '../../services/account';

export default {
  name: 'side-bar-content',
  data: () => ({
    loggedIn: false,
  }),
  mounted() {
    this.loggedIn = !!accountService.getCurrentUser();
    accountService.onAuthChange(this.userUpdated);
  },
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
    logout() {
      accountService.logout()
        .then(() => {
          this.$router.push('/login');
        });
    },
    userUpdated(user) {
      if (user) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
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
