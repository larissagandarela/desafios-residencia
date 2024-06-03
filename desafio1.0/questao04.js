class Aluno {
    constructor(matricula, nome) {
        this.matricula = matricula;
        this.nome = nome;
        this.notaP1 = null;
        this.notaP2 = null;
    }

    calcularNotaFinal() {
        if (this.notaP1 !== null && this.notaP2 !== null) {
            return ((this.notaP1 + this.notaP2) / 2).toFixed(1);
        } else if (this.notaP1 !== null) {
            return (this.notaP1 / 2).toFixed(1);
        } else if (this.notaP2 !== null) {
            return (this.notaP2 / 2).toFixed(1);
        } else {
            return '0.0';
        }
    }
}

class Turma {
    constructor() {
        this.alunos = [];
    }

    inserirAluno(aluno) {
        const alunoExistente = this.alunos.find(a => a.matricula === aluno.matricula);

        if (alunoExistente) {
            console.log("Matrícula já existente!!!");
        } else {
            this.alunos.push(aluno);
        }
    }

    removerAluno(matricula) {
        this.alunos = this.alunos.filter(aluno => aluno.matricula !== matricula);
        console.log(`Aluno com matrícula ${matricula} foi removido!!!!`);
    }

    lancarNota(matricula, tipoProva, nota) {
        const aluno = this.alunos.find(a => a.matricula === matricula);

        if (aluno) {
            if (tipoProva === 'P1') {
                aluno.notaP1 = nota;
            } else if (tipoProva === 'P2') {
                aluno.notaP2 = nota;
            } else {
                console.log("Tipo de prova inválido.");
            }
            console.log(`Nota ${nota} da avaliação ${tipoProva} lançada para ${aluno.nome}`);
        } else {
            console.log("Aluno não encontrado.");
        }
    }

    listarAlunos() {
        console.log(`--------------------------------------------------------------`);
        console.log(`Matrícula   Nome                      P1  P2  NF`);
        console.log(`--------------------------------------------------------------`);
        
        this.alunos.sort((a, b) => a.nome.localeCompare(b.nome)).forEach(aluno => {
            console.log(
                `${aluno.matricula.toString().padEnd(12)}` + 
                `${aluno.nome.padEnd(26)}` + 
                `${aluno.notaP1 !== null ? aluno.notaP1.toFixed(1).padEnd(4) : '-'.padEnd(4)}` + 
                `${aluno.notaP2 !== null ? aluno.notaP2.toFixed(1).padEnd(4) : '-'.padEnd(4)}` + 
                `${aluno.calcularNotaFinal().toString().padEnd(4)}`
            );
        });

        console.log(`--------------------------------------------------------------`);
    }
}

// validando 
const turma = new Turma();

turma.inserirAluno(new Aluno(12345, "Ana de Almeida"));
turma.inserirAluno(new Aluno(23456, "Bruno Carvalho"));
turma.inserirAluno(new Aluno(34567, "Fernanda Abreu"));
turma.inserirAluno(new Aluno(45678, "Joao Santos"));

turma.alunos[0].notaP1 = 8.0;
turma.alunos[0].notaP2 = 9.5;
turma.alunos[1].notaP1 = 7.0;
turma.alunos[2].notaP2 = 8.5;

turma.listarAlunos();
 