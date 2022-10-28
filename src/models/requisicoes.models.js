export class Api {
  static token = JSON.parse(localStorage.getItem("@kenzie-habits: token"));
  static headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${this.token} `,
  };
  //Requisição do Login
  static async login(obj) {
    return await fetch("https://habits-kenzie.herokuapp.com/api/userLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem(
          "@kenzie-habits: token",
          JSON.stringify(res.token)
        );
        localStorage.setItem(
          "@kenzie-habits: response",
          JSON.stringify(res.response)
        );
        return res;
      })
      .catch((err) => console.log(err));
  }
  //Atualização do perfil
  static async atualizacaoDoPerfil(obj) {
    return await fetch("https://habits-kenzie.herokuapp.com/api/user/profile", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(obj),
    })
      .then((res) => res.json())
      .then((res) => window.location.reload())
      .catch((err) => console.log(err));
  }
  //Rota para criar um Habit
  /*OBS.: Provalvelmente o obj que o body recebeu vai ser criado por um constructor.
  Por isso altere se preciso for para p.ex.:obj*/
  static async criarHabit(titulo, descricao, categoria) {
    return await fetch("https://habits-kenzie.herokuapp.com/api/habits", {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        habit_title: `${titulo}`,
        habit_description: `${descricao}`,
        habit_category: `${categoria}`,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
  //Rota para listar todos os Habits
  static async listaDeHabitos() {
    return await fetch("https://habits-kenzie.herokuapp.com/api/habits", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => console.log(err));
  }
  //Rota para os listar Habits por categoria
  static async categoriaHabits(categoria) {
    return await fetch(
      `https://habits-kenzie.herokuapp.com/api/habits/category/${categoria}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => console.log(err));
  }
  //Rota para atualização habit
  static async atualizacaoDoHabit(titulo, descricao, categoria, idDoHabit) {
    return await fetch(
      `https://habits-kenzie.herokuapp.com/api/habits/${idDoHabit}`,
      {
        method: "PATCH",
        headers: this.headers,
        body: JSON.stringify({
          habit_title: `${titulo}`,
          habit_description: `${descricao}`,
          habit_category: `${categoria}`,
        }),
      }
    )
      .then((res) => res.json())
      .catch((err) => console.log(err));
  }
  //Habit concluído
  static async conclusaoDoHabit(idDoHabit) {
    return await fetch(
      `https://habits-kenzie.herokuapp.com/api/habits/complete/${idDoHabit}`,
      {
        method: "PATCH",
        headers: {
          method: "DELETE",
          Authorization: `Bearer ${this.token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => console.log(err));
  }
  //Deletar Habit
  static async deletarHabit(idDoHabito) {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
    };
    fetch(
      `https://habits-kenzie.herokuapp.com/api/habits/${idDoHabito}`,
      options
    )
      .then((response) => response.json())
      .then((response) => window.location.reload())
      .catch((err) => console.error(err));
  }
}
