import React, { useEffect, useRef, useState } from 'react'
import { HiTrash } from "react-icons/hi2";
import { FaEdit} from "react-icons/fa";
import {v4 as uuid} from 'uuid'
import Swal from 'sweetalert2'
function Todo() {

  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('');
  const [tasks, setTasks] = useState([]);
  const [edit, setEdit] = useState(false);
  const [index, setIndex] = useState(null) // this is to set the index of the task to know which index data is need to find
  const [showFinished,setShowFinished] = useState(false);

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
      // setTasks(tasks.push({id:uuid(), title, desc, isCompleted: false }))
      setTasks([...tasks, {id:uuid(), title, desc, isCompleted: false }])
      setTitle('')
      setDesc('')
    }
  }

  function confirm(id) {
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
        deleteHandler(id)
      }
    });
  }

  function deleteHandler(id) {
    let newTasks = tasks.filter((data) => data.id !== id)
    setTasks(newTasks)
  }
  function editHandler(index) {
    setEdit(true)
    setTitle(tasks[index].title)
    setDesc(tasks[index].desc);
    setIndex(index)
  }
  function saveEdited(index) {
    let trimmedTitle = title.trim().length > 0
    let trimmedDesc = desc.trim().length > 0
    let newTasks = tasks.map((data, ind) => {
      if (ind == index && trimmedDesc && trimmedTitle) {
        data.title = title
        data.desc = desc
      }
      return data
    });
    setTasks(newTasks);
    setTitle('')
    setDesc('')
    setEdit(false)
  }

  function copmletedTaskHandler(index) {
    let newTasks = [...tasks]
    newTasks[index].isCompleted = !newTasks[index].isCompleted;
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
            required={true}
            type="text" />
          <input
            placeholder='Enter description'
            className='placeholder:italic placeholder:text-black text-center bg-zinc-400 focus:outline-none rounded-sm w-2/5 p-2 text-white font-medium'
            value={desc}
            onChange={handleDescInput}
            required={true}
            type="text" />

          <button
            onClick={() => edit ? saveEdited(index) : addTasks()}
            className='px-5 py-1 rounded-sm bg-zinc-950 font-semibold text-white'>
            {edit ? 'SAVE' : 'ADD'}
          </button>
          <div className=''>
          
          <input type="checkbox" onChange={() => setShowFinished(!showFinished)} checked={showFinished} /> show finished
          </div>
 
        </div>

        <h1 className='-z-9 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-950 text-[6vw] text-center p-6 font-bold tracking-wider'>Todo list.</h1>

        <div className="absolute w-full grid grid-cols-4 gap-4 px-20 z-1 mt-8">

          {tasks.map((data, ind) => {
            return (showFinished || !data.isCompleted) && (
              <div key={data.id} className='w-60 h-72 rounded-[20px] bg-zinc-900 overflow-hidden'>
                <h2 className={`px-5 py-3 text-xl font-semibold uppercase  ${data.isCompleted ? "line-through" : ''}`}>{data.title}</h2>
                <div className='px-4  w-full h-48 overflow-auto'>
                  <p className={`mt-2 font-semibold break-words ${data.isCompleted ? "line-through" :''}`}>
                    {data.desc}
                  </p>
                </div>
                <footer className='bg-sky-600/70 w-100 h-auto flex px-5 py-3.5 justify-between items-center'>

                  <input defaultChecked={data.isCompleted} type="checkbox" onChange={() => copmletedTaskHandler(ind)} />
                  <button onClick={() => editHandler(ind)}>
                    <FaEdit />
                  </button>
                  <button className='text-red-600' onClick={() => confirm(data.id)}>
                    <HiTrash />
                  </button>

                </footer>
              </div>
            )


          })}
        </div>

      </div>
    </>
  )
}

export default Todo