import axios from "axios";

const api = axios.create({
  baseURL: "https://zecoisinhatemtudo.onrender.com/",
});

export const cadastrarUsuario = async (
  url: string,
  dados: Object,
  setDados: Function
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const login = async (url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

export const buscar = async (
  url: string,
  setDados: Function,
  header: Object
) => {
  try {
    const resposta = await api.get(url, header);
    if (resposta.status === 401 || resposta.status === 403) {
      localStorage.removeItem("usuario");
      window.location.href = "/";
      return;
    }
    setDados(resposta.data);
  } catch (error: any) {
    console.log(error);
  }
};

export const cadastrar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header: Object
) => {
  const resposta = await api.post(url, dados, header);
  setDados(resposta.data);
};

export const atualizar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header: Object
) => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data);
};

export const deletar = async (url: string, header: Object) => {
  await api.delete(url, header);
};
