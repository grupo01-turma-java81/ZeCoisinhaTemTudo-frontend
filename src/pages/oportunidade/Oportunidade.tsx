import "../oportunidade/Oportunidade.css";

function Oportunidade() {
  return (
    <div className="min-h-screen bg-[#e5e6e8] font-montserrat">
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 px-8 pt-12 pb-8">
        <img
          src="https://i.postimg.cc/W4hcSzYM/a5f2047c6d017c9775132b23a995663b9e8ef2b8.png"
          alt="Ilustração Oportunidades"
          className="max-w-[700px] w-full h-auto"
        />
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-black font-semibold text-8xl leading-none text-center md:text-left">
            OPORTU
            <span className="block ml-30">NIDADES</span>
          </h1>
          <p className="mt-6 text-[#0387C4] text-xl md:text-4xl text-center md:text-left max-w-xl">
            Fidelize para crescer:{" "}
            <span className="text-[#1a7ed7] font-bold">
              estratégias inteligentes
            </span>{" "}
            que fazem seu cliente voltar — e indicar!
          </p>
        </div>
      </div>

      <div className="border-t border-[#bfc8d6] mx-40 my-8" />

      <div className="flex flex-col md:flex-row justify-center items-center gap-20 px-8 pb-12">
        <div
          className="bg-[url('https://i.postimg.cc/6TJQxRgJ/4265a1eb6fb8dd88dd50f6e72a414e63db6d8b68.jpg')]
  bg-no-repeat bg-cover bg-center rounded-lg shadow-md flex flex-col items-center justify-end w-[470px] h-[240px]"
        >
          <span className="mb-4 text-[#1a3e7a] font-bold text-lg text-center bg-white px-2 py-1 rounded">
            Experiência de compra
          </span>
        </div>

        <div
          className="bg-[url('https://i.postimg.cc/JhmP42Zt/5cfadc274c6278dcf2fa5c42e2efecac15bd286f.jpg')]
  bg-no-repeat bg-cover bg-center rounded-lg shadow-md flex flex-col items-center justify-end w-[470px] h-[240px]"
        >
          <span className="mb-4 text-[#1a3e7a] font-bold text-lg text-center bg-white px-2 py-1 rounded">
            Benefícios exclusivos
          </span>
        </div>

        <div
          className="bg-[url('https://i.postimg.cc/ZRMZqLyv/Design-sem-nome-29.png')]
  bg-no-repeat bg-cover bg-center rounded-lg shadow-md flex flex-col items-center justify-end w-[470px] h-[240px]"
        >
          <span className="mb-4 text-[#1a3e7a] font-bold text-lg text-center bg-white px-2 py-1 rounded">
            Comunicação pós-venda
          </span>
        </div>
      </div>
    </div>
  );
}

export default Oportunidade;
