const GestorConsultas = require('./agendamento.js');

class ListagemAgendamento extends GestorConsultas {
    constructor() {
        super();
    }

    formatarData(data) {
        const partes = data.split('/');
        return `${partes[0].padStart(2, '0')}/${partes[1].padStart(2, '0')}/${partes[2]}`;
    }

    formatarHora(hora) {
        const partes = hora.split(':');
        return `${partes[0].padStart(2, '0')}:${partes[1].padStart(2, '0')}`;
    }

    listarTodaAgenda() {
        const agenda = this.listaConsultas.slice(); 
        agenda.sort((a, b) => {
            if (a.data === b.data) {
                return a.horaInicial.localeCompare(b.horaInicial);
            } else {
                return a.data.localeCompare(b.data);
            }
        });
        this.mostrarAgenda(agenda);
    }

    listarAgendaPeriodo(dataInicial, dataFinal) {
        const agendaPeriodo = this.listaConsultas.filter(consulta => {
            return consulta.data >= dataInicial && consulta.data <= dataFinal;
        });
        agendaPeriodo.sort((a, b) => {
            if (a.data === b.data) {
                return a.horaInicial.localeCompare(b.horaInicial);
            } else {
                return a.data.localeCompare(b.data);
            }
        });
        this.mostrarAgenda(agendaPeriodo);
    }

    mostrarAgenda(agenda) {
        console.log('-------------------------------------------------------------');
        console.log('Data     H.Ini H.Fim Tempo Nome                    Dt.Nasc.');
        console.log('-------------------------------------------------------------');
        agenda.forEach(consulta => {
            const nomePaciente = consulta.nome || ''; 
            console.log(`${this.formatarData(consulta.data)} ${this.formatarHora(consulta.horaInicial)} ${this.formatarHora(consulta.horaFinal)} ${consulta.tempo} ${nomePaciente.padEnd(25)} ${consulta.dataNascimento}`);
        });
        console.log('-------------------------------------------------------------');
    }
    
}

module.exports = ListagemAgendamento;
