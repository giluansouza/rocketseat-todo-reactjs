import styles from './TaskEmpty.module.css'
import prancheta from '../assets/prancheta.svg'

export function TaskEmpty() {
    return (
        <div className={styles.tasksEmpty}>
            <img src={prancheta} alt='Ícone de prancheta' />
            <p>Você ainda não tem tarefas cadastradas</p>
            <span>Crie tarefas e organize seus itens a fazer</span>
        </div>
    )
}