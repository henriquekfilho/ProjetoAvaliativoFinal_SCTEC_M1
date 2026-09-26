// ui.js
import { Vaga, VagaFrontEnd } from "./motor.js";  //importando classes do módulo motor.js

export function renderizarVagas(candidato, vagasJson) { // Função para renderizar vagas na interface do usuário
  const container = document.getElementById("cardsVagas"); // Seleciona o elemento onde as vagas serão exibidas
  container.innerHTML = ""; // limpa antes de renderizar

  const vagas = vagasJson.map(v => new VagaFrontEnd(   // Transformar JSON em instâncias de Vaga
    v.id,  //v. significa que estamos acessando a propriedade do objeto v, que é cada vaga do JSON
    v.empresa,
    v.cargo,
    v.requisitos,
    v.salario,
    v.modalidade,
    "JavaScript" // exemplo de stack extra
  ));

  const resultados = vagas.map(vaga => {  // Para cada vaga, calcular compatibilidade com o candidato
    const resultado = vaga.calcularCompatibilidade(candidato); // Chama o método calcularCompatibilidade da classe Vaga, passando o candidato como argumento
    return { vaga, ...resultado };
  });

  const melhorVaga = resultados.reduce((melhor, atual) => {  //encontrar a vaga com maior compatibilidade usando reduce, que compara cada resultado e mantém o melhor
    return atual.percentual > melhor.percentual ? atual : melhor; // Se a compatibilidade da vaga atual for maior que a melhor até agora, atualiza a melhor
  });

  // Renderizar cada card
  resultados.forEach(r => {  //r representa cada resultado de compatibilidade, que contém a vaga e os detalhes da compatibilidade
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <h3>${r.vaga.empresa} - ${r.vaga.cargo}</h3>
      <p>Compatibilidade: ${r.percentual}% (${r.classificacao})</p>
      <p>Habilidades encontradas: ${r.encontradas.join(", ") || "Nenhuma"}</p>
      <p>Habilidades faltantes: ${r.faltantes.join(", ") || "Nenhuma"}</p>
      <p>Salário: ${r.vaga.salario}</p>
      <p>Modalidade: ${r.vaga.modalidade}</p>
    `;

    container.appendChild(card);
  });

  // Destaque da melhor vaga + recomendação
  const destaque = document.createElement("div");
  destaque.classList.add("melhor-vaga");
  destaque.innerHTML = `
    <h2>Melhor vaga encontrada:</h2>
    <p>${melhorVaga.vaga.empresa} - ${melhorVaga.vaga.cargo}</p>
    <p>Compatibilidade: ${melhorVaga.percentual}%</p>
    <p>Recomendação de estudo: Foque em ${melhorVaga.faltantes.join(", ") || "nenhuma habilidade faltante"}.</p>
  `;
  container.appendChild(destaque);
}
