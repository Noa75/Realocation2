export const isLocalhost = true;


export const baseURL = () => {
    return isLocalhost ? "http://localhost:5231/api/" : "http://proj.ruppin.ac.il/bgroup30/test2/tar1/api/";
};

export const Translate = (value) => {
    const obj = {
        "united states" : "ארצות הברית",
        "canada" : "קנדה",
        "germany" : "גרמניה",
        "france" : "צרפת",
        "italy" : "איטליה",
        "spain" : "ספרד",
        "australia" : "אוסטרליה",
        "brazil" : "ברזיל",
        "japan" : "יפן",
        "india" : "הודו"
    }
    
    return obj[value.toLowerCase()] ?? value

}