<template>
  <v-container class="home">
    <v-row no-gutters>
      <v-col :cols="6">
        <list-com
          ref="list"
          @edit="handleEdit"
          @delete="afterSubmit"
        />
      </v-col>
      <v-col :cols="6">
        <form-com
          :form-data="currentData"
          :before-submit="beforeSubmit"
          @after-submit="afterSubmit"
        />
      </v-col>
    </v-row>
    <v-overlay :value="overlay">
      <loading />
    </v-overlay>
  </v-container>
</template>

<script>
import FormCom from '../components/form.vue';
import ListCom from '../components/list.vue';
import Loading from '../components/loading.vue';

export default {
  name: 'Home',
  components: { ListCom, FormCom, Loading },
  data: () => ({
    list: [],
    currentData: {},
    overlay: false,
  }),
  methods: {
    beforeSubmit() {
      this.overlay = true;
    },
    afterSubmit(success) {
      this.overlay = false;
      success && this.$refs?.list.fetchData();
    },
    handleEdit(data) {
      this.currentData = JSON.parse(JSON.stringify(data));
    },
  },
};
</script>

<style lang="scss">
.home {
  height: 100%;
}
</style>
