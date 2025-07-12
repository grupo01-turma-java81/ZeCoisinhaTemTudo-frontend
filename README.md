# 🛒 Zé Coisinha Tem Tudo – Frontend

![Zé Coisinha mascote](https://i.postimg.cc/jSxdHD4c/mascote.gif)

**Zé Coisinha Tem Tudo** é um sistema web voltado para vendedores e representantes que desejam gerenciar seus pedidos, clientes e oportunidades de forma prática e eficiente. Desenvolvido com **React + TypeScript**, o frontend se integra a uma API REST em Java com Spring Boot e oferece navegação intuitiva, autenticação JWT e uma interface moderna.

#### 💡 Descrição
A plataforma permite que usuários autenticados visualizem, cadastrem, editem e excluam **pedidos** e **clientes**, além de acessar **oportunidades de fidelização** com base em avaliações positivas. A navegação é otimizada para diferentes dispositivos e oferece animações, feedbacks visuais e organização por módulos.

---

> 💻 Este é o **repositório do frontend**, desenvolvido em **React + TypeScript**, e está disponível online pelo Vercel. </br>
> 🌐 Acesse o sistema em produção clicando [aqui](https://ze-coisinha-tem-tudo-frontend.vercel.app/). </br>
> 🔧 O backend, desenvolvido em Java com Spring Boot, está hospedado no Render e pode ser acessado [neste link](https://zecoisinhatemtudo.onrender.com/). </br>
> 📂 Para visualizar o código-fonte do backend, acesse o [repositório oficial do backend](https://github.com/grupo01-turma-java81/ZeCoisinhaTemTudo). </br>

## 🖼️ Demonstração Visual

### Página de Login
![Login](https://i.postimg.cc/kgxrWHTk/login.png)

</br>

### Página Inicial
![Home](https://i.postimg.cc/d3xFSTCp/home.png)

</br>

### Página de Pedidos
![Pedidos](https://i.postimg.cc/Y9CJKCtH/dashboard.png)

</br>

### Página de Clientes
![Clientes](https://i.postimg.cc/HnJRnvJv/clientes.png)

</br>

### Página de Oportunidades
![Oportunidades](https://i.postimg.cc/fy0qD3F6/oportunidades.png)


## 🚀 Tecnologias Utilizadas

- [**React**](https://reactjs.org/): Biblioteca JavaScript para construção de interfaces de usuário reativas e componentizadas.  
- [**TypeScript**](https://www.typescriptlang.org/): Superset do JavaScript que adiciona tipagem estática, trazendo mais segurança ao desenvolvimento.  
- [**Tailwind CSS**](https://tailwindcss.com/): Framework de utilitários para estilização rápida e responsiva diretamente nas classes HTML.  
- [**React Router DOM**](https://reactrouter.com/): Biblioteca de roteamento para navegação entre páginas no React.  
- [**Axios**](https://axios-http.com/): Cliente HTTP para consumo de APIs, facilitando requisições assíncronas.  
- [**React Icons**](https://react-icons.github.io/react-icons/): Conjunto de bibliotecas de ícones para React com fácil personalização.  
- [**React Loader Spinner**](https://mhnpd.github.io/react-loader-spinner/): Biblioteca para exibir spinners e indicadores de carregamento.  
- [**Vite**](https://vitejs.dev/): Ferramenta moderna de build que oferece desempenho otimizado para projetos React.  
- [**Figma**](https://figma.com/): Plataforma de design colaborativo utilizada para criar o layout e os protótipos do sistema.  
- [**Java Spring Boot (Backend)**](https://spring.io/projects/spring-boot): Framework Java utilizado para desenvolver a API REST que atende o frontend.


## 🧠 Funcionalidades
✔️ Cadastro e login com autenticação JWT </br>
✔️ Visualização e gerenciamento de pedidos </br>
✔️ Cadastro, edição e remoção de clientes </br>
✔️ Página de oportunidades com contato direto via WhatsApp </br>
✔️ Navegação protegida por token </br>
✔️ Feedback visual com animações (Framer Motion) </br>
✔️ Skeleton de carregamento com React Loader Spinner </br>
✔️ Mensagens de alerta com Toastify </br>
✔️ Layout responsivo com Tailwind CSS </br>
✔️ Dashboard interativo com gráficos e métricas da aplicação </br> </br>

<p align="center"> <img src="https://i.postimg.cc/J058Md9w/dashboard-new.gif" alt="Demonstração do Dashboard" /> </p>

#### 🔐 Autenticação
A autenticação é feita com JWT. Após o login, o token é armazenado no `localStorage` e usado em todas as requisições autenticadas. O contexto `AuthContext` controla o estado do usuário logado e realiza o redirecionamento automático com base no token.

## 🔄 Rotas (Frontend)
| Rota             | Componente      | Descrição                               |
| ---------------- | --------------- | --------------------------------------- |
| `/` ou `/login`  | `Login`         | Tela de login do usuário                |
| `/cadastro`      | `Cadastro`      | Tela de registro                        |
| `/home`          | `Home`          | Tela de boas-vindas e pedidos positivos |
| `/pedidos`       | `ListaPedidos`  | Listagem geral de pedidos               |
| `/clientes`      | `ListaClientes` | Listagem geral de clientes              |
| `/perfil`        | `Perfil`        | Dados do usuário logado                 |
| `/oportunidades` | `Oportunidade`  | Contatos com avaliações positivas       |

## 📦 Estrutura de Pastas
```bash
src/
├── assets/                # Imagens e ícones do projeto
├── components/            # Componentes reutilizáveis (Navbar, Footer, Cards)
├── contexts/              # AuthContext para autenticação
├── models/                # Interfaces TypeScript
├── pages/                 # Páginas principais (Login, Home, Oportunidade, etc.)
├── services/              # Serviços de requisição HTTP via axios
├── App.tsx                # Definição das rotas
└── main.tsx               # Entrada da aplicação
```

## 📘 Interfaces

* **Pedido**

```ts
interface Pedido {
  id: number;
  statusEntrega: string;
  valorTotal: number;
  dataPedido: string;
  positivo: boolean;
  cliente?: Cliente | null;
}
```
</br>

* **Cliente**

```ts
interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  endereco: string;
  dataCadastro?: string;
}
```
</br>

* **UsuarioLogin**

```ts
interface UsuarioLogin {
  id: number;
  nome: string;
  usuario: string;
  senha: string;
  token: string;
}
```

## 🧪 Como rodar localmente

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/ZeCoisinhaTemTudo-frontend.git
cd ZeCoisinhaTemTudo-frontend
```

2. **Instale as dependências**

```bash
yarn
# ou npm install
```

3. **Configure o arquivo `.env` com a variável:**

```env
VITE_API_URL=http://localhost:8080
```

4. **Execute o projeto**

```bash
yarn dev
# ou npm run dev
```

5. Acesse [http://localhost:5173](http://localhost:5173)

#### 🔗 Backend
> ✅ O backend já está implementado com autenticação JWT e endpoints REST para clientes, pedidos e usuários. </br>
> 🔍 Confira o repositório: [ZéCoisinha Backend](https://github.com/grupo01-turma-java81/ZeCoisinhaTemTudo)

## 🤝 Contribuição
Contribuições são sempre bem-vindas! Você pode colaborar com sugestões, feedbacks ou melhorias no código. Sinta-se à vontade para abrir issues ou enviar pull requests.

> 💙 Este projeto foi desenvolvido de forma colaborativa por um grupo comprometido com o aprendizado e a prática de desenvolvimento.

👤 **Colaboradores do Projeto**
<table> <tr> <td align="center"> <a href="https://github.com/ViniCristhian"> <img src="https://github.com/ViniCristhian.png" width="100px;" alt="Vinícius Cristhian"/> <br /> <sub><b>Vinícius Cristhian</b></sub> </a><br /> <a href="https://www.linkedin.com/in/vinicristhian/">🔗 LinkedIn</a> </td> <td align="center"> <a href="https://github.com/IagoWiliian"> <img src="https://github.com/IagoWiliian.png" width="100px;" alt="Iago Willian"/> <br /> <sub><b>Iago Willian</b></sub> </a><br /> <a href="https://www.linkedin.com/in/iago-willian-/">🔗 LinkedIn</a> </td> <td align="center"> <a href="https://github.com/GiulioArantes"> <img src="https://github.com/GiulioArantes.png" width="100px;" alt="Giulio Gabriel"/> <br /> <sub><b>Giulio Gabriel</b></sub> </a><br /> <a href="https://www.linkedin.com/in/giulio-arantes/">🔗 LinkedIn</a> </td> <td align="center"> <a href="https://github.com/Yasmimruescas"> <img src="https://github.com/Yasmimruescas.png" width="100px;" alt="Yasmim Ruescas"/> <br /> <sub><b>Yasmim Ruescas</b></sub> </a><br /> <a href="https://www.linkedin.com/in/yasmim-ruescas/">🔗 LinkedIn</a> </td> <td align="center"> <a href="https://github.com/Vitoriacmlly"> <img src="https://github.com/Vitoriacmlly.png" width="100px;" alt="Vitoria Camilly"/> <br /> <sub><b>Vitoria Camilly</b></sub> </a><br /> <a href="https://www.linkedin.com/in/vitoria-camilly/">🔗 LinkedIn</a> </td> <td align="center"> <a href="https://github.com/BrunoDaniel13"> <img src="https://github.com/BrunoDaniel13.png" width="100px;" alt="Bruno Daniel"/> <br /> <sub><b>Bruno Daniel</b></sub> </a><br /> <a href="https://www.linkedin.com/in/bruno-daniel-ferreira-leite/">🔗 LinkedIn</a> </td> </tr> </table>	
