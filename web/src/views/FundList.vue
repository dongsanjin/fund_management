<template>
  <el-table-column class="fundList">
    <el-table-column class="container">
      <div>
        <el-form :inline="true" ref="add-data" v-model="searchDate">
          <el-date-picker v-model="searchDate.startTime" type="datetime" placeholder="选择日期时间"></el-date-picker>--
          <el-date-picker v-model="searchDate.endTime" type="datetime" placeholder="选择结束时间"></el-date-picker>
          <el-form-item class="btn-search">
            <el-button type="primary" size="small" icon="search" @click="handleSearch()">查询</el-button>
          </el-form-item>
          <el-form-item class="btn-add">
            <el-button type="primary" v-if="user.identity == 'manager'" size="small" icon="view" @click="handleAdd()">添加</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table v-if="tableData.length > 0" :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="100"></el-table-column>
        <el-table-column prop="date" label="创建时间" align="center" width="250">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{scope.row.date}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="收支类型" align="center" width="150"></el-table-column>
        <el-table-column prop="describe" label="收支描述" align="center" width="180"></el-table-column>
        <el-table-column prop="income" label="收入" align="center" width="170">
          <template slot-scope="scope">
            <span style="color: #00d053">{{scope.row.income}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="expend" label="支出" align="center" width="170">
          <template slot-scope="scope">
            <span style="color: #f56767">{{scope.row.expend}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="cash" label="账户余额" align="center" width="170">
          <template slot-scope="scope">
            <span style="color: #4db3ff">{{scope.row.cash}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center" width="220"></el-table-column>
        <el-table-column label="操作" prop="operation" align="center" width="auto" v-if="user.identity == 'manager'">
          <template slot-scope="scope">
            <el-button
              size="small"
              type="warning"
              icon="edit"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              icon="delete"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" prop="operation" align="center" width="auto" v-else >
          <el-text class="staff">权限不够</el-text>
        </el-table-column>
      </el-table>
      <div class="pagination-box">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="paginations.currentPageIndex"
          :page-sizes="paginations.pageSizes"
          :page-size="paginations.pageSize"
          :layout="paginations.layout"
          :total="paginations.total"
        ></el-pagination>
      </div>
    </el-table-column>
    <Dialog :dialog="dialog" :formData="formData" @update="getProfile"></Dialog>
  </el-table-column>
</template>

<script>
import Dialog from "../components/Dialog";
export default {
  name: "fundList",
  data() {
    return {
      searchDate: {
        startTime: "",
        endTime: ""
      },
      searchTableData: [],
      paginations: {
        currentPageIndex: 1,
        total: 0,
        pageSize: 5,
        pageSizes: [5, 10],
        layout: "total,sizes,prev,pager,next,jumper"
      },
      tableData: [],
      allTableData: [],
      dialog: {
        show: false,
        title: "",
        option: "edit"
      },
      formData: {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      }
    };
  },
  components: {
    Dialog
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  created() {
    this.getProfile();
  },
  methods: {
    getProfile() {
      this.$axios
        .get("/api/profiles")
        .then(res => {
          this.allTableData = res.data;
          this.filterTableData = res.data;
          // 设置分页
          this.setPaginations();
        })
        .catch(err => {
          throw err;
        });
    },
    setPaginations() {
      this.paginations.total = this.allTableData.length;
      this.paginations.currentPageIndex = 1;
      this.paginations.pageSize = 5;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.paginations.pageSize;
      });
    },
    handleEdit(index, row) {
      this.dialog = {
        show: true,
        title: "修改资金信息",
        option: "edit"
      };

      this.formData = {
        type: row.type,
        describe: row.describe,
        income: row.income,
        expend: row.expend,
        cash: row.cash,
        remark: row.remark,
        id: row._id
      };
    },
    handleDelete(index, row) {
      this.$axios.delete(`/api/profiles/delete/${row._id}`).then(() => {
        this.$message("删除成功");
        this.getProfile();
      });
    },
    handleAdd() {
      this.dialog = {
        show: true,
        title: "添加资金信息",
        option: "add"
      };

      this.formData = {
        type: "",
        describe: "",
        income: "",
        expend: "",
        cash: "",
        remark: "",
        id: ""
      };
    },
    handleSizeChange(pageSize) {
      this.paginations.currentPageIndex = 1;
      this.paginations.pageSize = pageSize;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < pageSize;
      });
    },
    handleCurrentChange(page) {
      let index = this.paginations.pageSize * (page - 1);
      let nums = this.paginations.pageSize * page;
      let tables = [];

      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          tables.push(this.allTableData[i]);
        }
        this.tableData = tables;
      }
    },
    handleSearch() {
      if (!(this.searchDate.startTime && this.searchDate.endTime)) {
        this.$message({
          type: "warning",
          message: "请选择查询时间"
        });
        this.getProfile();
        return;
      }

      const sTime = this.searchDate.startTime.getTime();
      const eTime = this.searchDate.endTime.getTime();
      this.allTableData = this.filterTableData.filter(item => {
        let date = new Date(item.date);
        let time = date.getTime();
        return time >= sTime && time <= eTime;
      });
      this.setPaginations();
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;
}
.btn-search{
  margin-left: 10px;
}
.btn-add {
  float: right;
}
.pagination-box {
  text-align: right;
  margin-top: 10px;
  margin-right: 10px;
}
.staff {
  color: #a4b0be !important;
  cursor: not-allowed;
}
</style>

