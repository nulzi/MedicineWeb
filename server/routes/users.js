const express = require("express");
const router = express.Router();
const {
  createAccount,
  deleteAccount,
  login,
  logout,
  showProfile,
  updateUserInfo,
  checkPassword,
  findId,
  findPassword,
  checkNicknameDuplication,
  checkIdDuplication,
} = require("../controllers/userController");
const validateHandler = require("../middlewares/validateHandler");
const {
  joinValidator,
  loginValidator,
  userInfoValidator,
  checkPwdIValidator,
  dupCheckNicknameValidator,
  dupCheckIdValidator,
  findIdValidator
} = require("../validators/authValidator");
const authenticateJWT = require("../middlewares/auth");

router.post("/join", joinValidator, validateHandler, createAccount);
router.delete("/resign", authenticateJWT, deleteAccount);
router.post("/login", loginValidator, validateHandler, login);
router.post("/logout", authenticateJWT, logout);
router.get("/profile", authenticateJWT, showProfile); // 추후 작업예정 drug, favorite 이후
router.put("/userInfo", authenticateJWT, userInfoValidator, validateHandler, updateUserInfo);
router.post("/checkPwd", authenticateJWT, checkPwdIValidator, validateHandler, checkPassword);
router.post("/findId", findIdValidator, validateHandler, findId);
router.post("/findPwd", findPassword); // 이이디와 같은 브랜치 작업예정이므로 추후 구현 예정
router.post("/dupCheckNickname", dupCheckNicknameValidator, validateHandler, checkNicknameDuplication);
router.post("/dupCheckId", dupCheckIdValidator, validateHandler, checkIdDuplication);

module.exports = router;
