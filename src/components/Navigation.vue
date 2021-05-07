<template>
  <div>
    <b-navbar toggleable="lg" fixed="top" type="dark" variant="info">
      <div class="container">
        <b-navbar-brand href="./">CAP Dashbaord</b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item href="#" active>发布的 <InlineMetric /> </b-nav-item>
            <b-nav-item router-tag="/helloworld">接收的</b-nav-item>
            <b-nav-item href="#">订阅列表</b-nav-item>
            <b-nav-item href="#">服务器</b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>User</em>
              </template>
              <b-dropdown-item href="#">Profile</b-dropdown-item>
              <b-dropdown-item href="#">Sign Out</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </div>
    </b-navbar>
  </div>
</template>
<script>
import InlineMetric from "../components/InlineMetric.vue";
export default {
  name: "Navigation",
  components: {
    InlineMetric,
  },
};
</script>
<style>
.nav-item {
  padding: 0 10px;
}
</style>