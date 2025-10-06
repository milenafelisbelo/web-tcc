document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();

    if (!email || !senha) {
      alert("Preencha todos os campos!");
      return;
    }

    if (!document.getElementById("termos").checked) {
      alert("Você deve aceitar os termos de uso!");
      return;
    }

    try {
      const response = await fetch("https://backend-tcc-iota.vercel.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      });

      const data = await response.json();

      if (response.ok) {
        // salva token no navegador
        localStorage.setItem("token", data.token);

        alert("Login realizado com sucesso!");
        // redireciona para a página do usuário
        window.location.href = "../UsuarioCadastrado/index.html";
      } else {
        alert(data.message || "Erro ao logar!");
      }

    } catch (error) {
      console.error("Erro:", error);
      alert("Erro na conexão com o servidor");
    }
  });
});