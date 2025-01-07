import React from "react";
import Button from "react-bootstrap/cjs/Button";
import Card from "react-bootstrap/Card";
import { fetchData } from "../assets/petitions/fetchData";
import { fetchLeads } from "../assets/petitions/fetchLeads";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";

const QuestionsView = ({
  questions,
  dataUser,
  setDataUser,
  setActiveSection,
  backendURLBaseServices,
  clientId,
  endpoints,
  mainData,
  backendURLBase,
  setError,
  error,
}) => {
  console.log(mainData);
  const elements = (questions) => {
    return Object.keys(questions).map((clave) =>
      questions[clave].split("<br/>").map((line, index) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ))
    );
  };
  const back = () => {
  setActiveSection("questions")
    setError(false);
  };
  const handleChange = (e) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };
  const hoy = new Date();
  const today = hoy.toDateString();
  const click = async (e) => {
    console.log(questions)
    e.preventDefault();
    if (!dataUser.subject) return setError(true);
    let message = JSON.stringify(questions);
    const payload = await fetchData(
      "GET",
      backendURLBaseServices,
      endpoints.toSendEmails,
      clientId,
      `questions=${message}&user=${JSON.stringify(dataUser)}`
    );
    console.log(payload)
    if (payload.success === true) {
      fetchLeads(true, backendURLBase, endpoints, clientId, dataUser, message);
      setActiveSection("typ")
    }
    if (payload.success !== true) {
      fetchLeads(false, backendURLBase, endpoints, clientId, dataUser, message);
      return (
        <Alert>
          The email has not been sent successfully, please try again again late
          <Button
            className={"button-email-form"}
            variant={"dark"}
            onClick={back}
          >
            Back
          </Button>
        </Alert>
      );
    }
  };
  return (
    <div
      className={"container emailContainer formEmail"}
      style={{ justifyContent: "center", display: "flex" }}
    >
      <div className="ia-container">
        <h2>{mainData.titlePreview}</h2>
        <p>{mainData.intructionsPreview}</p>
        {error ? (
          <Alert variant={"danger"}>Please Enter a Subject</Alert>
        ) : null}
        <Form.Group className="field">
          <Form.Label className="subject-label">subject</Form.Label>
          <Form.Control
            id={"subject"}
            type={"text"}
            placeholder={"subject"}
            name={"subject"}
            onChange={handleChange}
            className="input-color subject-input"
            required
          />
        </Form.Group>
        <div className="email-ia-text-area">
          <Card body className="body-card">
            <p style={{ fontSize: "13px" }}>
              Committee Secretary
              <br />
              [Committee Name] <br />
              Parliament House, <br />
              PO Box 6100 <br />
              Parliament House <br />
              CANBERRA ACT 2006 <br />
              AUSTRALIA <br />
              {today} <br />
              {dataUser.type} Submission by {dataUser.userName}
            </p>
            <div style={{ fontSize: "13px" }}>
              {questions ? elements(questions) : null}
              <p>Best regards.</p>
            </div>
          </Card>
        </div>
        <p style={{ padding: "15px" }}> {mainData.textPreview} </p>

        <div className="btn-container-checklist">
          <Button className="back-button" size={"lg"} onClick={back}>
            Back
          </Button>
          <Button onClick={click} className="continue-button" size={"lg"}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionsView;
