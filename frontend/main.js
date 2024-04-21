window.addEventListener('DOMContentLoaded', (event) => {
    getVisitCount();
});

const functionProdURL = "https://resfunctioncapp.azurewebsites.net/api/GetAndUpdateCounter?code=OwApB-yEglihIvBK7nQ2Om2OfrkFONh7SG9vJ5CyWPJxAzFuQs2Gsg=="

const functionDevURL = 'http://localhost:7071/api/GetAndUpdateCounter';

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
