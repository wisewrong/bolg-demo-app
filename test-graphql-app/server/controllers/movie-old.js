/* 传统方案的 controller，在 GraphQL 版本中未使用 */

const Movie = require('../mongodb/models/movie');

// 新建电影
const createMovie = (req) => {
  return Movie.create(req);
}

// 更新电影信息
const updateMovie = (req) => {
  return Movie.findByIdAndUpdate(req._id, req, {
    new: true,
  });
}

// 保存电影
const saveMovie = async (ctx, next) => {
  const req = ctx.request.body;
  // 校验必填
  if (!req.name) {
    return { message: '影片名称不能为空' }
  }
  const data = req._id
    ? await updateMovie(req)
    : await createMovie(req);
  return { data };
};

// 查询所有电影
const getMovie = async (ctx, next) => {
  const data = await Movie.find({});
  return { data };
}

// 删除电影
const deleteMovie = async (ctx, next) => {
  const { id } = ctx.params;
  // 校验必填
  if (!id) {
    return { message: 'id 不能为空' }
  }
  const data = await Movie.findByIdAndRemove(id);
  return { data: !!data._id };
}

module.exports = {
  saveMovie,
  getMovie,
  deleteMovie,
};