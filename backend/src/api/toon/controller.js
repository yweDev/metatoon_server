const { q_upload, q_update, q_download, q_archive, q_index, q_view } = require('./query');
const fs = require('fs');
const JSZip = require('jszip');
const { PassThrough } = require('stream');

/** 웹툰 업로드 */
exports.upload = async (ctx) => {
  let toon = ctx.request.file;
  let { toonTitle, episode } = ctx.request.body;
  let user = ctx.request.user;

  let { affectedRows, insertId } = await q_upload(toon.originalname, toon.path, toon.size, toonTitle, user.id, episode);
  console.log("Saved Path : " + toon.path);
  
  if(affectedRows > 0) {
    ctx.body = { result: "ok", id: insertId }
  } else {
    ctx.body = { result: "fail", }
  }
}

/**
 * 웹툰 업데이트
 * @param {int} toonId 변경할 파일의 id값
 * @param {string} toonTitle 파일 이름 or 웹툰 제목
 */
exports.update = async (ctx) => {
  let toon = ctx.request.file;
  let { toonId, toonTitle, episode } = ctx.request.body;
  let user = ctx.request.user;

  // 요청자와 웹툰 소유자 확인 코드 추가

  let { affectedRows, insertId } = await q_update(toon.originalname, toon.path, toon.size, toonTitle, episode, toonId);
  console.log("Saved Path : " + toon.path);
  
  if(affectedRows > 0) {
    ctx.body = { result: "ok", id: toonId }
  } else {
    ctx.body = { result: "fail", }
  }
}

/** 웹툰 다운로드 */
exports.download = async ctx => {
  // ctx.response.setHeader("Access-Control-Allow-Origin", "*");
  let { id } = ctx.params;
  
  let item = await q_download(id);
  
  if(item == null)  {
    ctx.body = {result: "fail"};
    return;
  }

  ctx.response.set("content-disposition", `attachment; filename=${item.original_name}`);
  ctx.statusCode = 200;
  ctx.body = fs.createReadStream(item.toon_path);
}

/** 압축파일로 반환 */
exports.archive = async ctx => {
  let item = await q_archive();
  const zip = new JSZip;

  if(item == null)  {
    ctx.body = {result: "failure in retrieving toon."};
    return;
  }

  for(let i = 0; i < item.length; i++)
  {
    zip.file(item[i].id + "_" + item[i].toon_title + ".png", fs.createReadStream(item[i].toon_path));
  }

  const stream = new PassThrough();
  zip.generateNodeStream({type: 'nodebuffer', streamFiles: true}).pipe(stream);

  ctx.response.set('Content-Type', 'application/zip');
  ctx.response.set('Content-Disposition', 'attatchment; filename="toon.zip"');
  
  ctx.statusCode = 200;
  ctx.body = stream;
  // ctx.body = fs.createReadStream(item[0].toon_path) // it works...
}

/** 저장된 웹툰 id값 반환 */
exports.index = async ctx => {
  let item = await q_index();

  if(item == null) {
    ctx.body = {result: "failure in retrieving toon."}
    return;
  }

  ctx.statusCode = 200;
  ctx.body = item;
}

/** 웹툰 뷰어 */
exports.view = async ctx => {
  // ctx.response.setHeader("Access-Control-Allow-Origin", "*");
  let { title, episode } = ctx.params;
  
  let item = await q_view(title, episode);
  
  if(item == null)  {
    ctx.body = {result: "fail"};
    return;
  }

  ctx.response.set("content-disposition", `attachment; filename=${item.toon_title + "_" + item.toon_episode}.png`);
  ctx.statusCode = 200;
  ctx.body = fs.createReadStream(item.toon_path);
}