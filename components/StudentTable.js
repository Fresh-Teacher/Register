export default function StudentTable({ students, onDeleteStudent, onEditStudent }) {
  return (
    <div className="card p-3 shadow-sm">
      <h4>Student List</h4>
      {students.length === 0 ? (
        <p className="text-muted">No students registered yet.</p>
      ) : (
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.grade}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => onEditStudent(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDeleteStudent(index)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
