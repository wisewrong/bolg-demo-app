<template>
  <teleport to="body">
    <div v-if="modelValue" class="modal">
      <div class="modal-wrapper" :style="styleWidth">
        <div class="modal-header" v-show="showHeader">
          <slot name="header">
            <span class="modal-title">{{title || 'wisewrong'}}</span>
            <button class="modal-close">X</button>
          </slot>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer" v-show="showFooter">
          <slot name="footer"></slot>
        </div>
      </div>
      <div class="modal-bg" @click="close"></div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Modal',
  props: {
    // 是否显示弹窗
    modelValue: Boolean,
    // 弹窗宽度
    width: {
      type: [Number, String],
      default: '60%',
    },
    // 弹窗标题
    title: String,
    // 是否显示头部
    showHeader: {
      type: Boolean,
      default: true,
    },
    // 是否显示底部
    showFooter: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    close() {
      this.$emit('update:modelValue', false);
    },
  },
  computed: {
    styleWidth() {
      const width: string = typeof this.width === 'number' ? `${this.width}px` : this.width;
      return { width };
    },
  },
});
</script>

<style lang="less">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;

  .modal-close {
    border: none;
    background: transparent;
    font-size: 16px;
    transform: scaleX(1.2);
    font-weight: 200;
    color: #8d8f92;

    &:hover {
      color: #606266;
    }
  }

  &-bg {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.4);
    z-index: 1;
  }

  &-wrapper {
    position: relative;
    margin: 160px auto 0;
    background-color: #ffffff;
    border-radius: 4px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;
    z-index: 2;
  }

  &-header {
    display: flex;
    padding: 20px 20px 10px;
    font-size: 16px;
  }

  &-title {
    flex: 1;
  }

  &-footer {
    padding: 10px 20px 20px;
  }

  &-body {
    padding: 16px 20px;
    color: #606266;
    font-size: 14px;
    word-break: break-all;
  }
}
</style>
