import axios from '../axios';

const request = axios();

const buildParams = (val) => val || '';

export default {
  // 查询电影列表
  getMovieList() {
    return request.post('/api/movie/graphql', {
      query: `{
        getAllMovie {
          _id,
          name,
          years,
          director,
          poster,
          category,
        }
      }`,
    });
  },
  // 保存影片
  saveMovie(data = {}) {
    return request.post('/api/movie/graphql', {
      query: `mutation {
        saveMovie(
          _id: "${buildParams(data._id)}",
          name: "${buildParams(data.name)}",
          years: ${data.years},
          director: "${buildParams(data.director)}",
          poster: "${buildParams(data.poster)}",
          category: ${JSON.stringify(data.category)},
        ) {
          _id,
          name,
          years,
          director,
          poster,
          category
        }
      }`,
    });
  },
  // 删除影片
  deleteMovie(_id) {
    return request.post('/api/movie/graphql', {
      query: `mutation {
        removeMovie(
          _id: "${buildParams(_id)}",
        ) {
          _id
        }
      }`,
    });
  },
};
