import React, { useState } from "react";
import Button from "react-bootstrap/cjs/Button";
import Alert from "react-bootstrap/Alert";

const ListSelect = ({
  setError,
  error,
  setHideQuestions,
  setShowMainContainer,
  hideList,
  setHideList,
  setDataUser,
  dataUser,
}) => {
  const privacy = [
    {
      Public: "The material will be published online with your name",
    },
    {
      Confidential:
        "The material isn’t published online and will be kept confidential by the committee",
    },
    {
      NameWithHeld: "The material will be published online without your name",
    },
  ];
  const handleChange = (e) => {
    e.preventDefault();
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    });
  };
  const click = async () => {
    if(!dataUser.type)  return setError(true)
    setHideQuestions(false);
    setHideList(true);
    setShowMainContainer(true);
    setError(false)
  };
  const back = () => {
    setHideList(true);
    setShowMainContainer(false);
    setError(false)
  };
  return (
    <>
      <div
        hidden={hideList}
        className={"buttons-list-container list-container"}
      >
        {error ? (
            < Alert variant={"danger"}>
              Please Select One Option
            </Alert>
          ) : null}
        {privacy?.map((option, index) => (
          <>
            {Object.keys(option).map((key) => (
              <label key={index} className="list-mp-row">
                <input
                  id="representativeList-checkbox"
                  type="checkbox"
                  onChange={handleChange}
                  className="form-check-input"
                  value={key}
                  name="type"
                />
                <h5 className="list-mp-row-info">{ key + option[key]}</h5>
              </label>
            ))}
          </>
        ))}
        <div className="btn-container-checklist">
          <Button
            id="representativeList-button"
            className="continue-button"
            size={"lg"}
            onClick={back}
          >
            Back
          </Button>
          <Button
            id="representativeList-button"
            className="continue-button"
            size={"lg"}
            onClick={click}
          >
            Continue
          </Button>
        </div>
      </div>
    </>
  );
};

export default ListSelect;
