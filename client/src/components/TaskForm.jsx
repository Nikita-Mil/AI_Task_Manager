import { useState } from 'react'

function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !description.trim()) return
    onSubmit(title.trim(), description.trim())
    setTitle('')
    setDescription('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>Новая задача</h2>
      <div className="form-row">
        <label htmlFor="title">Название</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Изучить React"
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="description">Описание</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Пройти базовый курс"
          rows={3}
          required
        />
      </div>
      <button type="submit">Создать задачу</button>
    </form>
  )
}

export default TaskForm
