const express = require("express"),
  router = express.Router();

// get user lists
router.get("/list", function (req, res) {
  let sql = `SELECT 
    nomeguerra, su, cpf, tipo_acesso, funcao, posto, hierarquia 
    FROM militares`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "User lists retrieved successfully",
    });
  });
});

module.exports = router;
