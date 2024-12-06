import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StudentForm from '../components/StudentForm';
import StudentTable from '../components/StudentTable';

export default function Home() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  // Load students from session storage on component mount
  useEffect(() => {
    const storedStudents = sessionStorage.getItem('students');
    if (storedStudents) {
      setStudents(JSON.parse(storedStudents));
    }
  }, []);

  // Save students to session storage whenever the students array changes
  useEffect(() => {
    sessionStorage.setItem('students', JSON.stringify(students));
  }, [students]);

  // Add a new student
  const addStudent = (student) => {
    setStudents([...students, student]);
    toast.success('Student added successfully!');
  };

  // Delete a student
  const deleteStudent = (index) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter((_, i) => i !== index));
      toast.success('Student deleted successfully!');
    }
  };

  // Edit a student
  const startEdit = (index) => {
    setEditingStudent({ ...students[index], index });
  };

  // Save the updated student details
  const saveEdit = (updatedStudent) => {
    setStudents(
      students.map((student, index) =>
        index === updatedStudent.index ? { name: updatedStudent.name, grade: updatedStudent.grade } : student
      )
    );
    setEditingStudent(null);
    toast.success('Student updated successfully!');
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Classroom Register</h1>
      <div className="row">
        <div className="col-md-6">
          <StudentForm
            onAddStudent={addStudent}
            editingStudent={editingStudent}
            onSaveEdit={saveEdit}
          />
        </div>
        <div className="col-md-6">
          <StudentTable
            students={students}
            onDeleteStudent={deleteStudent}
            onEditStudent={startEdit}
          />
        </div>
      </div>
      {/* Toast notifications container */}
      <ToastContainer />
    </div>
  );
}
