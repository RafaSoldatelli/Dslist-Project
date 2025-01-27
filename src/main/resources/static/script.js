// Endpoint para listar todos os jogos
const GET_GAMES_URL = "https://dslist-project-production.up.railway.app/games";
// Endpoint para reordenar posições
const REPLACE_URL = "https://dslist-project-production.up.railway.app/lists/1/replacement"; // Ajuste conforme necessário

let jogos = []; // Array global para armazenar os jogos
let isDragging = false; // Variável para rastrear se estamos arrastando

/**
 * Ao carregar a página, busca a lista de jogos e exibe na tela.
 */
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch(GET_GAMES_URL);
        if (!response.ok) throw new Error("Erro ao buscar lista de jogos.");
        jogos = await response.json();
        montarLista();
    } catch (error) {
        console.error(error);
    }
});

/**
 * Monta a lista <ul> com itens arrastáveis.
 */
function montarLista() {
    const ul = document.getElementById("games-list");
    ul.innerHTML = "";

    jogos.forEach((jogo, index) => {
        const li = document.createElement("li");
        li.classList.add("game-item");
        li.draggable = true; // Torna o item arrastável
        li.dataset.index = index; // Armazena o índice original

        // Eventos de drag-and-drop
        li.addEventListener("dragstart", handleDragStart);
        li.addEventListener("dragover", handleDragOver);
        li.addEventListener("dragleave", handleDragLeave);
        li.addEventListener("drop", handleDrop);
        li.addEventListener("dragend", handleDragEnd);

        // Evento de clique (abrir detalhes)
        li.addEventListener("click", () => {
            if (!isDragging) {
                // Redireciona para a página de detalhes se não estiver arrastando
                window.location.href = `details.html?id=${jogo.id}`;
            }
        });

        // Conteúdo do jogo
        li.innerHTML = `
            <img src="${jogo.imgUrl}" alt="${jogo.title}">
            <div>
                <h3>${jogo.title}</h3>
                <p>Ano: ${jogo.year}</p>
                <p>${jogo.shortDescription}</p>
            </div>
        `;
        ul.appendChild(li);
    });
}

let sourceIndex; // Índice do item sendo arrastado

/**
 * Quando começa a arrastar um item.
 */
function handleDragStart(e) {
    isDragging = true; // Define que estamos arrastando
    sourceIndex = +e.target.dataset.index; // Salva o índice original
    e.target.classList.add("dragging"); // Adiciona classe visual
}

/**
 * Quando um item é arrastado sobre outro.
 */
function handleDragOver(e) {
    e.preventDefault(); // Permite o drop
    const target = e.currentTarget;

    if (!target.classList.contains("dragging")) {
        target.classList.add("drag-over"); // Adiciona destaque visual
    }
}

/**
 * Quando o item sai de cima de outro.
 */
function handleDragLeave(e) {
    e.currentTarget.classList.remove("drag-over"); // Remove destaque visual
}

/**
 * Quando o item é solto em outro local.
 */
async function handleDrop(e) {
    e.preventDefault();
    const target = e.currentTarget;

    target.classList.remove("drag-over");

    const destinationIndex = +target.dataset.index; // Índice do destino

    if (sourceIndex === destinationIndex) return; // Não faz nada se for a mesma posição

    try {
        // Chama a API para atualizar no banco
        await fetch(REPLACE_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                sourceIndex,
                destinationIndex,
            }),
        });

        // Atualiza a ordem localmente no array
        const [movedItem] = jogos.splice(sourceIndex, 1); // Remove do índice original
        jogos.splice(destinationIndex, 0, movedItem); // Insere no índice destino

        montarLista(); // Re-renderiza a lista na tela
    } catch (error) {
        console.error("Erro ao reordenar:", error);
    }
}

/**
 * Quando termina de arrastar (solta ou cancela).
 */
function handleDragEnd(e) {
    isDragging = false; // Reseta o estado de arraste
    e.target.classList.remove("dragging"); // Remove classe visual do item arrastado
}
