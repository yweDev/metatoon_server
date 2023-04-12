const Router = require('@koa/router');
const multer = require('@koa/multer');
const router = new Router();

const path = require('path');
const upload = multer({ 
    dest: path.resolve(__dirname, '../', 'storage')
})

const { myLogging } = require('./middleware/logging');
const { verify } = require('./middleware/auth');

const webController = require('./web/controller');
const apiUserController = require('./api/user/controller');
const apiFeedController = require('./api/feed/controller');
const { sensitiveHeaders } = require('http2');
const { get } = require('http');

router.use(myLogging);

router.get('/', webController.home);
router.get('/page/:page', webController.page);

router.post('/api/user/register', apiUserController.register);
router.post('/api/user/login', apiUserController.login);

// router.use(verify);

router.get('/api/user/:id', apiUserController.info);

router.post('/file/upload', upload.single('file'), require('./api/file/controller').upload);
router.get('/file/:id', require('./api/file/controller').download);
router.get('/file', require('./api/file/controller').index);


router.get('/api/feed', apiFeedController.index); 
router.post('/api/feed', apiFeedController.store);
router.get('/api/feed/:id', apiFeedController.show);
router.put('/api/feed/:id', apiFeedController.update);
router.delete('/api/feed/:id', apiFeedController.delete);

module.exports = router;