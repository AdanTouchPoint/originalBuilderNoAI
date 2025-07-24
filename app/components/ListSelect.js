import React from "react";
import Button from "react-bootstrap/cjs/Button";
import Alert from "react-bootstrap/Alert";
import { fetchLeads } from "../assets/petitions/fetchLeads";
import { useStateContext } from "../context/StateContext";

const ListSelect = ({ setActiveSection, setError, error }) => {
  const {
    setDataUser,
    dataUser,
    emails,
    backendURLBase,
    endpoints,
    clientId,
  } = useStateContext();

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
    if (!dataUser.type) return setError(true);
    fetchLeads(
      "NA",
      backendURLBase,
      endpoints,
      clientId,
      dataUser,
      emails,
      "NA",
      "privacy-preference-lead"
    );
    setError(false);
    setActiveSection("questions");
  };

  const back = () => {
    setActiveSection("mainForm");
    setError(false);
  };

  return (
    <div className={"container container-content form-container"}>
      <div className={"buttons-list-container list-container"}>
        <div className="instructions-container">
          <h3 className="main-texts-color main-text-title">Submission privacy</h3>
        </div>
        {error ? (
          <Alert variant={"danger"}>Please Select One Option</Alert>
        ) : null}
        {privacy?.map((option, index) => (
          <React.Fragment key={index}>
            {Object.keys(option).map((key, index) => (
              <div key={index} className="list-element-label-confidentiality">
                <label className="select-label main-texts-color labels-text-format form-label label-question">
                  {key}
                </label>
                <label key={index} className="list-mp-row">
                  <input
                    id="representativeList-checkbox"
                    type="radio"
                    onChange={handleChange}
                    className="form-check-input"
                    value={key}
                    name="type"
                  />
                  <h5 className="list-mp-row-info">{option[key]}</h5>
                </label>
              </div>
            ))}
          </React.Fragment>
        ))}
        <div className="btn-container-checklist">
          <Button
            id="representativeList-button"
            className="back-button"
            size={"lg"}
            onClick={back}>
            Back
          </Button>
          <Button
            id="representativeList-button"
            className="continue-button"
            size={"lg"}
            onClick={click}>
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListSelect;
