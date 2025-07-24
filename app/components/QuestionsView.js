import React, { useState } from "react";
import Button from "react-bootstrap/cjs/Button";
import Card from "react-bootstrap/Card";
import { fetchData } from "../assets/petitions/fetchData";
import { fetchLeads } from "../assets/petitions/fetchLeads";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { useStateContext } from "../context/StateContext";

const QuestionsView = ({ setActiveSection, setError, error }) => {
  const {
    questions,
    dataUser,
    setDataUser,
    backendURLBaseServices,
    clientId,
    endpoints,
    mainData,
    backendURLBase,
    emailData,
  } = useStateContext();
  const [fetchError, setFetchError] = useState(null);

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
    setActiveSection("questions");
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
    e.preventDefault();
    if (!dataUser.subject) return setError(true);

    if (!questions || Object.keys(questions).length === 0) {
        setFetchError("Cannot send an empty message.");
        return;
    }

    const message = encodeURIComponent(JSON.stringify(questions));
    const user = encodeURIComponent(JSON.stringify(dataUser));

    const payload = await fetchData(
      "GET",
      backendURLBaseServices,
      endpoints.toSendEmails,
      clientId,
      `questions=${message}&user=${user}`
    );

    if (payload.success === true) {
      fetchLeads(
        true,
        backendURLBase,
        endpoints,
        clientId,
        dataUser,
        emailData,
        "NA",
        "send-email-lead"
      );
      setActiveSection("typ");
    } else {
      fetchLeads(false, backendURLBase, endpoints, clientId, dataUser, message);
      setFetchError(payload.error || "The email has not been sent successfully, please try again again late");
    }
  };

  return (
    <div
      className={"container emailContainer formEmail"}
      style={{ justifyContent: "center", display: "flex" }}>
      <div className="ia-container">
        <h2>{mainData.titlePreview}</h2>
        <p>{mainData.intructionsPreview}</p>
        {error ? (
          <Alert variant={"danger"}>Please Enter a Subject</Alert>
        ) : null}
        {fetchError && (
            <Alert variant={'danger'}>
                {fetchError}

            </Alert>
        )}
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
        <p style={{ padding: "15px" }}>{mainData.textPreview}</p>
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
