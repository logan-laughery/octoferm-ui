<template>
  <md-sidenav class="md-left" ref="sidenav"
    v-on:close="closeNav">
    <side-bar-content/>
  </md-sidenav>
</template>

<script>
import SideBarContent from '@/components/Layout/SideBarContent';

export default {
  name: 'side-bar',
  props: ['value'],
  components: {
    SideBarContent,
  },
  data() {
    return {
      previouslyOpen: false,
    };
  },
  watch: {
    value(newValue, oldValue) {
      const opening = newValue && !oldValue;
      if (opening) {
        this.$refs.sidenav.open();
      } else if (!newValue && oldValue) {
        this.$refs.sidenav.close();
      }
    },
  },
  methods: {
    closeNav() {
      this.$emit('input', false);
    },
  },
};
</script>

<style>
</style>
