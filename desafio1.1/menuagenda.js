const fs = require('fs');
const readline = require('readline');
const GestorConsultas = require('./agendamento');
const ExcluirAgendamento = require('./excluiragenda');
const ListagemAgendamento = require('./listagemagenda');
const MenuPrincipal = require('./menuprincipal');

class MenuAgenda {
    constructor() {
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        });
        this.gestorConsultas = new GestorConsultas();
    }

    exibirMenu() {
        console.log("Agenda");
        console.log("1 - Agendar consulta");
        console.log("2 - Cancelar agendamento");
        console.log("3 - Listar agenda");
        console.log("4 - Voltar para o menu principal");
    
        this.rl.question("Digite o número da opção desejada: ", (opcao) => {
            switch (opcao.trim()) {
                case '1':
                    new GestorConsultas().agendarConsulta();
                    break;
                case '2':
                    this.rl.question("Digite o CPF do paciente: ", (cpf) => {
                        this.rl.question("Digite a data da consulta (DD/MM/AAAA): ", (dataConsulta) => {
                            this.rl.question("Digite a hora inicial da consulta (HHMM): ", (horaInicial) => {
                                new ExcluirAgendamento().excluirAgendamento(cpf, dataConsulta, horaInicial);
                            });
                        });
                    });
                    break;
                case '3':
                    this.rl.question("Deseja listar toda a agenda (T) ou a agenda de um período (P)? ", (opcao) => {
                        if (opcao.trim().toUpperCase() === 'T') {
                            new ListagemAgendamento(this.gestorConsultas).listarTodaAgenda();
                        } else if (opcao.trim().toUpperCase() === 'P') {
                            this.rl.question("Digite a data inicial (DD/MM/AAAA): ", (dataInicial) => {
                                this.rl.question("Digite a data final (DD/MM/AAAA): ", (dataFinal) => {
                                    new ListagemAgendamento(this.gestorConsultas).listarAgendaPeriodo(dataInicial, dataFinal);
                                });
                            });
                        } else {
                            console.log("Opção inválida!");
                        }
                    });
                    break;
                case '4':
                    new MenuPrincipal().exibirMenu();
                    break;
                default:
                    console.log("Opção inválida!");
            }
        });
    }
}    

module.exports = MenuAgenda;
