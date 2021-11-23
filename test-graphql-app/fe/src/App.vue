<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <strong>GraphQL Demo</strong>
      </div>
      <v-spacer></v-spacer>
      <v-btn depressed outlined @click="handleBarBtnClick">
        DO NOT CLICK
      </v-btn>
    </v-app-bar>

    <v-snackbar top v-model="snackbar.show" :timeout="2000">
      {{ snackbar.text }}
    </v-snackbar>

    <v-main app>
      <Home />
    </v-main>
  </v-app>
</template>

<script>
import Home from './views/Home.vue';

export default {
  name: 'App',

  components: {
    Home,
  },

  data: () => ({
    snackbar: {
      show: false,
      text: '',
    },
  }),

  methods: {
    handleBarBtnClick() {
      const tips = [
        '你再点一下试试？！',
        '点都点了，不得再点个赞 😆',
        '不要点...千万别点...',
        '😭😭😭 你点疼我了',
        '告诉你一个秘密，Wise 是个帅小伙 😏',
        '口罩都没带好就在那儿点点点',
        '不点赞的男生JJ短1cm',
        '不点赞的女生胸小1罩杯',
        '不点赞的学生多做一本练习册',
        '点赞的人后来都走上了人生巅峰',
      ];
      const randomIndex = Math.floor(Math.random() * tips.length);
      this.snackbar.text = tips[randomIndex];
      this.snackbar.show = true;
    },
  },
};
</script>
