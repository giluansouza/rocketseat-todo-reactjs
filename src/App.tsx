import './global.css'
import styles from './App.module.css'
import { v4 as uuidv4 } from 'uuid'
import { Header } from './components/Header'
import { PlusCircle } from 'lucide-react'
import { Card } from './components/Card'
import { TaskEmpty } from './components/TaskEmpty'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

interface TaskList {
  id: string
  title: string
  done: boolean
}

// const tasks: TaskList[] = [
//   {
//     id: uuidv4(),
//     title: 'Estudar React',
//     done: true
//   },
//   {
//     id: uuidv4(),
//     title: 'Estudar Typescript',
//     done: false
//   }
// ]

function App() {
  const [tasks, setTask] = useState<TaskList[]>([])
  const [newTaskText, setNewTaskText] = useState('')
  const [taskCreated, setTaskCreated] = useState(0)
  const [taskCompleted, setTaskCompleted] = useState(0)

  function handleCreateNewTask(e: FormEvent) {
    e.preventDefault()
    const newTask = {
      id: uuidv4(),
      title: newTaskText,
      done: false
    }

    setTask([...tasks, newTask])
    setNewTaskText('')
    setTaskCreated(taskCreated + 1)
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setNewTaskText(event.target.value)
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function deleteTask(taskToDelete: string) {
    const tasksWithoutDeleteOne = tasks.filter(task => {
      return task.id !== taskToDelete
    })
    setTask(tasksWithoutDeleteOne)
    setTaskCreated(taskCreated - 1)

    if (taskCreated <= taskCompleted) {
      setTaskCompleted(taskCompleted - 1)
    }
  }

  function completeTask() {
    setTaskCompleted(taskCompleted + 1)
  }

  function noCompleteTask() {
    setTaskCompleted(taskCompleted - 1)
  }

  // const isNewTaskEmpty = newTaskText.length === 0
  
  return (
    <>
      <div className={styles.container}>
        <Header />
        <main>
          <div className={styles.form}>
            <form onSubmit={handleCreateNewTask}>
              <input 
                type="text" 
                placeholder="Adicione uma nova tarefa"
                value={newTaskText}
                onChange={handleNewTaskChange}
                onInvalid={handleNewTaskInvalid}
                required
              />
              <button type="submit">
                Criar 
                <PlusCircle />
              </button>
            </form>
          </div>
          <div className={styles.tasks}>
            <div className={styles.taskTitle}>
              <div className={styles.taskCreate}>
                Tarefas criadas 
                <span className={styles.taskQtd}>{taskCreated}</span>
              </div>
              <div className={styles.taskCompleted}>
                Concluídas 
                <span className={styles.taskQtd}>{taskCompleted}</span>
              </div>
            </div>
            
            {tasks.length === 0 ? 
              <TaskEmpty />
              :
              tasks.map(task => (
                <Card 
                  key={task.id} 
                  task={task} 
                  onDeleteTask={deleteTask}
                  onCompleteTask={completeTask}
                  onNoCompleteTask={noCompleteTask}
                />
              ))
            }
          </div>
        </main>
        <footer>2023 &copy; Giluan Souza</footer>
      </div>
    </>
  )
}

export default App
