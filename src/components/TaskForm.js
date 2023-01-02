import { useEffect, useRef } from 'react'
import styled from '@emotion/styled'

const TaskInput = styled.input`
  width: 100%;
  height: 3rem;
  padding-right: 5rem;
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

  const handleSetTask = (event) => {
    event.preventDefault()

    const task = {
      id: Math.floor(Math.random() * 1000000000),
      title: inputRef.current.value,
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
        <TaskInput ref={inputRef} type="text" placeholder="Task" />
        <button type="submit" className="absolute top-1/2 -translate-y-1/2 right-0" onClick={handleSetTask}>
          <div className="flex items-center space-x-1 text-sm font-light text-gray-500">↵</div>
        </button>
      </div>
    </form>
  )
}

export default TaskForm
