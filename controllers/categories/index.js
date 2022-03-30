const mysql = require("../../database/database");
const { categorySchema } = require("../../validation/category.schema");
const sqlquery = require("../../services/index");

module.exports = {
  async add_category(req, res) {
    try {
      const { name } = req.body;
      const result = categorySchema.validate(req.body);
      if (result.error) {
        return res.status(400).send({
          status: 400,
          message: "failed",
          reason: result.error.details[0].message,
        });
      }
      const Exist = await mysql(sqlquery.SqlQuery.isExistCategory, [name]);
      if (Exist && Exist.length >= 1) {
        return res.status(400).send({
          status: 400,
          message: "failed",
          reason: "Category already exist",
        });
      }
      const insertCategory = await mysql(sqlquery.SqlQuery.addCategory, [name]);
      return res
        .status(200)
        .send({ status: 200, message: "Successfully added the category" });
    } catch (err) {
      return res.status(500).send({
        status: 500,
        message: "Something went wrong",
        error: err.message,
      });
    }
  },
  async list(req, res) {
    try {
      let id = req.query.id;
      let query;
      let value;
      if (id) {
        query = sqlquery.SqlQuery.editCategory;
        value = id;
      } else {
        query = sqlquery.SqlQuery.listCategory;
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
      const Exist = await mysql(sqlquery.SqlQuery.isExistCategoryId, [
        req.body.id,
      ]);
      if (Exist && Exist.length == 0) {
        return res
          .status(400)
          .send({ status: 400, message: "Failed", reason: "Id not exist" });
      }
      const updateGame = await mysql(sqlquery.SqlQuery.updateCategory, [
        req.body.name,
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
      const Exist = await mysql(sqlquery.SqlQuery.isExistCategoryId, [
        req.query.id,
      ]);
      console.log("error");
      if (Exist && Exist.length == 0) {
        return res
          .status(400)
          .send({ status: 400, message: "Failed", reason: "Id not exist" });
      }
      const deleteGame = await mysql(sqlquery.SqlQuery.deleteCategory, [
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
