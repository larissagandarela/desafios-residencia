const fs = require('fs');
const { GestorPacientes } = require('./cadastro');

class ExcluirPaciente extends GestorPacientes {
    constructor() {
        super(); 
    }

    excluirPaciente(cpf) {
        const index = this.listaPacientes.findIndex(paciente => paciente.cpf === cpf);
        if (index !== -1) {
            this.listaPacientes.splice(index, 1);
            console.log(`Paciente com CPF ${cpf} excluído com sucesso.`);
            this.salvarPacientes();
        } else {
            console.log(`Paciente com CPF ${cpf} não encontrado.`);
        }
    }
}

module.exports = ExcluirPaciente;