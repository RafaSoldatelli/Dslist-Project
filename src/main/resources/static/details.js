document.addEventListener("DOMContentLoaded", async () => {
    const btnVoltar = document.getElementById("btn-voltar");
    btnVoltar.addEventListener("click", () => {
        // Simplesmente volta para a index.html
        window.location.href = "index.html";
    });

    // Extrai o parâmetro "id" da URL
    const params = new URLSearchParams(window.location.search);
    const jogoId = params.get("id");
    if (!jogoId) {
        console.error("Nenhum ID informado na URL.");
        return;
    }

    try {
        // Faz a requisição do jogo específico
        const response = await fetch(`http://localhost:8080/games/${jogoId}`);
        if (!response.ok) {
            throw new Error("Erro ao buscar detalhes do jogo");
        }
        const jogo = await response.json();
        exibirDetalhes(jogo);
    } catch (error) {
        console.error("Erro:", error);
    }
});

function exibirDetalhes(jogo) {
    const container = document.getElementById("game-details");

    container.innerHTML = `
        <div class="details-card">
            <img src="${jogo.imgUrl}" alt="${jogo.title}" class="details-img">

            <div class="details-info">
                <h2>${jogo.title}</h2>
                <p><strong>Ano:</strong> ${jogo.year}</p>
                <p><strong>Gênero:</strong> ${jogo.genre}</p>
                <p><strong>Plataformas:</strong> ${jogo.platforms}</p>
                <p><strong>Score:</strong> ${jogo.score}</p>
                <p><strong>Descrição Curta:</strong> ${jogo.shortDescription}</p>
                <hr>
                <p><strong>Descrição Completa:</strong><br>${jogo.longDescription}</p>
            </div>
        </div>
    `;
}
