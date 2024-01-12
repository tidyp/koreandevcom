const express = require("express");
const router = express.Router();
const path = require("path");
const db = require("../../config/db");
require("dotenv").config();

// 댓글 목록 보기
router.get("/:postId", async (req, res) => {
  try {
    const postId = req.params.postId;
    const sql = `
    SELECT c.postId AS postId
        , c.id AS id
        , c.mainId AS mainId
        , c.content AS content
        , c.createdAt AS createdAt
        , c.updatedAt AS updatedAt
        , u.id AS userId
        , u.userName AS userName
        , u.grade AS grade
    FROM comments c 
    LEFT OUTER JOIN users u ON c.userId = u.id 
    ORDER BY c.postId, c.id, c.mainId, c.createdAt ASC
    `;
    const [rows, fields] = await db.query(sql, [postId]);
    res.send(rows);
  } catch (err) {
    console.error("Error fetching comments: " + err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 댓글 작성
router.post("/:postId?", async (req, res) => {
  try {
    const postId = req.params.postId;
    const { userId, content } = req.body;
    const createdAt = new Date();
    const updatedAt = new Date();

    const sql =
      "INSERT INTO comments (userId, postId, content, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?)";
    const result = await db.query(sql, [
      userId,
      postId,
      content,
      createdAt,
      updatedAt,
    ]);

    const newComment = {
      id: result.insertId,
      userId,
      postId,
      content,
      createdAt,
      updatedAt,
    };

    res.status(201).json(newComment);
  } catch (err) {
    console.error("Error creating comment: " + err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// 댓글 수정
router.put("/:id?", async (req, res) => {
  const commentId = req.params.id;
  const content = req.body.content;
  const updatedAt = new Date();

  const updateSql = `UPDATE comments SET content = ?, updatedAt = ? WHERE id = ?`;

  try {
    const [rows, fields] = await db.query(updateSql, [
      content,
      updatedAt,
      commentId,
    ]);
    res.send(rows);
  } catch (err) {
    console.error("Query execution error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// 댓글 삭제
router.delete("/:id?", async (req, res) => {
  const commentId = req.params.id;
  const sql = "DELETE FROM comments WHERE id = ?";

  try {
    const [rows, fields] = await db.query(sql, [commentId]);
    res.send(rows);
  } catch (err) {
    console.error("Query execution error:", err);
    res.status(500).send("Internal Server Error");
  }
});

// 대댓글 작성
router.post("/sub/:id?", async (req, res) => {
  try {
    const commentId = req.params.id;
    const { userId, postId, content } = req.body;

    const insertSql = `INSERT INTO comments (userId, postId, mainId, content, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())`;

    const [rows, fields] = await db.query(insertSql, [
      userId,
      postId,
      commentId,
      content,
    ]);

    res.send(rows);
  } catch (err) {
    console.error("Error creating comment: " + err.stack);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
