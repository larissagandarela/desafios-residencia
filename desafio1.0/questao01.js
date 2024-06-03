class Vertice {
    #x;
    #y;
    constructor(x, y) {
      this.x = x;
      this.y = y;
  
      this.getX = function() {
        return this.x;
      };
  
      this.getY = function() {
        return this.y;
      };
    }
  
    _getDistancia(segundoVertice) {
        const dx = this.getX() - segundoVertice.getX();
        const dy = this.getY() - segundoVertice.getY();
        const resultado = Math.sqrt(dx * dx + dy * dy);
        return resultado;
    }
  
    move(x, y){
        this.x = x;
        this.y = y;
      }
  
    equals(segundoVertice) {
        return this.x === segundoVertice.getX() && this.y === segundoVertice.getY();
    }
  }
  
  // leitura de dois vertice
  const vertice1 = new Vertice(5, 3);
  const vertice2 = new Vertice(3, 4);
  
  console.log(`Distância entre os vértices: ${vertice1._getDistancia(vertice2)}`);
  
  // chamar o método move (leitura do terceiro vertice)
  vertice1.move(1, 1);
  console.log(`Novas coordenadas do vértice1: (${vertice1.getX()}, ${vertice1.getY()})`);
  console.log(`Distância entre os vértices após mover: ${vertice1._getDistancia(vertice2)}`);
  
  // chamar o método equals
  console.log(`vertice1 é igual a vertice3: ${vertice1.equals(vertice2)}`);
  
  module.exports = Vertice
  