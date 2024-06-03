const fs = require('fs');
const GestorConsultas = require('./agendamento'); 

class ExcluirAgendamento extends GestorConsultas {
    constructor() {
        super();
    }

    excluirAgendamento(cpf, dataConsulta, horaInicial) {
        const index = this.listaConsultas.findIndex(consulta => consulta.cpf === cpf && consulta.data === dataConsulta && consulta.horaInicial === horaInicial);

        if (index !== -1) {
            this.listaConsultas.splice(index, 1);
            console.log(`Agendamento para o CPF ${cpf}, na data ${dataConsulta} e hora inicial ${horaInicial} excluído com sucesso.`);
            this.salvarConsultas();
        } else {
            console.log(`Agendamento para o CPF ${cpf}, na data ${dataConsulta} e hora inicial ${horaInicial} não encontrado.`);
        }
    }
}

module.exports = ExcluirAgendamento;