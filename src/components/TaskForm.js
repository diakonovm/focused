import { useContext, useEffect, useRef, useState } from 'react'
import styled from '@emotion/styled'
import { TaskListContext } from '../contexts/TaskListContext'

const TaskInput = styled.input`
  display: block;
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

const TaskTitleCharacterCountIndicator = styled.p`
  color: ${(props) => (props.count > 100 ? 'red' : 'black')};
`

const DEFAULT_TASK = {
  id: 0,
  active: false,
  duration: 0,
  completed: false,
  title: '',
  createdAt: null
}

const MAXIMUM_CHARACTER_COUNT = 100

function TaskForm({ className, setTask }) {
  const taskListContext = useContext(TaskListContext)

  const [focused, setFocused] = useState(false)
  const [titleCharacterCount, setTitleCharacterCount] = useState(0)

  const inputRef = useRef(null)

  const handleSetTask = (event) => {
    event.preventDefault()

    const title = inputRef.current.value

    if (title.length === 0 || title.length > MAXIMUM_CHARACTER_COUNT) return

    const date = new Date()
    const dateFormatted = date.toISOString().slice(0, 10)

    const task = Object.assign(
      { ...DEFAULT_TASK },
      {
        id: Date.now(),
        title,
        createdAt: dateFormatted
      }
    )

    setTask(task)
    setTitleCharacterCount(0)

    inputRef.current.value = ''
  }

  const handleTitleCharacterCountUpdate = (e) => {
    setTitleCharacterCount(inputRef.current.value.length)
  }

  const inputIsFocused = () => {
    if (document.activeElement === inputRef.current) console.log('active')
    else {
      console.log('inactive')
    }
  }

  const onFocus = () => setFocused(true)
  const onBlur = () => setFocused(false)

  useEffect(() => {
    inputRef.current.focus()
  }, [])

  return (
    <form className={className}>
      <div className="relative">
        <TaskInput
          ref={inputRef}
          type="text"
          placeholder=""
          onChange={handleTitleCharacterCountUpdate}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        <button type="submit" className="absolute top-1/2 -translate-y-1/2 right-0" onClick={handleSetTask}>
          <div className="flex items-center space-x-1 text-sm font-light text-gray-500">↵</div>
        </button>
      </div>
      <TaskTitleCharacterCountIndicator
        style={{ visibility: focused ? 'inherit' : 'hidden' }}
        count={titleCharacterCount}
        className="mt-3 text-sm text-black/60"
      >
        <span className="">{titleCharacterCount}</span>
        <span className="">/{MAXIMUM_CHARACTER_COUNT}</span>
      </TaskTitleCharacterCountIndicator>
    </form>
  )
}

export default TaskForm
