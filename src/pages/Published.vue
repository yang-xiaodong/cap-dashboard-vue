<template>
  <div>
    <b-row>
      <b-col md="3">
        <b-list-group>
          <b-list-group-item
            v-for="menu of subMens"
            :key="menu.text"
            class="text-left"
            action
            variant="secondary"
            :active="active == menu.text"
            @click="test(menu)"
          >
            {{ menu.text }}
            <b-badge :variant="menu.variant" class="float-right" pill
              >{{ menu.num }}
            </b-badge>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col md="9">
        <h1 class="page-line">Published Message</h1>
        <b-form inline>
          <label class="sr-only" for="inline-form-input-name">Name</label>
          <b-form-input
            id="inline-form-input-name"
            class="mb-2 mr-sm-2 col-3 mb-sm-0"
            placeholder="Name"
          />

          <label class="sr-only" for="inline-form-input-content">Content</label>
          <b-form-input
            id="inline-form-input-content"
            class="mb-2 mr-sm-2 col-7 mb-sm-0"
            placeholder="Content"
          />
          <b-button variant="dark">
            <b-icon icon="search"></b-icon>
            Search</b-button
          >
        </b-form>
        <b-btn-toolbar class="mt-2">
          <b-button size="sm" variant="dark" disabled>
            <b-icon icon="arrow-repeat" aria-hidden="true"></b-icon>
            Requeue</b-button
          >
          <div class="pagination">
            <span style="font-size: 14px"> Page Size:</span>
            <b-button-group class="ml-2">
              <b-btn
                variant="outline-secondary"
                size="sm"
                v-for="size in pageSize"
                @click="pageSizeChange(size)"
                :key="size"
                >{{ size }}</b-btn
              >
            </b-button-group>
          </div>
        </b-btn-toolbar>
        <b-table id="datatable" class="mt-3" striped :items="items">
          <template #table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>Loading...</strong>
            </div>
          </template>
        </b-table>
        <span class="float-left"> Total: {{ rows }} </span>
        <b-pagination
          first-text="First"
          prev-text="Prev"
          next-text="Next"
          last-text="Last"
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="datatable"
        ></b-pagination>
      </b-col>
    </b-row>
  </div>
</template>
<script>
export default {
  data: () => {
    return {
      active: "Succeeded",
      dataList: [],
      subMens: [
        {
          variant: "secondary",
          text: "Succeeded",
          num: 11,
        },
        {
          variant: "danger",
          text: "Failed",
          num: 1,
        },
      ],
      pageSize: [10, 20, 50, 100, 500],
      currentPage: 1,
      perPage: 20,
      rows: 502,
      rquestParams: {
        pageIndex: 1,
        pageSize: 10,
      },

      items: [
        { age: 40, first_name: "Dickerson", last_name: "Macdonald" },
        { age: 21, first_name: "Larsen", last_name: "Shaw" },
        { age: 89, first_name: "Geneva", last_name: "Wilson" },
        { age: 38, first_name: "Jami", last_name: "Carney" },
      ],
    };
  },
  methods: {
    test: function (menu) {
      this.active = menu.text;
    },
    pageSizeChange: function (size) {
      this.rquestParams.pageSize = size;
      this.fetch();
    },

    fetch: function () {
      // url(this.params).then((res) => {
      //   this.dataList = res.data;
      // });
    },
  },
};
</script>

<style scoped>
.page-line {
  text-align: left;
  padding-bottom: 9px;
  border-bottom: 1px solid #eee;
}
.pagination {
  flex: 1;
  justify-content: flex-end;
  align-items: center;
}
</style>