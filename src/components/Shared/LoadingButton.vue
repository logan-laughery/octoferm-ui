<template>
  <md-button class="md-raised md-dense"
    v-on:click="action">
    <span v-if="!loading">{{text}}</span>
    <md-spinner :md-size="20" md-indeterminate class="md-warn loading-button-spinner" v-else></md-spinner>
  </md-button>
</template>

<script>
export default {
  name: 'loading-button',
  props: ['action', 'loading', 'text'],
};
</script>

<style scoped>
.loading-button-spinner {
  display: block;
  margin: 0 auto;
}
</style>