const fs = require('fs');
const readline = require('readline');
const { GestorPacientes } = require('./cadastro');


class Paciente {
    constructor(cpf) {
        this.cpf = cpf;
        this.consultas = [];
    }

    adicionarConsulta(consulta) {
        this.consultas.push(consulta);
    }
}

class GestorConsultas {
    constructor() {
        this.listaConsultas = this.carregarConsultas();
        this.gestorPacientes = new GestorPacientes(); 
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        });
    }

    carregarConsultas() {
        try {
            const data = fs.readFileSync('consultas.json');
            return JSON.parse(data);
        } catch (error) {
            return [];
        }
    }

    salvarConsultas() {
        const data = JSON.stringify(this.listaConsultas);
        fs.writeFileSync('consultas.json', data);
    }

    verificarSobreposicao(dataConsulta, horaIni, minIni, horaFin, minFin) {
        const inicioProposto = new Date(dataConsulta.getFullYear(), dataConsulta.getMonth(), dataConsulta.getDate(), horaIni, minIni);
        const fimProposto = new Date(dataConsulta.getFullYear(), dataConsulta.getMonth(), dataConsulta.getDate(), horaFin, minFin);
    
        return this.listaConsultas.some(consulta => {
            const inicioConsulta = new Date(consulta.data);
            const fimConsulta = new Date(consulta.data);
            fimConsulta.setHours(parseInt(consulta.horaFinal.split(':')[0]), parseInt(consulta.horaFinal.split(':')[1]));
    
            return (inicioProposto < fimConsulta && fimProposto > inicioConsulta);
        });
    }
    

    adicionarConsulta(cpf, consulta) {
        const paciente = this.gestorPacientes.listaPacientes.find(paciente => paciente.cpf === cpf);
        if (paciente) {
            if (!paciente.consultas) {
                paciente.consultas = [];
            }
            paciente.consultas.push(consulta);
            console.log("Consulta agendada com sucesso!");
            this.gestorPacientes.salvarPacientes(); 
        } else {
            console.log(`Não foi possível encontrar um paciente com o CPF ${cpf}.`);
        }
    }    

    async agendarConsulta() {
        this.rl.question("Digite o CPF do paciente: ", async (cpf) => {
            const pacienteExistente = this.gestorPacientes.listaPacientes.find(paciente => paciente.cpf === cpf);
            if (!pacienteExistente) {
                console.log(`Não foi possível encontrar um paciente com o CPF ${cpf}.`);
                this.rl.close();
                return;
            }
            this.rl.question("Digite a data da consulta (DD/MM/AAAA): ", async (dataConsulta) => {
                this.rl.question("Digite a hora inicial da consulta (HHMM): ", async (horaInicial) => {
                    this.rl.question("Digite a hora final da consulta (HHMM): ", async (horaFinal) => {
                        const currentDate = new Date();
                        const [dia, mes, ano] = dataConsulta.split('/').map(Number);
                        const [horaIni, minIni] = horaInicial.split(':').map(Number);
                        const [horaFin, minFin] = horaFinal.split(':').map(Number);
    
                        if (minIni % 15 !== 0 || minFin % 15 !== 0) {
                            console.log("Erro: as horas devem ser em intervalos de 15 minutos");
                            this.rl.close();
                            return;
                        }
    
                        const totalMinutosIni = horaIni * 60 + minIni;
                        const totalMinutosFin = horaFin * 60 + minFin;
                        const duracaoConsulta = (totalMinutosFin - totalMinutosIni) / 60; 
    
                        if (duracaoConsulta <= 0) {
                            console.log("Erro: A hora final da consulta deve ser posterior à hora inicial.");
                            this.rl.close();
                            return;
                        }
    
                        const dataConsultaObj = new Date(ano, mes - 1, dia, horaIni, minIni);
    
                        if (dataConsultaObj <= currentDate) {
                            console.log("Erro: a consulta deve ser marcada para um período futuro");
                            this.rl.close();
                            return;
                        }
    
                        try {
                            const sobreposicao = await this.verificarSobreposicao(dataConsultaObj, horaIni, minIni, horaFin, minFin);
    
                            if (sobreposicao) {
                                console.log("Erro: já existe uma consulta agendada nesse horário");
                                this.rl.close();
                                return;
                            } else {
                                const agendamento = {
                                    cpf: cpf,
                                    data: dataConsulta,
                                    horaInicial: horaInicial,
                                    horaFinal: horaFinal,
                                    nome: pacienteExistente.nome,
                                    dataNascimento: pacienteExistente.dataNascimento,
                                    tempo: duracaoConsulta.toFixed(2) 
                                };
    
                                this.listaConsultas.push(agendamento);
                                this.salvarConsultas();
                                console.log("Agendamento realizado com sucesso!");
                                this.rl.close();
                            }
                        } catch (error) {
                            console.error("Erro ao verificar sobreposição:", error);
                            this.rl.close();
                        }
                    });
                });
            });
        });
    }
    
}  

module.exports = GestorConsultas;



