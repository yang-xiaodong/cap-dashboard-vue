<template>
  <div>
    <Navigation />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script>
import Navigation from "../components/Navigation.vue";
export default {
  name: "Layout",
  components: {
    Navigation,
  },
};
</script>