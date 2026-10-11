
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8822/student",
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all students
export const getStudents = () => API.get("/get");

// Get student by ID
export const getStudentById = (id) =>
  API.get(`/getstudent/${id}`);

// Insert student
export const insertStudent = (student) =>
  API.post("/insert", student);

// Update student
export const updateStudent = (id, student) =>
  API.put(`/update/${id}`, student);

// Delete student
export const deleteStudent = (id) =>
  API.delete(`/delete/${id}`);