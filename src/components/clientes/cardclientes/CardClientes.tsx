import { Link } from 'react-router-dom';
import type Cliente from '../../../models/Cliente';

interface CardClientesProps {
    cliente: Cliente;
}

function CardClientes({ cliente }: CardClientesProps) {
    return (
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
            <header className='py-2 px-6 bg-indigo-800 text-white font-bold text-2xl'>
                Cliente
            </header>
            <div className='p-8 text-2xl bg-slate-200 h-full'>
                <div><b>Nome:</b> {cliente.nome}</div>
                <div><b>CPF:</b> {cliente.cpf}</div>
                <div><b>Telefone:</b> {cliente.telefone}</div>
                <div><b>Endereço:</b> {cliente.endereco}</div>
            </div>
            <div className="flex">
                <Link to={`/editarcliente/${cliente.cpf}`} className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2 cursor-pointer'>
                    <button className="w-full">Editar</button>
                </Link>
                <Link to={`/deletarcliente/${cliente.cpf}`} className='text-slate-100 bg-red-400 hover:bg-red-700 w-full flex items-center justify-center cursor-pointer'>
                    <button className="w-full">Deletar</button>
                </Link>
            </div>
        </div >
    )
}

export default CardClientes;