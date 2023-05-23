const { q_upload, q_update, q_download, q_archive, q_index } = require('./query');
const fs = require('fs');
const JSZip = require('jszip');
const { PassThrough } = require('stream');

/** 파일 업로드 */
exports.upload = async (ctx) => {
  let file = ctx.request.file;
  let { fileTitle } = ctx.request.body;
  let user = ctx.request.user;

  let { affectedRows, insertId } = await q_upload(file.originalname, file.path, file.size, fileTitle, user.id);
  console.log("Saved Path : " + file.path);
  
  if(affectedRows > 0) {
    ctx.body = { result: "ok", id: insertId }
  } else {
    ctx.body = { result: "fail", }
  }
}

/** 파일 업데이트 */
exports.update = async (ctx) => {
  let file = ctx.request.file;
  let { fileId, fileTitle } = ctx.request.body;
  let user = ctx.request.user;

  // 요청자와 파일 소유자 확인 코드 추가

  let { affectedRows, insertId } = await q_update(file.originalname, file.path, file.size, fileTitle, fileId);
  console.log("Saved Path : " + file.path);
  
  if(affectedRows > 0) {
    ctx.body = { result: "ok", id: insertId }
  } else {
    ctx.body = { result: "fail", }
  }
}

/*
html header body 

*/
/** 파일 다운로드 */
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
  ctx.body = fs.createReadStream(item.file_path);
}

/** 압축파일로 반환 */
exports.archive = async ctx => {
  // ctx.response.setHeader("Access-Control-Allow-Origin", "*");
  let item = await q_archive();
  const zip = new JSZip;

  if(item == null)  {
    ctx.body = {result: "failure in retrieving files."};
    return;
  }

  for(let i = 0; i < item.length; i++)
  {
    zip.file(item[i].file_path, item[i].original_name);
  }

  const stream = new PassThrough();
  zip.generateNodeStream({type: 'nodebuffer', streamFiles: true}).pipe(stream);

  ctx.set('Content-Type', 'application/zip');
  ctx.set('Content-Disposition', 'attatchment; filename="files.zip"');
  
  ctx.statusCode = 200;
  ctx.body = stream;
}

exports.index = async ctx => {
  let item = await q_index();

  if(item == null) {
    ctx.body = {result: "failure in retrieving files."}
    return;
  }

  ctx.statusCode = 200;
  ctx.body = item;
}
