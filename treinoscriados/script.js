const API_URL = "https://backend-tcc-iota.vercel.app";
const userId = 1;

// Array de exercícios disponíveis (simulando sua tabela "exercicio")
const exercicios = [
    { id: 1, nome: "Agachamento" },
    { id: 2, nome: "Supino" },
    { id: 3, nome: "Flexão" }
];

// ---------- FUNÇÃO: CARREGAR TREINOS CRIADOS ----------
async function carregarTreinos() {
    try {
        const res = await fetch(`${API_URL}/treino`);
        const treinos = await res.json();

        const container = document.getElementById("treinos-lista");
        container.innerHTML = "";

        treinos.forEach(t => {
            const div = document.createElement("div");
            div.classList.add("treino-item");
            div.innerHTML = `
                <strong>${t.nome}</strong>
                <button onclick="verTreino(${t.id_treino})">Ver treino</button>
                <button onclick="editarTreino(${t.id_treino})">Editar</button>
                <button onclick="excluirTreino(${t.id_treino})">Excluir</button>
                <div id="exercicios-treino-${t.id_treino}" class="exercicios-treino" style="display:none; margin-left:20px;"></div>
            `;
            container.appendChild(div);
        });
    } catch (err) {
        console.error("Erro ao carregar treinos:", err);
    }
}

// ---------- FUNÇÃO: CRIAR TREINO ----------
async function criarTreino(nome, exerSelecionados) {
    if (!nome) return alert("Digite o nome do treino!");

    try {
        const res = await fetch(`${API_URL}/treino`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                nome,
                id_user: userId,
                exercicios: exerSelecionados // Aqui salvamos direto no treino
            })
        });

        await res.json();
        alert("Treino criado com sucesso!");
        carregarTreinos();
    } catch (err) {
        console.error("Erro ao criar treino:", err);
        alert("Erro ao criar treino!");
    }
}

// ---------- FUNÇÃO: VER TREINO ----------
async function verTreino(idTreino) {
    try {
        const res = await fetch(`${API_URL}/treino`);
        const treinos = await res.json();
        const treino = treinos.find(t => t.id_treino === idTreino);

        const divEx = document.getElementById(`exercicios-treino-${idTreino}`);
        if (treino && treino.exercicios) {
            divEx.innerHTML = treino.exercicios.map(e => e.nome).join("<br>");
            divEx.style.display = divEx.style.display === "none" ? "block" : "none";
        }
    } catch (err) {
        console.error("Erro ao ver treino:", err);
    }
}

// ---------- FUNÇÃO: EXCLUIR TREINO ----------
async function excluirTreino(idTreino) {
    if (!confirm("Deseja realmente excluir este treino?")) return;
    try {
        await fetch(`${API_URL}/treino/${idTreino}`, { method: "DELETE" });
        alert("Treino excluído!");
        carregarTreinos();
    } catch (err) {
        console.error("Erro ao excluir treino:", err);
    }
}

// ---------- FUNÇÃO: EDITAR TREINO ----------
function editarTreino(idTreino) {
    const novoNome = prompt("Digite o novo nome do treino:");
    if (!novoNome) return;

    fetch(`${API_URL}/treino/${idTreino}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: novoNome, id_user: userId })
    })
    .then(() => {
        alert("Treino atualizado!");
        carregarTreinos();
    })
    .catch(err => console.error("Erro ao atualizar treino:", err));
}

// ---------- INICIALIZAÇÃO ----------
window.addEventListener("DOMContentLoaded", carregarTreinos);