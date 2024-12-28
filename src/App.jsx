import React, { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [task, setTask] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [status, setStatus] = useState('To do');
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const categories = ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Express.js', 'MongoDB', 'PHP', 'Java', 'Python'];

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task && selectedCategories.length > 0 && status) {
      setTasks([
        ...tasks,
        { text: task, categories: selectedCategories, status },
      ]);
      setTask('');
      setSelectedCategories([]);
      setStatus('To do');
    }
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      {/* Message Section */}
      <div className="w-full max-w-3xl bg-blue-100 text-blue-800 p-4 mb-4 rounded-lg shadow text-center">
        <p className="font-bold">Welcome to the Task Management App! Add, organize, and track your tasks efficiently.</p>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Task Management</h1>

      <div className=" flex-col md:flex-row items-center gap-4 w-full max-w-3xl mb-6">
        <div className="flex w-full gap-2">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter your task"
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <button
            onClick={addTask}
            className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600"
          >
            + Add Task
          </button>
        </div><br />
        <br />

        <div className="flex flex-wrap gap-2 justify-center mt-4 md:mt-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                selectedCategories.includes(category)
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 w-full md:w-auto mt-4 md:mt-0"
        >
          <option value="To do">To do</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {['To do', 'Doing', 'Done'].map((currentStatus) => (
          <div key={currentStatus} className="bg-white rounded-lg shadow p-4">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              {currentStatus === 'To do' && '🎯'}
              {currentStatus === 'Doing' && '🌟'}
              {currentStatus === 'Done' && '✅'} {currentStatus}
            </h2>
            {tasks
              .filter((task) => task.status === currentStatus)
              .map((task, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 mb-3 border rounded-lg"
                >
                  <div className="w-full">
                    <p className="font-medium break-words">{task.text}</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {task.categories.map((cat, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 rounded-full bg-yellow-500 text-white text-xs"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(index)}
                    className="text-gray-500 hover:text-red-500"
                  >
                    🗑️
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
