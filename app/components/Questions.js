import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/cjs/Button";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-scroll";
import Col from "react-bootstrap/Col";
import { verifyInputs } from "../assets/helpers/utilities";
import { fetchLeads } from "../assets/petitions/fetchLeads";
import { useStateContext } from "../context/StateContext";

const Questions = ({ setActiveSection, validated, setValidated, error, setError }) => {
  const {
    dataQuestions,
    questions,
    setQuestions,
    backendURLBase,
    endpoints,
    clientId,
    dataUser,
    emails
  } = useStateContext();

  const handleText = (e) => {
    setQuestions({
      ...questions,
      [e.target.name]: e.target.value
        .replace(/\n\r?/g, "<br/>")
        .replace(/#/g, " "),
    });
  };

  const click = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    await setValidated(true);
    const data = await verifyInputs(questions, dataQuestions);
    if (data === false) {
      setError(true);
      return;
    }
    setError(false);
    fetchLeads(
      "NA",
      backendURLBase,
      endpoints,
      clientId,
      dataUser,
      emails,
      "NA",
      "questions-lead"
    );
    setActiveSection("questionsView");
  };

  const back = () => {
    setError(false);
    setActiveSection("listSelect");
  };

  return (
    <div
      className={"container container-content form-container"}
      style={{ justifyContent: "center", display: "flex" }}>
      <div className="ia-container">
        <h2 className="ia-instructions-title">Craft your email</h2>
        {error ? (
          <Alert variant={"danger"}>All fields are required!</Alert>
        ) : null}
        <Link
          activeClass="active"
          to="section1"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}></Link>
        <Form noValidate validated={validated}>
          {dataQuestions
            ? dataQuestions?.map((value, key) => (
                <Col key={value} className="label-ia-prompt">
                  <Form.Group>
                    <Form.Label className="label-question">{value.text}</Form.Label>
                    <Form.Control
                      id="message-emailform"
                      onChange={handleText}
                      as="textarea"
                      type="text-area"
                      name={`question${key + 1}`}
                      className="input-color main-form-inputs"
                      required
                    />
                  </Form.Group>
                </Col>
              ))
            : null}
          <div className="btn-container-checklist">
            <Button className="back-button" size={"lg"} onClick={back}>
              Back
            </Button>
            <Button className="continue-button" size={"lg"} onClick={click}>
              Next
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Questions;


