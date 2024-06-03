const Vertice = require('./questao01.js');
const readline = require('readline');

class Triangulo {
    constructor(vertice1, vertice2, vertice3) {
        this._vertice1 = vertice1;
        this._vertice2 = vertice2;
        this._vertice3 = vertice3;

        if (!this._verificaTriangulo()) {
            throw new Error('Não forma um triângulo!!!');
        }
    }

    _verificaTriangulo() {
        const lado1 = this._vertice1._getDistancia(this._vertice2);
        const lado2 = this._vertice2._getDistancia(this._vertice3);
        const lado3 = this._vertice3._getDistancia(this._vertice1);

        return (lado1 + lado2 > lado3) && (lado1 + lado3 > lado2) && (lado2 + lado3 > lado1);
    }

    equals(outroTriangulo) {
        const verticesTriagulo1 = [this._vertice1, this._vertice2, this._vertice3].map(v => [v.getX(), v.getY()].toString());
        const verticesTriangulo2 = [outroTriangulo._vertice1, outroTriangulo._vertice2, outroTriangulo._vertice3].map(v => [v.getX(), v.getY()].toString());

        return verticesTriagulo1.sort().toString() === verticesTriangulo2.sort().toString();
    }

    get perimetro() {
        const lado1 = this._vertice1._getDistancia(this._vertice2);
        const lado2 = this._vertice2._getDistancia(this._vertice3);
        const lado3 = this._vertice3._getDistancia(this._vertice1);

        return lado1 + lado2 + lado3;
    }

    tipo() {
        const lado1 = this._vertice1._getDistancia(this._vertice2);
        const lado2 = this._vertice2._getDistancia(this._vertice3);
        const lado3 = this._vertice3._getDistancia(this._vertice1);

        if (lado1 === lado2 && lado2 === lado3) {
            return 'Equilátero';
        } else if (lado1 === lado2 || lado1 === lado3 || lado2 === lado3) {
            return 'Isósceles';
        } else {
            return 'Escaleno';
        }
    }

    clone() {
        const vertice1Clone = new Vertice(this._vertice1.getX(), this._vertice1.getY());
        const vertice2Clone = new Vertice(this._vertice2.getX(), this._vertice2.getY());
        const vertice3Clone = new Vertice(this._vertice3.getX(), this._vertice3.getY());

        return new Triangulo(vertice1Clone, vertice2Clone, vertice3Clone);
    }

    get area() {
        const lado1 = this._vertice1._getDistancia(this._vertice2);
        const lado2 = this._vertice2._getDistancia(this._vertice3);
        const lado3 = this._vertice3._getDistancia(this._vertice1);
        const semiPerimetro = this.perimetro / 2;
    
        // teorema de heron para cálculo de área 
        return Math.sqrt(semiPerimetro * (semiPerimetro - lado1) * (semiPerimetro - lado2) * (semiPerimetro - lado3));
    }

}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function lerVertice(numeroVertice) {
    return new Promise((resolve, reject) => {
        rl.question(`Digite as coordenadas do vértice ${numeroVertice} (x y): `, (coordenadas) => {
            const [x, y] = coordenadas.split(' ').map(Number);
            if (isNaN(x) || isNaN(y)) {
                reject('Coordenadas inválidas!');
            } else {
                resolve(new Vertice(x, y));
            }
        });
    });
}

async function criarDoisTriangulos() {
    try {
        console.log('Vamos criar dois triângulos...');

        console.log('Triângulo 1:');
        const triangulo1 = await criarTriangulo();

        console.log('\nTriângulo 2:');
        const triangulo2 = await criarTriangulo();

        console.log('\nresultado dos dois triângulos:');
        console.log('Triângulo 1:');
        console.log('Tipo:', triangulo1.tipo());
        console.log('Perímetro:', triangulo1.perimetro);
        console.log('Área:', triangulo1.area);

        console.log('\nTriângulo 2:');
        console.log('Tipo:', triangulo2.tipo());
        console.log('Perímetro:', triangulo2.perimetro);
        console.log('Área:', triangulo2.area);

        // chamando o método equals
        console.log('\ncomparando os dois triângulos...');
        if (triangulo1.equals(triangulo2)) {
            console.log('Os triângulos são iguais.');
        } else {
            console.log('Os triângulos são diferentes.');
        }

        console.log('\nClonando os triângulos...');
        const cloneTriangulo1 = triangulo1.clone();
        const cloneTriangulo2 = triangulo2.clone();

        console.log('Triângulo 1 clonado:', cloneTriangulo1);
        console.log('Triângulo 2 clonado:', cloneTriangulo2);
    } catch (error) {
        console.error(error);
    } finally {
        rl.close();
    }
}

async function criarTriangulo() {
    try {
        const vertice1 = await lerVertice(1);
        const vertice2 = await lerVertice(2);
        const vertice3 = await lerVertice(3);

        const triangulo = new Triangulo(vertice1, vertice2, vertice3);
        console.log('Triângulo criado com sucesso!');
        return triangulo;
    } catch (error) {
        throw new Error('Erro ao criar o triângulo: ' + error);
    }
}

criarDoisTriangulos();
