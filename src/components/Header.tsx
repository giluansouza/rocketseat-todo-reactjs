import todo from '../assets/todo.svg'
import styles from './Header.module.css'

export function Header() {
    return (
        <header className={styles.header}>
          <img src={todo} className="logo" alt="Todo List" />
        </header>
    )
}