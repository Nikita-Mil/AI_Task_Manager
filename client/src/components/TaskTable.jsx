const STATUS_LABELS = {
  new: 'Новая',
  in_progress: 'В работе',
  done: 'Выполнена'
}

function TaskTable({ tasks, onStatusChange, onDelete }) {
  if (tasks.length === 0) {
    return <p className="empty-message">Задач пока нет. Создайте первую!</p>
  }

  return (
    <div className="table-wrapper">
      <table className="task-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Название</th>
            <th>Описание</th>
            <th>Статус</th>
            <th>Дата создания</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>
                <select
                  value={task.status}
                  onChange={(e) => onStatusChange(task.id, e.target.value)}
                >
                  <option value="new">{STATUS_LABELS.new}</option>
                  <option value="in_progress">{STATUS_LABELS.in_progress}</option>
                  <option value="done">{STATUS_LABELS.done}</option>
                </select>
              </td>
              <td>{new Date(task.created_at).toLocaleString('ru-RU')}</td>
              <td>
                <button
                  type="button"
                  className="btn-delete"
                  onClick={() => onDelete(task.id)}
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TaskTable
