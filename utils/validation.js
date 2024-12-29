exports.validateTask = (task) => {
    const { title, startTime, endTime, priority, status } = task;
    if (!title || !startTime || !endTime || !priority || !status) {
      throw new Error('All fields are required');
    }
    if (priority < 1 || priority > 5) {
      throw new Error('Priority must be between 1 and 5');
    }
  };
  