
// classe que irá desenhar o nosso tabuleiro 21/06/2024
class Tabuleiro{

    constructor(){
        this.coluna = 10;
        this.fileira = 20;
        this.lado_celula = 25;
        this.largura = this.coluna * this.lado_celula;
        this.altura = this.fileira * this.lado_celula;
        this.posicao = createVector(
            borda_tabuleiro, 
            borda_tabuleiro + this.lado_celula
        );

        /*
        esta é a variavel responsavel pelos tetriminos armazenados
        */      
        this.armazenarTetrimino = []; // minosalmacenados
        for (let fileira = 0; fileira < this.fileira; fileira++) {
            this.armazenarTetrimino[fileira] = [];
            for (let coluna = 0; coluna < this.coluna; coluna++) {
                this.armazenarTetrimino[fileira].push("");
            }
        }
    }

    set tetriminosArmazenados(tetrimino) { //armazenarmino
        for (const pmino of tetrimino.mapaTabuleiro) {
            if (pmino.y < 0) {  


                /* 02/07/2024

                    fetch para inserir a pontuação no banco para posterior processamento e criação de ranking
                */
                var idAluno = sessionStorage.ID_USUARIO;
                var pontos = pontosFinais;
            
                    fetch(`/usuarios/pontos/${idAluno}`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            pontosServer: pontos
                        }),
                    })
                    .then(response => response.json())
                    .then(data => {
                        console.log('Pontuação Ranqueada Com Sucesso', data);
                        alert('Pontuação Ranqueada com sucesso!');
                    })
                    .catch(error => {
                        console.error('Erro ao Raquear seus Pontos', error);
                    });  

                // GAME OVER
                tabuleiro = new Tabuleiro()
                tetrimino = new Tetrimino()
                linhas_apagadas = 0
            }
            this.armazenarTetrimino[pmino.x][pmino.y] = tetrimino.nome
        }
        this.buscarLinhasApagar()
    }

    buscarLinhasApagar() {
        let linhas = [];
        for (let fileira = this.fileira-1; fileira >= 0; fileira--) {
            let agregar = true;
            for (let coluna = 0; coluna < this.coluna; coluna++) {
                if (!this.armazenarTetrimino[coluna][fileira]) {
                    agregar = false;
                    break
                }
            }
            if (agregar) {
                linhas.push(fileira)
            }
        }
        this.apagarTetriminos(linhas)
    }

    apagarTetriminos(linhas) {
        linhas_apagadas+=linhas.length;
        for (const linea of linhas) {
            for (let fileira = linea; fileira >= 0; fileira--) {
                for (let coluna = 0; coluna < this.coluna; coluna++) {
                    if (fileira == 0) {
                        this.armazenarTetrimino[coluna][fileira] = "";
                        continue;
                    }
                    this.armazenarTetrimino[coluna][fileira] = 
                    this.armazenarTetrimino[coluna][fileira - 1];
                }
            }
        }
    }
/* 
    A coordenada é uma transformaçãop no linear que possui um escalamento(multiplicação) 21/06/2024
    para ajustar as medidas e executa uma soma para ajustar as posições 21/06/2024
*/
    coordenada(x, y) {
        return createVector(x,y).mult(this.lado_celula).add(this.posicao);
    }

    // Aqui Ocorre o processamento Lógico do Tabuleiro 21/06/2024
    desenhar(){
        push()
        noStroke()
        for(let coluna = 0; coluna < this.coluna; coluna++) {
            for (let fileira = 0; fileira < this.fileira; fileira++) {
                if ((coluna+fileira) % 2 == 0) {
                    fill("#010204");
                } else {
                    fill("#0f0f0f");
                }
                let c = this.coordenada(coluna, fileira)
                rect(c.x, c.y, this.lado_celula)
            }
        }
        pop();
        this.fazerMinosArmazenados();
    }

    fazerMinosArmazenados() {
        push()
        for(let coluna = 0; coluna < this.coluna; coluna++) {
            for (let fileira = 0; fileira < this.fileira; fileira++) {
                let nomeMino = this.armazenarTetrimino[coluna][fileira];
                if (nomeMino) {
                    fill(tetriminosBase[nomeMino].color)
                    Tetrimino.desenharMino(this.coordenada(coluna, fileira));
                }
            }
        }
        pop()
    }
    
}