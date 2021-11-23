<template>
  <div class="header">
    <div class="logo cp" @click="routeToHome">Wise.Wrong</div>
    <div class="nav-wrapper">
      <!-- 导航 -->
      <router-link
        class="nav cp"
        v-for="(val, index) of navs"
        :key="`nav-${val.path}-${index}`"
        :to="val.path"
      >{{val.name}}</router-link>
    </div>
    <!-- 用户名 -->
    <span
      v-if="userInfo.user"
      class="nav-user"
    >Hello, {{userInfo.user}}</span>
    <!-- 登录按钮 -->
    <button
      v-else
      class="button nav-button"
      @click="() => { visible = true }"
    >Sign In</button>
  </div>
  <!-- 登录弹窗 -->
  <modal
    v-model="visible"
    width="400px"
  >
    <template v-slot:header>
      <div class="sign-in-heaer">
        <div class="sign-in-heaer_title">
          ——<span>登 录</span>——
        </div>
        <p class="sign-in-heaer_sub">Let's Enjoy Vue 3</p>
      </div>
    </template>
    <sign-in-form ref="signInForm" />
    <template v-slot:footer>
      <div class="sign-in-footer">
        <button class="button primary" @click="handleSubmit">确认</button>
        <button class="button" @click="closeModal">取消</button>
      </div>
    </template>
  </modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapMutations } from 'vuex';
import Modal from './modal.vue';
import SignInForm from './sign-in-form.vue';

export default defineComponent({
  name: 'HeaderItem',
  components: {
    Modal,
    SignInForm,
  },
  props: {
    text: String,
  },
  data: () => ({
    navs: [
      { name: 'Home', path: '/' },
      { name: 'About', path: '/about' },
    ],
    // 是否显示注册弹窗
    visible: false,
  }),
  methods: {
    routeToHome() {
      this.$router.push('/');
    },
    // 登录
    handleSubmit() {
      const data = (this.$refs.signInForm as any).getValue();
      this.updateUserInfo({ ...data });
      this.closeModal();
    },
    // 关闭弹窗
    closeModal() {
      this.visible = false;
    },
    ...mapMutations([
      'updateUserInfo',
    ]),
  },
  computed: {
    ...mapState([
      'userInfo',
    ]),
  },
});
</script>

<style lang="less">
.header {
  display: flex;
  align-items: center;
  background: @color-primary;

  .logo,
  .nav-wrapper {
    padding: 0 16px;
    height: 48px;
    line-height: 48px;
    color: fade(@color-white, 88%);
  }

  .nav-wrapper {
    flex: 1;
  }

  .nav {
    display: inline-block;
    padding: 0 8px;
    color: fade(@color-white, 76%);
    text-decoration: none;
    transition: all 300ms;
    &:hover {
      background: fade(@color-black, 30%);
    }

    &-button {
      border-color: transparent;
      padding: 8px 16px;
      color: @color-primary;
      margin-right: 16px;
      &:hover {
        background-color: fade(@color-white, 80%);
        border-color: transparent;
      }
    }

    &-user {
      padding: 8px 16px;
      color: @color-white;
      font-weight: 300;
    }
  }
}
.sign-in {
  &-heaer {
    text-align: center;
    width: 100%;

    &_title {
      font-size: 14px;
      color: @color-gray-300;
      span {
        font-size: 20px;
        font-weight: 500;
        color: @color-primary;
        margin: 0 12px;
      }
    }

    &_sub {
      font-size: 14px;
      color: @color-gray-200;
      margin: 4px 0;
    }
  }
  &-footer {
    text-align: center;
  }
}
</style>
