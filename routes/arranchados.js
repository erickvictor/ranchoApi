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
      data ='${date}') AS newRancho ON M.cpf = newRancho.cpf
    ORDER BY
      arranchamentoId desc,
      M.hierarquia`;
  // console.log(date);
  // console.log(sql);
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 200,
      data,
      message: "Arranchados lists retrieved successfully",
    });
  });
});

// create new user
router.post("/new", function (req, res) {
  let sql = `INSERT INTO arranchamento(cpf, data, cafe, almoco, jantar, hierarquia) VALUES (?)`;
  let values = [
    req.body.cpf,
    req.body.data,
    req.body.cafe,
    req.body.almoco,
    req.body.jantar,
    req.body.hierarquia,
  ];
  console.log(values);
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 201,
      message: "New user added successfully",
    });
  });
});

// update new user
router.put("/:id", function (req, res) {
  const id = req.params.id;
  console.log(req.body);
  let sql = `UPDATE arranchamento SET ? WHERE id=${id}`;
  let values = {
    cpf: req.body.cpf,
    data: req.body.data,
    cafe: req.body.cafe,
    almoco: req.body.almoco,
    jantar: req.body.jantar,
    hierarquia: req.body.hierarquia,
  };
  db.query(sql, [values], function (err, data, fields) {
    if (err) throw err;
    res.json({
      status: 201,
      message: "Update user added successfully",
    });
  });
});

module.exports = router;
