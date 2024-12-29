const Task = require('../models/Task');

// Get All Tasks
exports.getTasks = async (req, res) => {
  try {
    // Fetch tasks for the authenticated user
    const tasks = await Task.find({ user: req.user.id });
    
    // Check if tasks were found
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this user' });
    }

    res.status(200).json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching tasks', details: err.message });
  }
};

// Create Task
exports.createTask = async (req, res) => {
  const { title, startTime, endTime, priority, status } = req.body;

  // Validate input
  if (!title || !startTime || !endTime || !priority || !status) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    // Create a new task with the authenticated user's ID
    const task = new Task({
      title,
      startTime,
      endTime,
      priority,
      status,
      user: req.user.id,
    });

    // Save the task to the database
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error creating task', details: err.message });
  }
};

// Update Task
exports.updateTask = async (req, res) => {
  try {
    // Find and update the task by ID
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

    // Check if the task exists
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error updating task', details: err.message });
  }
};

// Delete Task
exports.deleteTask = async (req, res) => {
  try {
    // Find and delete the task by ID
    const task = await Task.findByIdAndDelete(req.params.id);

    // Check if the task exists
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task deleted' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Error deleting task', details: err.message });
  }
};
