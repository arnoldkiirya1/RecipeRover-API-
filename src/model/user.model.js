const db = require('../config/db');

const userModel = {
  selectAllUser: () => {
    return new Promise((resolve, reject) => {
      db.query('select * from users order by name', (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      })
    })
  },

  findUserPaged: (name, page, sort, asc) => {
    return new Promise((resolve, reject) => {
      const limit = 3;
      const offset = (page - 1) * limit;

      if(asc.toLowerCase() !== 'desc') asc='asc';
      if(sort.toLowerCase() !== 'date_created') sort='name';

      db.query(`select * from users where name ilike '%${name}%' order by ${sort} ${asc} limit ${limit} offset ${offset}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      })
    })
  },

  findUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`select * from users where id = ${id}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      })
    })
  },

  deleteUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`delete from users where id = ${id}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      })
    })
  },

  register: ({name, email, phone, password, level, image}) => {
    return new Promise((resolve, reject) => {
      const date = new Date();
      const yyyy = date.getFullYear();
      let mm = date.getMonth() + 1;
      let dd = date.getDate();
      let hh = date.getHours();
      let min = date.getMinutes();
      let sec = date.getSeconds();

      if (dd< 10) dd = '0' + dd;
      if (mm< 10) mm = '0' + mm;

      const date_created = `${yyyy}-${mm}-${dd} ${hh}:${min}:${sec}`;
      db.query(`
        insert into users (name, email, phone, password, level, image, date_created)
        values ('${name}', '${email}', '${phone}', '${password}', ${level}, '${image}', '${date_created}');
      `, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      })
    })
  },

  checkEmail: (email) => {
    return new Promise((resolve, reject) => {
        db.query(`select * from users where email='${email}'`, (err, res) => {
            if(err){
                reject(err);
            }
            resolve(res);
        })
    })
  },

  updateProfile: ({id, name, phone, password, image, likes, saved}) => {
    return new Promise((resolve, reject) => {
      db.query(`
        update users set
        name = coalesce ($2, name),
        phone = coalesce ($3, phone),
        password = coalesce ($4, password),
        image = coalesce ($5, image)
        where id = $1
      `, [id, name, phone, password, image],
      (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      })
    })
  },

  insertLike: ({user, recipe}) => {
    return new Promise((resolve, reject) => {
      db.query(`insert into likes (users, recipes, date_created) values (${user}, ${recipe}, now());`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      })
    })
  },

  insertSave: ({user, recipe}) => {
    return new Promise((resolve, reject) => {
      db.query(`insert into saved (users, recipes, date_created) values (${user}, ${recipe}, now());`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      })
    })
  },

  deleteLike: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`delete from likes where id = ${id}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      })
    })
  },

  deleteSave: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`delete from saved where id = ${id}`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      })
    })
  },
}

module.exports = userModel;
