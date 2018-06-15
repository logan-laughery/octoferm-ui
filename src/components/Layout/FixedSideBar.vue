<template>
  <div class="fixed-side-bar md-whiteframe md-whiteframe-5dp">
    <side-bar-content/>
  </div>
</template>

<script>
import SideBarContent from '@/components/Layout/SideBarContent';

export default {
  name: 'fixed-side-bar',
  components: {
    SideBarContent,
  },
};
</script>

<style>
</style>
