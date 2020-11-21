const express = require("express"),
  router = express.Router();

// get arranchados lists
router.get("/list/:date", function (req, res) {
  const date = req.params.date;
  let sql = `SELECT 
    M.id AS militarId,
    M.nomeguerra,
    M.cpf,
    M.hierarquia,
    M.posto,
    newRancho.Id AS arranchamentoId,
    DATE_FORMAT(newRancho.data, '%Y-%m-%d') AS data,
    newRancho.cafe,
    newRancho.almoco,
    newRancho.jantar
  FROM
    militares AS M
  LEFT JOIN
    (SELECT 
      *
    FROM
      arranchamento
    WHERE
      data ='${date}') AS newRancho ON M.cpf = newRancho.cpf`;
  console.log(date);
  console.log(sql);
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Arranchados lists retrieved successfully",
    });
  });
});

module.exports = router;
