export const isLocalhost = false;


export const baseURL = () => {
    return isLocalhost ? "http://localhost:5231/api/" : "http://proj.ruppin.ac.il/bgroup30/test2/tar3/api/";
};

export const Translate = (value) => {
    const obj = {

    }

    return obj[value.toLowerCase()] ?? value

}