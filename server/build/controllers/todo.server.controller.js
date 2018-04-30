'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteTodo = exports.getTodo = exports.updateTodo = exports.addTodo = exports.getTodos = undefined;

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _todoServer = require('../models/todo.server.model');

var _todoServer2 = _interopRequireDefault(_todoServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ./express-server/controllers/todo.server.controller.js
var getTodos = exports.getTodos = function getTodos(req, res) {
  _todoServer2.default.find().exec(function (err, todos) {
    if (err) {
      return res.json({ 'success': false, 'message': 'Some Error' });
    }

    return res.json({ 'success': true, 'message': 'Todos fetched successfully', todos: todos });
  });
};

//import models
var addTodo = exports.addTodo = function addTodo(req, res) {
  console.log(req.body);
  var newTodo = new _todoServer2.default(req.body);
  newTodo.save(function (err, todo) {
    if (err) {
      return res.json({ 'success': false, 'message': 'Some Error' });
    }

    return res.json({ 'success': true, 'message': 'Todo added successfully', todo: todo });
  });
};

var updateTodo = exports.updateTodo = function updateTodo(req, res) {
  _todoServer2.default.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, function (err, todo) {
    if (err) {
      return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
    }
    console.log(todo);
    return res.json({ 'success': true, 'message': 'Updated successfully', todo: todo });
  });
};

var getTodo = exports.getTodo = function getTodo(req, res) {
  _todoServer2.default.find({ _id: req.params.id }).exec(function (err, todo) {
    if (err) {
      return res.json({ 'success': false, 'message': 'Some Error' });
    }
    if (todo.length) {
      return res.json({ 'success': true, 'message': 'Todo fetched by id successfully', todo: todo });
    } else {
      return res.json({ 'success': false, 'message': 'Todo with the given id not found' });
    }
  });
};

var deleteTodo = exports.deleteTodo = function deleteTodo(req, res) {
  _todoServer2.default.findByIdAndRemove(req.params.id, function (err, todo) {
    if (err) {
      return res.json({ 'success': false, 'message': 'Some Error' });
    }

    return res.json({ 'success': true, 'message': todo.todoText + ' deleted successfully' });
  });
};