import Task from './components/Task'
import TaskForm from './components/TaskForm'
import { useMemo } from 'react'
import { DateTime } from 'luxon'
import { TaskListContext } from './contexts/TaskListContext'
import useLocalStorage from './hooks/useLocalStorage'
import styled from '@emotion/styled'

const NavBar = styled.nav`
  background-color: #f6edd1;
`

function App() {
  const [groups, setGroups] = useLocalStorage('groups', [])

  const createTask = (task) => {
    const date = new Date()
    const dateFormatted = date.toISOString().slice(0, 10)

    const idx = groups.findIndex((group) => group.date === dateFormatted)

    if (idx !== -1) {
      const group = Object.assign({}, groups[idx])
      group.tasks.unshift(task)
      setGroups([...groups.slice(0, idx), group, ...groups.slice(idx + 1)])
    } else {
      setGroups([{ date: dateFormatted, tasks: [task] }, ...groups])
    }
  }

  const deleteTask = (task) => {
    const groupIdx = groups.findIndex((group) => {
      return group.tasks.find((item) => item.id === task.id) ? true : false
    })

    if (groupIdx !== -1) {
      const taskIdx = groups[groupIdx].tasks.findIndex((item) => item.id === task.id)

      const group = Object.assign({}, groups[groupIdx])
      const tasks = group.tasks.splice(taskIdx, 1)

      groups.tasks = tasks

      setGroups([...groups.slice(0, groupIdx), group, ...groups.slice(groupIdx + 1)])
    }
  }

  const updateTask = (task) => {
    const groupIdx = groups.findIndex((group) => {
      return group.tasks.find((item) => item.id === task.id) ? true : false
    })

    if (groupIdx !== -1) {
      const taskIdx = groups[groupIdx].tasks.findIndex((item) => item.id === task.id)

      const group = Object.assign({}, groups[groupIdx])
      const tasks = group.tasks.splice(taskIdx, 1, task)

      groups.tasks = tasks
      setGroups([...groups.slice(0, groupIdx), group, ...groups.slice(groupIdx + 1)])
    }
  }

  const dateFormatted = (date) => {
    const today = new Date().toISOString().slice(0, 10)
    if (today === date) return 'Today'

    const dateTime = DateTime.fromISO(date)
    return dateTime.toFormat('DDD')
  }

  const taskListContext = useMemo(
    () => ({
      groups
    }),
    [groups]
  )

  return (
    <TaskListContext.Provider value={taskListContext}>
      <NavBar className="fixed w-full py-5 px-6 border-b border-[#ff7b00] z-10">
        <div className="container mx-auto h-full flex items-center justify-between">
          <div className="text-xl">
            <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Zm-10 6a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
                fill="#FF7B00"
              />
            </svg>
          </div>
        </div>
      </NavBar>
      <main className="w-full max-w-4xl py-24 px-6 mx-auto">
        <TaskForm setTask={createTask} className="px-3 mb-12" />
        <div className="space-y-8">
          {groups.map((group, idx) => {
            const tasks = group.tasks.map((task) => {
              return <Task key={task.id} task={task} setDeleteTask={deleteTask} setUpdateTask={updateTask} />
            })
            return (
              tasks.length > 0 && (
                <div key={idx}>
                  <div className="px-3 mb-4">
                    <p className="mb-2 font-semibold">{dateFormatted(group.date)}</p>
                    <span className="text-base font-light text-[#FF7B00]">0</span>
                    <span className="text-xs font-bold text-[#FF7B00]"> / 10</span>
                  </div>
                  {tasks}
                </div>
              )
            )
          })}
        </div>
      </main>
    </TaskListContext.Provider>
  )
}

export default App
