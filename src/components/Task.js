import { useEffect, useState, useRef } from 'react'
import styled from '@emotion/styled'

const TaskInput = styled.input`
  width: 100%;
  height: 3rem;
  padding-right: 1.5rem;
  margin 0 auto;
  font-size: 1rem;
  font-weight: 200;
  background: white;
  highlight: none;

  &:focus {
    outline: none;
  }
`

const TaskEditor = styled.div`
  box-shadow: -48rem 0 white, 48rem 0 white, 3rem 0 white, -3rem 0 white;
`

function Task({ task, setDeleteTask, setUpdateTask }) {
  const [editMode, setEditMode] = useState(false)

  const inputRef = useRef(null)

  const handleUpdateTask = (e) => {
    e.preventDefault()
    setUpdateTask(Object.assign(task, { title: inputRef.current.value }))
  }

  const handleDeleteTask = () => {
    setDeleteTask(task)
  }

  const handleCloseEditor = () => {
    setUpdateTask(Object.assign(task, { title: inputRef.current.value }))
    setEditMode(false)
  }

  useEffect(() => {
    if (editMode) {
      inputRef.current.focus()
    }
  }, [editMode])

  return (
    <>
      {editMode ? (
        <>
          <div className="absolute inset-0 bg-black/20 z-10 overflow-hidden" onClick={handleCloseEditor}></div>
          <form className="relative z-20">
            <TaskEditor>
              <TaskInput type="text" ref={inputRef} value={task.title} onChange={handleUpdateTask} />
              <button type="submit" className="absolute top-1/2 -translate-y-1/2 right-0" onClick={handleCloseEditor}>
                <div className="flex items-center space-x-1 text-sm font-light text-gray-500">↵</div>
              </button>
            </TaskEditor>
          </form>
        </>
      ) : (
        <div className="relative flex items-center justify-between py-3">
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
        </div>
      )}
    </>
  )
}

export default Task
