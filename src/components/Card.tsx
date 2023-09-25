import { useState } from 'react'
import styles from './Card.module.css'
import { Trash2 } from 'lucide-react'

interface TaskProps {
    task: {
        id: string
        title: string
        done: boolean
    }
    onDeleteTask: (taskId: string) => void
    onCompleteTask: () => void
    onNoCompleteTask: () => void
}

export function Card({ task, onDeleteTask, onCompleteTask, onNoCompleteTask }: TaskProps) {
    const [isChecked, setIsChecked] = useState(task.done)

    function handleDeleteTask() {
        onDeleteTask(task.id)
    }

    function handleCompleteTask() {
        if (isChecked === false) {
            onCompleteTask()
        } else {
            onNoCompleteTask()
        }
        setIsChecked(!isChecked)
    }

    return (
        <div key={task.id} className={styles.taskCard}>
            <label className="round-checkbox">
                <input 
                    type="checkbox" 
                    checked={isChecked}
                    onChange={handleCompleteTask}
                />
                <span></span>
            </label>
            <p>{task.title}</p>
            <button 
                onClick={handleDeleteTask} 
                title='Deletar comentário'
            >
                <Trash2 size={24} />
            </button>
        </div>
    )
}