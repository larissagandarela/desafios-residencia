const readline = require('readline');
const moment = require('moment');
const fs = require('fs');

class Paciente {
    constructor(cpf, nome, dataNascimento) {
        this.cpf = cpf;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
    }
}


class GestorPacientes {
    constructor() {
        this.listaPacientes = this.carregarPacientes();
        this.rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        });
    }

    
    carregarPacientes() {
        try {
            if (fs.existsSync('pacientes.json')) {
                const data = fs.readFileSync('pacientes.json');
                return JSON.parse(data);
            } else {
                console.log('Arquivo pacientes.json não encontrado. Inicializando com lista vazia.');
                return [];
            }
        } catch (error) {
            console.error('Erro ao carregar pacientes:', error.message);
            return [];
        }
    }

    
    salvarPacientes() {
        const data = JSON.stringify(this.listaPacientes);
        fs.writeFileSync('pacientes.json', data);
        console.log('Pacientes salvos com sucesso!');
    }

    verificarPacienteSalvo(cpf) {
        const pacienteSalvo = this.listaPacientes.find(paciente => paciente.cpf === cpf);
        if (pacienteSalvo) {
            console.log(`Paciente com CPF ${cpf} está salvo.`);
        } else {
            console.log(`Paciente com CPF ${cpf} não está salvo.`);
        }
    }

    adicionarPaciente() {
        this.rl.question("Digite o CPF do paciente: ", (cpf) => {
            if (!validateCPF(cpf)) {
                console.log("CPF inválido!!");
                this.exibirSubMenu();
                return;
            }

            if (this.listaPacientes.some(paciente => paciente.cpf === cpf)) {
                console.log("Já existe um paciente cadastrado com este CPF!");
                this.exibirSubMenu();
                return;
            }

            this.rl.question("Digite o nome do paciente: ", (nome) => {
                if (nome.length < 5) {
                    console.log("O nome do usuário deve ter pelo menos 5 caracteres!!");
                    this.exibirSubMenu();
                    return;
                }

                this.rl.question("Digite a data de nascimento do paciente (DD/MM/AAAA): ", (dataNascimento) => {
                    if (!this.validarDataNascimento(dataNascimento)) {
                        console.log("A data de nascimento deve ser fornecida no formato DD/MM/AAAA.");
                        this.exibirSubMenu();
                        return;
                    }

                    if (!this.verificarIdade(dataNascimento)) {
                        console.log("O paciente deve ser maior que 13 anos!!");
                        this.exibirSubMenu();
                        return;
                    }

                    let paciente = new Paciente(cpf, nome, dataNascimento);

                    this.listaPacientes.push(paciente);
                    console.log("Paciente cadastrado com sucesso!");

                    this.verificarPacienteSalvo(cpf);
                    
                    this.salvarPacientes();
                });
            });
        });
    }

    validarDataNascimento(dataNascimento) {
        const regexData = /^\d{2}\/\d{2}\/\d{4}$/;
        return regexData.test(dataNascimento);
    }

    verificarIdade(dataNascimento) {
        const dataNascimentoMoment = moment(dataNascimento, 'DD/MM/YYYY');
        const idade = moment().diff(dataNascimentoMoment, 'years');
        return idade >= 13;
    }

    exibirSubMenu() {
    }
}

module.exports = { GestorPacientes, Paciente };

function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g,'');

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

