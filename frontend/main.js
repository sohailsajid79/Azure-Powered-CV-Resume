// require('dotenv').config();

window.addEventListener('DOMContentLoaded', (event) => {
    getVisitCount();
});

const functionProdURL = "https://resfunctioncapp.azurewebsites.net/api/GetAndUpdateCounter?code=zWLHk_RNGReN8o7I4GcP-ClGjtJw4yNTzHSm6j8MROnNAzFujKYKug%3D%3D"

// Local development
// const functionDevURL = "http://localhost:7071/api/GetAndUpdateCounter"

const getVisitCount = async () => {
    let count = 0;
    try {
        const response = await fetch(functionProdURL);
        // const response = await fetch(functionDevURL);
        if (!response.ok) {
            throw new Error('`HTTP error! Status: ${response.status}`');
        }
        const res = await response.json();
        // console.log('calling function API', res);
        count = res.count;
        document.getElementById('counter').innerText = count;
    } catch (error) {
        console.error('error fetching data:', error);
    }
    return count;
}
