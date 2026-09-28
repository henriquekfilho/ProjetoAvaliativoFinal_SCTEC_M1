// Classe principal para representar uma vaga e array de habilidades
export class Vaga {   //export para permitir importação em outros módulos
  constructor(id, empresa, cargo, requisitos, salario, modalidade) {  //constructor para inicializar os atributos da classe
    this.id = id;
    this.empresa = empresa;
    this.cargo = cargo;
    this.requisitos = requisitos;
    this.salario = salario;
    this.modalidade = modalidade;
  }

  // Método para calcular compatibilidade e arrow function para filtrar habilidades encontradas e faltantes
  calcularCompatibilidade(candidato) {    //uso do this para acessar os requisitos da vaga
    const encontradas = candidato.habilidades.filter(hab =>  //callback function para filtrar habilidades encontradas
      this.requisitos.includes(hab)  //uso do this para acessar os requisitos da vaga
    );

    const faltantes = this.requisitos.filter(req =>    //callback function para filtrar habilidades faltantes
      !candidato.habilidades.includes(req)
    );

    const percentual = Math.round((encontradas.length / this.requisitos.length) * 100);

    // Classificação do candidato com base no percentual de compatibilidade
    let classificacao;  //uso do let para declarar a variável classificacao
    if (percentual >= 80) classificacao = "Alta";
    else if (percentual >= 50) classificacao = "Média";
    else classificacao = "Baixa";

    return {    //retorna um objeto com os resultados
      percentual,
      classificacao,
      encontradas,
      faltantes
    };
  }
}

// Subclasse para vagas de Front-End
export class VagaFrontEnd extends Vaga {   //extends para herdar da classe Vaga e export para permitir importação em outros módulos
  constructor(id, empresa, cargo, requisitos, salario, modalidade, stack) {  //constructor para inicializar os atributos da classe e uso do super para chamar o construtor da classe pai
    super(id, empresa, cargo, requisitos, salario, modalidade);
    this.stack = stack; // exemplo: React, Vue, Angular
  }

  // Método sobrescrito para calcular compatibilidade considerando a stack específica
  calcularCompatibilidade(candidato) {
    const resultado = super.calcularCompatibilidade(candidato);

    if (candidato.habilidades.includes(this.stack)) {
      resultado.percentual = Math.min(100, resultado.percentual + 10);
    }

    return resultado;
  }
}

// Classe para representar um candidato e export para permitir importação em outros módulos
export class Candidato {
  constructor(nome, area, habilidades, experiencia) {   //constructor para inicializar os atributos da classe
    this.nome = nome;
    this.area = area;
    this.habilidades = habilidades; // array
    this.experiencia = experiencia; // anos
  }
}