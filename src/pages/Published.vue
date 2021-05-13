<template>
  <div>
    <b-row>
      <b-col md="3">
        <b-list-group>
          <router-link class="list-group-item text-left list-group-item-secondary list-group-item-action" v-for="menu of subMens" :key="menu.text" active-class="active" :to="menu.name">
            {{ menu.text }}
            <b-badge :variant="menu.variant" class="float-right" pill>{{ menu.num }}
            </b-badge>
          </router-link>
        </b-list-group>
      </b-col>
      <b-col md="9">
        <h1 class="page-line mb-4">Published Message</h1>
        <b-form inline>
          <label class="sr-only" for="inline-form-input-name">Name</label>
          <b-form-input v-model="formData.name" id="inline-form-input-name" class="mb-2 mr-sm-2 col-3 mb-sm-0" placeholder="Name" />

          <label class="sr-only" for="inline-form-input-content">Content</label>
          <b-form-input v-model="formData.content" id="inline-form-input-content" class="mb-2 mr-sm-2 col-7 mb-sm-0" placeholder="Content" />
          <b-button variant="dark" @click="onSearch">
            <b-icon icon="search"></b-icon>
            Search
          </b-button>
        </b-form>
        <b-btn-toolbar class="mt-4">
          <b-button size="sm" variant="dark" @click="requeue" :disabled="!selectedItems.length">
            <b-icon icon="arrow-repeat" aria-hidden="true"></b-icon>
            Requeue
          </b-button>
          <div class="pagination">
            <span style="font-size: 14px"> Page Size:</span>
            <b-button-group class="ml-2">
              <b-button variant="outline-secondary" size="sm" v-for="size in pageOptions" :class="{ active: formData.perPage == size }" @click="pageSizeChange(size)" :key="size">{{ size }}</b-button>
            </b-button-group>
          </div>
        </b-btn-toolbar>
        <b-table id="datatable" class="mt-3" striped thead-tr-class="text-left" tbody-tr-class="text-left" small :fields="fields" :items="items" select-mode="range">
          <template #head(checkbox)="">
            <b-form-checkbox @change="selectAll" v-model="isSelectedAll"></b-form-checkbox>
          </template>

          <template #cell(checkbox)="data">
            <b-form-checkbox v-model="data.item.selected" @change="select(data.item)">
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
        <span class="float-left"> Total: {{ totals }} </span>
        <b-pagination first-text="First" prev-text="Prev" next-text="Next" last-text="Last" v-model="formData.currentPage" :total-rows="totals" :per-page="formData.perPage" class="capPagination" aria-controls="datatable"></b-pagination>
      </b-col>
    </b-row>
    <b-modal size="lg" :id="infoModal.id" :title="'Id: ' + infoModal.title" ok-only>
      <vue-json-pretty showSelectController :key="infoModal.id" :data="JSON.parse(infoModal.content.trim())">
      </vue-json-pretty>
    </b-modal>
  </div>
</template>
<script>
import { requestFunc } from "../api/request";

const formDataTpl = {
  currentPage: 1,
  perPage: 10,
  name: "",
  content: "",
};
export default {
  props: {
    status: {
      type: String,
      default: "succeeded",
    },
  },
  data: () => {
    return {
      subMens: [
        {
          variant: "secondary",
          text: "Succeeded",
          name: "/published/succeeded",
          num: 11,
        },
        {
          variant: "danger",
          text: "Failed",
          name: "/published/failed",
          num: 1,
        },
      ],
      pageOptions: [10, 20, 50, 100, 500],
      selectedItems: [],
      tableValues: [],
      isSelectedAll: false,
      formData: { ...formDataTpl },
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
      totals: 0,
      items: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "{}",
      },
    };
  },
  mounted() {
    console.log(this.$route);
    this.fetchData();
    console.log(this.status);
  },
  computed: {},

  watch: {
    status: function () {
      this.fetchData();
    },
    "formData.currentPage": function () {
      this.fetchData();
    },
  },
  methods: {
    switchData() {
      this.fetchData().then(() => {
        this.clear();
        this.formData = { ...formDataTpl };
      });
    },
    fetchData() {
      return requestFunc("get", `/cap/published/${this.status}`, {
        params: { ...this.formData },
      })((res) => {
        res.then((data) => {
          this.items = data.items;
          this.totals = data.totals;
        });
      });
    },
    selectAll(checked) {
      if (checked) {
        this.selectedItems = [
          ...this.items.map((item) => {
            return {
              ...item,
              selected: true,
            };
          }),
        ];
        this.items = [...this.selectedItems];
      } else {
        this.selectedItems = [];
        this.items = this.items.map((item) => {
          return {
            ...item,
            selected: false,
          };
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
      this.formData.perPage = size;
      this.fetchData();
    },
    onSearch: function () {
      this.fetchData();
    },
    requeue: function () {
      const _this = this;
      requestFunc(
        "post",
        "cap/published/requeue",
        this.selectedItems.map((item) => item.id)
      )(function () {
        _this.clear();
        _this.$bvToast.toast(`Requeue successsful!`, {
          title: "Tips",
          autoHideDelay: 500,
          appendToast: false,
        });
      });
    },
    clear() {
      this.items = this.items.map((item) => {
        return {
          ...item,
          selected: false,
        };
      });
      this.selectedItems = [];
      this.isSelectedAll = false;
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