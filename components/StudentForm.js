import { useState, useEffect } from 'react';

export default function StudentForm({ onAddStudent, editingStudent, onSaveEdit }) {
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('');

  // Populate form fields when editingStudent changes
  useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setGrade(editingStudent.grade);
    }
  }, [editingStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !grade) return;

    if (editingStudent) {
      onSaveEdit({ ...editingStudent, name, grade });
    } else {
      onAddStudent({ name, grade });
    }

    // Clear form after submission
    setName('');
    setGrade('');
  };

  return (
    <form onSubmit={handleSubmit} className="card p-3 shadow-sm">
      <h4>{editingStudent ? 'Edit Student' : 'Add New Student'}</h4>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter student name"
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Grade</label>
        <input
          type="text"
          className="form-control"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
          placeholder="Enter student grade"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {editingStudent ? 'Save Changes' : 'Add Student'}
      </button>
    </form>
  );
}
