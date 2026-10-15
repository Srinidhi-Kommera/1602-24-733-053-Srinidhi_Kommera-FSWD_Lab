const employees = [
  { id: 101, name: "Aarav Sharma", department: "Engineering", salary: 72000 },
  { id: 102, name: "Diya Reddy", department: "Human Resources", salary: 45000 },
  { id: 103, name: "Rahul Mehta", department: "Finance", salary: 58000 },
  { id: 104, name: "Sneha Iyer", department: "Marketing", salary: 39000 },
  { id: 105, name: "Karthik Rao", department: "Engineering", salary: 91000 },
  { id: 106, name: "Meera Nair", department: "Support", salary: 50000 },
  { id: 107, name: "Vikram Singh", department: "Finance", salary: 64000 },
];

const SALARY_LIMIT = 50000;

function EmployeeTable() {
  return (
    <section className="card">
      <h2>Employee Directory</h2>
      <p className="note">
        Rows highlighted in green have a salary above {SALARY_LIMIT.toLocaleString("en-IN")}.
      </p>
      <div className="table-wrap">
        <table className="emp-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className={employee.salary > SALARY_LIMIT ? "high-salary" : ""}
              >
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                <td>{employee.salary.toLocaleString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default EmployeeTable;
