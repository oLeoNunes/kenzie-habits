import { FazerRequisicao } from "../controller/homePage.controller.js";
import { Api } from "../models/requisicoes.models.js";
if (localStorage.getItem("@kenzie-habits: token") == undefined) {
  window.location.href = "../../index.html";
}

const body = document.querySelector("body");
const main = document.querySelector("main");
const container = document.querySelector(".container");
const ul = document.querySelector("ul");

export class CriarHeader {
  static async criarHeader() {
    let dadosUser = JSON.parse(
      localStorage.getItem("@kenzie-habits: response")
    );

    const header = document.createElement("header");
    header.classList.add("header");

    const figure = document.createElement("figure");
    const img = document.createElement("img");

    const figure2 = document.createElement("figure");
    const imagemPerfil = document.createElement("img");
    figure2.classList.add("dropdown");

    imagemPerfil.src = dadosUser.usr_image;
    imagemPerfil.id = "fotoDePerfil2";
    img.src = "../assets/img/KenzieHabit.png";

    // DROPDOWN DOM

    const conteudoDropdown = document.createElement("div");
    conteudoDropdown.classList.add("conteudoDropdown");

    const imgPoligono = document.createElement("img");
    imgPoligono.id = "setaBalao";

    const editarPerfilDropdown = document.createElement("label");
    editarPerfilDropdown.classList.add("liDropdown");
    editarPerfilDropdown.id = "editarPerfilDropdown";

    const imgUserPng = document.createElement("img");
    imgUserPng.src = "../assets/img/user.png";

    const txtEditarPerfilDropdown = document.createElement("p");
    txtEditarPerfilDropdown.id = "txtEditarPerfilDropdown";
    txtEditarPerfilDropdown.innerText = "Editar perfil";
    editarPerfilDropdown.append(imgUserPng, txtEditarPerfilDropdown);

    const sairPerfilDropdown = document.createElement("label");
    sairPerfilDropdown.classList.add("liDropdown");
    sairPerfilDropdown.id = "sairPerfilDropdown";

    const imgSairPng = document.createElement("img");
    imgSairPng.src = "../assets/img/sairUser.png";

    const txtSairPerfilDropdown = document.createElement("p");
    txtSairPerfilDropdown.id = "txtSairPerfilDropdown";
    txtSairPerfilDropdown.innerText = "Sair do app";
    sairPerfilDropdown.append(imgSairPng, txtSairPerfilDropdown);
    conteudoDropdown.append(editarPerfilDropdown, sairPerfilDropdown);

    // =================

    const imagemPerfil2 = document.querySelector("#fotoDePerfil");
    const h3 = document.querySelector("h3");

    imagemPerfil2.src = dadosUser.usr_image;
    imagemPerfil2.id = "fotoDePerfil";
    h3.innerText = dadosUser.usr_name;

    figure2.append(imagemPerfil, conteudoDropdown);
    figure.append(img);
    header.append(figure, figure2);

    container.insertAdjacentElement("afterbegin", header);

    await this.acoesDropdown();
  }

  static async acoesDropdown() {
    const sairPerfilDropdown = document.querySelector("#sairPerfilDropdown");

    sairPerfilDropdown.addEventListener("click", () => {
      localStorage.clear();
      window.location.replace("../../index.html");
    });
  }
}

