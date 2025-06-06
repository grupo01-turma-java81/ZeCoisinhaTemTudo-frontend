import React from "react";

const Clientes = () => {
  return (
    <div className="min-h-screen bg-[#f7f7f8] flex flex-col items-center pt-8">
      {/* Card */}
      <div className="w-full max-w-3xl bg-white rounded-lg shadow p-6 flex flex-col">
        <div className="flex items-center justify-between">
          {/* Perfil */}
          <div className="flex items-center">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Avatar"
              className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
            />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">Nome da empresa</h2>
              <div className="text-sm text-gray-700">SP - Pinheiros</div>
              <div className="text-sm text-gray-700">
                Produtos <span className="font-bold ml-1">36</span>
              </div>
            </div>
          </div>
          {/* Nota */}
          <div className="flex flex-col items-end">
            <span className="text-4xl font-bold text-gray-800">5,0</span>
            <div className="flex mt-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-5 h-5 text-purple-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
        {/* Divider */}
        <hr className="my-4" />
        {/* Editar perfil */}
        <div>
          <button className="text-blue-600 hover:underline text-sm font-medium">
            Editar perfil
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clientes;