import { useState } from "react";

const initialValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phonePattern = /^\d{10}$/;

function validate(values) {
  const errors = {};

  if (!values.name.trim()) {
    errors.name = "Name is required.";
  } else if (!/^[A-Za-z ]{3,}$/.test(values.name.trim())) {
    errors.name = "Name must have at least 3 letters and contain only letters and spaces.";
  }

  if (!values.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Enter a valid email address, for example name@example.com.";
  }

  if (!values.phone) {
    errors.phone = "Phone number is required.";
  } else if (!phonePattern.test(values.phone)) {
    errors.phone = "Phone number must be exactly 10 digits.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters long.";
  } else if (!/[A-Z]/.test(values.password)) {
    errors.password = "Password must contain an uppercase letter.";
  } else if (!/[a-z]/.test(values.password)) {
    errors.password = "Password must contain a lowercase letter.";
  } else if (!/\d/.test(values.password)) {
    errors.password = "Password must contain a number.";
  } else if (!/[^A-Za-z0-9]/.test(values.password)) {
    errors.password = "Password must contain a special character.";
  }

  if (!values.confirmPassword) {
    errors.confirmPassword = "Please confirm your password.";
  } else if (values.confirmPassword !== values.password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return errors;
}

function getStrength(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  if (score <= 2) return { label: "Weak", level: "weak" };
  if (score <= 4) return { label: "Medium", level: "medium" };
  return { label: "Strong", level: "strong" };
}

function StudentRegistration() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [attempted, setAttempted] = useState(false);
  const [submitted, setSubmitted] = useState(null);

  const errors = validate(values);

  const showError = (field) => (touched[field] || attempted) && errors[field];

  const handleChange = (event) => {
    const { name, value } = event.target;
    const cleaned = name === "phone" ? value.replace(/\D/g, "").slice(0, 10) : value;
    setValues({ ...values, [name]: cleaned });
  };

  const handleBlur = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setAttempted(true);
    if (Object.keys(errors).length === 0) {
      setSubmitted({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone,
        password: "*".repeat(values.password.length),
      });
    }
  };

  const handleReset = () => {
    setValues(initialValues);
    setTouched({});
    setAttempted(false);
    setSubmitted(null);
  };

  if (submitted) {
    return (
      <section className="card">
        <h2>Registration Successful</h2>
        <p className="note">The following details were submitted.</p>
        <dl className="details">
          <dt>Name</dt>
          <dd>{submitted.name}</dd>
          <dt>Email</dt>
          <dd>{submitted.email}</dd>
          <dt>Phone</dt>
          <dd>{submitted.phone}</dd>
          <dt>Password</dt>
          <dd>{submitted.password}</dd>
        </dl>
        <button className="btn" onClick={handleReset}>
          Register another student
        </button>
      </section>
    );
  }

  const strength = getStrength(values.password);

  return (
    <section className="card">
      <h2>Student Registration</h2>
      <form onSubmit={handleSubmit} noValidate className="form">
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input
            id="name"
            name="name"
            type="text"
            className={showError("name") ? "input invalid" : "input"}
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {showError("name") && <span className="error">{errors.name}</span>}
        </div>

        <div className="field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className={showError("email") ? "input invalid" : "input"}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {showError("email") && <span className="error">{errors.email}</span>}
        </div>

        <div className="field">
          <label htmlFor="phone">Phone number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            className={showError("phone") ? "input invalid" : "input"}
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {showError("phone") && <span className="error">{errors.phone}</span>}
        </div>

        <div className="field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            className={showError("password") ? "input invalid" : "input"}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {values.password && (
            <span className={`strength ${strength.level}`}>
              Strength: {strength.label}
            </span>
          )}
          {showError("password") && <span className="error">{errors.password}</span>}
        </div>

        <div className="field">
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className={showError("confirmPassword") ? "input invalid" : "input"}
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {showError("confirmPassword") && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit" className="btn">
          Register
        </button>
      </form>
    </section>
  );
}

export default StudentRegistration;
