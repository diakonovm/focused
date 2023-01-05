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
const TaskTitle = styled.p`
  text-decoration: ${(props) => (props.completed ? 'line-through' : '')};
`

function Task({ task, setDeleteTask, setUpdateTask }) {
  const [editMode, setEditMode] = useState(false)
  const [timerIsActive, setTimerIsActive] = useState(false)
  const inputRef = useRef(null)

  const handleToggleTaskAsComplete = (e) => {
    e.preventDefault()

    setUpdateTask(Object.assign(task, { completed: !task.completed }))
  }

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

    if (timerIsActive) setTimerIsActive(false)
    else setTimerIsActive(true)
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

  const humanDuration = () => {
    const dur = Duration.fromObject({ seconds: task.duration }).rescale()

    let str = ''

    if (dur.days > 0) dur.days > 1 ? (str += `${dur.days} days `) : (str += `${dur.days} day `)
    if (dur.hours > 0) dur.hours > 1 ? (str += `${dur.hours} hours `) : (str += `${dur.hours} hour `)
    if (dur.minutes > 0) dur.minutes > 1 ? (str += `${dur.minutes} minutes `) : (str += `${dur.minutes} minute `)
    if (dur.seconds > 0) dur.seconds > 1 ? (str += `${dur.seconds} seconds `) : (str += `${dur.seconds} second`)

    return str
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
        <div className="py-3">
          <div className="relative flex items-center justify-between">
            <div className="absolute -translate-x-full px-8">
              <svg
                onClick={handleToggleTimer}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>

              {/* <TaskTimer active={timerIsActive} className="text-sm cursor-pointer" onClick={handleToggleTimer}>
                {formattedDuration()}
              </TaskTimer> */}
            </div>
            <div>
              <button className="flex flex-col w-full mb-2 overflow-hidden" onClick={() => setEditMode(!editMode)}>
                <TaskTitle completed={task.completed} className="font-light truncate">
                  {task.title}
                </TaskTitle>
              </button>
            </div>
            <div>
              <button onClick={handleDeleteTask} className="pl-3">
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
          <p style={{ visibility: humanDuration().length === 0 ? 'hidden' : 'inherit' }} className="text-xs italic">
            {humanDuration()}
          </p>
        </div>
      )}
    </>
  )
}

export default Task
