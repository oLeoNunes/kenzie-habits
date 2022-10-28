import { Api } from "../models/requisicoes.models.js";

import { FazerRequisicao } from "../controller/homePage.controller.js";

import { CriarHeader, Modais, ListarHabitos} from "../views/homePage.views.js"

// Api.login(objeto);

ListarHabitos.listarHabitos();
CriarHeader.criarHeader();
Modais.enviarDadosHabito();
// Modais.editarHabito();