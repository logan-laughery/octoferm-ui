<template>
  <md-layout class="login-container">
    {{currentUser}}
    <md-card class="login">
      <div class="md-toolbar short text-primary-color mid-primary-color">
        <h2 class="md-title">Log in to get started!</h2>
      </div>
      <md-card-content>
        <md-input-container class="condensed">
          <label>Username</label>
          <md-input v-model="email"/>
        </md-input-container>
        <md-input-container class="condensed">
          <label>Password</label>
          <md-input type="password" v-model="password"/>
        </md-input-container>
        <loading-button text="Login" :loading="loading" :action="login"/>
      </md-card-content>
    </md-card>
    <md-snackbar md-position="bottom right" ref="snackbar">
      <span>{{error}}</span>
      <md-button class="md-warn" @click="$refs.snackbar.close()">OK</md-button>
    </md-snackbar>
  </md-layout>
</template>

<script>
import LoadingButton from '../Shared/LoadingButton';
import accountService from '../../services/account';

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
    currentUser: {},
    error: '',
    loading: false,
  }),
  components: {
    LoadingButton,
  },
  mounted() {
    this.currentUser = accountService.getCurrentUser();
  },
  methods: {
    login() {
      this.loading = true;

      accountService.login(this.email, this.password)
        .then(() => this.$router.push('/'))
        .catch((error) => {
          this.loading = false;
          this.error = error.message;
          this.$refs.snackbar.open();
        });
    },
  },
};
</script>

<style>
.login {
  height: fit-content;
  width: 100%;
  max-width: 300px;
}

.login-container {
  align-items: center;
  justify-content: center;
}
</style>
