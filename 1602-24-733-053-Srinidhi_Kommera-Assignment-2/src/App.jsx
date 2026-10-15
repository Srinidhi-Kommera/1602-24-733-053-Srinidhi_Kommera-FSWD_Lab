import { useState } from "react";
import EmployeeTable from "./EmployeeTable.jsx";
import EventHandling from "./EventHandling.jsx";
import StudentRegistration from "./StudentRegistration.jsx";

const programs = [
  { id: "employees", label: "1. Employee Table", component: EmployeeTable },
  { id: "events", label: "2. Event Handling", component: EventHandling },
  { id: "register", label: "3. Student Registration", component: StudentRegistration },
];

function App() {
  const [active, setActive] = useState("employees");
  const ActiveProgram = programs.find((p) => p.id === active).component;

  return (
    <div className="app">
      <header className="app-header">
        <h1>React Lab Programs</h1>
        <nav className="tabs">
          {programs.map((p) => (
            <button
              key={p.id}
              className={p.id === active ? "tab active" : "tab"}
              onClick={() => setActive(p.id)}
            >
              {p.label}
            </button>
          ))}
        </nav>
      </header>
      <main className="app-main">
        <ActiveProgram />
      </main>
    </div>
  );
}

export default App;
