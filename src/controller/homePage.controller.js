import { Api } from "../models/requisicoes.models.js";

export class FazerRequisicao {

    static async criarHabito(titulo, descricao, categoria) {

        Api.criarHabit(titulo, descricao, categoria).then(() => {
            window.location.reload()
        });
        
    }

    static async editarHabito(titulo, descricao, categoria, id) {

        Api.atualizacaoDoHabit(titulo, descricao, categoria, id).then(() => {
            window.location.reload()
        });
    }

    
}