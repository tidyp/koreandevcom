const express = require("express");
const router = express.Router();
const axios = require("axios");
const db = require("../../config/db");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();

const GOOGLE_LOGIN_REDIRECT_URI =
  "http://localhost:3000/api/googleAuth/callback";

// 회원가입
router.get("/login", (req, res) => {
  let url = "https://accounts.google.com/o/oauth2/v2/auth";
  url += `?client_id=${process.env.GOOGLE_CLIENT_ID}`;
  url += `&redirect_uri=${GOOGLE_LOGIN_REDIRECT_URI}`;
  url += "&response_type=code";
  url += "&scope=email profile";

  res.redirect(url);
});

router.get("/callback", async (req, res) => {
  const { code } = req.query;

  // 구글 토큰 정보
  const resp = await axios.post("https://oauth2.googleapis.com/token", {
    code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: GOOGLE_LOGIN_REDIRECT_URI,
    grant_type: "authorization_code",
  });

  // 사용자의 구글 계정 정보
  const resp2 = await axios.get(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      headers: {
        Authorization: `Bearer ${resp.data.access_token}`,
      },
    }
  );

  // 기존 회원 여부 확인 및 신규 회원 가입
  const googleId = resp2.data.id;
  const googleEmail = resp2.data.email;
  const googleImage = resp2.data.picture;

  try {
    const [rows, fields] = await db.query(
      "SELECT * FROM users_Google WHERE googleId = ? OR googleEmail = ?",
      [googleId, googleEmail]
    );

    // 이미 가입된 회원, 로그인
    if (rows.length > 0) {
      let userId = rows[0].id;
      res.cookie("userId", userId, {
        httpOnly: true,
        secure: true,
      });
      res.redirect("http://localhost:5173/");

      // 없는 회원, 신규 회원가입 + 추가 정보 입력
    } else {
      userId = uuidv4();
      await db.execute(
        "INSERT INTO users_Google (id, googleId, googleEmail, googleImage) VALUES (?, ?, ?, ?); INSERT INTO users (id, profileImage, createdAt, updatedAt, grade) values (1, ?, now(), now(), 5);",
        [userId, googleId, googleEmail, googleImage, googleImage]
      );
      res.cookie("userId", userId, {
        httpOnly: true,
        secure: true,
      });
      res.redirect("http://localhost:5173/signup");
    }
  } catch (error) {
    console.error("Database query error: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
