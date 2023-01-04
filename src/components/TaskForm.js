import { useContext, useEffect, useRef } from 'react'
import styled from '@emotion/styled'
import { TaskListContext } from '../contexts/TaskListContext'

const TaskInput = styled.input`
  width: 100%;
  height: 3rem;
  padding-right: 1.5rem;
  font-size: 1.2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  background: transparent;
  highlight: none;

  &:focus {
    outline: none;
  }
`

function TaskForm({ className, setTask }) {
  const inputRef = useRef(null)
  const taskListContext = useContext(TaskListContext)

  const handleSetTask = (event) => {
    event.preventDefault()

    const title = inputRef.current.value

    if (title.length === 0) return

    const getHighestId = () => {
      const ids = []
      taskListContext.groups.map((group) => group.tasks.forEach((task) => ids.push(task.id)))
      return ids.length ? Math.max(...ids) : 0
    }

    const task = {
      id: getHighestId() + 1,
      title,
      duration: 0
    }

    setTask(task)

    inputRef.current.value = ''
  }

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <form className={className}>
      <div className="relative">
        <TaskInput ref={inputRef} type="text" placeholder="" />
        <button type="submit" className="absolute top-1/2 -translate-y-1/2 right-0" onClick={handleSetTask}>
          <div className="flex items-center space-x-1 text-sm font-light text-gray-500">↵</div>
        </button>
      </div>
    </form>
  )
}

export default TaskForm
