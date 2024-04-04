import React, { useState } from 'react'

import List from './components/List';
import Swal from 'sweetalert2'
function Todo() {

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('');
  const [tasks, setTasks] = useState([])

  function handleTitleInput(e) {
    setTitle(e.target.value)
  }
  function handleDescInput(e) {
    setDesc(e.target.value)
  }
  function addTasks() {
    let trimmedTitle = title.trim().length > 0
    let trimmedDesc = desc.trim().length > 0
    if (trimmedTitle && trimmedDesc) {
      setTasks([...tasks, { title, desc }])
      setTitle('')
      setDesc('')
    }
  }

  function confirm(ind,callback,tasks) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        console.log(tasks,ind)
        callback(ind,tasks)
      }
    });
  }

  function deleteHandler(i,todoTask) {
    console.log(i)
    let newTasks = todoTask.filter((data, index) => index !== i)
    console.log(newTasks)
    setTasks(newTasks)
  }

  return (
    <>
      <div className='relative bg-zinc-800 w-full h-screen'>

        <div className='-z-10 h-40 w-full flex flex-col gap-5 items-center justify-center'>
          <input placeholder='Enter title'
            className='placeholder:italic placeholder:text-black text-center bg-zinc-400 rounded-sm w-1/5 p-1 mt-7 text-white font-medium'
            value={title}
            onChange={handleTitleInput}
            type="text" />
          <input
            placeholder='Enter description'
            className='placeholder:italic placeholder:text-black text-center bg-zinc-400 focus:outline-none rounded-sm w-2/5 p-2 text-white font-medium'
            value={desc}
            onChange={handleDescInput}
            type="text" />
          <button
            onClick={addTasks}
            className='px-5 py-1 rounded-sm bg-zinc-950 font-semibold text-white'>
            ADD
          </button>
        </div>

        <h1 className='-z-9 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-950 text-[6vw] text-center p-6 font-bold tracking-wider'>Todo list.</h1>

        <div className="absolute w-full grid grid-cols-4 gap-4 px-20 z-1 mt-3">
          {tasks.map((data, ind) => {
            return (
              <List {...data} ind={ind} confirm={confirm} deleteHandler={deleteHandler} tasks={tasks}/>
              // <div key={ind} className='w-60 h-72 rounded-[20px] bg-zinc-900 overflow-hidden'>
              //   <h2 className='px-5 py-3 text-xl font-semibold uppercase'>{data.title}</h2>
              //   <div className='px-4 w-full h-48 overflow-auto'>
              //     <p className='mt-2 font-semibold break-words'>
              //       {data.desc}
              //     </p>
              //   </div>
              //   <footer className='bg-sky-600/70 w-100 h-auto flex px-5 py-3.5 justify-between items-center'>
              //     <button>
              //       <FaEdit />
              //     </button>
              //     <button className='text-red-600' onClick={() => confirm(ind)}>
              //       <HiTrash />
              //     </button>
              //   </footer>
              // </div>
            )
          })}
        </div>

      </div>
    </>
  )
}

export default Todo