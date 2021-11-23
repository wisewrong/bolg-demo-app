/* /router/api/movie.js */

const router = require('koa-router')();
const { apiPrefix } = require('../../config');
const movieController = require('../../controllers/movie');

router.prefix(apiPrefix);

router.all('/movie/graphql', movieController.graphqlMovie);

module.exports = router;