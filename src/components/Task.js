import { useEffect, useState, useRef } from 'react'
import { Duration } from 'luxon'
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

const TaskTimer = styled.button`
  color: ${(props) => (props.active ? 'black' : 'gray')};
`

function Task({ task, setDeleteTask, setUpdateTask }) {
  const [editMode, setEditMode] = useState(false)
  const [timerIsActive, setTimerIsActive] = useState(false)
  const inputRef = useRef(null)

  const handleUpdateTitle = (e) => {
    e.preventDefault()

    const title = inputRef.current.value
    setUpdateTask(Object.assign(task, { title }))
  }

  const handleDeleteTask = () => {
    setDeleteTask(task)
  }

  const handleCloseEditor = () => {
    const title = inputRef.current.value

    if (title.length) {
      setUpdateTask(Object.assign(task, { title }))
    } else {
      setDeleteTask(task)
    }

    setEditMode(false)
  }

  const handleToggleTimer = (e) => {
    e.preventDefault()

    if (timerIsActive) {
      setTimerIsActive(false)
    } else {
      setTimerIsActive(true)
    }
  }

  useEffect(() => {
    if (editMode) {
      inputRef.current.focus()
    }
  }, [editMode])

  useEffect(() => {
    if (timerIsActive) {
      const id = setInterval(() => {
        setUpdateTask(Object.assign(task, { duration: task.duration + 1 }))
      }, 1000)

      return () => clearInterval(id)
    }
  }, [timerIsActive])

  const formattedDuration = () => {
    return Duration.fromObject({ seconds: task.duration }).toFormat('hh:mm:ss')
  }

  return (
    <>
      {editMode ? (
        <>
          <div className="absolute inset-0 bg-black/20 z-10 overflow-hidden" onClick={handleCloseEditor}></div>
          <form className="relative z-20">
            <TaskEditor>
              <TaskInput type="text" ref={inputRef} value={task.title} onChange={handleUpdateTitle} />
              <button type="submit" className="absolute top-1/2 -translate-y-1/2 right-0" onClick={handleCloseEditor}>
                <div className="flex items-center space-x-1 text-sm font-light text-gray-500">↵</div>
              </button>
            </TaskEditor>
          </form>
        </>
      ) : (
        <div className="relative flex items-center justify-between py-3">
          <div className="absolute -translate-x-full px-8">
            <TaskTimer active={timerIsActive} className="text-sm cursor-pointer" onClick={handleToggleTimer}>
              {formattedDuration()}
            </TaskTimer>
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
