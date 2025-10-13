import {
  LuTrash2,
  LuEraser,
  LuSave,
  LuCircleCheck,
  LuCircle,
} from 'react-icons/lu';
import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  editingTodoId: number | null;
  editingTodoText: string;
  setEditingTodoText: (text: string) => void;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onStartEditing: (id: number, text: string) => void;
  onSave: (id: number) => void;
}

export function TodoItem({
  todo,
  editingTodoId,
  editingTodoText,
  setEditingTodoText,
  onToggle,
  onDelete,
  onStartEditing,
  onSave,
}: TodoItemProps) {
  return (
    <li
      onClick={() => onToggle(todo.id)}
      className={`cursor-pointer flex items-center p-4 rounded-xl transition-all duration-300 shadow-md hover:scale-105 transform ${
        todo.completed ? 'bg-gray-100' : 'bg-white'
      }`}
    >
      <button className='mr-4 cursor-pointer'>
        {todo.completed ? (
          <LuCircleCheck size={24} className='text-green-700' />
        ) : (
          <LuCircle size={24} className='text-gray-400' />
        )}
      </button>

      <div className='flex-1'>
        {editingTodoId === todo.id ? (
          <input
            type='text'
            value={editingTodoText}
            onChange={(e) => setEditingTodoText(e.target.value)}
            onClick={(e) => e.stopPropagation()} // Prevent toggleTodo on input click
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSave(todo.id);
            }}
            className='w-full p-1 bg-transparent border-b-2 border-indigo-500 focus:outline-none'
          />
        ) : (
          <span
            className={`text-lg ${
              todo.completed ? 'text-gray-500 line-through' : 'text-gray-800'
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className='flex items-center gap-3 ml-4'>
        {editingTodoId === todo.id ? (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSave(todo.id);
              }}
              className='cursor-pointer text-green-700 hover:text-green-900 transition-colors transform hover:scale-110'
            >
              <LuSave size={22} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStartEditing(todo.id, todo.text);
              }}
              className='cursor-pointer text-blue-700 hover:text-blue-900 transition-colors transform hover:scale-110'
            >
              <LuEraser size={22} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(todo.id);
              }}
              className='cursor-pointer text-red-700 hover:text-red-900 transition-colors transform hover:scale-110'
            >
              <LuTrash2 size={22} />
            </button>
          </>
        )}
      </div>
    </li>
  );
}
