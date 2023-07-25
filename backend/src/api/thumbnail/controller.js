const { q_upload, q_update, q_download, q_archive, q_archive_by_title, q_index } = require('./query');
const fs = require('fs');
const JSZip = require('jszip');
const { PassThrough } = require('stream');

/** 썸네일 업로드 */
exports.upload = async (ctx) => {
  let thumbnail = ctx.request.file;
  let { thumbnailTitle, toonTitle, episode } = ctx.request.body;
  let user = ctx.request.user;

  let { affectedRows, insertId } = await q_upload(thumbnail.originalname, thumbnail.path, thumbnail.size, thumbnailTitle, user.id, episode, toonTitle);
  console.log("Saved Path : " + thumbnail.path);
  
  if(affectedRows > 0) {
    ctx.body = { result: "ok", id: insertId }
  } else {
    ctx.body = { result: "fail", }
  }
}

/**
 * 썸네일 업데이트
 * @param {int} thumbnailId 변경할 파일의 id값
 * @param {string} thumbnailTitle 파일 이름 or 웹툰 제목
 */
exports.update = async (ctx) => {
  let thumbnail = ctx.request.file;
  let { thumbnailId, thumbnailTitle, episode } = ctx.request.body;
  let user = ctx.request.user;

  // 요청자와 웹툰 소유자 확인 코드 추가

  let { affectedRows, insertId } = await q_update(thumbnail.originalname, thumbnail.path, thumbnail.size, thumbnailTitle, episode, thumbnailId);
  console.log("Saved Path : " + thumbnail.path);
  
  if(affectedRows > 0) {
    ctx.body = { result: "ok", id: thumbnailId }
  } else {
    ctx.body = { result: "fail", }
  }
}

/** 썸네일 다운로드 */
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
  ctx.body = fs.createReadStream(item.thumbnail_path);
}

/** 압축파일로 반환-전체 */
exports.archive = async ctx => {
  let item = await q_archive();
  const zip = new JSZip;

  if(item == null)  {
    ctx.body = {result: "failure in retrieving thumbnail."};
    return;
  }

  for(let i = 0; i < item.length; i++)
  {
    // zip.file(item[i].id + "_" + item[i].thumbnail_title + ".png", fs.createReadStream(item[i].thumbnail_path));
    zip.file(item[i].thumbnail_toon_title + "_" + item[i].thumbnail_episode + "_" + item[i].thumbnail_title + ".png", fs.createReadStream(item[i].thumbnail_path));
  }

  const stream = new PassThrough();
  zip.generateNodeStream({type: 'nodebuffer', streamFiles: true}).pipe(stream);

  ctx.response.set('Content-Type', 'application/zip');
  ctx.response.set('Content-Disposition', 'attatchment; filename="thumbnail.zip"');
  
  ctx.statusCode = 200;
  ctx.body = stream;
  // ctx.body = fs.createReadStream(item[0].thumbnail_path) // it works...
}

/** 압축파일로 반환-필터 */
exports.archive_by_title = async ctx => {
  let { toonTitle } = ctx.params;

  let item = await q_archive_by_title(toonTitle);
  const zip = new JSZip;

  if(item == null)  {
    ctx.body = {result: "failure in retrieving thumbnail."};
    return;
  }

  for(let i = 0; i < item.length; i++)
  {
    // zip.file(item[i].id + "_" + item[i].thumbnail_title + ".png", fs.createReadStream(item[i].thumbnail_path));
    zip.file(item[i].thumbnail_toon_title + "_" + item[i].thumbnail_episode + "_" + item[i].thumbnail_title + ".png", fs.createReadStream(item[i].thumbnail_path));
  }

  const stream = new PassThrough();
  zip.generateNodeStream({type: 'nodebuffer', streamFiles: true}).pipe(stream);

  ctx.response.set('Content-Type', 'application/zip');
  ctx.response.set('Content-Disposition', 'attatchment; filename="thumbnail.zip"');
  
  ctx.statusCode = 200;
  ctx.body = stream;
  // ctx.body = fs.createReadStream(item[0].thumbnail_path) // it works...
}

/** 저장된 썸네일 id값 반환 */
exports.index = async ctx => {
  let item = await q_index();

  if(item == null) {
    ctx.body = {result: "failure in retrieving thumbnail."}
    return;
  }

  ctx.statusCode = 200;
  ctx.body = item;
}
