// @login & register
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const keys = require('../../config/keys');
const passport = require('passport');

const User = require('../../models/User');

// 引入验证方法
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// $route  GET api/users/test
// @desc   返回的请求的json数据
// @access public
router.get('/test', (req, res) => {
  res.json({ msg: 'login works' });
});

// $route  POST api/users/register
// @desc   返回的请求的json数据
// @access public
router.post('/register', (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  // 判断isValid是否通过
  if (!isValid) {
    return res.status(400).json(errors);
  }
  // 查询数据库中是否拥有邮箱
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json('邮箱已被注册!');
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200',
        r: 'pg',
        d: 'mm'
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        school: req.body.school,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;

          newUser.password = hash;

          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// $route  POST api/users/login
// @desc   返回token jwt passport
// @access public

router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  // 判断isValid是否通过
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  const email = req.body.email;
  const password = req.body.password;
  // 查询数据库
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json('用户不存在!');
    }

    // 密码匹配
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        const rule = { id: user.id, name: user.name, school: user.school,avatar: user.avatar };
        jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          if (err) throw err;
          res.json({
            success: true,
            token: 'Bearer ' + token
          });
        });
      } else {
        return res.status(400).json('密码错误!');
      }
    });
  });
});

// $route  GET api/users/current
// @desc   return current user
// @access Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      school: req.user.school,
      avatar: req.user.avatar
    });
  }
);

/**
 * router  GET api/users/all
 * desc    获取所有联系人的信息
 * access  Private
 */
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    User.find()
      .then(users => {
        if (!users) {
          errors.noprofile = '没有任何用户信息';
          return res.status(404).json(errors);
        }
        const newUsers = [];
        for (let i = 0; i < users.length; i++) {
          let usersObj = {};
          usersObj = {
            name: users[i].name,
            _id: users[i]._id,
            email: users[i].email,
            school: users[i].school,
            avatar: users[i].avatar,
            date: users[i].date
          };
          newUsers.push(usersObj);
        }

        res.json(newUsers);
      })
      .catch(err => res.status(404).json({ users: '没有任何用户信息' }));
  }
);

/**
 * router  GET api/users/:user_id
 * desc    通过user_id获取个人信息
 * access  Private
 */
router.get(
  '/:user_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    User.findOne({ _id: req.params.user_id })
      .populate('user', ['name', 'avatar'])
      .then(user => {
        if (!user) {
          errors.nouser = '未找到该用户信息';
          res.status(404).json(errors);
        }
        let usersObj = {};
        usersObj = {
          name: user.name,
          _id: user._id,
          email: user.email,
          school: user.school,
          avatar: user.avatar,
          date: user.date
        };
        res.json(usersObj);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
