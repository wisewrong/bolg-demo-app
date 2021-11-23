<template>
  <v-container class="list-panel">
    <h2>
      <span>电影列表</span>
      <v-btn icon @click="fetchData">
        <v-icon>mdi-cached</v-icon>
      </v-btn>
    </h2>
    <v-list @click.native="proxyListClick">
      <v-list-item
        v-for="(item, index) in movies"
        :key="`${item.name}-${index}`"
      >
        <v-list-item-avatar :width="60" :height="76">
          <v-img v-if="item.poster" :src="item.poster"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>
            <strong>{{item.name}}</strong>
            <span> ({{item.years}})</span>
          </v-list-item-title>
          <v-list-item-subtitle>
            导演：{{item.director}}
          </v-list-item-subtitle>
          <v-list-item-subtitle>
            <v-chip-group column>
              <v-chip x-small v-for="(tag, index) in item.category" :key="`${tag}-${index}`">
                {{ tag }}
              </v-chip>
            </v-chip-group>
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon>
            <v-icon data-action="edit" :data-index="index">mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon>
            <v-icon data-action="delete" :data-index="index">mdi-delete</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  name: 'ListPanel',
  data: () => ({
    movies: [],
    currentMoive: null,
  }),
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.$api.home.getMovieList()
        .then((res) => {
          this.movies = res.data.getAllMovie;
        })
        .catch(() => {});
    },
    proxyListClick(e) {
      const { action, index } = e?.target?.dataset || {};
      const item = this.movies[index];
      switch (action) {
        case 'edit':
          return this.handleLiEdit(item);
        case 'delete':
          return this.handleLiDelete(item);
        default: break;
      }
    },
    handleLiEdit(item) {
      this.currentMoive = JSON.parse(JSON.stringify(item));
      this.$emit('edit', this.currentMoive);
    },
    handleLiDelete(item) {
      this.$api.home.deleteMovie(item._id)
        .then(() => {
          this.$emit('delete', true);
        })
        .catch(() => {});
    },
  },
};
</script>

<style lang="scss">
.list-panel {
  h2 .v-btn {
    vertical-align: inherit;
    margin-left: 4px;
  }
  .v-avatar {
    border-radius: 2px;
    background-color: #e3e3e3;
  }
  .v-list-item {
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);

    .v-list-item__title {
      margin-bottom: 4px;
    }

    .v-slide-group__content {
      padding: 0;
    }

    &.v-list-item--disabled {
      background-color: #eaeaea;
    }
  }
}
</style>
