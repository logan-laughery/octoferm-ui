<template>
  <md-layout md-row class="main-content">
    <md-layout md-flex>
      <router-view/>
    </md-layout>
  </md-layout>
</template>

<script>
export default {
  name: 'main-content',
};
</script>

<style>
.main-content {
  background-color: #f6f8f9;
  overflow: hidden;
  overflow-y: auto;
}

.main-content .md-layout {
  width: 100%;
}
</style>
