<template>
  <div class="form sign-in-form">
    <div class="form-item">
      <div class="form-item_input">
        <input
          class="form-item_input__inner"
          type="text"
          placeholder="用户名"
          v-model="form.user"
        />
      </div>
    </div>
    <div class="form-item">
      <div class="form-item_input">
        <input
          class="form-item_input__inner"
          type="password"
          placeholder="密码"
          v-model="form.password"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SignInForm',
  data: () => ({
    form: {
      user: '',
      password: '',
    },
  }),
  methods: {
    getValue() {
      return this.form;
    },
  },
});
</script>

<style lang="less">
.sign-in-form {
  padding: 0 16px;
  .form-item:not(:last-child) {
    margin-bottom: 20px;
  }
}
</style>
