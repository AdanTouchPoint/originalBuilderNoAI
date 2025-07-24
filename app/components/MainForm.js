"use client";
import React, { useState } from "react";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import ListSelect from "./ListSelect";
import Questions from "./Questions";
import QuestionsView from "./QuestionsView";
import ThankYou from "./ThankYou";
import { animateScroll as scroll } from "react-scroll";
import LoadingMainForm from "./LoadingMainForm";
import { fetchLeads } from "../assets/petitions/fetchLeads";
import { useStateContext } from "../context/StateContext";

const MainForm = () => {
  const {
    dataUser,
    setDataUser,
    emailData,
    clientId,
    states,
    mainData,
    backendURLBase,
    endpoints,
    emails
  } = useStateContext();

  const [activeSection, setActiveSection] = useState('');
  const [showLoadSpin, setShowLoadSpin] = useState(false);
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const [tac, setTac] = useState(false);
  const title = mainData.mainform?.title?.text;
  const instructions = mainData.mainform?.instructions?.text;

  const loading = (cl) => {
    scroll.scrollTo(1000);
    return <LoadingMainForm cl={cl} />;
  };

  const isValidEmail = (email) => {
    if (!email) {
      return false;
    }
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email.trim());
  };

  const validateFields = () => {
    if (tac === false) {
      return false;
    }
    if (!mainData.mainform?.mainFormInputs) {
      return true; 
    }
    for (const field of mainData.mainform.mainFormInputs) {
      let fieldName;
      if (field.type === 'state') {
        fieldName = field.type;
      } else {
        fieldName = field.text === "name" ? "userName" : field.text === "email" ? "emailUser" : field.text;
      }
      const value = dataUser[fieldName];
      if (!value || (typeof value === 'string' && value.trim() === '')) {
        return false;
      }
      if (fieldName === 'emailUser' && !isValidEmail(value)) {
        return false;
      }
    }
    return true;
  };

  const click = async (e) => {

    if (!validateFields()) {
      setError(true);
      return;
    }    
    setShowLoadSpin(true);
    setValidated(true);
    setError(false);
    setDataUser({ ...dataUser});
    fetchLeads(
      "NA",
      backendURLBase,
      endpoints,
      clientId,
      dataUser,
      emails,
      "NA",
      "main-form-data-user"
    );
    setActiveSection('listSelect');
  };

  const renderMainFormSection = () => {
    const handleTerms = (e) => {
      if (e.target.checked === true) {
        setTac(true);
      } else {
        setTac(false);
      }
    };

    const handleChange = (e) => {
      e.preventDefault();
      console.log("handleChange", e.target.name, e.target.value);
      setDataUser({
        ...dataUser,
        [e.target.name]: e.target.value,
      });
    };
    console.log("dataUser", dataUser);
    console.log("emailData", emailData);
    console.log(emails)
    return (
      <div className={"container container-content"}>
        {error ? (
          <Alert variant={"danger"}>
            Please fill all fields. Also, please make sure there are no spaces
            before of after your email or postcode.
          </Alert>
        ) : null}
        <Form name="fm-find" noValidate validated={validated}>
          <div className="instructions-container">
            <h3 className="main-texts-color main-text-title">{title}</h3>
            <p className="main-texts-color main-text-instruction">{instructions}</p>
          </div>
          <div className="fields-form">
            {mainData.mainform?.mainFormInputs?.map((field, key) => {
              const fieldText = field.text;
              return field.type !== "state" ? (
                <Form.Group className="field" key={key}>
                  <Form.Label
                    className="select-label main-texts-color labels-text-format"
                    htmlFor={`emailInput-mainForm${key}`}>
                    {field.text}*
                  </Form.Label>
                  <Form.Control
                    id={`emailInput-mainForm${key}`}
                    type={field.type === "emailUser" ? "email" : field.type}
                    placeholder={field.placeholder}
                    name={field.text === "name" ? "userName" : field.text === "email" ? "emailUser" : field.text}
                    defaultValue={field.text === 'name' ? dataUser.userName : field.text === "email" ? dataUser.emailUser : dataUser[fieldText]}
                    onChange={handleChange}
                    className="input-color main-form-inputs"
                    required
                  />
                </Form.Group>
              ) : states.length > 0 ? (
                <Form.Group className={"field"} key={key}>
                  <Form.Label className="select-label">{field.label}*</Form.Label>
                  <Form.Select
                    aria-label="DefaulValue"
                    required
                    name={field.type}
                    id="stateSelect-mainForm"
                    onChange={handleChange}>
                    <option key={"vacio"} value={""}>{field.placeholder}</option>
                    {states.sort().map((estate) => (
                      <option key={estate} value={estate}>{estate}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              ) : (
                <Form.Group className="field" key={key}>
                  <Form.Label className="select-label">{field.label}*</Form.Label>
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
            controlId="conditions">
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
                  href={mainData.termsAndConditionsURL}>
                  Terms and Conditions
                </a>
              }
            />
          </Form.Group>
          <Form.Group className="main-find-btn-container">
            <Button className="continue-button" size={"lg"} onClick={click}>Next</Button>
          </Form.Group>
          {showLoadSpin ? loading("spinner-containerB") : null}
        </Form>
      </div>
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'mainForm':
        return renderMainFormSection();
      case 'listSelect':
        return <ListSelect setActiveSection={setActiveSection} setError={setError} error={error} />;
      case 'questions':
        return <Questions setActiveSection={setActiveSection} validated={validated} setValidated={setValidated} error={error} setError={setError} />;
      case 'questionsView':
        return <QuestionsView setActiveSection={setActiveSection} setError={setError} error={error} />;
      case 'typ':
        return <ThankYou setActiveSection={setActiveSection} />;
      default:
        return renderMainFormSection();
    }
  };

  return (
    <div className={"contenedor main-form-flex-container"}>
      <div className={"form-container"}>{renderSection()}</div>
    </div>
  );
};

export default MainForm;