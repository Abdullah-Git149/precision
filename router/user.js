const express = require("express");
const router = new express.Router();
const User = require("../models/user");
const auth = require("../middleware/auth");

router.post("/createUser", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(401).send(e);
  }
});
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({ user, token });
  } catch (e) {
    res.status(401).send();
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});
router.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((tok) => {
      return tok.token !== req.token;
    });
    await req.user.save()
    res.send(`${req.user.email} you are successfully logout`)
  } catch (e) {
    res.status(401).send(e);
  }
});

module.exports = router;
