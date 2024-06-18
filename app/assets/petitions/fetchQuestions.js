import { fetchData } from "./fetchData";
const fetchQuestions = async (petitionMethod, backendURLBase, endpoint, clientId, params = '', setDataQuestions) => {
       /* const datos = await fetchData(petitionMethod, backendURLBase, endpoint, clientId, params='')
        const questions = datos?.data.docs[0]
        const filtered = questions?.questions*/
        const data = [{
            "questions": "1.- Introduce yourself to the committee by stating your name, location and occupation. For example, \"Hi, I'm Adam, I live in Perth, and I own a pastry shop in Kwinana.\"",
            "id": "647665825199b1244486fcbb"
        },
        {
            "questions": "2.- In your own words, tell the committee that you support this legislation and that you believe it is important to achieve",
            "id": "647665855199b1244486fcbc"
        },
        {
            "questions": "3.- Explain in your own word what you believe the negative ramifications would be if this legislation does not pass.",
            "id": "647665875199b1244486fcbd"
        },
        {
            "questions": "4.-In your own words, tell the committee that you support this legislation and that you believe it is important to achieve",
            "id": "6476658a5199b1244486fcbe"
        },
        {
            "questions": "5.-Urge the committee to recommend that this legislation be passed by the Parliament.",
            "id": "64877f0bfb2a4260310c4d65"
        }]
         await setDataQuestions(data)
}
export {
    fetchQuestions
}