export class ListarHabitos {
  static semLimite = false;
  static async listarHabitos(listaHabitos) {
    let contador = 0;
    if (listaHabitos == undefined) {
      listaHabitos = await Api.listaDeHabitos();
    }

    ul.innerHTML = `<div class="conteudoUl">
    <legend id="status">Status</legend>
    <legend id="titulo" class="titulo">Titulo</legend>
    <legend class="legendEsconder descricaoLimite">Descricao</legend>
    <legend class="legendEsconder categoria">Categoria</legend>
    <legend id="editar">Editar</legend>
    </div>`;

    listaHabitos.forEach((habito) => {
      if (contador <= 10 || this.semLimite == true) {
        const li = document.createElement("li");

        li.id = habito.habit_id;

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("caixaMarcacao");
        checkbox.id = habito.habit_id;

        if (habito.habit_status == true) {
          li.classList.add("caixaMarcacaoChecked");
          checkbox.checked = true;
        }

        const titulo = document.createElement("p"); //
        titulo.innerText = habito.habit_title;
        titulo.classList.add("titulo", "tituloListaHabitos");
        titulo.id = "idTitulo";

        const descricao = document.createElement("p"); //
        descricao.innerText = habito.habit_description;
        descricao.classList.add("legendEsconder", "descricaoLimite");
        descricao.id = "idDescricao";

        const categoria = document.createElement("button"); //
        categoria.innerText = habito.habit_category;
        categoria.classList.add("legendEsconder", "categoria");
        categoria.id = "idCategoria";

        const editar = document.createElement("button");
        editar.style.backgroundImage = "url('../assets/img/editar.png')";
        editar.classList.add("botaoEditar");

        li.append(checkbox, titulo, descricao, categoria, editar);
        ul.append(li);
        contador++;
      }
    });

    await acoesEditarPerfil()
    await criarEventosModais();
    await this.criarBtnListarMais();
    await acoesCheckbox.teste();
    await Filter.filtrar();
  }

  static async criarBtnListarMais() {
    const botaoCarregarMais = document.createElement("button");
    const divAdd = document.createElement("div");
    divAdd.classList.add("divAdd");
    const contadorCTM = await document.querySelectorAll(".botaoCarregarMais");
    if (contadorCTM.length == 0) {
      botaoCarregarMais.classList.add("botaoCarregarMais");
      botaoCarregarMais.innerText = "Carregar mais";
      divAdd.append(botaoCarregarMais);
      body.appendChild(divAdd);
    }
  }
}

class acoesCheckbox {
  static async teste() {
    const checkbox = document.querySelectorAll(".caixaMarcacao");
    await checkbox.forEach(async (caixa) => {
      caixa.addEventListener("change", function () {
        if (caixa.checked == true) {
          caixa.parentElement.classList.add("caixaMarcacaoChecked");
          Api.conclusaoDoHabit(caixa.id);
        } else {
          caixa.parentElement.classList.remove("caixaMarcacaoChecked");
        }
      });
    });
  }
}

//CRIAÇÃO MODAL

