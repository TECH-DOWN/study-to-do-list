import { useState, useEffect } from 'react';
import {
  LuPlus,
  LuTrash2,
  LuEraser,
  LuSave,
  LuCircleCheck,
  LuCircle,
} from 'react-icons/lu';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    try {
      const parsed = savedTodos ? JSON.parse(savedTodos) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [newTodo, setNewTodo] = useState('');
  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTodoText, setEditingTodoText] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;
    setTodos([{ id: Date.now(), text: newTodo, completed: false }, ...todos]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id: number, text: string) => {
    setEditingTodoId(id);
    setEditingTodoText(text);
  };

  const saveTodo = (id: number) => {
    if (editingTodoText.trim() === '') {
      deleteTodo(id);
    } else {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: editingTodoText } : todo
        )
      );
    }
    setEditingTodoId(null);
    setEditingTodoText('');
  };

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='w-full max-w-2xl rounded-2xl shadow-2xl p-8 m-4'>
        <h1 className='text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 mb-8'>
          My Todo List
        </h1>

        {/* Add Todo Form */}
        <form onSubmit={addTodo} className='flex items-center gap-3 mb-8'>
          <input
            type='text'
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder='오늘은 어떤 일을 하시나요?'
            className='flex-1 p-4 border-2 border-transparent rounded-xl focus:outline-none focus:ring-4 focus:ring-indigo-600 transition-all duration-300 shadow-md'
          />
          <button
            type='submit'
            className='bg-indigo-600 text-white p-4 rounded-xl hover:bg-pink-600 transition-all duration-300 transform hover:scale-110'
          >
            <LuPlus size={24} strokeWidth={3} />
          </button>
        </form>

        {/* Todo List */}
        <ul className='space-y-4'>
          {todos.map((todo) => (
            <li
              key={todo.id}
              onClick={() => toggleTodo(todo.id)}
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
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveTodo(todo.id);
                    }}
                    className='w-full p-1 bg-transparent border-b-2 border-indigo-500 focus:outline-none'
                  />
                ) : (
                  <span
                    className={`text-lg ${
                      todo.completed
                        ? 'text-gray-500 line-through'
                        : 'text-gray-800'
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
                        saveTodo(todo.id);
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
                        startEditing(todo.id, todo.text);
                      }}
                      className='cursor-pointer text-blue-700 hover:text-blue-900 transition-colors transform hover:scale-110'
                    >
                      <LuEraser size={22} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTodo(todo.id);
                      }}
                      className='cursor-pointer text-red-700 hover:text-red-900 transition-colors transform hover:scale-110'
                    >
                      <LuTrash2 size={22} />
                    </button>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>

        {todos.length > 0 && (
          <p className='text-center text-sm text-gray-500 mt-8'>
            남은 할 일 : {todos.filter((t) => !t.completed).length}개
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
