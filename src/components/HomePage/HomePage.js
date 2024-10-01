import React, { useState, useEffect } from 'react';
import { FaTrash, FaEdit, FaSave } from 'react-icons/fa';
import { MdAdd } from "react-icons/md";

const HomePage = ({ handleLogout }) => {
  const [newTask, setNewTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [editText, setEditText] = useState('');
  const [removingTaskId, setRemovingTaskId] = useState(null); // Track which task is being removed

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (id) => {
    setRemovingTaskId(id);
    setTimeout(() => {
      setTasks(tasks.filter(task => task.id !== id));
      setRemovingTaskId(null);
    }, 300); // Set delay for transition
  };

  const handleToggleTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (task) => {
    setEditTaskId(task.id);
    setEditText(task.text);
  };

  const handleSaveTask = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, text: editText } : task
      )
    );
    setEditTaskId(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  const handleKeyDownSave = (e, id) => {
    if (e.key === 'Enter') {
      handleSaveTask(id);
    }
  };

  const handleRemoveChecked = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  // Handle "Log Out"
  const handleUserLogout = () => {
    handleLogout(); // This will trigger the logout function passed from the parent component
  };

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;

  const getProgressBarColor = () => {
    if (progress === 100) return '#00FF00'; // All tasks completed
    if (progress > 75) return '#0099FF';     // More than 75% completed
    if (progress > 50) return '#FF00FF';   // More than 50% completed
    if (progress > 25) return 'yellow';   // More than 25% completed
    return 'red';                         // Less than 25% completed
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-start sm:items-center justify-center py-6">
      <div className="m-2 bg-white shadow-md rounded-lg w-full max-w-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">ToDo List</h1>

        {/* Input field and Add button */}
        <div className="flex mb-4">
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-blue-500"
            placeholder="Add your new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleAddTask}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 ring-blue-500 rounded-r-lg"
          >
            <MdAdd />
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className={`flex justify-between items-center p-2 rounded-lg transition-opacity duration-300 ease-in-out ${
                removingTaskId === task.id ? 'opacity-0' : ''
              } ${task.completed ? 'bg-green-100 line-through' : 'bg-gray-50'}`}
            >
              {/* Checkbox to mark the task as complete */}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => handleToggleTask(task.id)}
                className="mr-2"
              />

              {/* Task text */}
              {editTaskId === task.id ? (
                <input
                  type="text"
                  className="flex-1 px-2 py-1 border rounded-lg m-1"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => handleKeyDownSave(e, task.id)}
                />
              ) : (
                <span
                  className="flex-1 cursor-pointer"
                  onClick={() => handleToggleTask(task.id)}
                >
                  {task.text}
                </span>
              )}

              {/* Edit and Delete buttons */}
              <div className="flex space-x-2">
                {editTaskId === task.id ? (
                  <button
                    onClick={() => handleSaveTask(task.id)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <FaSave />
                  </button>
                ) : (
                  <button
                    onClick={() => handleEditTask(task)}
                    className="text-yellow-500 hover:text-yellow-700"
                  >
                    <FaEdit />
                  </button>
                )}
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteTask(task.id)}
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>

                {/* Progress Bar */}
                {totalTasks > 0 && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 h-10">
              <div
                className="h-10 transition-all duration-700 ease-in-out"
                style={{
                  width: `${progress}%`,
                  backgroundColor: getProgressBarColor(),
                }}
              ></div>
              <span className="text-sm text-black mt-2 block text-center relative bottom-10">
                {completedTasks} / {totalTasks} tasks done ({Math.round(progress)}%)
              </span>
            </div>
          </div>
        )}

         {/* Remove Checked and Logout buttons */}
         <div className="flex justify-between mt-4">
          <button
            onClick={handleRemoveChecked}
            className="bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Remove Checked
          </button>
          <button
            onClick={handleUserLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Log Out
          </button>
        </div>

      </div>
    </div>
  );
};

export default HomePage;
