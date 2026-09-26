// dados.js
export async function carregarVagas() {  // Função para carregar vagas do arquivo JSON
  const container = document.getElementById("cardsVagas");  // Seleciona o elemento onde as vagas serão exibidas

  container.innerHTML = "<p>Carregando vagas...</p>";  //escrever mensagem de carregamento enquanto as vagas estão sendo carregadas

  try {
    const response = await fetch("./assets/data/vagas.json");

    if (!response.ok) {   // Se a resposta não for OK, lança erro
      throw new Error("Erro ao carregar vagas");
    }

    const vagas = await response.json();

    if (!vagas || vagas.length === 0) {  // Se não houver vagas, exibe mensagem de "Nada encontrado"
      container.innerHTML = "<p>Nada encontrado.</p>";
      return [];
    }

    return vagas;  // Retorna as vagas carregadas do arquivo JSON

  } catch (error) { // Se houver erro ao carregar vagas, exibe mensagem de erro
    container.innerHTML = `<p>Falha ao carregar vagas: ${error.message}</p>`;  //contaiiner para exibir mensagem de erro caso ocorra algum problema ao carregar as vagas
    console.error("Erro ao carregar vagas:", error);
    return [];
  }
}
