require('dotenv').config();

window.addEventListener('DOMContentLoaded', (event) => {
    getVisitCount();
});

const functionProdURL = process.env.functionProdURL

// Local development
// const functionDevURL = "http://localhost:7071/api/GetAndUpdateCounter"

const getVisitCount = async () => {
    let count = 0;
    try {
        const response = await fetch(functionProdURL);
        // const response = await fetch(functionDevURL);
        const res = await response.json();
        console.log('calling function API');
        count = res.count;
        document.getElementById('counter').innerText = count;
    } catch (error) {
        console.error('error fetching data:', error);
    }
    return count;
}
