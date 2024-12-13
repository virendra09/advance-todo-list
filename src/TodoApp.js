// TodoApp.js
import React, { useState } from 'react';
import WeatherComponent from './Weathercomponent'; // Import WeatherComponent

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, { text: newTodo, completed: false }]);
    setNewTodo('');
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    setEditingIndex(index);
    setEditingText(todos[index].text);
  };

  const handleSaveEdit = () => {
    const updatedTodos = todos.map((todo, index) =>
      index === editingIndex ? { ...todo, text: editingText } : todo
    );
    setTodos(updatedTodos);
    setEditingIndex(null);
    setEditingText('');
  };

  const handleToggleComplete = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Todo List</h1>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          style={styles.input}
        />
        <button onClick={handleAddTodo} style={styles.addButton}>Add</button>
      </div>
      <ul style={styles.list}>
        {todos.map((todo, index) => (
          <li key={index} style={styles.listItem}>
            <span style={{ ...styles.todoText, textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <div style={styles.buttonsContainer}>
              <button onClick={() => handleToggleComplete(index)} style={styles.completeButton}>
                {todo.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => handleEditTodo(index)} style={styles.editButton}>Edit</button>
              <button onClick={() => handleDeleteTodo(index)} style={styles.deleteButton}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {editingIndex !== null && (
        <div style={styles.editContainer}>
          <h2>Edit Todo</h2>
          <input
            type="text"
            value={editingText}
            onChange={(e) => setEditingText(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleSaveEdit} style={styles.saveButton}>Save</button>
          <button onClick={() => setEditingIndex(null)} style={styles.cancelButton}>Cancel</button>
        </div>
      )}
      {/* Integrate WeatherComponent */}
      <WeatherComponent apiKey="75b835aff5c292b0af53d4644d58945a" city="London" />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f0f4f8',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  input: {
    flex: '1',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  addButton: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#28a745',
    color: 'white',
    cursor: 'pointer',
  },
  list: {
    listStyleType: 'none',
    padding: '0',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: 'white',
    borderRadius: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
  },
  todoText: {
    flex: '1',
    fontSize: '16px',
  },
  buttonsContainer: {
    display: 'flex',
    gap: '5px',
  },
  completeButton: {
    padding: '5px 10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
  editButton: {
    padding: '5px 10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#ffc107',
    color: 'white',
    cursor: 'pointer',
  },
  deleteButton: {
    padding: '5px 10px',
    fontSize: '14px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#dc3545',
    color: 'white',
    cursor: 'pointer',
  },
  editContainer: {
    marginTop: '20px',
    textAlign: 'center',
  },
  saveButton: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#28a745',
    color: 'white',
    cursor: 'pointer',
    marginRight: '10px',
  },
  cancelButton: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#6c757d',
    color: 'white',
    cursor: 'pointer',
  },
};

export default TodoApp;
