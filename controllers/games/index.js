const mysql = require("../../database/database");
const { gameSchema } = require("../../validation/games.schema");
const sqlquery = require("../../services/index");
const { parse } = require("path");
module.exports = {
  async add_games(req, res) {
    try {
      const {
        name,
        description,
        game_url,
        min_players_count,
        max_players_count,
        category,
      } = req.body;
      const result = gameSchema.validate(req.body);
      if (result.error) {
        return res.status(400).send({
          status: 400,
          message: "failed",
          reason: result.error.details[0].message,
        });
      }
      const Exist = await mysql(sqlquery.SqlQuery.isExistgame, [name]);
      if (Exist && Exist.length >= 1) {
        return res.status(400).send({
          status: 400,
          message: "failed",
          reason: "Game name already exist",
        });
      }
      const categoryId = await mysql(sqlquery.SqlQuery.findCategory, [
        category,
      ]);
      if (categoryId && categoryId.length === 0) {
        return res.send({ message: "failed", reaason: "category not found" });
      }

      const insertGame = await mysql(sqlquery.SqlQuery.addGames, [
        name,
        description,
        game_url,
        min_players_count,
        max_players_count,
        categoryId[0].id,
        req.file.filename,
      ]);
      return res.status(200).send({
        status: 200,
        message: "Successfully added the Game",
        result: insertGame.insertId,
      });
    } catch (err) {
      return res.status(500).send({
        status: 500,
        message: "Something went wrong",
        error: err.message,
      });
    }
  },
  async edit(req, res) {
    try {
      let id = req.query.id;
      const list = await mysql(sqlquery.SqlQuery.editGame, id);
      if (list && list.length >= 1) {
        return res
          .status(200)
          .send({ status: 200, message: "success", data: list });
      } else {
        return res
          .status(400)
          .send({ status: 400, message: "failed", data: "No record found" });
      }
    } catch (err) {
      return res.status(500).send({
        status: 500,
        message: "failure",
        reason: "something went wrong",
        error: err.message,
      });
    }
  },
  async filter(req, res) {
    try {
      const page = req.query && req.query.page ? req.query.page : 1;
      const limit = req.query && req.query.limit ? req.query.limit : 10;
      let offset;
      offset = (page - 1) * limit;
      offset = Number.isNaN(offset) ? 0 : offset;
      const findCategory = await mysql(sqlquery.SqlQuery.findCategory, [
        req.query.category,
      ]);
      if (findCategory && findCategory.length === 0)
        return res.send({ status: 400, message: "Category not found" });

      const result = await mysql(sqlquery.SqlQuery.filterGames, [
        findCategory[0].id,
        parseInt(limit),
        parseInt(offset),
      ]);
      console.log(result);
      if (result && result.length >= 1) {
        const response = {
          pageCount: result.length,
          PageNo: page,
          Result: result,
        };
        return res
          .status(200)
          .send({ status: 200, message: "success", data: response });
      } else {
        return res
          .status(400)
          .send({ status: 400, message: "failed", data: "No record found" });
      }
    } catch (err) {
      return res.status(500).send({
        status: 500,
        message: "failure",
        reason: "something went wrong",
        error: err.message,
      });
    }
  },
  async list(req, res) {
    try {
      const page = req.query && req.query.page ? req.query.page : 1;
      const limit = req.query && req.query.limit ? req.query.limit : 3;
      let offset;
      let values;
      offset = (page - 1) * limit;
      offset = Number.isNaN(offset) ? 0 : offset;
      values = [parseInt(limit), parseInt(offset)];
      const result = await mysql(sqlquery.SqlQuery.listGame, values);
      if (result && result.length >= 1) {
        const response = {
          pageCount: result.length,
          PageNo: page,
          Result: result,
        };
        return res
          .status(200)
          .send({ status: 200, message: "success", data: response });
      } else {
        return res
          .status(400)
          .send({ status: 400, message: "failed", data: "No record found" });
      }
    } catch (err) {
      return res.status(500).send({
        status: 500,
        message: "failure",
        reason: "something went wrong",
        error: err.message,
      });
    }
  },

  async update(req, res) {
    try {
      const Exist = await mysql(sqlquery.SqlQuery.isExistId, [req.body.id]);
      if (Exist && Exist.length === 0) {
        return res
          .status(400)
          .send({ status: 400, message: "Failed", reason: "Id not exist" });
      }
      const categoryId = await mysql(sqlquery.SqlQuery.findCategory, [
        req.body.category,
      ]);
      if (categoryId && categoryId.length === 0) {
        return res.send({ message: "failed", reaason: "category not found" });
      }
      const updateGame = await mysql(sqlquery.SqlQuery.updateGame, [
        req.body.name,
        req.body.description,
        req.body.game_url,
        req.body.min_players_count,
        req.body.max_players_count,
        categoryId[0].id,
        new Date(),
        req.file.filename,
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
        error: err,
      });
    }
  },
  async delete(req, res) {
    try {
      const Exist = await mysql(sqlquery.SqlQuery.isExistId, [req.query.id]);
      if (Exist && Exist.length === 0) {
        return res
          .status(400)
          .send({ status: 400, message: "Failed", reason: "Id not exist" });
      }
      const deleteGame = await mysql(sqlquery.SqlQuery.deleteGame, [
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
