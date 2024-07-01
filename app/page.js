"use client";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import MainForm from "./components/MainForm";
import LoadingMainForm from "./components/LoadingMainForm";
import { fetchTYM } from "./assets/petitions/fetchTYM";
import { fetchMainContent } from "./assets/petitions/fetchMainContent";
import { fetchColors } from "./assets/petitions/fetchColors";
import { fetchRepresentatives } from "./assets/petitions/fetchRepresentatives";
import { fetchQuestions } from "./assets/petitions/fetchQuestions";
function Home() {
  const [emailData, setEmailData] = useState({
    userName: "",
  });
  const [dataUser, setDataUser] = useState({});
  const [backendURLBase] = useState(`${process.env.NEXT_PUBLIC_URL}`);
  const [backendURLBaseServices] = useState(
    `${process.env.NEXT_PUBLIC_URL_SERVICES}`
  );
  const [clientId] = useState(`${process.env.NEXT_PUBLIC_CLIENT_ID}`);
  const [endpoints] = useState({
    toSendBatchEmails: "/email-batch/",
    toGetRepresentativesPerStates: "/representatives-state/",
    toGetRepresentativesPerParty: "/representatives-party/",
    toGetAllRepresentatives: "/all-senators/",
    toGetRepresentativesByCp: "/find-mp-demo/",
    toGetMainData: "/main/",
    toGetThankYouMessage: "/typ-message/",
    toGetTweets: "/tweets/",
    toSaveLeads: "/leads/",
    toSendEmails: "/email-builder/",
    toGetAllLeads: "/leads/",
    toGetColors: "/theme/",
  });
  const [mp, setMp] = useState([]);
  const [states, setStates] = useState([]);
  const [dataQuestions, setDataQuestions] = useState([]);
  const [questions, setQuestions] = useState({});
  const [mainData, setMainData] = useState({
    mainImg: "./assets/laptop-with-notebook-and-glasses-on-table.jpg",
    title: "Please enter a title on your board",
    subtitle: "Please enter a subtitle on your dashboard",
    instruction: "Please enter an instruction paragraph in your dashboard",
    firstFormLabel1: "Please enter an indication on your dashboard",
    firstFormPlaceholder1:
      "Please enter a state selection placeholder in your dashboard",
    firstFormLabel2: "Please enter an indication on your dashboard",
    firstFormPlaceholder2:
      "Please enter a placeholder text for your status selection input on your dashboard",
    termsAndConditionsTxt:
      "Please enter a text of terms and conditions in your dashboard",
    termsAndConditionsURL: "#",
    findBtnText: "Find your representative",
    note: "Please enter a note text in your dashboard",
    positionName: "Please enter a position name in your dashboard",
    emailFormUserLabel: "Please enter this value in your dashboard",
    emailFormInfoRepLabel: "Please enter this value in your dashboard",
    emailFormSubjectPlaceholder: "Please enter this value in your dashboard",
    emailFormUserNameLabel: "Please enter this value in your dashboard",
    emailFormUserNamePlaceholder: "Please enter this value in your dashboard",
  });
  const [typData, setTypData] = useState({
    thankYouMessage: "Please enter a thank you message on the dashboard",
    secondThankYouMessage: "Please enter fill this field in the dashboard",
    repeatButtonTyp: "Please fill in this field on the dashboard",
  });
  const [loading, setLoading] = useState(true);
  const [allDataIn, setAllDataIn] = useState([]);
  const [colors, setColors] = useState({});
  const [formFields, setFormFields] = useState([]);
  useEffect(() => {
    async function fetchData() {
      await Promise.all([
        fetchMainContent(
          "GET",
          backendURLBase,
          endpoints.toGetMainData,
          clientId,
          "",
          setMainData,
          setFormFields
        ),
        fetchTYM(
          "GET",
          backendURLBase,
          endpoints.toGetThankYouMessage,
          clientId,
          "",
          setTypData
        ),
        fetchColors(
          "GET",
          backendURLBase,
          endpoints.toGetColors,
          clientId,
          "",
          setColors,
          colors
        ),
        fetchRepresentatives(
          "GET",
          backendURLBase,
          endpoints.toGetAllRepresentatives,
          clientId,
          "",
          setAllDataIn
        ),
        fetchQuestions('GET', backendURLBase, endpoints.toGetQuestions, clientId, '', setDataQuestions)
      ])
        .then(() => {
          setLoading(false);
        })
        .catch((error) => console.error(error));
    }
    fetchData();
  }, []);
  useEffect(() => {
    if (colors && Object.keys(colors).length !== 0) {
      // Verifica que colors no sea undefined y no esté vacío
      document.documentElement.style.setProperty(
        "--main-bg-color",
        colors.background_color
      );
      document.documentElement.style.setProperty(
        "--main-texts-color",
        colors.text_color
      );
      document.documentElement.style.setProperty(
        "--main-inputs-bg-color",
        colors.input_color
      );
      document.documentElement.style.setProperty(
        "--main-option-text-and-border-color",
        colors.input_text_color
      );
      document.documentElement.style.setProperty(
        "--links-checkbox-somebtns-color",
        colors.link_color
      );
      document.documentElement.style.setProperty(
        "--primary-btn-bg-color",
        colors.buttonA_color
      );
      document.documentElement.style.setProperty(
        "--primary-btn-font-color",
        colors.buttonA_text_color
      );
      document.documentElement.style.setProperty(
        "--back-btns-bg-color",
        colors.buttonB_color
      );
      document.documentElement.style.setProperty(
        "--back-btns-font-color",
        colors.buttonA_text_color
      );
    }
  }, [colors]);
  return (
    <>
      {loading && <LoadingMainForm cl={"spinner-container"} />}
      {!loading && (
        <MainForm
          emailData={emailData}
          dataUser={dataUser}
          setDataUser={setDataUser}
          mp={mp}
          clientId={clientId}
          states={states}
          endpoints={endpoints}
          typData={typData}
          mainData={mainData}
          formFields={formFields}
          backendURLBase={backendURLBase}
          backendURLBaseServices={backendURLBaseServices}
          dataQuestions={dataQuestions}
          questions={questions}
          setQuestions={setQuestions}
          allDataIn={allDataIn}
          colors={colors}
        />
      )}
    </>
  );
}
export default Home;
