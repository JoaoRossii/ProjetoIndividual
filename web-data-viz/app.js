// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
// var avisosRouter = require("./src/routes/avisos");
// var medidasRouter = require("./src/routes/medidas");
// var aquariosRouter = require("./src/routes/aquarios");
// var empresasRouter = require("./src/routes/empresas");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
// app.use("/avisos", avisosRouter);
// app.use("/medidas", medidasRouter);
// app.use("/aquarios", aquariosRouter);
// app.use("/empresas", empresasRouter);

app.listen(PORTA_APP, function () {
    console.log(`
    
                                                                                                     
                                   :                                                                 
                                  t#,                                                              ,;
                      t          ;##W.   j.                                                      f#i 
                   .. ED.       :#L:WE   EW,                  ;                ..              .E#t  
  t      .DD.     ;W, E#K:     .KG  ,#D  E##j               .DL               ;W, t      .DD. i#W,   
  EK:   ,WK.     j##, E##W;    EE    ;#f E###D.     f.     :K#L     LWL      j##, EK:   ,WK. L#D.    
  E#t  i#D      G###, E#E##t  f#.     t#iE#jG#W;    EW:   ;W##L   .E#f      G###, E#t  i#D :K#Wfff;  
  E#t j#f     :E####, E#ti##f :#G     GK E#t t##f   E#t  t#KE#L  ,W#;     :E####, E#t j#f  i##WLLLLt 
  E#tL#i     ;W#DG##, E#t ;##D.;#L   LW. E#t  :K#E: E#t f#D.L#L t#K:     ;W#DG##, E#tL#i    .E#L     
  E#WW,     j###DW##, E#ELLE##K:t#f f#:  E#KDDDD###iE#jG#f  L#LL#G      j###DW##, E#WW,       f#E:   
  E#K:     G##i,,G##, E#L;;;;;;, f#D#;   E#f,t#Wi,,,E###;   L###j      G##i,,G##, E#K:         ,WW;  
  ED.    :K#K:   L##, E#t         G#t    E#t  ;#W:  E#K:    L#W;     :K#K:   L##, ED.           .D#; 
  t     ;##D.    L##, E#t          t     DWi   ,KK: EG      LE.     ;##D.    L##, t               tt 
        ,,,      .,,                                ;       ;@      ,,,      .,,                     
                                                                                                     

    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
