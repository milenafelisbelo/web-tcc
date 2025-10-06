document.getElementById("year").textContent = new Date().getFullYear();

// IMC
document.getElementById("calcImc").addEventListener("click", () => {
  const peso = parseFloat(document.getElementById("peso").value);
  const alturaCm = parseFloat(document.getElementById("altura").value);
  if (!peso || !alturaCm) return alert("Preencha peso e altura");

  const altura = alturaCm / 100;
  const imc = peso / (altura * altura);
  document.getElementById("imcValor").textContent = imc.toFixed(1);

  let label = "";
  if (imc < 18.5) label = "Abaixo do peso";
  else if (imc < 25) label = "Normal";
  else if (imc < 30) label = "Sobrepeso";
  else label = "Obesidade";

  document.getElementById("imcLabel").textContent = label;
});


// TBM - Taxa Metabólica Basal
document.getElementById("calcTmb").addEventListener("click", () => {
  const sexo = document.getElementById("sexo").value;
  const idade = parseInt(document.getElementById("idade").value);
  const altura = parseFloat(document.getElementById("tmbAltura").value);
  const peso = parseFloat(document.getElementById("tmbPeso").value);
  const atividade = parseFloat(document.getElementById("atividade").value);

  if (!sexo || !idade || !altura || !peso) return alert("Preencha todos os campos");

  let tmb = 0;
  if (sexo === "f") tmb = 655 + 9.6*peso + 1.8*altura - 4.7*idade;
  else tmb = 66 + 13.7*peso + 5*altura - 6.8*idade;

  const manutencao = tmb * atividade;

  document.getElementById("tmbValor").textContent = tmb.toFixed(0);
  document.getElementById("manutencaoValor").textContent = manutencao.toFixed(0);
});


// TEMPO
let timerInterval;
let timerSeconds = 600; // padrão 10 min

function updateTimerDisplay() {
  const min = Math.floor(timerSeconds / 60);
  const sec = timerSeconds % 60;
  document.getElementById("timer").textContent =
    `${String(min).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
}

document.getElementById("startTimer").addEventListener("click", () => {
  clearInterval(timerInterval);
  const inputMin = parseInt(document.getElementById("timerMinutes").value);
  if (inputMin > 0) timerSeconds = inputMin * 60;
  updateTimerDisplay();

  timerInterval = setInterval(() => {
    if (timerSeconds > 0) {
      timerSeconds--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      alert("Tempo encerrado!");
    }
  }, 1000);
});

document.getElementById("resetTimer").addEventListener("click", () => {
  clearInterval(timerInterval);
  timerSeconds = parseInt(document.getElementById("timerMinutes").value) * 60;
  updateTimerDisplay();
});

document.getElementById("addWater").addEventListener("click", () => {
  alert("Bom trabalho! Mais um copo de água registrado!");
});


// NOTAS
let progress = JSON.parse(localStorage.getItem("progress")) || {days:0, notes:[]};

function renderNotes() {
  const list = document.getElementById("notesList");
  list.innerHTML = progress.notes.map(n => `<p>🗒️ ${n}</p>`).join("");
}
renderNotes();

document.getElementById("completeDay").addEventListener("click", () => {
  progress.days++;
  localStorage.setItem("progress", JSON.stringify(progress));
  alert(`Dia concluído! Total: ${progress.days} dias`);
});

document.getElementById("clearProgress").addEventListener("click", () => {
  if (confirm("Deseja realmente limpar todo o progresso?")) {
    progress = {days:0, notes:[]};
    localStorage.removeItem("progress");
    renderNotes();
  }
});

document.getElementById("saveNotes").addEventListener("click", () => {
  const note = document.getElementById("notes").value.trim();
  if (!note) return alert("Digite algo para salvar.");
  progress.notes.push(note);
  localStorage.setItem("progress", JSON.stringify(progress));
  document.getElementById("notes").value = "";
  renderNotes();
});


// CHAT
const chatInput = document.querySelector("#mentais input");
const chatBtn = document.querySelector("#mentais button");
const chatBox = document.createElement("div");
chatBox.classList.add("chat-box");
chatBox.style.maxHeight = "200px";
chatBox.style.overflowY = "auto";
chatBox.style.marginTop = "1rem";
chatBox.style.display = "flex";
chatBox.style.flexDirection = "column";
document.querySelector("#mentais .subscribe").appendChild(chatBox);

function addMessage(text, from="user") {
  const msg = document.createElement("div");
  msg.textContent = text;
  msg.style.padding = "6px";
  msg.style.margin = "4px 0";
  msg.style.borderRadius = "8px";
  msg.style.maxWidth = "80%";
  msg.style.wordWrap = "break-word";
  if (from === "user") {
    msg.style.background = "#d1e7ff";
    msg.style.alignSelf = "flex-end";
  } else {
    msg.style.background = "#e8f5e9";
    msg.style.alignSelf = "flex-start";
  }
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function botReply(userText) {
  const API_URL = "https://backend-tcc-iota.vercel.app/";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: userText })
    });

    const data = await res.json();

    addMessage(data.reply || "Não entendi, pode repetir?", "bot");

  } catch (err) {
    console.error(err);
    addMessage("Erro ao conectar com a IA.", "bot");
  }
}

chatBtn.addEventListener("click", () => {
  const text = chatInput.value.trim();
  if (!text) return;
  addMessage(text, "user");
  chatInput.value = "";
  botReply(text);
});