var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

// 02/07/2024 criação da rota para envio dos pontos e aluno que fez os pontos 
router.post("/pontos/:idAluno", function (req, res) {
    usuarioController.pontos(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.post("/insert", function (req, res) {
    usuarioController.insert(req, res);
});

router.post("/mapear", function (req, res) {
    usuarioController.mapear(req, res);
});

router.get("/dashboardQuiz", function (req, res) {
    usuarioController.dashboardQuiz(req, res);
});

// 05/07/2024 - Rota do rank do Tetris
router.get("/tetris", function (req, res) {
    usuarioController.tetris(req, res);
});

router.get("/dashboardQuizAtual/:idAluno", function (req, res) {
    usuarioController.dashboardQuizAtual(req, res);
});

module.exports = router;