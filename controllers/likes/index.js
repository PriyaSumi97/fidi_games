const mysql = require("../../database/database");
const sqlquery = require("../../services/index");

module.exports = {
  async addLike(req, res) {
    try {
        const isExistGameUserId = await mysql(
          sqlquery.SqlQuery.isExistGameUserId,
          [req.body.gameId, req.body.userId]
        );
        if (isExistGameUserId && isExistGameUserId.length >= 1) {
          const dislike = await mysql(sqlquery.SqlQuery.disLike, [req.body.gameId, req.body.userId]);
          return res.status(200).send({
            status: 200,
            message: "Success",
            reason: "Disliked",
          });

        }
        const isExistGameId = await mysql(sqlquery.SqlQuery.isExistId, [
          req.body.gameId,
        ]);
        const isExistUserId = await mysql(sqlquery.SqlQuery.isExistUserId, [
          req.body.userId,
        ]);
        if (
          isExistGameId &&
          isExistGameId.length >= 1 &&
          isExistUserId &&
          isExistUserId.length >= 1
        ) {
          const result = await mysql(sqlquery.SqlQuery.addLikes, [
            req.body.gameId,
            req.body.userId,
          ]);
          return res
            .status(200)
            .send({ status: 200, message: "Added Successfully" });
        }
        else {
            return res.send({
                status: 400,
                message: "failed",
                reason: "Id not found",
              }); 
        }
    } catch (e) {
      return res.status(500).send({ message: "something went worng" });
    }
  },
};
