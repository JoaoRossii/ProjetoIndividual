// classe que irá desenhar o nosso tabuleiro 21/06/2024
class Tabuleiro{

    constructor(){
        this.coluna = 10;
        this.fileira = 20;
        this.lado_celula = 25;
        this.largura = this.coluna * this.lado_celula;
        this.altura = this.fileira * this.lado_celula;
        this.posicao = createVector(borda_tabuleiro, borda_tabuleiro);
    }

/* 
    A coordenada é uma transformaçãop no linear que possui um escalamento(multiplicação) 21/06/2024
    para ajustar as medidas e executa uma soma para ajustar as posições 21/06/2024
*/
    coordenada(x, y) {
        return createVector(x,y).mult(this.lado_celula).add(this.posicao)
    }

    // Aqui Ocorre o processamento Lógico do Tabuleiro 21/06/2024
    desenhar(){
        push()
        noStroke()
        for(let coluna = 0; coluna < this.coluna; coluna++) {
            for (let fileira = 0; fileira < this.fileira; fileira++) {
                if ((coluna+fileira) % 2 == 0) {
                    fill("#010204")
                } else {
                    fill("#0f0f0f")
                }
                let c = this.coordenada(coluna, fileira)
                rect(c.x, c.y, this.lado_celula)
            }
        }
        pop()
    }
    
}