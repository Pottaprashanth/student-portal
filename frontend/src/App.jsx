
import { useEffect, useState } from "react";
import {
  getStudents,
  getStudentById,
  insertStudent,
  updateStudent,
  deleteStudent,
} from "./api";
import "./App.css";

const emptyForm = {
  firstname: "",
  lastname: "",
  age: "",
  marks: "",
  city: "",
};

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState(null);
  const [searchId, setSearchId] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // GET all students
  const loadStudents = async () => {
    setLoading(true);

    try {
      const response = await getStudents();
      setStudents(response.data);
      setMessage("");
    } catch (error) {
      console.error(error);
      setMessage("Unable to load students. Check your backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  // Handle form input
  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // POST insert / PUT update
  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaving(true);

    const student = {
      firstname: form.firstname.trim(),
      lastname: form.lastname.trim(),
      age: Number(form.age),
      marks: Number(form.marks),
      city: form.city.trim(),
    };

    try {
      if (editId !== null) {
        await updateStudent(editId, student);
        setMessage("Student updated successfully!");
      } else {
        await insertStudent(student);
        setMessage("Student inserted successfully!");
      }

      setForm(emptyForm);
      setEditId(null);
      await loadStudents();
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message ||
          "Unable to save student. Please check the API."
      );
    } finally {
      setSaving(false);
    }
  };

  // GET student by ID
  const handleSearch = async (event) => {
    event.preventDefault();

    if (!searchId.trim()) {
      setMessage("Please enter a student ID.");
      return;
    }

    setLoading(true);

    try {
      const response = await getStudentById(searchId);
      setStudents(response.data ? [response.data] : []);
      setMessage("Student retrieved successfully.");
    } catch (error) {
      console.error(error);
      setStudents([]);
      setMessage("Student not found or request failed.");
    } finally {
      setLoading(false);
    }
  };

  // Load student details into form
  const handleEdit = (student) => {
    setEditId(student.sid);

    setForm({
      firstname: student.firstname ?? "",
      lastname: student.lastname ?? "",
      age: String(student.age ?? ""),
      marks: String(student.marks ?? ""),
      city: student.city ?? "",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // DELETE student
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete student ${id}?`
    );

    if (!confirmed) return;

    try {
      await deleteStudent(id);
      setMessage("Student deleted successfully!");

      if (String(searchId) === String(id)) {
        setSearchId("");
      }

      if (editId === id) {
        cancelEdit();
      }

      await loadStudents();
    } catch (error) {
      console.error(error);
      setMessage("Unable to delete student.");
    }
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm(emptyForm);
  };

  const showAllStudents = () => {
    setSearchId("");
    loadStudents();
  };

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">STUDENT MANAGEMENT</p>
          <h1>Student Portal</h1>
          <p className="subtitle">
            Manage student information in one place.
          </p>
        </div>

        <button className="btn btn-secondary" onClick={showAllStudents}>
          Refresh Records
        </button>
      </header>

      {message && (
        <div className="message" role="status">
          {message}
          <button
            className="message-close"
            onClick={() => setMessage("")}
            aria-label="Dismiss message"
          >
            ×
          </button>
        </div>
      )}

      <section className="card">
        <h2>{editId !== null ? "Update Student" : "Add New Student"}</h2>
        <p className="section-description">
          {editId !== null
            ? `Editing student ID ${editId}`
            : "Enter the student's details below."}
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="firstname">First Name</label>
              <input
                id="firstname"
                name="firstname"
                placeholder="Enter first name"
                value={form.firstname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="lastname">Last Name</label>
              <input
                id="lastname"
                name="lastname"
                placeholder="Enter last name"
                value={form.lastname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="age">Age</label>
              <input
                id="age"
                name="age"
                type="number"
                min="1"
                max="150"
                placeholder="Enter age"
                value={form.age}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label htmlFor="marks">Marks</label>
              <input
                id="marks"
                name="marks"
                type="number"
                min="0"
                step="any"
                placeholder="Enter marks"
                value={form.marks}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field field-full">
              <label htmlFor="city">City</label>
              <input
                id="city"
                name="city"
                placeholder="Enter city"
                value={form.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button className="btn btn-primary" disabled={saving}>
              {saving
                ? "Saving..."
                : editId !== null
                  ? "Update Student"
                  : "Add Student"}
            </button>

            {editId !== null && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="card">
        <div className="section-header">
          <div>
            <h2>Student Records</h2>
            <p className="section-description">
              {students.length} record(s) currently displayed
            </p>
          </div>
        </div>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="number"
            min="1"
            placeholder="Search by student ID"
            value={searchId}
            onChange={(event) => setSearchId(event.target.value)}
          />

          <button className="btn btn-primary" disabled={loading}>
            Search
          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={showAllStudents}
          >
            Show All
          </button>
        </form>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Age</th>
                <th>Marks</th>
                <th>City</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr key={student.sid}>
                  <td>{student.sid}</td>
                  <td>{student.firstname}</td>
                  <td>{student.lastname}</td>
                  <td>{student.age}</td>
                  <td>{student.marks}</td>
                  <td>{student.city}</td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="btn btn-edit"
                        onClick={() => handleEdit(student)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-delete"
                        onClick={() => handleDelete(student.sid)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {!loading && students.length === 0 && (
                <tr>
                  <td colSpan="7" className="empty-state">
                    No student records found.
                  </td>
                </tr>
              )}

              {loading && (
                <tr>
                  <td colSpan="7" className="empty-state">
                    Loading students...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <footer>
        Student Portal · React + Axios + Spring Boot
      </footer>
    </div>
  );
}

export default App;