import { Vaga, VagaFrontEnd, Candidato } from "./motor.js";  //importando classes do módulo motor.js

// Exemplo de candidato preenchido pelo formulário
const candidato = new Candidato("Henrique", "Front-End", ["HTML", "CSS", "JavaScript"], 1);

// Exemplo de vaga
const vaga = new VagaFrontEnd( // new serve para criar uma nova instância da classe VagaFrontEnd
  1,  // ID da vaga
  "Tech Startup",  // Nome da empresa
  "Desenvolvedor Front-End Júnior",  // Cargo
  ["HTML", "CSS", "JavaScript", "Git"],  // Requisitos
  "R$ 3.000",  // Salário
  "Remoto",   // Modalidade
  "JavaScript"   // Stack específica
);

// Calcular compatibilidade
const resultado = vaga.calcularCompatibilidade(candidato);
console.log(resultado);

import { carregarVagas } from "./dados.js";  //import { renderizarVagas } from "./dados.js";
import { renderizarVagas } from "./ui.js";   //importando função do módulo ui.js

const form = document.getElementById("perfilForm");  //const com o formulário de perfil do candidato
const erroForm = document.getElementById("erroForm"); //const com a mensagem de erro do formulário

form.addEventListener("submit", async (event) => {  //formulário de perfil do candidato, ao submeter o formulário, a função é chamada de forma assíncrona, através do event.preventDefault() para impedir o comportamento padrão de recarregar a página
  event.preventDefault(); // impede reload da página

  const nome = document.getElementById("nome").value.trim();
  const area = document.getElementById("area").value.trim();
  const habilidades = document.getElementById("habilidades").value.split(",").map(h => h.trim());
  const experiencia = parseInt(document.getElementById("experiencia").value);

  // Validação simples
  if (!nome || !area || habilidades.length === 0 || isNaN(experiencia)) {   //
    erroForm.style.display = "block";  //exibir mensagem de erro se algum campo estiver vazio ou inválido
    return;
  } else {  //se todos os campos estiverem preenchidos corretamente, a mensagem de erro é escondida
    erroForm.style.display = "none";
  }

  // Criar objeto candidato
  const candidato = new Candidato(nome, area, habilidades, experiencia);

  // Persistir no localStorage
  localStorage.setItem("perfilCandidato", JSON.stringify(candidato));

  // Carregar vagas e renderizar resultados
  const vagas = await carregarVagas();
  renderizarVagas(candidato, vagas);
});

// Recuperar perfil salvo
window.addEventListener("load", () => {   // Ao carregar a página, verificar se há perfil salvo no localStorage
  const perfilSalvo = localStorage.getItem("perfilCandidato");  // Recuperar perfil salvo do localStorage
  if (perfilSalvo) {   // Se houver perfil salvo, preencher o formulário
    const candidato = JSON.parse(perfilSalvo); // Converter de volta para objeto
    document.getElementById("nome").value = candidato.nome; // Preencher o formulário com os dados do candidato
    document.getElementById("area").value = candidato.area;
    document.getElementById("habilidades").value = candidato.habilidades.join(", "); // Converter array de habilidades de volta para string
    document.getElementById("experiencia").value = candidato.experiencia;
  }
});


async function iniciarAnalise(candidato) {
  const vagas = await carregarVagas();   // Carregar vagas do arquivo JSON
  if (vagas.length > 0) {  // Se houver vagas carregadas, renderizar resultados
    renderizarVagas(vagas);  // Chamar função para renderizar vagas
  }
}