// login && register
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

const User = require("../../models/User")

// 注册接口
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      // 在模型中查找当前注册邮箱
      if (user) {
        // 如果该账户已经存在已存在， 返回一个JSON类型的响应
        return res.status(400).json("邮箱已被注册!")
      } else {
        // 应用gravatar
        const avatar = gravatar.url(req.body.email, {s: '200', r: 'pg', d: 'mm'});

        // 否则创建一个新用户
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password,
          identity: req.body.identity
        })

        // 使用bcrypt对用户的密码进行加密
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(newUser.password, salt, function (err, hash) {
            if(err) throw err;
            newUser.password = hash;
            newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
          });
        });
      }
    })
})

// 登录接口
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // 根据参数对象中的email属性查询数据库
  User.findOne({email})
      // 查询后会返回整个对象
      .then(user => {
        if(!user){
          return res.status(404).json("用户不存在");
        }

        // 使用bcrypt对密码进行比较
        bcrypt.compare(password, user.password)
              .then(isMatch => {
                if(isMatch){
                  // 定义jwt规则
                  const rule = {
                    id: user.id, 
                    name: user.name,
                    avatar: user.avatar,
                    identity: user.identity
                  }

                  // 获取token
                  jwt.sign(rule,keys.secretOrKey,{expiresIn:'24h'},(err, token) => {
                    if(err) throw err;
                    res.json({
                      success: true,
                      // token 前面必须加上Bearer{+空格}字符串才能通过验证
                      token:"Bearer " + token
                    })  
                  })
                }else {
                  return res.status(400).json("密码错误")
                }
              })
      })
})

router.get("/current",passport.authenticate("jwt", {session:false}),(req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    identity: req.user.identity
  });
})

module.exports = router;