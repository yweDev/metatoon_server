const jwt = require('jsonwebtoken');
const query = require('./query');
const crypto = require('crypto');
const { log } = require('console');
const { stringify } = require('querystring');

var regmail = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

/** 해당 id의 회원정보들 */
exports.info = async (ctx, next) => {
  // let id = ctx.params.id;
  let user = ctx.request.user;
  let item = await query.info(user.id);

  ctx.body = item;
}

 /** 회원 가입 */
exports.register = async (ctx, next) => {
  let { email, password, name } = ctx.request.body;

  let { count } = await query.find(email);

  if(!regmail.test(email)) {
    ctx.status = 400;
    ctx.body = {result: "fail", message: '올바른 이메일 형식을 지켜주세요'};
    return;
  }

  if(count > 0) {
    ctx.status = 400;
    ctx.body = {result: "fail", message: '중복된 이메일이 존재합니다.'};
    return;
  }

  let result = await crypto.pbkdf2Sync(password, process.env.APP_KEY, 50, 100, 'sha512')

  let { affectedRows, insertId } = await query.register(email, result.toString('base64'), name);

  if(affectedRows > 0) {
    let token = await generteToken({ name, id: insertId });
    ctx.body = {result: "success", token};
  } else {
    ctx.body = {result: "fail", message: '서버 오류'};
  }
}
/** 로그인 */
exports.login = async (ctx, next) => {
  let { email, password } = ctx.request.body;
  let result = await crypto.pbkdf2Sync(password, process.env.APP_KEY, 50, 100, 'sha512')
  
  let item = await query.login(email, result.toString('base64'));

  if(item == null) {
    ctx.body = {result: "fail", message: "아이디 혹은 비밀번호가 맞지 않습니다."};
  } else {
    let token = await generteToken({name: item.name, id: item.id });
    ctx.body = {result: "success", token};
  }
}

/** 해당 id의 회원정보 수정 */
exports.update = async (ctx, next) => {
  let user = ctx.request.user;
  // original password, new password
  let { originalPw, newPw } = ctx.request.body;
  // Debug
  console.log("user :", user);
  console.log("ori, new: ", originalPw, newPw);
  console.log("types :", typeof(originalPw), typeof(newPw));

  let cryptOld = await crypto.pbkdf2Sync(originalPw, process.env.APP_KEY, 50, 100, 'sha512');
  let cryptNew = await crypto.pbkdf2Sync(newPw, process.env.APP_KEY, 50, 100, 'sha512');

  let oldInfo = await query.info(user.id);

  if(oldInfo[0].password == cryptOld.toString('base64')){
    let { affectedRows, insertId } = await query.update(cryptNew.toString('base64'), user.id);
    let token = await generteToken({ name: user.name, id: insertId });
    ctx.body = {result: "Success", message: "Password changed successfully.", token};
  } else {
    ctx.body = { result: "Fail", message: "기존 비밀번호가 일치하지 않습니다" };
  }
}

/**
 * jwt 토큰 생성
 * @param {object} payload 추가적으로 저장할 payload
 * @returns {string} jwt 토큰string
 */
let generteToken = (payload) => {
  return new Promise((resolve, reject) => {
     jwt.sign(payload, process.env.APP_KEY, (error, token) => {
      if(error) { reject(error); }
      resolve(token);
     })
  })
}