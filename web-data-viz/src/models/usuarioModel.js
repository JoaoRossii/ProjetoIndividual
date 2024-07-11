var database = require("../database/config");

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT ra, nome, email, senha  FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(ra, nome, email, senha, conhece) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", ra, nome, email, senha, conhece);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    // 02/07/2024 correção da inserção dos dados se conhece vaporwave
    var instrucaoSql = `
        INSERT INTO usuario (ra, nome, email, senha, vaporwave) VALUES ('${ra}', '${nome}', '${email}', '${senha}', '${conhece}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

/* 02/07/2024 - model de inserir pontos no banco
*/
function pontosInserir(pontos, idAluno) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",pontos, idAluno);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `
        INSERT INTO tetris (fkUsuario, pontos) VALUES ('${idAluno}', '${pontos}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function insert(respostasC, respostasI, id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function insert():", respostasC, respostasI, id);
    
    var instrucaoSql = `
        INSERT INTO quiz (certas, erradas, fkUsuario) VALUES ('${respostasC}', '${respostasI}', '${id}');
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function mapear(id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function mapear():", id);
    
    var instrucaoSql = `
        SELECT sum(certas) AS 'Acertos', sum(erradas) AS 'Erros' FROM quiz WHERE fkUsuario = '${id}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function dashboardQuiz(id) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function dashboardQuiz():", id);
    
    var instrucaoSql = `
        SELECT sum(certas) AS Acertos, sum(erradas) AS Erros FROM quiz WHERE fkUsuario = '${id}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function dashboardQuizAtual(idAluno) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function dashboardQuizAtual():", idAluno);
    
    var instrucaoSql = `
        SELECT certas as acertos, erradas as erros FROM quiz where fkUsuario = '${idAluno}' order by idQuiz desc limit 1 ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// 05/07/2024 - Model rank do tetris
function tetris() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function dashboardQuizAtual():", );
    
    var instrucaoSql = `
       SELECT nome, pontos FROM (SELECT nome, pontos FROM tetris JOIN usuario ON ra = fkUsuario  ORDER BY pontos DESC LIMIT 10) AS Top10 ORDER BY pontos ASC;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

// 10/07/2024 - Model do percentual de usuarios
function nossosUsuarios() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function dashboardQuizAtual():", );
    
    var instrucaoSql = `
       select vaporwave from usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    autenticar,
    cadastrar,
    insert,
    mapear,
    dashboardQuiz,
    dashboardQuizAtual,
    pontosInserir,
    tetris,
    nossosUsuarios
};