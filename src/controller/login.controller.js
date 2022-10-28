import { Api } from "../models/requisicoes.models.js";
export default class PaginaLogin {
  static async login() {
    const main = document.querySelector("main");
    const container = document.createElement("div");
    const divEsquerda = document.createElement("div");
    const divEsquerdaIn = document.createElement("div");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    const p2 = document.createElement("p");
    const divDireita = document.createElement("div");
    const divDireitaIn = document.createElement("div");
    const login = document.createElement("h2");
    const formulario = document.createElement("form");
    const etiquetaEmail = document.createElement("label");
    const inputEmail = document.createElement("input");
    const etiquetaSenha = document.createElement("label");
    const inputSenha = document.createElement("input");
    const botaoLogin = document.createElement("button");
    container.className = "container";
    divEsquerda.className = "divEsquerda";
    divEsquerdaIn.className = "divEsquerda__Interna";
    h2.className = "divEsquerda__titulo";
    h2.innerText = "KenzieHabit";
    p.className = "divEsquerda__paragrafo";
    p.innerText = "If you are going to use a passage of Lorem Ipsum";
    p2.className = "divEsquerda__paragrafopequeno";
    p2.innerText = "you need to be sure there isn't anything";
    divDireita.className = "divDireita";
    divDireitaIn.className = "divInterna";
    login.className = "login";
    login.innerText = "login";
    formulario.className = "formulario";
    etiquetaEmail.className = "etiquetas";
    etiquetaEmail.innerText = "Usuário";
    inputEmail.type = "email";
    inputEmail.name = "email";
    inputEmail.className = "inputs";
    inputEmail.placeholder = " Digite seu e-mail";
    inputEmail.required

    etiquetaSenha.accessKeyLabel = "password";
    etiquetaSenha.className = "etiquetas";
    etiquetaSenha.innerText = "Senha";
    inputSenha.type = "password";
    inputSenha.name = "password";
    inputSenha.className = "inputs";
    inputSenha.placeholder = " Digitar minha senha";
    inputSenha.required

    botaoLogin.type = "button";
    botaoLogin.className = "botaoLogin";
    botaoLogin.innerText = "Entrar";
    botaoLogin.addEventListener("click", async (event) => {
      event.preventDefault();
      const data = {};
      const respostaForm = [...event.target.form];
      respostaForm.forEach((input) => {
        if (input.value !== "") {
          data[input.name] = input.value;
        }
      });
      if (Api.token == undefined) {
      await Api.login(data)
      window.location.href = "./src/views/homePage.views.html";
      }

      
    });
    main.append(container);
    container.append(divEsquerda, divDireita);
    divEsquerda.append(divEsquerdaIn);
    divDireita.append(divDireitaIn);
    divEsquerdaIn.append(h2, p, p2);
    divDireitaIn.append(login, formulario);
    formulario.append(
      etiquetaEmail,
      inputEmail,
      etiquetaSenha,
      inputSenha,
      botaoLogin
    );
  }
}


