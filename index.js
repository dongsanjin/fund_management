const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const app = express();

// 引入模型
const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');

// DB 配置
const db = require("./config/keys").mongoURL;

// 使用body-parser中间件对post请求进行解析
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// passport初始化
app.use(passport.initialize());

require("./config/passport")(passport);

mongoose.connect(db, { useNewUrlParser: true })
        .then(() => {console.log("mongodb connected")})
        .catch(err => console.log(err));
        
// 使用router
app.use("/api/users",users);
app.use("/api/profiles",profiles);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running on port ${port}`);
})