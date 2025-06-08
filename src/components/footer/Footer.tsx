import { useContext, type ReactNode } from "react";
import { AuthContext } from "../../contexts/AuthContext";


function Footer() {

  const ano = new Date().getFullYear()

  const { usuario } = useContext(AuthContext)

  let component: ReactNode

  if (usuario.token !== "") {
    component = (
      <footer className="bg-[#1a3052] border-t border-[#16243a] py-3 px-10 flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <a href="https://github.com/grupo01-turma-java81/ZeCoisinhaTemTudo-frontend" target="_blank" rel="noopener noreferrer">
          <h5 className="text-white text-xl sm:text-2xl font-bold leading-tight">
            ZéCoisinhaTemTudo
          </h5>
          </a>
          <p className="text-[#b0b8c1] text-xs mt-0.5">
            E-commerce Customer Relationship Management
          </p>
          <p className="text-[#b0b8c1] text-xs mt-0.5">
            © {ano} ZéCoisinhaTemTudo. Todos os direitos reservados.
          </p>
        </div>
        <div className="flex gap-6 mt-2 sm:mt-0">
          <a href="https://github.com/grupo01-turma-java81" target="_blank" rel="noopener noreferrer">
          <span className="text-[#b0b8c1] text-base font-medium">CodaNervoso</span>
          </a>
          <a href="https://brazil.generation.org/" target="_blank" rel="noopener noreferrer">
          <span className="text-[#b0b8c1] text-base font-medium">Generation</span>
          </a>
          <a href="https://www.metlife.com.br/" target="_blank" rel="noopener noreferrer">
          <span className="text-[#b0b8c1] text-base font-medium">MetLife</span>
          </a>
          
        </div>
      </footer>
    )
  }

  return (
    component
  )
}

export default Footer;