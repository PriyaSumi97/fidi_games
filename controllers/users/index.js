const bcrypt = require("bcrypt");
const mysql = require("../../database/database");
const jwt = require("jsonwebtoken");
const sqlquery = require("../../services/index");
const { userSchema } = require("../../validation/user.schema")
module.exports = {
  // REGISTER A USER
  async register(req, res) {
    const { username, email, password, address } = req.body;
    const validation = userSchema.validate(req.body);
    if (validation.error) {
      return res.status(400).send({
        status: 400,
        message: "failed",
        reason: validation.error.details[0].message,
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const isExistUser = await mysql(sqlquery.SqlQuery.isExistUser, [username]);
    const isExistEmail = await mysql(sqlquery.SqlQuery.isExistEmail, [email]);
    if (isExistUser && isExistUser.length >= 1) {
      return res.status(400).send({
        status: 400,
        message: "failed",
        reason: " Username already exist",
      });
    }
    if (isExistEmail && isExistEmail.length >= 1) {
      return res.status(400).send({
        status: 400,
        message: "failed",
        reason: " email already exist",
      });
    }

    const result = await mysql(sqlquery.SqlQuery.addUsers,
      [username, email, hashedPassword, address]
    );
    return res.status(201).send({ status:201, message: "Registered Successfully", res: result });
  },
  async login(req, res) {
    const user = await mysql(sqlquery.SqlQuery.userLogin, [
      req.body.username,
    ]);
    if (user && user.length == 0) {
      return res.status(400).send({
        status: 400,
        message: "failed",
        reason: " User does not exist",
      });
    }
    if (await bcrypt.compareSync(req.body.password, user[0].password)) {
      const token = jwt.sign(
        { id: user[0].id, username: user[0].username },
        "FiD!G#Es$",
        { expiresIn: "12h" }
      );
      return res
        .header("Token", token)
        .status(200)
        .send({ status: 200, message: "login successful", Token: token });
    } else {
      return res
        .status(401)
        .send({ status: 401, message: "Password Incorrect!" });
    }
  },
  async list(req, res) {
    try {
      let id = req.query.id;
      let query;
      let value;
      if (id) {
        query = sqlquery.SqlQuery.editUsers;
        value = id;
      } else {
        query = sqlquery.SqlQuery.listUsers;
      }
      const list = await mysql(query, [value]);
      if (list && list.length >= 1) {
        return res
          .status(200)
          .send({ status: 200, message: "success", data: list });
      } else {
        return res
          .status(400)
          .send({ status: 400, message: "failed", data: "No record found" });
      }
    } catch {}
  },
  async update(req, res) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      const Exist = await mysql(sqlquery.SqlQuery.isExistUserId, [
        req.body.id,
      ]);
      if (Exist && Exist.length == 0) {
        return res
          .status(400)
          .send({ status: 400, message: "Failed", reason: "Id not exist" });
      }
      const updateGame = await mysql(sqlquery.SqlQuery.updateUser, [
        req.body.username,
        req.body.email,
        hashedPassword,
        req.body.address,
        new Date(),
        req.body.id,
      ]);
      return res
        .status(200)
        .send({ status: 200, message: "Updated Successfully" });
    } catch (err) {
      return res.status(500).send({
        status: 500,
        message: "failure",
        reason: "something went wrong",
        error: err.message,
      });
    }
  },
  async delete(req, res) {
    try {
      const Exist = await mysql(sqlquery.SqlQuery.isExistUserId, [
        req.query.id,
      ]);
      if (Exist && Exist.length == 0) {
        return res
          .status(400)
          .send({ status: 400, message: "Failed", reason: "Id not exist" });
      }
      const deleteUser = await mysql(sqlquery.SqlQuery.deleteUser, [
        req.query.id,
      ]);
      return res
        .status(200)
        .send({ status: 200, message: "Deleted Successfully" });
    } catch (err) {
      return res.status(500).send({
        status: 500,
        message: "failure",
        reason: "something went wrong",
        error: err.message,
      });
    }
  },
};
