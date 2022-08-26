(() => {
  let users = [
    {
      userName: 'yuqun',
      passWord: '123456',
    },
    {
      userName: 'huy',
      passWord: '123',
    },
  ];

  let contentArr = [];

  const express = require('express');
  const router = express.Router();
  const app = express();
  const cors = require('cors');
  const jwt = require('express-jwt');
  const jwtToken = require('jsonwebtoken');
 
  app.use(cors());
  app.use(express.static('./src'));

  app.use(router);

  const err = (req, res) => {
    let code = 500;
    res.status(code).send({
      code,
      msg: '错了！'
    })
  }

  const correct = (req, res) => {
    let code = 200;
    // let arr = Array.from(new Array(1000), (x, i) => i)
    // res.status(code).send(
    // //   {
    // //   code,
    // //   msg: '成功！'
    // // }
    // arr
    // )

    res.setHeader('Content-type', 'application/octet-stream');
    let arr = Array.from(new Array(10000000), (x, i) => i)
    res.send(arr + '')
  }

  app.get('/test1', (req, res) => {
    console.log(req.url);

    res.send(
      {
        name: 'g17',
        age: 18
      }
    )
  })
  app.post('/test', correct)
  app.post('/update', (req, res) => {
    let code = 200;
    console.log(123);
    console.log(req.body);

    res.status(code).send({
      code,
      msg: '上传成功！'
    })
  })
  app.get('/login', (req, res) => {
    if (req.query.userName && req.query.passWord) {
      if (users.some(v => v.userName === req.query.userName && v.passWord === req.query.passWord)) {
        const token =
          'Bearer ' +
          jwtToken.sign(
            {
              _name: 'bar',
            },
            'loveY',
            {
              expiresIn: 3600 * 24 * 3,
            }
          );
        return res.send({
          code: 200,
          msg: '登录成功！',
          data: token,
        });
      }
    }

    return res.send({
      code: 400,
      msg: '您的用户名或密码错误！',
    });
  });
  app.post('/register', express.urlencoded({ extended: false }), (req, res) => {
    console.log(req.body);
    console.log(req.body.userName);

    if (req.body.userName && req.body.passWord) {
      users.push({
        userName: req.body.userName,
        passWord: req.body.passWord,
      });

      return res.send({
        code: 200,
        msg: '注册成功！',
      });
    }

    return res.send({
      code: 400,
      msg: '参数错误！',
    });
  });
  app.get('/verification', jwt({ secret: 'loveY', algorithms: ['HS256'] }), (req, res) => {
    if (req.user._name)
      return res.send({
        code: 200,
        msg: '验证成功',
      });
  });
  app.post('/verification/content', jwt({ secret: 'loveY', algorithms: ['HS256'] }), express.json(), (req, res) => {
    contentArr.push({ message: req.body.message, name: req.body.un, date: Date.now() });

    res.send({
      code: 200,
      msg: '发送成功！',
    });
  });
  app.get('/get/content', jwt({ secret: 'loveY', algorithms: ['HS256'] }), (req, res) => {
    res.send({
      code: 200,
      data: contentArr.sort((a, b) => b.date - a.date),
    });
  });
  app.use(function (err, req, res, next) {
    if (err.code === 'credentials_bad_format') {
      return res.send({
        code: 401,
        msg: '登录认证失败！',
      });
    }

    return res.send({
      code: 500,
      msg: '未知系统错误',
    });
  });

  module.exports = {
    router,
    app
  }

  app.listen(8700);
})();
