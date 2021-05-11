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
          >
            {{ menu.text }}
            <b-badge :variant="menu.variant" class="float-right" pill
              >{{ menu.num }}
            </b-badge>
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col md="9">
        <h1 class="page-line mb-4">Published Message</h1>
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
        <b-btn-toolbar class="mt-4">
          <b-button
            size="sm"
            variant="dark"
            @click="requeue"
            :disabled="!selectedItems.length"
          >
            <b-icon icon="arrow-repeat" aria-hidden="true"></b-icon>
            Requeue</b-button
          >
          <div class="pagination">
            <span style="font-size: 14px"> Page Size:</span>
            <b-button-group class="ml-2">
              <b-button
                variant="outline-secondary"
                size="sm"
                v-for="size in pageOptions"
                :class="{ active: perPage == size }"
                @click="pageSizeChange(size)"
                :key="size"
                >{{ size }}</b-button
              >
            </b-button-group>
          </div>
        </b-btn-toolbar>
        <b-table
          id="datatable"
          class="mt-3"
          striped
          thead-tr-class="text-left"
          tbody-tr-class="text-left"
          small
          :fields="fields"
          :items="items"
          select-mode="range"
        >
          <template #head(checkbox)="">
            <b-form-checkbox
              @change="selectAll"
              v-model="isSelectedAll"
            ></b-form-checkbox>
          </template>

          <template #cell(checkbox)="data">
            <b-form-checkbox
              v-model="data.item.selected"
              @change="select(data.item)"
            >
            </b-form-checkbox>
          </template>

          <template #cell(id)="row">
            <b-link @click="info(row.item, $event.target)">
              {{ row.item.id }}
            </b-link>
            {{ row.item.name }}
          </template>

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
          class="capPagination"
          aria-controls="datatable"
          @change="pagination()"
        ></b-pagination>
      </b-col>
    </b-row>
    <b-modal
      size="lg"
      :id="infoModal.id"
      :title="'Id: ' + infoModal.title"
      ok-only
      @hide="resetInfoModal"
    >
      <vue-json-pretty
        showSelectController
        :key="infoModal.id"
        :data="JSON.parse(infoModal.content.trim())"
      >
      </vue-json-pretty>
    </b-modal>
  </div>
</template>
<script>
import { requestFunc } from "../api/request";

export default {
  data: () => {
    return {
      active: "Succeeded",
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
      pageOptions: [10, 20, 50, 100, 500],
      selectedItems: [],
      tableValues: [],
      isSelectedAll: false,
      currentPage: 1,
      perPage: 10,
      rows: 0,
      name: "",
      content: "",
      fields: [
        { key: "checkbox", label: "" },
        { key: "id", label: "Id / Name" },
        { key: "retries", label: "Retries" },
        {
          key: "added",
          label: "Added",
          formatter: (val) => {
            return new Date(val).format("yyyy-MM-dd hh:mm:ss");
          },
        },

        {
          key: "expiresAt",
          label: "Expires",
          formatter: (val) => {
            return new Date(val).format("yyyy-MM-dd hh:mm:ss");
          },
        },
      ],
      items: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "{}",
      },
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {},

  watch: {
    currentPage: function () {
      this.fetchData();
    },
  },
  methods: {
    fetchData() {
      requestFunc(
        "get",
        "/cap/published/" +
          this.active +
          "?name=" +
          this.name +
          "&content=" +
          this.content +
          "&from=" +
          this.currentPage +
          "&count=" +
          this.perPage
      )((res) => {
        res.then((data) => {
          this.items = data.result;
          this.rows = data.count;
        });
      });

      console.log(this.items);
    },
    selectAll(checked) {
      if (checked) {
        this.selectedItems = [
          ...this.items.map((item) => {
            item.selected = true;
            return item;
          }),
        ];
        this.items = [...this.selectedItems];
      } else {
        this.selectedItems = [];
        this.items = this.items.map((item) => {
          item.selected = false;
          return item;
        });
      }
    },
    details(item) {
      alert(JSON.stringify(item));
    },
    select(item) {
      const { id } = item;
      if (!this.selectedItems.some((item) => item.id == id)) {
        this.selectedItems.push(item);
      } else {
        this.selectedItems = this.selectedItems.filter((item) => item.id != id);
      }
      this.isSelectedAll = this.selectedItems.length == this.items.length;
    },
    clearSelected() {
      this.allSelected = false;
      this.selectedItems = [];
    },
    info(item, button) {
      this.infoModal.title = item.id.toString();
      this.infoModal.content = item.content;
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    pageSizeChange: function (size) {
      this.perPage = size;
      this.fetchData();
    },

    search: function () {},
    requeue: function () {
      requestFunc(
        "post",
        "cap/published/requeue",
        this.selectedItems.map((item) => item.id)
      )(() => {
        this.items = this.items.map((item) => {
          item.selected = false;
          return item;
        });
        this.selectedItems = [];
        this.isSelectedAll = false;
      });
    },
  },
};

Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
};
</script>

<style scoped>
.page-line {
  text-align: left;
  line-height: 38px;
  padding-bottom: 9px;
  border-bottom: 1px solid #eee;
}
.pagination {
  flex: 1;
  justify-content: flex-end;
  align-items: center;
}
.capPagination::v-deep .page-link {
  color: #6c757d;
  box-shadow: none;
  border-color: #6c757d;
}

.capPagination::v-deep .page-link:hover {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}

.capPagination::v-deep .active .page-link {
  color: white;
  background-color: black;
}
</style>