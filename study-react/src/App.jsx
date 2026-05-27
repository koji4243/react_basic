import { useState, useEffect } from 'react'
import './App.css'
import { TaskList } from './taskList'

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('tasks')) ?? []
    } catch {
      return []
    }
  })
  const [input, setInput] = useState('')
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = () => {
    const text = input.trim()
    if (!text) {
      alert('文字を入力してください')
      setIsError(true)
      return
    }
    setIsError(false)
    const newId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1
    setTasks([...tasks, { id: newId, text, done: false }])
    setInput('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTask()
  }

  return (
    <div className="board">
      <h1 className="board-title">Task Board</h1>

      <div className="input-row">
        <input
          className={`task-input ${isError ? 'bg-red-200' : ''}`}
          type="text"
          placeholder="新しいタスクを入力..."
          value={input}
          onChange={(e) => {
            setIsError(false)
            setInput(e.target.value)}
          }
          onKeyDown={handleKeyDown}
        />
        <button className=" cursor-pointer text-white font-medium bg-blue-400 hover:bg-blue-500 p-2 rounded-md " onClick={addTask}>
          追加
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty">タスクがありません</p>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskList
              key={task.id}
              task={task}
              tasks={tasks}
              setTasks={setTasks}
            />
          ))}
        </ul>
      )}

      <div className="stats">
        {tasks.filter((t) => t.done).length} / {tasks.length} 件完了
      </div>
    </div>
  )
}

export default App