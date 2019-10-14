const Router = require('koa2-router');
const controllers = require('../controllers');

const router = new Router();

router.get('/', async (ctx) => {
    ctx.body = 'Hello World';
});
router.get('/list', controllers.list);
router.post('/add', controllers.add);

module.exports = router;
