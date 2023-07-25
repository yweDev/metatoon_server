const { pool } = require('../../data')

/**
 * 업로드한 파일을 데이터베이스에 저장하는 함수
 * @param {string} name 원본 파일 이름
 * @param {string} path 파일 실제 저장경로
 * @param {string} size 파일 크기
 * @returns 
 */
exports.q_upload = async (name, path, size, title, ownerId, episode) => {
  const query = `INSERT INTO toon 
  (original_name, toon_path, toon_size, toon_title, toon_owner, toon_episode)
  VALUES (?,?,?,?,?,?)`;
  
  return await pool(query, [name, path, size, title, ownerId, episode]);
}

exports.q_update = async(name, path, size, title, episode, toonId) => {
  const query = `UPDATE toon SET original_name = ?, toon_path = ?, toon_size = ?, toon_title = ?, toon_episode = ? WHERE id = ?`;
  return await pool(query, [name, path, size, title, episode, toonId]);
}

/**
 * 웹툰 데이터베이스로부터 정보 조회 함수
 * @param {int} id 파일 데이터베이스 id
 */
exports.q_download = async (id) => {
  const query = `SELECT * FROM toon WHERE id =  ?`;
  
  // query2 does toon_view += 1
  const query2 = `UPDATE toon SET toon_view = toon_view + 1 WHERE id = ?`;
  await pool(query2, [id]);
  
  let result = await pool(query, [id]);
  return (result.length < 0) ? null : result[0];
}

exports.q_archive = async () => {
  // Below query is subject to change
  const query = `SELECT * from toon;`;
  return await pool(query);
}

exports.q_index = async () => {
  const query = `SELECT id FROM toon;`;
  return await pool(query);
}

/**
 * 웹툰 데이터베이스로부터 정보 조회 함수
 * @param {int} id 파일 데이터베이스 id
 */
exports.q_view = async (title, episode) => {
  const query = `SELECT * FROM toon WHERE toon_title =  ? AND toon_episode = ?`;
  
  let result = await pool(query, [title, episode]);
  return (result.length < 0) ? null : result[0];
}