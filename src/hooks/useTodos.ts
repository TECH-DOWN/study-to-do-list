import { useState, useEffect } from 'react';
import type { Todo } from '../types';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    try {
      const parsed = savedTodos ? JSON.parse(savedTodos) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [editingTodoId, setEditingTodoId] = useState<number | null>(null);
  const [editingTodoText, setEditingTodoText] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    if (text.trim() === '') return;
    setTodos([{ id: Date.now(), text, completed: false }, ...todos]);
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

  return {
    todos,
    editingTodoId,
    editingTodoText,
    setEditingTodoText,
    addTodo,
    toggleTodo,
    deleteTodo,
    startEditing,
    saveTodo,
  };
}
