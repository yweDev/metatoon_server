const { pool } = require('../../data')

/**
 * 업로드한 파일을 데이터베이스에 저장하는 함수
 * @param {string} name 원본 파일 이름
 * @param {string} path 파일 실제 저장경로
 * @param {string} size 파일 크기
 * @returns 
 */
exports.q_upload = async (name, path, size, title, ownerId) => {
  const query = `INSERT INTO files 
  (original_name, file_path, file_size, file_title, file_owner)
  VALUES (?,?,?,?,?)`;
  return await pool(query, [name, path, size, title, ownerId]);
}

exports.q_update = async(name, path, size, title, fileId) => {
  const query = `UPDATE files SET original_name = ?, file_path = ?, file_size = ?, file_title = ? WHERE id = ?`;
  return await pool(query, [name, path, size, title, fileId]);
}

/**
 * 파일 데이터베이스로부터 정보 조회 함수
 * @param {number} id 파일 데이터베이스 id
 * @returns 
 */
exports.q_download = async (id) => {
  const query = `SELECT * FROM files WHERE id =  ?`;
  let result = await pool(query, [id]);
  return (result.length < 0) ? null : result[0];
}

exports.q_archive = async () => {
  // Below query is subject to change
  const query = `SELECT * from files;`;
  return await pool(query);
}

exports.q_index = async () => {
  const query = `SELECT id FROM files;`;
  return await pool(query);
}