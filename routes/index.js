const games = require("../controllers/games/index");
const category = require("../controllers/categories/index");
const users = require("../controllers/users/index");
const likes = require("../controllers/likes/index");
const multer= require("multer");
const path= require("path");
const getToken =  require("../utility");
module.exports = (app) => {
  const storage = multer.diskStorage({
    destination: "./upload/image",
    filename: (req, file, cb) => {
      return cb(
        null,
        `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
      );
    },
  });
  const upload = multer({
    storage: storage,
  });

  // Games
  app.post("/fidigames/add_games", getToken.verifyToken, upload.single('image'), games.add_games);
  app.get("/fidigames/edit",getToken.verifyToken, games.edit);
  app.get("/fidigames/list", getToken.verifyToken, games.list);
  app.get("/fidigames/filter", getToken.verifyToken, games.filter);
  app.put("/fidigames/update", getToken.verifyToken, upload.single('image'),games.update);
  app.delete("/fidigames/delete", getToken.verifyToken, games.delete);

  //Category
  app.post("/fidigames/add_category", getToken.verifyToken, category.add_category);
  app.get("/fidigames/list_category", getToken.verifyToken, category.list);
  app.put("/fidigames/update_category", getToken.verifyToken, category.update);
  app.delete("/fidigames/delete_category", getToken.verifyToken, category.delete);

  // likes
  app.post("/fidigames/addLikes", getToken.verifyToken, likes.addLike);

  //Users
  app.post("/fidigames/user_register",  users.register);
  app.post("/fidigames/user_login", users.login);
  app.get("/fidigames/user_list", getToken.verifyToken, users.list);
  app.put("/fidigames/update_user", getToken.verifyToken, users.update);
  app.delete("/fidigames/delete_user", getToken.verifyToken, users.delete);

}