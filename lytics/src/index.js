import axios from 'axios'; 

const Analytics = (() => {
    const apiUrl = "http://localhost:3000/events"; 

    const sendEvent = async ( event ) => {
        try {
            await axios.post(apiUrl, event); 
        } catch ( error ){
            console.error("error sending event:", error); 
        }
    }


const trackEvent  = ( eventType, eventData ) => {
    const event = {
        type: eventType, 
        data: eventData, 
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent, 
        url: window.location.href
    }; 
    sendEvent(event); 
    }; 


    return { trackEvent }; 

})(); 




export default Analytics; 