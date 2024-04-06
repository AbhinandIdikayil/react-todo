import { HiTrash } from "react-icons/hi2";
import { FaEdit } from "react-icons/fa";


function List({ title, desc, ind, confirm, deleteHandler, tasks , edit}) {
    return (
        <div key={ind} className='w-60 h-72 rounded-[20px] bg-zinc-900 overflow-hidden'>
            <h2 className='px-5 py-3 text-xl font-semibold uppercase'>{title}</h2>
            <div className='px-4 w-full h-48 overflow-auto'>
                <p className='mt-2 font-semibold break-words'>
                    {desc}
                </p>
            </div>
            <footer className='bg-sky-600/70 w-100 h-auto flex px-5 py-3.5 justify-between items-center'>
                <button onClick={() => edit(ind)}>
                    <FaEdit />
                </button>
                <button className='text-red-600' onClick={() => confirm(ind,deleteHandler,tasks)}>
                    <HiTrash />
                </button>
            </footer>
        </div>
    )
}
export default List