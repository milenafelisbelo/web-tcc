document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("recuperacaoForm");
  const emailInput = document.getElementById("email");
  const mensagem = document.getElementById("mensagem");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();

    if (!validarEmail(email)) {
      mensagem.textContent = "Digite um e-mail válido!";
      mensagem.className = "mensagem erro";
      return;
    }

    mensagem.textContent = "Um link de recuperação foi enviado para seu e-mail.";
    mensagem.className = "mensagem sucesso";

    setTimeout(() => {
      window.location.href = "../inicio/index.html";
    }, 2500);
  });

  function validarEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
  }
});