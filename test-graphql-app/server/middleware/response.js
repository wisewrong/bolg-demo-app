/**
 * ---- GraphQL 版本中未使用 ----
 * 统一出参格式 
 * 需要保证所有的 controller 在请求成功的时候返回 { data }，失败的时候返回 { message }
 */
const buildResponse = (option = {}) =>{
  return async function(ctx, next) {
    const res = await next() || {};
    if (res.data) {
      ctx.body = {
        code: option.successCode || 200,
        data: res.data,
        message: option.successMsg || 'success',
      }
    } else {
      ctx.body = {
        code: option.failCode || 99,
        data: null,
        message: res.message || option.successMsg || 'fail',
      }
    }
  };
}

module.exports = buildResponse;
