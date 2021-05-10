<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="secondary" >
      <b-container>
        <b-navbar-brand to="/">{{ brandTitle }}</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"> </b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item
              active-class="active"
              v-bind:to="route.path"
              :key="route.name"
              v-for="route in routes"
            >
              {{ route.name }}
            </b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </div>
</template>
<script>
export default {
  name: "Navigation",
  data() {
    return {
      brandTitle: "CAP Dashbaord",
      routes: [
        { name: "Published", path: "/published/succeeded" },
        { name: "Received", path: "/received/succeeded" },
        { name: "Subscriber", path: "/subscriber" },
        { name: "Nodes", path: "/nodes" },
      ],
    };
  },
};
</script>
<style scoped>
.nav-item {
  padding: 0 10px;
}
</style>