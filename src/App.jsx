import { useRef, useState } from 'react'
import Todo from './Todo'
// import './App.css'


function App() {
  const value = useRef(0)
  value.current = 10
  console.log(value)
  return (
    <>
      <Todo />
    </>
  )
}

export default App
