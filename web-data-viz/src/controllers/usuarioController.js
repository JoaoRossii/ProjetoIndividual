var usuarioModel = require("../models/usuarioModel");
// var aquarioModel = require("../models/aquarioModel");

function autenticar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);

                    // if (resultadoAutenticar.length > 0) {
                        res.json({
                            ra: resultadoAutenticar[0].ra,
                            email: resultadoAutenticar[0].email,
                            nome: resultadoAutenticar[0].nome,
                        });
                    // } else {
                    //     res.status(204).json({ aquarios: [] });
                    // }
                            
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var ra = req.body.raServer;
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    // Faça as validações dos valores
    if (ra == undefined) {
        res.status(400).send("Seu ra está undefined!");
    } else if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(ra, nome, email, senha)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}


// 02/07/2024 Criação do controller para armazenar os pontos do tetris e quem os fez.
function pontos(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var idAluno = req.params.idAluno;
    var pontos = req.body.pontosServer;

    if (pontos == undefined) {
        res.status(400).send("Seu ra está undefined!");
    } 

        usuarioModel.pontosInserir(pontos, idAluno)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro raquear você! Erro:",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }


function insert(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var respostasC = req.body.respostasCorretasServer;
    var respostasI = req.body.respostasIncorretasServer;
    var id = req.body.idUsuarioServer;

    if (respostasC == undefined) {
        res.status(400).send("Sua resposta está undefined!");
    } else if (respostasI == undefined) {
        res.status(400).send("Sua resposta está undefined!");
    } else if (id == undefined) {
        res.status(400).send("Seu id está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.insert(respostasC, respostasI, id)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}
function mapear(req, res) {

    var id = req.body.idUsuarioServer;
    usuarioModel.mapear(id).then(
        function(metricas){
            res.json({
                metricas
            })
        }
    )
}

function dashboardQuiz(req, res) {
    const limite_linhas = 1;

    usuarioModel.dashboardQuiz(limite_linhas).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function dashboardQuizAtual(req, res) {
    var idAluno = req.params.idAluno;
    usuarioModel.dashboardQuizAtual(idAluno).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
    autenticar,
    cadastrar,
    insert,
    mapear,
    dashboardQuiz,
    dashboardQuizAtual,
    pontos
}