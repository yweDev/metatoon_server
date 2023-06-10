const Router = require('@koa/router');
const multer = require('@koa/multer');
const router = new Router();

const path = require('path');
const upload = multer({ 
    dest: path.resolve(__dirname, '../', 'storage')
})

const { myLogging } = require('./middleware/logging');
const { verify } = require('./middleware/auth');
const { identify } = require('./middleware/identify');

const webController = require('./web/controller');
const apiUserController = require('./api/user/controller');
const apiFeedController = require('./api/feed/controller');
const { sensitiveHeaders } = require('http2');
const { get } = require('http');

router.use(myLogging);
router.use(identify);

router.get('/', webController.home);
router.get('/page/:page', webController.page);

router.post('/api/user/register', apiUserController.register);
router.post('/api/user/login', apiUserController.login);

// FILE W/OUT AUTH
router.get('/file/:id', require('./api/file/controller').download);
router.get('/file_archive', require('./api/file/controller').archive);
router.get('/file_index', require('./api/file/controller').index);

// AUTH
router.use(verify);

router.get('/api/user', apiUserController.info);

// FILE
router.post('/file/upload', upload.single('file'), require('./api/file/controller').upload);
router.put('/file/update', upload.single('file'), require('./api/file/controller').update);

// TOON
router.get('/toon/:id', require('./api/toon/controller').download);
router.post('/toon/upload', upload.single('toon'), require('./api/toon/controller').upload);
router.put('/toon/upload', upload.single('toon'), require('./api/toon/controller').update);
router.get('/toon_archive', require('./api/toon/controller').archive);
router.get('/toon_index', require('./api/toon/controller').index);

// Unused
router.get('/api/feed', apiFeedController.index); 
router.post('/api/feed', apiFeedController.store);
router.get('/api/feed/:id', apiFeedController.show);
router.put('/api/feed/:id', apiFeedController.update);
router.delete('/api/feed/:id', apiFeedController.delete);

module.exports = router;    