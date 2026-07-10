import { useCallback, useEffect, useState } from 'react'
import TaskForm from './components/TaskForm'
import TaskTable from './components/TaskTable'
import { createTask, deleteTask, fetchTasks, updateTaskStatus } from './api'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadTasks = useCallback(async () => {
    try {
      setError(null)
      const data = await fetchTasks()
      setTasks(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadTasks()
  }, [loadTasks])

  const handleCreate = async (title, description) => {
    try {
      setError(null)
      const task = await createTask(title, description)
      setTasks((prev) => [task, ...prev])
    } catch (err) {
      setError(err.message)
    }
  }

  const handleStatusChange = async (id, status) => {
    try {
      setError(null)
      const updated = await updateTaskStatus(id, status)
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)))
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      setError(null)
      await deleteTask(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI Task Manager</h1>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <main className="app-main">
        <TaskForm onSubmit={handleCreate} />

        <section className="tasks-section">
          <h2>Список задач</h2>
          {loading ? (
            <p className="loading">Загрузка...</p>
          ) : (
            <TaskTable
              tasks={tasks}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          )}
        </section>
      </main>
    </div>
  )
}

export default App
