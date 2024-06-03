class Cliente {
    constructor(nome, cpf, dataNascimento, rendaMensal, estadoCivil, dependentes) {
      this.nome = nome;
      this.cpf = cpf;
      this.dataNascimento = dataNascimento;
      this.rendaMensal = rendaMensal;
      this.estadoCivil = estadoCivil;
      this.dependentes = dependentes;
    }
  
    validarNome() {
      return this.nome.length >= 5;
    }
  
    validarCPF() {
      return /^\d{11}$/.test(this.cpf);
    }
  
    validarDataNascimento() {
      const componentesDatas = this.dataNascimento.split('/');
      if (componentesDatas.length !== 3) return false;
  
      const dia = parseInt(componentesDatas[0]);
      const mes = parseInt(componentesDatas[1]) - 1;
      const ano = parseInt(componentesDatas[2]);
      const data = new Date(ano, mes, dia);
  
      const idadeMinima = 18;
      const hoje = new Date();
      const idade = hoje.getFullYear() - data.getFullYear();
  
      return idade >= idadeMinima;
    }
  
    validarRendaMensal() {
      const formatoRenda = /^\d+,\d{2}$/;
      return typeof this.rendaMensal === 'string' && formatoRenda.test(this.rendaMensal);
    }
  
    validarEstadoCivil() {
      const estado = ['C', 'S', 'V', 'D'];
      return estado.includes(this.estadoCivil.toUpperCase());
    }
  
    validarDependentes() {
      return this.dependentes >= 0 && this.dependentes <= 10;
    }
  
    formatarCPF() {
      return this.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
  
    formatarData() {
      const componentesDatas = this.dataNascimento.split('/');
      return `${componentesDatas[0].padStart(2, '0')}/${componentesDatas[1].padStart(2, '0')}/${componentesDatas[2]}`;
    }
  
    exibirDadosCliente() {
      console.log('Dados do cliente:');
      console.log('Nome:', this.nome);
      console.log('CPF:', this.formatarCPF());
      console.log('Data de Nascimento:', this.formatarData());
      console.log('Renda Mensal:', parseFloat(this.rendaMensal).toFixed(2));
      console.log('Estado Civil:', this.estadoCivil.toUpperCase());
      console.log('Dependentes:', parseInt(this.dependentes));
    }
  }
  
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Digite o nome do cliente: ', (nome) => {
    rl.question('Digite o CPF do cliente: ', (cpf) => {
      rl.question('Digite a data de nascimento (DD/MM/AAAA): ', (dataNascimento) => {
        rl.question('Digite a renda mensal: ', (rendaMensal) => {
          rl.question('Digite o estado civil (C, S, V ou D): ', (estadoCivil) => {
            rl.question('Digite o número de dependentes: ', (dependentes) => {
              const cliente = new Cliente(nome, cpf, dataNascimento, rendaMensal, estadoCivil, dependentes);
              if (!cliente.validarNome()) {
                console.log('O nome deve ter pelo menos 5 caracteres!!!');
              } else if (!cliente.validarCPF()) {
                console.log('O CPF deve conter exatamente 11 dígitos numéricos!!!');
              } else if (!cliente.validarDataNascimento()) {
                console.log('O cliente deve ter pelo menos 18 anos na data atual!!!');
              } else if (!cliente.validarRendaMensal()) {
                console.log('Digite um valor numérico válido.');
              } else if (!cliente.validarEstadoCivil()) {
                console.log('Estado civil inválido. Digite C, S, V ou D.');
              } else if (!cliente.validarDependentes()) {
                console.log('Número de dependentes inválido. Digite um valor entre 0 e 10.');
              } else {
                cliente.exibirDadosCliente();
              }
              rl.close();
            });
          });
        });
      });
    });
  });
  