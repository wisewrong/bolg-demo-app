<template>
  <div class="home">
    <h1 class="title">Todo List</h1>
    <div class="todo-list">
      <div class="input">
        <input
          class="input__inner"
          type="text"
          v-model="value"
          :placeholder="placeholder"
          @keydown.enter="handleAdd"
        >
      </div>
      <ul class="list">
        <template v-if="showList">
          <list-item
            v-for="(item, index) of list"
            :key="`li-${index}-${item.key}`"
            :item-id="item.key"
            @remove="removeItem(index)"
            @view="viewItem"
          >{{item.text}}</list-item>
        </template>
        <div v-else class="empty">{{emptyText}}</div>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { mapMutations, useStore } from 'vuex';
import { useRouter } from 'vue-router';
import ListItem from '../../components/list-item.vue';
import { getHash, dateFormat } from '../../utils';

export default defineComponent({
  name: 'Home',
  components: {
    ListItem,
  },
  data: () => ({
    value: '',
    placeholder: '请输入内容，以回车键确认',
    emptyText: '曾经笑容灿烂如今却空空如也',
  }),
  setup() {
    const router = useRouter();
    const store = useStore();
    const {
      addTodoListItem,
      removeTodoListItem,
    } = mapMutations(['addTodoListItem', 'removeTodoListItem']);
    const viewItem = (id: string) => {
      router.push(`/about/${id}`);
    };
    return {
      list: computed(() => store.state.todoList),
      addItem: addTodoListItem,
      removeItem: removeTodoListItem,
      viewItem,
    };
  },
  methods: {
    // 添加条目
    handleAdd() {
      if (!this.value) { return; }
      const item = {
        text: this.value,
        key: getHash(8),
        time: dateFormat(new Date()),
      };
      this.addItem(item);
      this.value = '';
      console.log('listlistlist', this.list);
    },
  },
  computed: {
    showList(): boolean {
      return !!(this.list && this.list.length);
    },
  },
});
</script>

<style lang="less">
@import url('./todo-list.less');
</style>
