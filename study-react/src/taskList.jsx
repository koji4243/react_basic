export function TaskList({ task, tasks, setTasks }) {

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

  return (
    <li className={`task-item ${task.done ? 'done' : ''}`}>
      <input
        type="checkbox"
        className="task-checkbox"
        checked={task.done}
        onChange={() => toggleTask(task.id)}
      />

      <span className="task-text">
        {task.text}
      </span>

      <button
        className="delete-btn"
        onClick={() => deleteTask(task.id)}
        aria-label="削除"
      >
        ✕
      </button>
    </li>
  )
}