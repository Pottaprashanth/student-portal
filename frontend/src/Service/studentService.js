const BASE_URL = "http://localhost:8822";

// INSERT STUDENT
export const insertStudent = async (student) => {
    const response = await fetch(`${BASE_URL}/student/insert`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });

    if (!response.ok) {
        throw new Error("Failed to insert student");
    }

    return response.json();
};

// GET ALL STUDENTS
export const getAllStudents = async () => {
    const response = await fetch(`${BASE_URL}/student/get`);

    if (!response.ok) {
        throw new Error("Failed to get students");
    }

    return response.json();
};

// GET STUDENT
export const getStudent = async (id) => {
    const response = await fetch(`${BASE_URL}/student/getstudent/${id}`);

    if (!response.ok) {
        throw new Error("Student not found");
    }

    return response.json();
};

// UPDATE STUDENT
export const updateStudent = async (id, student) => {
    const response = await fetch(`${BASE_URL}/student/update/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });

    if (!response.ok) {
        throw new Error("Failed to update student");
    }

    return response.json();
};

// DELETE STUDENT
export const deleteStudent = async (id) => {
    const response = await fetch(`${BASE_URL}/student/delete/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete student");
    }

    return true;
};
