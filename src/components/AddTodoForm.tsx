import { useState } from 'react';
import { LuPlus } from 'react-icons/lu';

interface AddTodoFormProps {
  onAdd: (text: string) => void;
}

export function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newTodo);
    setNewTodo('');
  };

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-3 mb-8'>
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
  );
}
