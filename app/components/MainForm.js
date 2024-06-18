"use client";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import ListSelect from "./ListSelect";
import Questions from "./Questions";
import QuestionsView from "./QuestionsView";
import ThankYou from "./ThankYou";
import { animateScroll as scroll } from "react-scroll";
import LoadingMainForm from "./LoadingMainForm";
import { verifyInputs } from "../assets/helpers/utilities";
const MainForm = ({
  dataUser,
  setDataUser,
  mp,
  emailData,
  clientId,
  states,
  typData,
  mainData,
  backendURLBase,
  endpoints,
  backendURLBaseServices,
  allDataIn,
  colors,
  formFields,
  dataQuestions,
  questions,
  setQuestions,
}) => {
  const [hideQuestions, setHideQuestions] = useState(true);
  const [hideQuestionsView, setHideQuestionsView] = useState(true);
  const [hideList, setHideList] = useState(true);
  const [showLoadSpin, setShowLoadSpin] = useState(false);
  const [showFindForm, setShowFindForm] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const [showThankYou, setShowThankYou] = useState(true);
  const [tac, setTac] = useState(false);
  const [showMainContainer, setShowMainContainer] = useState(false);
  const loading = (cl) => {
    scroll.scrollTo(1000);
    return <LoadingMainForm cl={cl} />;
  };
  const handleTerms = (e) => {
    if (e.target.checked === true) {
      setTac(true);
    } else {
      setTac(false);
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };
  const click = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    const data = await verifyInputs(dataUser, formFields);
    if (data === false || tac === false) {
      setError(true);
      return;
    }
    setDataUser({...dataUser,
     email: allDataIn
    })
    setError(false);
    setShowMainContainer(true);
    setHideList(false);
    setValidated(false);
  };
  if (!mainData) return "loading datos";
  if (!mp) return "loading datos";
  console.log(dataUser);
  return (
    <div className={"contenedor main-form-flex-container"}>
      <div className={"container instructions"}></div>
      <div className={"form-container"} hidden={showMainContainer}>
        <div className={"container container-content"}>
          {error ? (
            <Alert variant={"danger"}>
              Please fill all fields. Also, please make sure there are no spaces
              before of after your email or postcode.
            </Alert>
          ) : null}
          <Form
            name="fm-find"
            noValidate
            validated={validated}
            hidden={showFindForm}
          >
            <div className="instructions-container">
              <h3 className="main-texts-color main-text-title">
                {mainData.title}
              </h3>
              <p className="main-texts-color main-text-instruction">
                {mainData.instruction}
              </p>
            </div>
            {/* <h3 className="find-her-mp-text main-texts-color">{mainData.firstFormLabel1}</h3> */}
            <div className="fields-form">
              {formFields.map((field, key) => {
                return field.type !== "state" ? (
                  <Form.Group className="field" key={key}>
                    <Form.Label
                      className="select-label main-texts-color labels-text-format"
                      htmlFor={`emailInput-mainForm${key}`}
                    >
                      {field.label}*
                    </Form.Label>
                    <Form.Control
                      id={`emailInput-mainForm${key}`}
                      type={field.type === "emailUser" ? "email" : field.type}
                      placeholder={field.placeholder}
                      name={field.type === "name" ? "userName" : field.type}
                      onChange={handleChange}
                      className="input-color main-form-inputs"
                      required
                    />
                  </Form.Group>
                ) : states.length > 0 ? (
                  <Form.Group className={"field"} key={key}>
                    <Form.Label className="select-label">
                      {field.label}*
                    </Form.Label>
                    <Form.Select
                      aria-label="DefaulValue"
                      required
                      name={field.type}
                      id="stateSelect-mainForm"
                      onChange={handleChange}
                    >
                      <option key={"vacio"} value={""}>
                        {field.placeholder}
                      </option>
                      {states.sort().map((estate) => (
                        <option key={estate} value={estate}>
                          {estate}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                ) : (
                  <Form.Group className="field" key={key}>
                    <Form.Label className="select-label">
                      {field.label}*
                    </Form.Label>
                    <Form.Control
                      id="emailInput-mainForm"
                      type={field.type}
                      placeholder={field.placeholder}
                      name={field.type}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                );
              })}
            </div>
            <Form.Group
              style={{ textAlign: "justify" }}
              className="field select-styles-form terms-and-cond-input"
              controlId="conditions"
            >
              <Form.Check
                name="conditions"
                onClick={handleTerms}
                className="links-checkboxes-color terms-and-cond-input"
                required
                label={
                  <a
                    target={"_blank"}
                    className="links-checkboxes-color"
                    rel={"noreferrer"}
                    href={mainData.termsAndConditionsURL}
                  >
                    Terms and Conditions
                  </a>
                }
              />
            </Form.Group>
            <Form.Group className="main-find-btn-container">
              <Button
              className="continue-button"
              size={"lg"}
              onClick={click}>Next</Button>
            </Form.Group>
            {showLoadSpin ? loading("spinner-containerB") : null}
          </Form>
        </div>
      </div>
      <ListSelect
        setError={setError}
        error={error}
        setHideQuestions={setHideQuestions}
        setShowMainContainer={setShowMainContainer}
        hideList={hideList}
        setHideList={setHideList}
        setDataUser={setDataUser}
        dataUser={dataUser}
      />
      <Questions
        setShowMainContainer={setShowMainContainer}
        dataQuestions={dataQuestions}
        dataUser={dataUser}
        hideQuestions={hideQuestions}
        setHideQuestions={setHideQuestions}
        questions={questions}
        setQuestions={setQuestions}
        setHideQuestionsView={setHideQuestionsView}
        validated={validated}
        setValidated={setValidated}
        error={error}
        setError={setError}
        setHideList={setHideList}
      />
      <QuestionsView
        dataUser={dataUser}
        questions={questions}
        setShowThankYou={setShowThankYou}
        setHideQuestions={setHideQuestions}
        hideQuestionsView={hideQuestionsView}
        setHideQuestionsView={setHideQuestionsView}
        endpoints={endpoints}
        backendURLBaseServices={backendURLBaseServices}
        backendURLBase={backendURLBase}
        clientId={clientId}
        mainData={mainData}
        setDataUser={setDataUser}
        emailData={emailData}
        setError={setError}
        error={error}
      />
      <ThankYou
        setShowFindForm={setShowFindForm}
        setShowThankYou={setShowThankYou}
        typData={typData}
        showThankYou={showThankYou}
        setShowMainContainer={setShowMainContainer}
        colors={colors}
      />
    </div>
  );
};
export default MainForm;
