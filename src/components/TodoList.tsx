import type { Todo } from '../types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  editingTodoId: number | null;
  editingTodoText: string;
  setEditingTodoText: (text: string) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onStartEditing: (id: number, text: string) => void;
  onSave: (id: number) => void;
}

export function TodoList(props: TodoListProps) {
  return (
    <ul className='space-y-4'>
      {props.todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} {...props} />
      ))}
    </ul>
  );
}
