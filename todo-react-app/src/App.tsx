import './App.css'
import TodoCard from './components/TodoCard'
import TodoForm from './components/TodoForm'
import { useState, useEffect } from 'react'
import type { Post } from './types'

function App() {
  const [todos, setTodos] = useState<Post[]>([])

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const resp = await fetch("https://todo-api-render.onrender.com/api/todos")
        if (!resp.ok) throw new Error("Fel vid hämtning")
        const data: Post[] = await resp.json()
        setTodos(data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchTodos()
  }, [])

  return (
    <>
      <h1>Test av applikation</h1>
      <TodoForm onTodoAdded={(newTodo) => setTodos(prev => [...prev, newTodo])} />
      <TodoCard todos={todos}/>
    </>
  )
}

export default App
