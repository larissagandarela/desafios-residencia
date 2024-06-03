const fs = require('fs');
const path = require('path');
const Validacao = require('./validacao.js');
const GeracaoArquivo = require('./geracao.js')


class LeitorArquivo {
    constructor(caminhoArquivo) {
        this.caminhoArquivo = caminhoArquivo;
    }

    lerArquivo() {
        return new Promise((resolve, reject) => {
            fs.readFile(this.caminhoArquivo, 'utf8', (error, data) => {
                if (error) {
                    reject('Erro ao ler o arquivo: ' + error);
                    return;
                }
                resolve(data);
            });
        });
    }

    processarArquivo() {
        this.lerArquivo()
            .then(data => {
                try {
                    const dadosClientes = JSON.parse(data);

                    if (!Array.isArray(dadosClientes)) {
                        console.error('O arquivo não contém um array válido.');
                        return;
                    }

                    const validador = new Validacao(dadosClientes);
                    validador.validar();

                    const caminhoArquivo = path.dirname(this.caminhoArquivo);
                    const geradorErro = new GeracaoArquivo(validador.erros, caminhoArquivo);
                    geradorErro.gerarArquivoErro();

                } catch (error) {
                    console.error('Erro ao analisar JSON:', error);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
}

const arquivoJson = process.argv[2];

if (!arquivoJson) {
    console.error('Por favor, especifique o caminho do arquivo JSON como argumento.');
    process.exit(1);
}

const leitor = new LeitorArquivo(arquivoJson);
leitor.processarArquivo();
