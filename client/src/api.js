const API_URL = '/tasks'

export async function fetchTasks() {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Не удалось загрузить задачи')
  }
  return response.json()
}

export async function createTask(title, description) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, description })
  })
  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message || 'Не удалось создать задачу')
  }
  return response.json()
}

export async function updateTaskStatus(id, status) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  })
  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message || 'Не удалось обновить статус')
  }
  return response.json()
}

export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.message || 'Не удалось удалить задачу')
  }
  return response.json()
}
