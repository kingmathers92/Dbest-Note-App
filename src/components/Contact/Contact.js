import { useState } from "react";

function Contact() {
  const emptyMessage = {
    name: "",
    email: "",
    title: "",
    content: "",
  };

  const [message, setMessage] = useState(emptyMessage);
  const [errors, setErrors] = useState([]);

  function validateForm(message) {
    const errorMessages = [];
    const emailregex =
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const nameregex = /^[a-zA-Z ]+$/;
    const allValuesAreNotEmpty = Object.values(message).every(
      (elem) => elem != ""
    );
    if (!emailregex.test(message.email)) {
      errorMessages.push("Email address is invalid.");
    }
    if (!nameregex.test(message.name)) {
      errorMessages.push("Name is invalid.");
    }
    if (!allValuesAreNotEmpty) {
      errorMessages.push("Please fill in all form fields.");
    }
    setErrors(errorMessages);
  }

  function handleChange(e) {
    setMessage((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    validateForm(message);
  }

  return (
    <div className="contact--wrapper">
      <form className="contact--form">
        <h3 className="contact--heading">Contact</h3>
        <div className="contact--twoFieldsWrapper">
          <label htmlFor="name" className="contact--label">
            Name* <br />
            <input
              type="text"
              name="name"
              id="name"
              className="contact--input-text contact--name"
              value={message.name}
              onChange={(e) => handleChange(e)}
            />
          </label>

          <label htmlFor="email" className="contact--label">
            {" "}
            Email* <br />
            <input
              type="email"
              name="email"
              id="email"
              value={message.email}
              onChange={(e) => handleChange(e)}
              className="contact--input-text contact--email"
            />
          </label>
        </div>

        <label htmlFor="title" className="contact--label">
          Title <br />
          <input
            type="text"
            name="title"
            id="title"
            value={message.title}
            onChange={(e) => handleChange(e)}
            className="contact--input-text contact--title"
          />
        </label>

        <label className="contact--label">
          Your Message <br />
          <textarea
            type="textarea"
            name="content"
            id="content"
            value={message.content}
            onChange={(e) => handleChange(e)}
            className="textarea contact--message"
          />
        </label>

        {errors.length > 0 && (
          <div className="contact--error">{errors.join("\n")}</div>
        )}
        <button
          className="button contact--button"
          onClick={(e) => handleSubmit(e)}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

export default Contact;
