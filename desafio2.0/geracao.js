const fs = require('fs');
const path = require('path');

class GeracaoArquivo {
    constructor(erros, caminhoArquivo) {
        this.erros = erros;
        this.caminhoArquivo = caminhoArquivo;
    }
    
    gerarArquivoErro() {
        const nomeArquivoErro = `erros-${this.obterTimestamp()}.json`;
        const caminhoArquivoErro = path.join(this.caminhoArquivo, nomeArquivoErro);
        fs.writeFile(caminhoArquivoErro, JSON.stringify(this.erros, null, 2), (error) => {
            if (error) {
                console.error('Erro ao gerar o arquivo de erro:', error);
            } else {
                console.log(`Arquivo de erro gerado com sucesso: ${nomeArquivoErro}`);
            }
        });
    }

    obterTimestamp() {
        const dataAtual = new Date();
        const dia = String(dataAtual.getDate()).padStart(2, '0');
        const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
        const ano = dataAtual.getFullYear();
        const horas = String(dataAtual.getHours()).padStart(2, '0');
        const minutos = String(dataAtual.getMinutes()).padStart(2, '0');
        const segundos = String(dataAtual.getSeconds()).padStart(2, '0');
        return `${ano}${mes}${dia}-${horas}${minutos}${segundos}`;
    }
}

module.exports = GeracaoArquivo;
