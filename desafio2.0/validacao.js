const moment = require('moment');

class Validacao {
    constructor(dados) {
        this.dados = dados;
        this.erros = [];
    }

    validar() {
        if (!Array.isArray(this.dados)) {
            console.error('O arquivo de entrada não contém um array válido.');
            return;
        }

        this.dados.forEach((cliente, index) => {
            const errosCliente = [];
            if (!cliente.nome || cliente.nome.length < 5 || cliente.nome.length > 60) {
                errosCliente.push({ campo: 'nome', mensagem: 'O nome deve ter entre 5 e 60 caracteres.' });
            }
            if (!cliente.cpf || !this.validarCPF(cliente.cpf)) {
                errosCliente.push({ campo: 'cpf', mensagem: 'CPF inválido.' });
            }
            if (!cliente.dt_nascimento || !this.validarDataNascimento(cliente.dt_nascimento)) {
                errosCliente.push({ campo: 'dt_nascimento', mensagem: 'Data de nascimento inválida.' });
            }
            if (cliente.renda_mensal && !this.validarRendaMensal(cliente.renda_mensal)) {
                errosCliente.push({ campo: 'renda_mensal', mensagem: 'Renda mensal inválida.' });
            }
            if (cliente.estado_civil && !this.validarEstadoCivil(cliente.estado_civil)) {
                errosCliente.push({ campo: 'estado_civil', mensagem: 'Estado civil inválido.' });
            }

            const camposObrigatorios = ['nome', 'cpf', 'dt_nascimento', 'renda_mensal', 'estado_civil'];
            camposObrigatorios.forEach(campo => {
                if (!cliente[campo]) {
                    errosCliente.push({ campo: campo, mensagem: `Campo obrigatório '${campo}' ausente.` });
                }
            });

            if (errosCliente.length > 0) {
                this.erros.push({ dados: cliente, erros: errosCliente });
            }
        });
    }

    validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');

        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
            return false;
        }

        let soma = 0;
        for (let i = 0; i < 9; i++) {
            soma += parseInt(cpf.charAt(i)) * (10 - i);
        }
        let resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) {
            resto = 0;
        }
        if (resto !== parseInt(cpf.charAt(9))) {
            return false;
        }

        soma = 0;
        for (let i = 0; i < 10; i++) {
            soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = (soma * 10) % 11;
        if (resto === 10 || resto === 11) {
            resto = 0;
        }
        if (resto !== parseInt(cpf.charAt(10))) {
            return false;
        }
        return true;
    }

    validarDataNascimento(dataNascimento) {
        const data = moment(dataNascimento, 'DDMMYYYY');
        const hoje = moment();
        if (!data.isValid() || hoje.diff(data, 'years') < 18) {
            return false;
        }
        return true;
    }

    validarRendaMensal(rendaMensal) {
        if (typeof rendaMensal !== 'string') {
            return false;
        }
        if (!/^(\d+(\.\d{1,2})?|\d+(,\d{1,2})?)$/.test(rendaMensal)) {
            return false;
        }
        const valorNumerico = parseFloat(rendaMensal.replace(',', '.'));
        if (isNaN(valorNumerico)) {
            return false;
        }
        return true;
    }
    

    validarEstadoCivil(estadoCivil) {
        if (typeof estadoCivil !== 'string') {
            return false;
        }
        let estadoCivilUpper = estadoCivil.toUpperCase();
        if (!['C', 'S', 'V', 'D'].includes(estadoCivilUpper)) {
            return false;
        }
        return true;
    }
}

module.exports = Validacao;
