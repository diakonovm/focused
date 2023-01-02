import { useState, useRef } from 'react'
import styled from '@emotion/styled'

const TaskWrapper = styled.div``

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

function Task({ task, setDeleteTask, setUpdateTask }) {
  const [editMode, setEditMode] = useState(false)

  const inputRef = useRef(null)

  const toggleTimer = () => {}

  const handleUpdateTask = (e) => {
    e.preventDefault()
    setUpdateTask(Object.assign(task, { title: inputRef.current.value }))
  }

  const save = () => {
    setEditMode(false)
  }

  const handleDeleteTask = () => {
    setDeleteTask(task)
  }

  return (
    <>
      {editMode ? (
        <form className="relative py-3">
          <TaskInput type="text" ref={inputRef} value={task.title} onChange={handleUpdateTask} />
          <button type="submit" className="absolute top-1/2 -translate-y-1/2 right-0" onClick={save}>
            <div className="flex items-center space-x-1 text-sm font-light text-gray-500">↵</div>
          </button>
        </form>
      ) : (
        <TaskWrapper className="relative flex items-center justify-between py-3">
          <div className="absolute -translate-x-full px-8">
            <button className="text-gray-300 cursor-pointer">00:00:00</button>
          </div>
          <button className="flex flex-col w-full overflow-hidden" onClick={() => setEditMode(!editMode)}>
            <div className="font-light truncate">{task.title}</div>
          </button>
          <div>
            <button onClick={handleDeleteTask}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </TaskWrapper>
      )}
    </>
  )
}

export default Task
