import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/cjs/Button";
import Alert from "react-bootstrap/Alert";
import { Link, animateScroll as scroll } from "react-scroll";
import Col from "react-bootstrap/Col";
import {verifyInputs} from "../assets/helpers/utilities"
const Questions = ({
  dataQuestions,
  hideQuestions,
  questions,
  setQuestions,
  setHideQuestionsView,
  validated,
  setValidated,
  error,
  setError,
  setHideList,
  setShowMainContainer,
  setHideQuestions
}) => {
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
  const data = await verifyInputs(questions, dataQuestions)
 if (data === false) {
  setError(true)
  return
 }
  setError(false)
  await setShowMainContainer(true);
  await setHideQuestionsView(false)
  await setHideQuestions(true)
  };
  const back = () => {
    setHideQuestions(true);
    setHideList(false);
    setError(false)
  };
  return (
    <div
      hidden={hideQuestions}
      className={"container"}
      style={{ justifyContent: "center", display: "flex" }}
    >
      <div style={{ maxWidth: "700px", width: "100%" }}>
        <h2>Craft your email</h2>
        {error ? (
          <Alert variant={"danger"}>All fields are required!</Alert>
        ) : null}
        <Link
          activeClass="active"
          to="section1"
          spy={true}
          smooth={true}
          offset={-70}
          duration={500}
        ></Link>
        <Form noValidate validated={validated}>
        {dataQuestions
          ? dataQuestions.map((key, value) => (
              <Col key={value} className="questions">
                <Form.Group>
                  <Form.Label> {key.questions} </Form.Label>
                  <Form.Control
                    id="message-emailform"
                    onChange={handleText}
                    as="textarea"
                    type="text-area"
                    name={`question${value + 1}`}
                    required
                  />
                </Form.Group>
              </Col>
            ))
          : null}
          <div style={{padding: "15px"}}>
          <Button onClick={back}>Back</Button>
          </div>
          <div style={{padding: "15px"}}>
          <Button onClick={click}>Next</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default Questions;


