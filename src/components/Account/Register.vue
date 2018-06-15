<template>
  <md-layout>
    <md-card>
      <div class="md-toolbar short text-primary-color mid-primary-color">
        <h2 class="md-title">Register a new account</h2>
      </div>
      <md-card-content>
        <md-input-container class="condensed">
          <label>Email Address</label>
          <md-input v-model="email"/>
        </md-input-container>
        <md-input-container class="condensed">
          <label>Password</label>
          <md-input type="password" v-model="password"/>
        </md-input-container>
        <md-button class="md-raised md-dense"
          v-on:click="register">
          Register 
        </md-button>
      </md-card-content>
    </md-card>
  </md-layout>
</template>

<script>
import accountService from '../../services/account';

export default {
  name: 'register',
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    register() {
      accountService.register(this.email, this.password);
    },
  },
};
</script>

<style>
</style>