async function criarEventosModais() {
  const divContainerModal = document.querySelector(".containerModal");
  let idHabitoClicado = 0

  // Editar Habito
  const botaoEditar = document.querySelectorAll(".botaoEditar");
  const divModalEditar = document.querySelector(".modalEditar");
  const btnFecharModalEditar = document.querySelector("#fecharModalEditar");
  const formEditarHabito = document.querySelector(".formEditarHabito");

  // Editar Perfil
  const modalEditarPerfil = document.querySelector(".modalEditarPerfil");
  const divEditarPerfil = document.querySelector(".modalEditarPerfil");

  //Criar Hábito
  const btnCriar = document.querySelector(".botaoCriar");
  const btnFecharModalCriar = document.querySelector("#fecharModalCriar");
  const divModalCriar = document.querySelector(".modalCriar");
  const formModalCriar = document.querySelector(".formCriarHabito");

  //Excluir Habito
  const modalExcluir = document.querySelector(".modalExcluir");
  const excluirBtn = document.querySelector("#excluir");
  const fecharModalExcluir = document.querySelector("#fecharModalExcluir");
  const cancelarExcluir = document.querySelector("#cancelarExcluir");
  const confirmarExcluir = document.querySelector("#confirmarExcluir");

  //Funcionalidade criar
  btnCriar.addEventListener("click", function abrirModal() {
    divModalCriar.style.display = "flex";
    divContainerModal.style.display = "flex";
    divContainerModal.style.background = "rgba(0,0,0, 0.7)";
    divEditarPerfil.style.display = "none";
    modalExcluir.style.display = "none";
  });

  btnFecharModalCriar.addEventListener("click", function fecharModal() {
    divModalCriar.style.animationName = "blowUpModalClose";
    setTimeout(() => {
      divContainerModal.style.background = "rgba(0,0,0, 0";
      divContainerModal.style.display = "none";
      divModalCriar.style.animationName = "blowUpModal";
    }, 500);
  });

  window.addEventListener("click", function clicarFora(e) {
    if (e.target === divContainerModal) {
      divModalCriar.style.animationName = "blowUpModalClose";
      setTimeout(() => {
        divContainerModal.style.background = "rgba(0,0,0, 0";
        divContainerModal.style.display = "none";
        divModalCriar.style.animationName = "blowUpModal";
      }, 350);
    }
  });

//Funcionalidade Editar Habito
botaoEditar.forEach((Btn) => {
  Btn.addEventListener("click", (e) => {
    const li = e.path[1].children;
    const titulo = li[1].innerText;
    const descricao = li[2].innerText;
    const categoria = li[3].innerText;
    const checked = li[0].checked;
    const id = e.path[1].id
    idHabitoClicado = e.path[1].id
    formEditarHabito[0].placeholder = titulo;
    formEditarHabito[1].placeholder = descricao;
    formEditarHabito[2].value = categoria;
    formEditarHabito[3].checked = checked;
    divContainerModal.style.display = "flex";
    divModalCriar.style.display = "none";
    divModalEditar.style.display = "flex";
    modalExcluir.style.display = "none";
    modalEditarPerfil.style.display = "none";
    divEditarPerfil.style.display = "none";
    divContainerModal.style.background = "rgba(0,0,0, 0.7)";
  });
});
btnFecharModalEditar.addEventListener("click", function fecharModal() {
  divModalEditar.style.animationName = "blowUpModalClose";
  setTimeout(() => {
    divContainerModal.style.background = "rgba(0,0,0, 0";
    divContainerModal.style.display = "none";
    divModalEditar.style.animationName = "blowUpModal";
    divModalEditar.style.display = "none";
  }, 350);
  idHabitoClicado = 0
});
formEditarHabito.addEventListener("submit", async (e) => {
  e.preventDefault();
  const tituloEditado = formEditarHabito[0].value;
  const descricaoEditado = formEditarHabito[1].value;
  const categoriaEditado = formEditarHabito[2].value;
  const status = formEditarHabito[3].checked;
  await FazerRequisicao.editarHabito(
    tituloEditado,
    descricaoEditado,
    categoriaEditado,
    idHabitoClicado
  );
});
window.addEventListener("click", function clicarFora(e) {
  if (e.target === divContainerModal) {
    divModalEditar.style.animationName = "blowUpModalClose";
    setTimeout(() => {
      // divContainerModal.style.background = ("rgba(0,0,0, 0")
      divContainerModal.style.display = "none";
      divModalEditar.style.animationName = "blowUpModal";
      divModalEditar.style.display = "none";
    }, 350);
  }
});
// Funcionalidades Excluir Habito
excluirBtn.addEventListener("click", (e) => {
  e.preventDefault();
  divModalEditar.style.display = "none";
  modalExcluir.style.display = "flex";
});
fecharModalExcluir.addEventListener("click", () => {
  modalExcluir.style.display = "none";
  divContainerModal.style.display = "none";
});
cancelarExcluir.addEventListener("click", () => {
  modalExcluir.style.display = "none";
  divModalEditar.style.display = "flex";
});
confirmarExcluir.addEventListener("click", async () => {
  modalExcluir.style.display = "none";
  divContainerModal.style.display = "none";
  await Api.deletarHabit(idHabitoClicado)
});
}
async function acoesEditarPerfil() {
let dadosUser = JSON.parse(localStorage.getItem("@kenzie-habits: response"));
const btnEditarPerfil = await document.querySelector("#editarPerfilDropdown");
const fecharModalEditarPerfil = document.querySelector(
  "#fecharModalEditarPerfil"
);
const btnSubmitEditarPerfil = document.querySelector("#submitEditarPerfil");
const userNameEditar = document.querySelector("#nomeUsuarioEditar");
const userAvatarEditar = document.querySelector("#urlEditar");
const divContainerModal = document.querySelector(".containerModal");
const divEditarPerfil = document.querySelector(".modalEditarPerfil");
const divModalCriar = document.querySelector(".modalCriar");
const modalExcluir = document.querySelector(".modalExcluir");
btnEditarPerfil.addEventListener("click", async () => {
  userNameEditar.value = dadosUser.usr_name;
  userAvatarEditar.value = dadosUser.usr_image;
  divContainerModal.style.display = "flex";
  divEditarPerfil.style.display = "flex";
  divModalCriar.style.display = "none";
  modalExcluir.style.display = "none";
  divContainerModal.style.background = "rgba(0,0,0, 0.7)";
});
fecharModalEditarPerfil.addEventListener("click", async () => {
  divEditarPerfil.style.animationName = "blowUpModalClose";
  setTimeout(() => {
    divContainerModal.style.background = "rgba(0,0,0, 0";
    divContainerModal.style.display = "none";
    divEditarPerfil.style.animationName = "blowUpModal";
  }, 500);
});
window.addEventListener("click", function clicarFora(e) {
  if (e.target === divContainerModal) {
    divEditarPerfil.style.animationName = "blowUpModalClose";
    setTimeout(() => {
      divContainerModal.style.background = "rgba(0,0,0, 0";
      divContainerModal.style.display = "none";
      divEditarPerfil.style.animationName = "blowUpModal";
    }, 350);
  }
});
btnSubmitEditarPerfil.addEventListener("click", async (e) => {
  e.preventDefault();
  const objEditarPerfil = dadosUser;
  delete objEditarPerfil.usr_email;
  if (
    userAvatarEditar.value != dadosUser.usr_image ||
    userNameEditar != dadosUser.usr_name
  ) {
    objEditarPerfil.usr_name = userNameEditar.value;
    objEditarPerfil.usr_image = userAvatarEditar.value;
    dadosUser.usr_name = userNameEditar.value;
    dadosUser.usr_image = userAvatarEditar.value;
    console.log(objEditarPerfil)
    Api.atualizacaoDoPerfil(objEditarPerfil);
    localStorage.removeItem("@kenzie-habits: response");
    localStorage.setItem(
      "@kenzie-habits: response",
      JSON.stringify(dadosUser)
    );
  }
  divEditarPerfil.style.animationName = "blowUpModalClose";
  setTimeout(() => {
    divContainerModal.style.background = "rgba(0,0,0, 0";
    divContainerModal.style.display = "none";
    divEditarPerfil.style.animationName = "blowUpModal";
  }, 500);
});
}
export class Modais {
static async enviarDadosHabito() {
  const formModalCriar = document.querySelector(".formCriarHabito");
  formModalCriar.addEventListener("submit", async (e) => {
    e.preventDefault();
    const titulo = e.path[0][0].value;
    const descricao = e.path[0][1].value;
    const categoria = e.path[0][2].value;
    FazerRequisicao.criarHabito(titulo, descricao, categoria);
  });
}
static async editarHabito(titulo, descricao, categoria, id) {
  const divModalCriar = document.querySelector(".modalCriar");
  const divContainerModal = document.querySelector(".containerModal");
  FazerRequisicao.editarHabito(titulo, descricao, categoria, id);
  window.addEventListener("click", function clicarFora(e) {
    if (e.target === divContainerModal) {
      divModalCriar.style.animationName = "blowUpModalClose";
      setTimeout(() => {
        divContainerModal.style.background = "rgba(0,0,0, 0";
        divContainerModal.style.display = "none";
        divModalCriar.style.animationName = "blowUpModal";
      }, 350);
    }
  });
}
}
class Filter {
static async filtrar() {
  const btnCategoria = await document.querySelectorAll(".categoria");
  btnCategoria.forEach((botaoCategoria) => {
    botaoCategoria.addEventListener("click", async () => {
      const categoriaBusca = botaoCategoria.innerText;
      const objFiltrado = await Api.categoriaHabits(categoriaBusca);
      ListarHabitos.listarHabitos(objFiltrado);
    });
  });
  const botaoTodos = document.querySelector("#botaoTodos");
  botaoTodos.addEventListener("click", () => {
    ListarHabitos.listarHabitos();
  });
  const botaoConcluidos = document.querySelector("#botaoConcluidos");
  botaoConcluidos.addEventListener("click", async () => {
    const objFiltro = await Api.listaDeHabitos();
    const objFiltrado = [];
    objFiltro.forEach((li) => {
      if (li.habit_status == true) {
        objFiltrado.push(li);
      }
    });
    ListarHabitos.listarHabitos(objFiltrado);
  });
  const btnAdd = document.querySelector(".botaoCarregarMais");
  const divAdd = document.querySelector(".divAdd");
  btnAdd.addEventListener("click", () => {
    ListarHabitos.semLimite = true;
    ListarHabitos.listarHabitos();
    divAdd.style.display = "none";
  });
}
}