// Import required modules
const express = require('express'); // Express framework
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const path = require('path'); // Path module for working with file paths
const app = express(); // Create an Express application
const cors = require("cors"); // Middleware for enabling CORS (Cross-Origin Resource Sharing)

// Middleware setup
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

// In-memory storage for todos (initialize as an empty array)
let todos = [];

// Define GET route to retrieve all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Define GET route to retrieve a specific todo by ID
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    res.status(404).send(); // Send a 404 status if todo is not found
  } else {
    res.json(todo); // Send the found todo as JSON response
  }
});

// Define POST route to create a new todo
app.post('/todos', (req, res) => {
  // Create a new todo object with a unique random ID
  const newTodo = {
    id: Math.floor(Math.random() * 1000000), // unique random id
    title: req.body.title,
    description: req.body.description
  };

  todos.push(newTodo); // Add the new todo to the todos array
  res.status(201).json(newTodo); // Send a 201 status with the created todo as JSON response
});

// Define PUT route to update an existing todo by ID
app.put('/todos/:id', (req, res) => {
  const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send(); // Send a 404 status if todo is not found
  } else {
    // Update the title and description of the existing todo
    todos[todoIndex].title = req.body.title;
    todos[todoIndex].description = req.body.description;
    res.json(todos[todoIndex]); // Send the updated todo as JSON response
  }
});

// Define DELETE route to delete a todo by ID
app.delete('/todos/:id', (req, res) => {
  // Parse the 'id' parameter to an integer
  const todoId = parseInt(req.params.id);

  // Find the index of the todo item with the given ID
  const todoIndex = todos.findIndex(todo => todo.id === todoId);

  if (todoIndex === -1) {
    // If the todo item is not found, send a 404 error
    res.status(404).json({ error: 'Todo not found' });
  } else {
    // If the todo item is found, remove it from the 'todos' array
    todos.splice(todoIndex, 1);

    // Respond with a success status (e.g., 204 No Content)
    res.status(204).send();
  }
});

// Define a catch-all route to handle 404 errors for unknown routes
app.use((req, res, next) => {
  res.status(404).send();
});

// Start the Express server on port 3000
app.listen(3000);
