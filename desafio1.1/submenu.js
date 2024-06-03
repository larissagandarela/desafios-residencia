const readline = require('readline');
const { GestorPacientes } = require('./cadastro');
const ExcluirPaciente = require('./excluirpaciente');
const ListagemPacientes = require('./listagempaciente');

class SubMenu {
    constructor(menuPrincipal) {
        this.menuPrincipal = menuPrincipal;
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        });
    }

    exibirSubMenu() {
        console.log("Menu do Cadastro de Pacientes");
        console.log("1 - Cadastrar novo paciente");
        console.log("2 - Excluir paciente");
        console.log("3 - Listar pacientes (ordenado por CPF)");
        console.log("4 - Listar pacientes (ordenado por nome)");
        console.log("5 - Voltar p/ menu principal");

        this.rl.question("Digite o número da opção desejada: ", (opcao) => {
            console.log(opcao);
            switch (opcao.trim()) {
                case '1':
                    new GestorPacientes().adicionarPaciente();
                    break;
                case '2':
                    this.rl.question("Digite o CPF do paciente a ser excluído: ", (cpf) => {
                        new ExcluirPaciente().excluirPaciente(cpf);
                    });
                    break;
                case '3':
                    new ListagemPacientes().listarPorCPF();
                    break;
                case '4':
                    new ListagemPacientes().listarPorNome();
                    break;
                case '5':
                    this.menuPrincipal.exibirMenu();
                    break;
                default:
                    console.log("Opção inválida!");
                    this.exibirSubMenu();
            }
        });
    }
}

module.exports = SubMenu;
