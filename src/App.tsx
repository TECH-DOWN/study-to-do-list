import { useTodos } from './hooks/useTodos';
import { AddTodoForm } from './components/AddTodoForm';
import { TodoList } from './components/TodoList';

function App() {
  const {
    todos,
    editingTodoId,
    editingTodoText,
    setEditingTodoText,
    addTodo,
    toggleTodo,
    deleteTodo,
    startEditing,
    saveTodo,
  } = useTodos();

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='w-full max-w-2xl rounded-2xl shadow-2xl p-8 m-4'>
        <h1 className='text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 mb-8'>
          My Todo List
        </h1>

        <AddTodoForm onAdd={addTodo} />

        <TodoList
          todos={todos}
          editingTodoId={editingTodoId}
          editingTodoText={editingTodoText}
          setEditingTodoText={setEditingTodoText}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onStartEditing={startEditing}
          onSave={saveTodo}
        />

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
