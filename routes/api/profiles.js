// login && register
const express = require("express");
const router = express.Router();
const passport = require("passport");

const Profile = require("../../models/Profile")

router.get("/test", (req, res) => {
  res.json({ msg: 'profile works' });
})

// 添加信息接口
router.post("/add", passport.authenticate("jwt", { session: false }), (req, res) => {
  const profileFields = {};

  if(req.body) {
    profileFields.type = req.body.type;
    profileFields.describe = req.body.describe;
    profileFields.income = req.body.income;
    profileFields.expend = req.body.expend;
    profileFields.cash = req.body.cash;
    profileFields.remark = req.body.remark;
  }

  new Profile(profileFields).save().then(profile => {
    res.json(profile);
  })
})

// 获取全部信息接口
router.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.find()
  .then(profile => {
    if(!profile) {
      return res.status(404).json("没有内容"); 
    }

    res.json(profile);
  })
  .catch(err => res.status(404).json(err));
})

// 获取单条信息接口
router.get("/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOne({_id:req.params.id})
  .then(profile => {
    if(!profile) {
      return res.status(404).json("没有内容"); 
    }

    res.json(profile);
  })
  .catch(err => res.status(404).json(err));
})

// 编辑信息接口
router.post("/edit/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  const profileFields = {};

  Profile.findOneAndUpdate(
    {_id: req.params.id},
    {$set: profileFields},
    {new: true}
  ).then(profile => res.json(profile));
})

// 删除信息接口
router.delete("/delete/:id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Profile.findOneAndRemove({_id: req.params.id})
    .then(profile => {
      profile.save()
        .then(profile => res.json(profile))
    })
    .catch(err => res.status(404).json("删除失败"))
})

module.exports = router;