<template>
  <md-layout>
    {{currentUser}}
    <md-card>
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
        <md-button class="md-raised md-dense">
          Login 
        </md-button>
      </md-card-content>
    </md-card>
  </md-layout>
</template>

<script>
import accountService from '../../services/account';

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
    currentUser: {},
  }),
  mounted() {
    this.currentUser = accountService.getCurrentUser();
  },
  methods: {
    register() {
      accountService.register(this.email, this.password);
    },
  },
};
</script>

<style>
</style>
