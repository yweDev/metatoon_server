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
router.put('/file/update', upload.single('file'), require('./api/file/controller').update);

// TOON W/OUT AUTH
router.get('/toon/:id', require('./api/toon/controller').download);
router.get('/toon_archive', require('./api/toon/controller').archive);
router.get('/toon_index', require('./api/toon/controller').index);
router.get('/toon_view/:title/:episode', require('./api/toon/controller').view);


// Thumbnail W/OUT AUTH
router.get('/thumb/:id', require('./api/thumbnail/controller').download);
router.get('/thumbnail_archive', require('./api/thumbnail/controller').archive);
router.get('/thumbnail_archive/:toonTitle', require('./api/thumbnail/controller').archive_by_title);
router.get('/thumbnail_index', require('./api/thumbnail/controller').index);

// AUTH
router.use(verify);

// USER
router.get('/api/user', apiUserController.info);
router.post('/api/user_update', apiUserController.update);

// FILE
router.post('/file/upload', upload.single('file'), require('./api/file/controller').upload);
// router.put('/file/update', upload.single('file'), require('./api/file/controller').update);

// TOON
router.post('/toon/upload', upload.single('toon'), require('./api/toon/controller').upload);
router.put('/toon/update', upload.single('toon'), require('./api/toon/controller').update);
// router.get('/toon/:id', require('./api/toon/controller').download);
// router.get('/toon_archive', require('./api/toon/controller').archive);
// router.get('/toon_index', require('./api/toon/controller').index);

// Thumbnail
router.post('/thumbnail/upload', upload.single('thumbnail'), require('./api/thumbnail/controller').upload);
router.put('/thumbnail/update', upload.single('thumbnail'), require('./api/thumbnail/controller').update);
// router.get('/thumb/:id', require('./api/thumbnail/controller').download);
// router.get('/thumbnail_archive', require('./api/thumbnail/controller').archive);
// router.get('/thumbnail_archive/:toonTitle', require('./api/thumbnail/controller').archive_by_title);
// router.get('/thumbnail_index', require('./api/thumbnail/controller').index);

// Unused
router.get('/api/feed', apiFeedController.index); 
router.post('/api/feed', apiFeedController.store);
router.get('/api/feed/:id', apiFeedController.show);
router.put('/api/feed/:id', apiFeedController.update);
router.delete('/api/feed/:id', apiFeedController.delete);

module.exports = router;    