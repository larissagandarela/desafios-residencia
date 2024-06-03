const Vertice = require('./questao01.js');

class Poligono {
    constructor(vertices) {
        if (vertices.length < 3) {
            throw new Error("deve ter pelo menos 3 vértices...");
        }
        this.vertices = vertices;
    }

    addVertice(v) {
        for (let vertice of this.vertices) {
            if (vertice.getX() === v.getX() && vertice.getY() === v.getY()) {
                return false;
            }
        }
        this.vertices.push(v);
        return true;
    }

    get perimetro(){
        let soma = 0;
        for (let i = 0; i < this.vertices.length - 1; i++){
            const ladoN = this.vertices[i]._getDistancia(this.vertices[i + 1]);
            soma = soma + ladoN;
        }
        const ladoN = this.vertices[0]._getDistancia(this.vertices[this.vertices.length - 1]);
        soma = soma + ladoN;
        return soma;

    }

    get qtdVertice(){
        return this.vertices.length;
    } 
}