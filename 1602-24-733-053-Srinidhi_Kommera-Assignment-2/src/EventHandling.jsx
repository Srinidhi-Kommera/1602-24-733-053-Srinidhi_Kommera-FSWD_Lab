import { useState } from "react";

function EventHandling() {
  const [boxColor, setBoxColor] = useState("#2563eb");
  const [message, setMessage] = useState("");
  const [keyPressed, setKeyPressed] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleMouseOver = () => {
    setBoxColor("#97071c");
  };

  const handleMouseOut = () => {
    setBoxColor("#de9de0");
  };

  const handleDoubleClick = () => {
    setMessage("You double clicked the box!");
  };

  const handleKeyDown = (event) => {
    setKeyPressed(event.key === " " ? "Space" : event.key);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    alert(`Feedback submitted: ${feedback || "(empty)"}`);
    setFeedback("");
  };

  return (
    <section className="card">
      <h2>Event Handling</h2>

      <div className="block">
        <h3>Mouse events</h3>
        <div
          className="color-box"
          style={{ backgroundColor: boxColor }}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onDoubleClick={handleDoubleClick}
        >
          Hover over me or double click
        </div>
        <p className="message">{message}</p>
      </div>

      <div className="block">
        <h3>Keyboard event</h3>
        <input
          type="text"
          className="input"
          placeholder="Click here and press any key"
          value={keyPressed}
          onKeyDown={handleKeyDown}
          readOnly
        />
        <p className="note">
          {keyPressed ? `Last key pressed: ${keyPressed}` : "No key pressed yet"}
        </p>
      </div>

      <div className="block">
        <h3>Form submit</h3>
        <form onSubmit={handleSubmit} className="inline-form">
          <input
            type="text"
            className="input"
            placeholder="Type your feedback"
            value={feedback}
            onChange={(event) => setFeedback(event.target.value)}
          />
          <button type="submit" className="btn">
            Send feedback
          </button>
        </form>
      </div>
    </section>
  );
}

export default EventHandling;
