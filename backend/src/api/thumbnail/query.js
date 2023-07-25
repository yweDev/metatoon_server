const { pool } = require('../../data')

/**
 * 업로드한 썸네일을 데이터베이스에 저장하는 함수
 * @param {string} name 원본 파일 이름
 * @param {string} path 파일 실제 저장경로
 * @param {string} size 파일 크기
 * @returns 
 */
exports.q_upload = async (name, path, size, thumbTitle, ownerId, episode, toonTitle) => {
  const query = `INSERT INTO thumbnail 
  (original_name, thumbnail_path, thumbnail_size, thumbnail_title, thumbnail_owner, thumbnail_episode, thumbnail_toon_title)
  VALUES (?,?,?,?,?,?,?)`;
  
  return await pool(query, [name, path, size, thumbTitle, ownerId, episode, toonTitle]);
}

exports.q_update = async(name, path, size, title, episode, thumbnailId) => {
  const query = `UPDATE thumbnail SET original_name = ?, thumbnail_path = ?, thumbnail_size = ?, thumbnail_title = ?, thumbnail_episode = ? WHERE id = ?`;
  return await pool(query, [name, path, size, title, episode, thumbnailId]);
}

/**
 * 썸네일 데이터베이스로부터 정보 조회 함수
 * @param {int} id 파일 데이터베이스 id
 */
exports.q_download = async (id) => {
  const query = `SELECT * FROM thumbnail WHERE id =  ?`;

  let result = await pool(query, [id]);
  return (result.length < 0) ? null : result[0];
}

// Retrieves thumbnail with episode number of 0
exports.q_archive = async () => {
  // Below query is subject to change
  const query = `SELECT * FROM thumbnail WHERE thumbnail_episode = 0;`;
  return await pool(query);
}

// Retrieves thumbnail filtered by toon_title
exports.q_archive_by_title = async (toonTitle) => {
  // Below query is subject to change
  const query = `SELECT * FROM thumbnail WHERE thumbnail_toon_title = ?;`;
  return await pool(query, [toonTitle]);
}

exports.q_index = async () => {
  const query = `SELECT id FROM thumbnail;`;
  return await pool(query);
}