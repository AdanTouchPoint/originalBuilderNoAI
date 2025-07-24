import "bootstrap/dist/css/bootstrap.min.css";
import MainFormWrapper from "./components/MainFormWrapper";
import { fetchMainContent } from "./assets/petitions/fetchMainContent";
import { fetchRepresentatives } from "./assets/petitions/fetchRepresentatives";

async function Home() {
  const backendURLBase = process.env.NEXT_PUBLIC_URL;
  const backendURLBaseServices = process.env.NEXT_PUBLIC_URL_SERVICES;
  const id = process.env.NEXT_PUBLIC_CAMPAING_ID || "687982cc2a868c527deaed50";
  const campaignType = "SB";
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID;
  const endpoints = {
    toSendEmails: "/email-builder/",
    toGetRepresentativesPerStates: "/representatives-state/",
    toGetRepresentativesPerParty: "/representatives-party/",
    toGetAllRepresentatives: "/all-representatives/",
    toGetRepresentativesByCp: "/find-mp-demo/",
    toGetMainData: "/main/",
    toSaveLeads: "/leads/",
  };

  const initialState = await fetchMainContent(backendURLBase, id, clientId, campaignType);
 
  const representatives = await fetchRepresentatives(backendURLBase, endpoints, clientId);

  if (initialState === false || representatives === false) {
    // Handle error case, maybe return an error component
    return <div>Error loading initial data.</div>;
  }

  const pageData = initialState?.data.docs[0] || {};
  const { mainform, emailform, emailPreview, questions, style, ty } = pageData;

  const initialData = {
    mainData: { mainform, emailform, emailPreview },
    dataQuestions: questions?.questions || [],
    colors: style || {},
    typData: ty || {},
    emails: representatives || [],
    backendURLBase,
    backendURLBaseServices,
    clientId,
    endpoints,
    id,
    campaignType
  };

  return <MainFormWrapper initialData={initialData} />;
}

export default Home;

