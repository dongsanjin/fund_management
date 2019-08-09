<template>
  <div class="dialog">
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.show"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :modal-append-to-body="false"
    >
      <div class="form">
        <el-form
          ref="form"
          :model="formData"
          :rules="formRules"
          label-width="120px"
          style="margin:10px;width:auto;"
        >
          <el-form-item label="收支类型:">
            <el-select v-model="formData.type">
              <el-option
                v-for="(formtype, index) in formTypeList"
                :key="index"
                :label="formtype"
                :value="formtype"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="describe" label="收支描述">
            <el-input type="describe" v-model="formData.describe"></el-input>
          </el-form-item>
          <el-form-item prop="income" label="收入">
            <el-input type="income" v-model="formData.income"></el-input>
          </el-form-item>
          <el-form-item prop="expend" label="支出">
            <el-input type="expend" v-model="formData.expend"></el-input>
          </el-form-item>
          <el-form-item prop="cash" label="账户现金">
            <el-input type="cash" v-model="formData.cash"></el-input>
          </el-form-item>
          <el-form-item prop="remark" label="备注">
            <el-input type="remark" v-model="formData.remark"></el-input>
          </el-form-item>
          <el-form-item class="text-right">
            <el-button @click="dialog.show = false">取消</el-button>
            <el-button type="primary" @click="onSubmit('form')">提交</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "dialog",
  props: {
    dialog: Object,
    formData: Object
  },
  data() {
    return {
      formTypeList: [
        "提现",
        "提现手续费",
        "充值",
        "优惠卷",
        "充值礼卷",
        "转账"
      ],
      formRules: {
        describe: [
          { required: true, message: "收支描述不能为空", trigger: "blur" }
        ],
        income: [{ required: true, message: "收入不能为空", trigger: "blur" }],
        expend: [{ required: true, message: "支出不能为空", trigger: "blur" }],
        cash: [{ required: true, message: "账户余额不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          // 添加数据到数据库中
          const url = this.dialog.option == "add" ? "add" : `edit/${this.formData.id}`;
          this.$axios.post(`/api/profiles/${url}`, this.formData).then(() => {
            // 数据添加成功提示
            this.$message({
              message: "提交成功",
              type: "success"
            });

            // 关闭对话框
            this.dialog.show = false;

            // 添加数据后抛出更新数据
            this.$emit('update');
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.text-right {
  text-align: right;
}
</style>
