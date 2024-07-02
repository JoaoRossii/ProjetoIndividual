class Tetrimino {
    constructor(nome = random(["Z","S","J","L","T","O","I"])){
        this.nome = nome;
        let base = tetriminosBase[nome];
        this.color = base.color;
        this.mapa = [];
        // for of
        for (const pmino of base.mapa) {
            this.mapa.push(pmino.copy())
        }
        this.posicao = createVector(int(tabuleiro.coluna / 2), 0);
    }

    moverDireita () {
        this.posicao.x++;
        if (this.movimentoErrado) {
            this.moverEsquerda()
        }
    }
    moverEsquerda () {
        this.posicao.x--;
        if (this.movimentoErrado) {
            this.moverDireita()
        }
    }
    moverBaixo () {
        this.posicao.y++;
        if (this.movimentoErrado) {
            this.moverCima()
            if (tetrimino == this) {
            tabuleiro.tetriminosArmazenados = this
            tetrimino = new Tetrimino();
            }
            return false
        }
        return true
    }
    moverCima () {
        this.posicao.y--;
    }

    porNoFundo(){
        this.posicao = this.espectro.posicao;
        this.moverBaixo()
    }

    girar(){
        for (const pmino of this.mapa) {
            pmino.set(pmino.y, -pmino.x)
        }
        let saiu = !this.DentroDoTabuleiro;
        if (saiu) {
            this.desgirar()
        }
    }

    desgirar(){
        for (const pmino of this.mapa) {
            pmino.set(-pmino.y, pmino.x)
        }
    }

    get movimentoErrado() {
        let saiu = !this.DentroDoTabuleiro;
        return saiu || this.colisaoMinosArmazenados;
    }

    get colisaoMinosArmazenados() {
        for(const pmino of this.mapaTabuleiro) {
            if(tabuleiro.armazenarTetrimino[pmino.x][pmino.y]) {
                return true;
            } 
        }
        return false;
    }

    get DentroDoTabuleiro() {
        for (const pmino of this.mapaTabuleiro) {
            if (pmino.x < 0) { // evita saida a esquerda
                return false;
            }
            if (pmino.x >= tabuleiro.coluna) { // evita saida a direita
                return false;
            }
            if (pmino.y >= tabuleiro.fileira) { // evita saida para baixo
                return false;
            }
        }
        return true;
    }

    get mapaTabuleiro() {
        let retorno = [];
        for (const pmino of this.mapa) {
            let copia = pmino.copy().add(this.posicao);
            retorno.push(copia)
        }
        return retorno;
    }

    get mapaCanvas() {
        let retorno = [];
        for (const pmino of this.mapa) {
            let copia = pmino.copy().add(this.posicao);
            retorno.push(tabuleiro.coordenada(copia.x, copia.y))
        }
        return retorno;
    }
    /*
        Esta função é responsavel pelo processamento logico de desenhar este objeto 21/06/2024
    */
    desenhar(){
        push();
        fill(this.color);
        for (const pmino of this.mapaCanvas)  {
            Tetrimino.desenharMino(pmino);
        }
        pop();
        if (tetrimino==this) {
            this.desenharEspectro();
        }
    }

    desenharEspectro() {
        this.espectro = new Tetrimino(this.nome)
        this.espectro.posicao = this.posicao.copy()
        for (let i = 0; i < this.mapa.length; i++) {
            this.espectro.mapa[i] = this.mapa[i].copy()
        }
        while (this.espectro.moverBaixo()); 
        push()
        drawingContext.globalAlpha = 0.4
        this.espectro.desenhar();
        pop()
    }
    
    static desenharMino(pmino) {
        rect(pmino.x, pmino.y, tabuleiro.lado_celula);
        push();
        noStroke();
        fill(255, 255, 255, 80)
        beginShape()
        vertex(pmino.x, pmino.y)
        vertex(pmino.x + tabuleiro.lado_celula, pmino.y)
        vertex(pmino.x + tabuleiro.lado_celula, pmino.y + tabuleiro.lado_celula )
        endShape(CLOSE)
        beginShape()
        fill(0, 0, 0, 80)
        vertex(pmino.x, pmino.y)
        vertex(pmino.x ,pmino.y + tabuleiro.lado_celula)
        vertex(pmino.x + tabuleiro.lado_celula, pmino.y + tabuleiro.lado_celula )
        endShape(CLOSE)
        pop();
    }
}



function criarBaseTetriminos() {
    tetriminosBase = {
        "Z": {
            color:"red",
            mapa: [
                createVector(),
                createVector(-1,-1),
                createVector(0,-1),
                createVector(1,0)  
            ]
        },
        "S": {
            color:"green",
            mapa: [
                createVector(),
                createVector(1,-1),
                createVector(0,-1),
                createVector(-1,0)
            ]
        },
        "J": {
            color:"orange",
            mapa: [
                createVector(),
                createVector(-1,0),
                createVector(-1,-1),
                createVector(1,0)
            ]
        },
        "L": {
            color:"blue",
            mapa: [
                createVector(),
                createVector(-1,0),
                createVector(1,-1),
                createVector(1,0)
            ]
        },
        "T": {
            color:"magenta",
            mapa: [
                createVector(),
                createVector(-1,0),
                createVector(1,0),
                createVector(0,-1)
            ]
        },
        "O": {
            color:"yellow",
            mapa: [
                createVector(),
                createVector(0,-1),
                createVector(1,-1),
                createVector(1,0)       
            ]
        },
        "I": {
            color:"cyan",
            mapa: [
                createVector(),
                createVector(-1,0),
                createVector(1,0),
                createVector(2,0)
                
            ]
        }
    }
}