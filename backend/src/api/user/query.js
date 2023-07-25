const { pool } = require('../../data')

exports.info = async(userId) =>{
  const query = `SELECT * from user where id = ?`;
  return await pool(query, [userId]);
}

/**
 * 회원가입
 * @param {string} email 메일(아이디)
 * @param {string} password 비밀번호
 * @param {string} name 이름
 * @returns 
 */
exports.register = async (email, password, name) => {
  const query = `INSERT INTO user 
  (email, password, name)
  VALUES (?,?,?)`;
  return await pool(query, [email, password, name]);
}

/**
 * 로그인
 * @param {string} email 메일(아이디)
 * @param {string} password 비밀번호
 * @returns 
 */
exports.login = async (email, password) => {
  const query = `SELECT * FROM user WHERE
  email = ? AND password = ?`;
  let result = await pool(query, [email, password]);
  return (result.length < 0) ? null : result[0];
}

exports.update = async (password, id) => {
  const query = `UPDATE user SET password = ? where id = ?`;
  return await pool(query, [password, id]);
}


exports.find = async (email) => {
  let result = await pool(`SELECT count(*) count FROM user where email = ?`, [email]);
  return (result.length < 0) ? null : result[0];
}