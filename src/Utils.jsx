export const isLocalhost = true;

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