import './App.css'
import { useEffect, useState } from 'react'
import TodoCard from './components/TodoCard'
import TodoForm from './components/TodoForm'
import type { Post } from './types'

function App() {

  //State för hämtade todos från API
  const [todos, setTodos] = useState<Post[]>([])

  //State för laddningsstatus
  const [loading, setLoading] = useState(false)

  //State för att hantera eventuella felmedddelanden
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    const fetchTodos = async () => {
      try {

        //Startar inladdningstext
        setLoading(true)

        //fetch anrop till mitt API
        const resp = await fetch(
          'https://todo-api-render.onrender.com/api/todos'
        )

        //Om fel uppstår
        if (!resp.ok) {
          throw new Error('Fel vid hämtning av todos')
        }

        //Om ok, sparar inhämtad data
        const data: Post[] = await resp.json()
        setTodos(data)
        setError(null)
      } catch (err) {

        //felmeddelande på skärm och i konsoll
        console.error(err)
        setError('Kunde inte hämta todos')
      } finally {

        //Tar bort inladdingstext då innehåll är hämtat
        setLoading(false)
      }
    }

    fetchTodos()
  }, [])

  return (
    <>
      <h1>Min lista</h1>
      {/* Laddar in komponenten TodoForm och skickar med möjlighet att POSTa */}
      <TodoForm
        onTodoAdded={(newTodo) =>
          setTodos((prev) => [...prev, newTodo])
        }
      />

      {/* Placering av text för inladdning av todos, och för eventuella fel */}
      {loading && <p>Laddar todos...</p>}
      {error && <p className="info">{error}</p>}

      {/* Visar todos och ger möjlighet att radera och uppdatera status */}
      <TodoCard
        todos={todos}
        onTodoDeleted={(id) =>
          setTodos((prev) =>
            prev.filter((todo) => todo._id !== id)
          )
        }
        onTodoUpdated={(updatedTodo) =>
          setTodos((prev) =>
            prev.map((todo) =>
              todo._id === updatedTodo._id ? updatedTodo : todo
            )
          )
        }
      />
    </>
  )
}

export default App
