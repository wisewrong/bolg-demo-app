<template>
  <v-container class="form-panel">
    <h2>影片信息</h2>
    <v-form
      ref="form"
      v-model="valid"
    >
      <v-text-field
        label="影片名称"
        v-model="currentData.name"
        :rules="formRules.name"
        :counter="20"
        required
      ></v-text-field>
      <v-text-field
        label="年代"
        v-model="currentData.years"
        :rules="formRules.years"
        required
      ></v-text-field>
      <v-text-field
        label="导演"
        v-model="currentData.director"
      ></v-text-field>
      <v-text-field
        label="海报（链接）"
        v-model="currentData.poster"
      ></v-text-field>
      <v-select
        label="影片类型"
        v-model="currentData.category"
        :items="enums.category"
        item-text="name"
        item-value="name"
        multiple
        chips
      ></v-select>
      <v-btn
        color="success"
        class="mr-4"
        @click="submit"
      >提交</v-btn>
      <v-btn
        class="mr-4"
        @click="rest"
      >重置</v-btn>
    </v-form>
  </v-container>
</template>

<script>
const defaultForm = () => ({
  name: '',
  years: undefined,
  director: '',
  poster: '',
  category: [],
});

export default {
  name: 'FormPanel',
  data: () => ({
    valid: true,
    enums: {
      category: [
        { id: 1, name: '剧情' },
        { id: 2, name: '悬疑' },
        { id: 3, name: '爱情' },
        { id: 4, name: '喜剧' },
        { id: 5, name: '动作' },
        { id: 6, name: '战争' },
        { id: 7, name: '科幻' },
        { id: 8, name: '动画' },
        { id: 9, name: '惊悚' },
      ],
    },
    currentData: defaultForm(),
    formRules: {
      name: [
        (v) => !!v || '影片名称不能为空',
        (v) => (v && v.length <= 20) || '影片名称不能超过20个字',
      ],
      years: [
        (v) => !!v || '年代不能为空',
        (v) => (+v && `${v}`.length === 4) || '请输入正确的年代',
      ],
    },
  }),
  props: {
    beforeSubmit: Function,
    afterSubmit: Function,
    formData: Object,
  },
  mounted() {
    this.formData && (
      this.currentData = this.formData
    );
  },
  methods: {
    rest() {
      this.currentData = defaultForm();
      this.$refs.form.reset();
    },
    submit() {
      const valid = this.$refs.form.validate();
      if (valid) {
        this.beforeSubmit && this.beforeSubmit();
        this.$api.home.saveMovie(this.currentData)
          .then(() => {
            this.afterSubmit && this.afterSubmit(true);
            this.$emit('after-submit', true);
            this.rest();
          })
          .catch(() => {
            this.$emit('after-submit', false);
          });
      }
    },
  },
  watch: {
    formData(val) {
      this.currentData = val;
    },
  },
};
</script>

<style></style>
