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
  setShowThankYou,
  backendURLBaseServices,
  clientId,
  endpoints,
  mainData,
  backendURLBase,
  hideQuestionsView,
  setHideQuestionsView,
  setHideQuestions,
  setError,
  error
}) => {
  console.log(mainData)
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
    setHideQuestionsView(true);
    setHideQuestions(false)
    setError(false)
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
    if(!dataUser.subject) return setError(true)
    let message = JSON.stringify(questions);
    setShowThankYou(false);
    setHideQuestionsView(true);
    const payload = await fetchData(
      "GET",
      backendURLBaseServices,
      endpoints.toSendEmails,
      clientId,
      `questions=${message}&user=${JSON.stringify(dataUser)}`
    );
    if (payload.success === true) {
      fetchLeads(true, backendURLBase, endpoints, clientId, dataUser, message);
      setShowThankYou(false);
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
      hidden={hideQuestionsView}
      className={"container"}
      style={{ justifyContent: "center", display: "flex" }}
    >
      <div style={{ maxWidth: "700px", width: "100%" }}>
        <h2>{mainData.titlePreview}</h2>
        <p>{mainData.intructionsPreview}</p>
        {error ? (
            < Alert variant={"danger"}>
              Please Select One Option
            </Alert>
          ) : null}
        <Form.Group className="field">
          <Form.Label className="select-label">subject</Form.Label>
          <Form.Control
            id={"subject"}
            type={"text"}
            placeholder={"subject"}
            name={"subject"}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <div style={{ textAlign: "left" }}>
          <Card body>
            <p style={{fontSize: "13px"}}>
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
            <div style={{fontSize: "13px"}}>
              {questions ? elements(questions) : null}
            <p>Best regards.</p>
            </div>
          </Card>
        </div>
        <p style={{ padding: "15px" }}> {mainData.textPreview} </p>
        <Button onClick={back} className={"u-full-width"}>
          Back
        </Button>
        <Button onClick={click} className={"u-full-width"}>
          Send
        </Button>
      </div>
    </div>
  );
};

export default QuestionsView;
