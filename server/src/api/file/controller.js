const { create, show, index } = require('./query');
const fs = require('fs');
const JSZip = require('jszip');
const { PassThrough } = require('stream');

/** 파일 업로드 */
exports.upload = async (ctx) => {
  let file = ctx.request.file;

  let { affectedRows, insertId } = await create(file.originalname, file.path, file.size);
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
  
  let item = await show(id);
  
  if(item == null)  {
    ctx.body = {result: "fail"};
    return;
  }

  ctx.response.set("content-disposition", `attachment; filename=${item.original_name}`);
  ctx.statusCode = 200;
  ctx.body = fs.createReadStream(item.file_path);
}

/** 전체 index 가져오기 */
exports.index = async (ctx, next) => {
  // ctx.response.setHeader("Access-Control-Allow-Origin", "*");
  let item = await index();
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