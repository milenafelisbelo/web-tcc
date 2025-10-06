const API_URL = "https://backend-tcc-iota.vercel.app"; // ajuste para sua API
const id_user = 1; // ID do usuário logado

const exercicios = [
  // Pernas e Glúteos
  { id: 1, grupo: "Pernas e Glúteos", nome: "Agachamento", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/11/agachamento-livre-1.gif", descricao: "Agachamento clássico para pernas e glúteos.", duracao: "-", series: 3, repeticoes: 15 },
  { id: 2, grupo: "Pernas e Glúteos", nome: "Afundo alternado", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/04/pernas-afundo-tradicional-sem-pesos.gif", descricao: "Afundo alternando as pernas.", duracao: "-", series: 3, repeticoes: 12 },
  { id: 3, grupo: "Pernas e Glúteos", nome: "Ponte de glúteo", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/11/ponte-para-gluteos-1.gif", descricao: "Fortalece glúteos e lombar.", duracao: "30 seg", series: 3, repeticoes: 12 },
  { id: 4, grupo: "Pernas e Glúteos", nome: "Agachamento sumô", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/09/agachamento-sumo-sem-halter.gif", descricao: "Variante de agachamento com pernas afastadas.", duracao: "30 seg", series: 3, repeticoes: 15 },
  { id: 5, grupo: "Pernas e Glúteos", nome: "Elevação de panturrilha", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/03/Elevacao-de-panturrilha-em-pe.gif", descricao: "Fortalece panturrilhas.", duracao: "30 seg", series: 3, repeticoes: 20 },
  { id: 6, grupo: "Pernas e Glúteos", nome: "Avanço lateral", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/04/pernas-agachamento-lateral-lunges-com-pesos-1.gif", descricao: "Afunda lateralmente para fortalecer pernas.", duracao: "30 seg", series: 3, repeticoes: 12 },
  { id: 7, grupo: "Pernas e Glúteos", nome: "Step no degrau ou escada", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/11/step-up.gif", descricao: "Subida em degrau para cardio e pernas.", duracao: "1 min", series: 3, repeticoes: "-" },

  // Peito, Ombros e Tríceps
  { id: 8, grupo: "Peito, Ombros e Tríceps", nome: "Flexão de braço", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/04/flexao-de-bracos.gif", descricao: "Clássica flexão para peito, ombros e tríceps.", duracao: "30 seg", series: 3, repeticoes: 12 },
  { id: 9, grupo: "Peito, Ombros e Tríceps", nome: "Flexão diamante", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/03/flexao-de-bracos-diamante.gif", descricao: "Flexão com mãos em diamante, foca tríceps.", duracao: "30 seg", series: 3, repeticoes: 10 },
  { id: 10, grupo: "Peito, Ombros e Tríceps", nome: "Elevação lateral de braços", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/ombros-elevacao-lateral-de-ombros-com-halteres.gif", descricao: "Eleva braços lateralmente com garrafas.", duracao: "30 seg", series: 3, repeticoes: 15 },
  { id: 11, grupo: "Peito, Ombros e Tríceps", nome: "Elevação frontal", img: "https://www.hipertrofia.org/blog/wp-content/uploads/2018/09/elevacao-frontal-com-anilha-v2.gif", descricao: "Eleva braços frontalmente com garrafas.", duracao: "30 seg", series: 3, repeticoes: 15 },
  { id: 12, grupo: "Peito, Ombros e Tríceps", nome: "Tríceps no banco ou cadeira", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/04/triceps-no-banco.gif", descricao: "Tríceps no banco para fortalecer braços.", duracao: "30 seg", series: 3, repeticoes: 12 },
  { id: 13, grupo: "Peito, Ombros e Tríceps", nome: "Flexão inclinada", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/flexao-de-bracos-inclinada.gif", descricao: "Flexão com mãos elevadas em banco.", duracao: "30 seg", series: 3, repeticoes: 12 },

  // Core e Lombar
  { id: 14, grupo: "Core e Lombar", nome: "Prancha", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/11/01431301-Bridge-straight-arm_Waist_360_logo.gif", descricao: "Prancha clássica para core.", duracao: "30 seg", series: 3, repeticoes: "-" },
  { id: 15, grupo: "Core e Lombar", nome: "Prancha lateral", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/prancha-lateral.gif", descricao: "Prancha lateral, fortalece oblíquos.", duracao: "30 seg", series: 3, repeticoes: "-" },
  { id: 16, grupo: "Core e Lombar", nome: "Abdominal crunch", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/03/abdominal.gif", descricao: "Abdominal básico.", duracao: "30 seg", series: 3, repeticoes: 20 },
  { id: 17, grupo: "Core e Lombar", nome: "Elevação de pernas deitado", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/03/abdominal-no-chao-com-elevacao-de-pernas-esticadas.gif", descricao: "Fortalece parte inferior do abdômen.", duracao: "30 seg", series: 3, repeticoes: 15 },
  { id: 18, grupo: "Core e Lombar", nome: "Superman", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2023/10/47021301-superman-alternado.quadris.gif", descricao: "Fortalece lombar e glúteos.", duracao: "30 seg", series: 3, repeticoes: 12 },
  { id: 19, grupo: "Core e Lombar", nome: "Ponte com perna estendida", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/09/ponte-com-uma-perna-elevada-e-reta.gif", descricao: "Ponte para glúteo com perna estendida.", duracao: "30 seg", series: 3, repeticoes: 12 },
  { id: 20, grupo: "Core e Lombar", nome: "Abdominal bicicleta", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/03/abdominal-bicicleta-no-ar.gif", descricao: "Abdômen e oblíquos.", duracao: "30 seg", series: 3, repeticoes: 20 },

  // Cardio e Resistência
  { id: 21, grupo: "Cardio e Resistência", nome: "Burpee", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/04/burpee.gif", descricao: "Exercício completo de cardio e força.", duracao: "30 seg", series: 3, repeticoes: 10 },
  { id: 22, grupo: "Cardio e Resistência", nome: "Mountain climber", img: "https://i.pinimg.com/originals/fb/fa/09/fbfa0902f381a5735972c21255935aff.gif", descricao: "Movimento rápido de pernas para cardio.", duracao: "30 seg", series: 3, repeticoes: "-" },
  { id: 23, grupo: "Cardio e Resistência", nome: "Agachamento com salto", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/11/agachamento-com-salto-tradicional.gif", descricao: "Agachamento explosivo.", duracao: "30 seg", series: 3, repeticoes: 12 },
  { id: 24, grupo: "Cardio e Resistência", nome: "Corrida estacionária rápida", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2023/11/31991301-corrida-estacionaria-360.gif", descricao: "Corrida no lugar.", duracao: "1 min", series: 3, repeticoes: "-" },
  { id: 25, grupo: "Cardio e Resistência", nome: "Polichinelos", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/04/polichinelos.gif", descricao: "Cardio básico.", duracao: "1 min", series: 3, repeticoes: "-" },

  // Corpo inteiro funcional
  { id: 26, grupo: "Corpo inteiro funcional", nome: "Agachamento com flexão de braço", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2022/07/Burpee-com-flexao-de-bracos.gif", descricao: "Combo de agachamento + flexão.", duracao: "30 seg", series: 3, repeticoes: 10 },
  { id: 27, grupo: "Corpo inteiro funcional", nome: "Prancha com toque no ombro", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/11/01431301-Bridge-straight-arm_Waist_360_logo.gif", descricao: "Prancha com toque alternado no ombro.", duracao: "30 seg", series: 3, repeticoes: "-" },
  { id: 28, grupo: "Corpo inteiro funcional", nome: "Ponte de glúteo com perna elevada", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/09/ponte-com-uma-perna-elevada-e-reta.gif", descricao: "Ponte para glúteo com perna elevada.", duracao: "30 seg", series: 3, repeticoes: 12 },
  { id: 29, grupo: "Corpo inteiro funcional", nome: "Abdominal bicicleta", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2021/03/abdominal-bicicleta-no-ar.gif", descricao: "Abdômen e oblíquos.", duracao: "30 seg", series: 3, repeticoes: 20 },
  { id: 30, grupo: "Corpo inteiro funcional", nome: "Elevação lateral de braços com garrafas", img: "https://www.mundoboaforma.com.br/wp-content/uploads/2020/12/ombros-elevacao-lateral-de-ombros-com-halteres.gif", descricao: "Elevação lateral de braços com peso.", duracao: "30 seg", series: 3, repeticoes: 15 },
];

// Array do treino do usuário
let treinoSelecionado = [];

// ------------------- EXIBIR EXERCÍCIOS -------------------
function mostrarExercicios() {
  const container = document.getElementById("exercicios-lista");
  container.innerHTML = "";
  exercicios.forEach(ex => {
    const card = document.createElement("div");
    card.className = "exercicio-card";
    card.innerHTML = `
      <img src="${ex.img}" alt="${ex.nome}">
      <div class="exercicio-info">
        <h3>${ex.nome}</h3>
        <p><strong>Grupo:</strong> ${ex.grupo}</p>
        <p>${ex.descricao}</p>
        <p><strong>Duração:</strong> ${ex.duracao}</p>
        <p><strong>Séries:</strong> ${ex.series} | <strong>Repetições:</strong> ${ex.repeticoes}</p>
        <button onclick="adicionarTreino(${ex.id})">Adicionar ao treino</button>
      </div>
    `;
    container.appendChild(card);
  });
}

// ------------------- ADICIONAR / REMOVER -------------------
function adicionarTreino(id) {
  const ex = exercicios.find(e => e.id === id);
  if (!treinoSelecionado.some(e => e.id === id)) {
    treinoSelecionado.push(ex);
    mostrarTreino();
  }
}

function removerDoTreino(id) {
  treinoSelecionado = treinoSelecionado.filter(e => e.id !== id);
  mostrarTreino();
}

// ------------------- EXIBIR TREINO -------------------
function mostrarTreino() {
  const container = document.getElementById("meu-treino");
  container.innerHTML = treinoSelecionado.length ? "<h3>Treino Atual</h3>" : "";

  treinoSelecionado.forEach(ex => {
    const div = document.createElement("div");
    div.className = "exercicio-card";
    div.innerHTML = `
      <img src="${ex.img}" alt="${ex.nome}">
      <div class="exercicio-info">
        <h3>${ex.nome}</h3>
        <p><strong>Grupo:</strong> ${ex.grupo}</p>
        <p>${ex.descricao}</p>
        <p><strong>Séries:</strong> ${ex.series} | <strong>Repetições:</strong> ${ex.repeticoes}</p>
        <button onclick="removerDoTreino(${ex.id})">Remover</button>
      </div>
    `;
    container.appendChild(div);
  });
}

// ------------------- SALVAR TREINO -------------------
async function salvarTreino() {
  const nomeTreino = document.getElementById("nome-treino").value.trim();

  if (!nomeTreino) {
    alert("Digite um nome para o treino!");
    return;
  }
  if (treinoSelecionado.length === 0) {
    alert("Selecione ao menos um exercício!");
    return;
  }

  try {
    const resTreino = await fetch(`${API_URL}/treino`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome: nomeTreino,
        id_user: id_user
      })
    });

    if (!resTreino.ok) throw new Error("Erro ao criar treino");
    const treinoCriado = await resTreino.json();
    const id_treino = treinoCriado.id_treino;

    // Cria exercícios vinculados
    for (const ex of treinoSelecionado) {
      const resEx = await fetch(`${API_URL}/exerselec`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_exercicio: ex.id,
          series: ex.series,
          repeticoes: ex.repeticoes,
          peso: 0
        })
      });

      const exerSelec = await resEx.json();

      await fetch(`${API_URL}/treinoslink`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_ExerSelec: exerSelec.id_ExerSelec,
          id_treino: id_treino
        })
      });
    }

    alert("Treino salvo com sucesso!");
    treinoSelecionado = [];
    mostrarTreino();

    // 👉 Redireciona direto para a página de treinos criados
    window.location.href = "../treinoscriados/index.html";
  } catch (error) {
    console.error("Erro ao salvar treino:", error);
    alert("Erro ao salvar treino");
  }
}

// ------------------- INICIALIZAÇÃO -------------------
document.addEventListener("DOMContentLoaded", () => {
  mostrarExercicios();
  document.getElementById("salvar-treino").addEventListener("click", salvarTreino);
});