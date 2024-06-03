const { GestorPacientes } = require('./cadastro.js');

class ListagemPacientes extends GestorPacientes {
    constructor() {
        super();
    }

    formatarNome(nome) {
        return nome.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
    }

    formatarData(dataNascimento) {
        const data = new Date(dataNascimento);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    calcularIdade(dataNascimento) {
        const hoje = new Date();
        const nascimento = new Date(dataNascimento);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mesAtual = hoje.getMonth();
        const mesNascimento = nascimento.getMonth();
        if (mesAtual < mesNascimento || (mesAtual === mesNascimento && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade;
    }

    listarPorCPF() {
        console.log("------------------------------------------------------------");
        console.log("CPF             Nome                   Dt.Nasc.        Idade");
        console.log("------------------------------------------------------------");
        this.listaPacientes.sort((a, b) => a.cpf.localeCompare(b.cpf)).forEach(paciente => {
            console.log(`${paciente.cpf.padEnd(15)} ${this.formatarNome(paciente.nome).padEnd(20)} ${this.formatarData(paciente.dataNascimento).padEnd(15)} ${this.calcularIdade(paciente.dataNascimento)}`);
        });
        console.log("------------------------------------------------------------");
    }
    
    listarPorNome() {
        console.log("------------------------------------------------------------");
        console.log("CPF             Nome                   Dt.Nasc.        Idade");
        console.log("------------------------------------------------------------");
        this.listaPacientes.sort((a, b) => a.nome.localeCompare(b.nome)).forEach(paciente => {
            console.log(`${paciente.cpf.padEnd(15)} ${this.formatarNome(paciente.nome).padEnd(20)} ${this.formatarData(paciente.dataNascimento).padEnd(15)} ${this.calcularIdade(paciente.dataNascimento)}`);
        });
        console.log("------------------------------------------------------------");
    }
    
}

module.exports = ListagemPacientes;
