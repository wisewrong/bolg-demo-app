import axios from '../axios';

const request = axios();

export default {
  // 查询电影列表
  getMovieList() {
    return request.get('/api/movie/list');
  },
  // 保存影片
  saveMovie(data) {
    return request.post('/api/movie/save', data);
  },
  // 删除影片
  deleteMovie(_id) {
    return request.delete(`/api/movie/delete/${_id}`);
  },
};
