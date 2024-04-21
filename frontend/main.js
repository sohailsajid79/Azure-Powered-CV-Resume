window.addEventListener('DOMContentLoaded', (event) => {
    getVisitCount();
});

//const functionProdURL = process.env.functionProdURL;

//const functionDevURL = process.env.functionDevURL;

const getVisitCount = async () => {
    let count = 0;
    try {
        const response = await fetch(functionProdURL);
        const res = await response.json();
        // console.log('calling function API');
        count = res.count;
        document.getElementById('counter').innerText = count;
    } catch (error) {
        console.error('error fetching data:', error);
    }
    return count;
}
