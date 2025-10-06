// script.js

window.addEventListener("DOMContentLoaded", () => {
  const diaSelect = document.getElementById("dia");
  const mesSelect = document.getElementById("mes");
  const anoSelect = document.getElementById("ano");

  const meses = [
    { numero: "01", dias: 31 },
    { numero: "02", dias: 28 },
    { numero: "03", dias: 31 },
    { numero: "04", dias: 30 },
    { numero: "05", dias: 31 },
    { numero: "06", dias: 30 },
    { numero: "07", dias: 31 },
    { numero: "08", dias: 31 },
    { numero: "09", dias: 30 },
    { numero: "10", dias: 31 },
    { numero: "11", dias: 30 },
    { numero: "12", dias: 31 }
  ];

  // Preenche anos
  const anoAtual = new Date().getFullYear();
  for (let i = anoAtual; i >= 1900; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    anoSelect.appendChild(option);
  }

  // Preenche meses
  meses.forEach((mesObj, index) => {
    const option = document.createElement("option");
    option.value = mesObj.numero;
    option.textContent = index + 1;
    mesSelect.appendChild(option);
  });

  // Atualiza dias de acordo com mês e ano
  function preencherDias() {
    const mesIndex = mesSelect.selectedIndex - 1;
    const ano = parseInt(anoSelect.value);
    if (mesIndex < 0) return;

    let dias = meses[mesIndex].dias;
    if (mesIndex === 1) {
      if ((ano % 4 === 0 && ano % 100 !== 0) || (ano % 400 === 0)) {
        dias = 29;
      } else {
        dias = 28;
      }
    }

    diaSelect.innerHTML = '<option value="">Dia</option>';
    for (let i = 1; i <= dias; i++) {
      const option = document.createElement("option");
      option.value = i.toString().padStart(2, "0");
      option.textContent = i;
      diaSelect.appendChild(option);
    }
  }

  mesSelect.addEventListener("change", preencherDias);
  anoSelect.addEventListener("change", preencherDias);
});

// Cadastro
const form = document.getElementById("form-cadastro");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value.trim();
  const dia = document.getElementById("dia").value;
  const mes = document.getElementById("mes").value;
  const ano = document.getElementById("ano").value;
  const genero = document.querySelector('input[name="genero"]:checked')?.value;

  if (!nome || !email || !senha || !dia || !mes || !ano || !genero) {
    alert("Preencha todos os campos!");
    return;
  }

  const nascimento = `${ano}-${mes}-${dia}`;
  const user = { nome, email, senha, nascimento, genero };

  try {
    const res = await fetch("https://backend-tcc-iota.vercel.app/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user)
    });

    if (res.ok) {
      alert("Cadastro realizado com sucesso! Agora você pode entrar.");
      window.location.href = "../inicio/index.html"; // só redireciona depois do alert
    } else {
      const data = await res.json();
      alert("Erro ao cadastrar: " + (data.message || "Tente novamente."));
    }
  } catch (error) {
    console.error("Erro ao cadastrar:", error);
    alert("Não foi possível conectar à API.");
  }
});