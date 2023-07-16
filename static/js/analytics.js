// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-analytics.js";

    $(document).ready(function() {


    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries

    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
        apiKey: "AIzaSyA1TcUpZ_rcx6D91Z543DmU1gFEhC_EwSk",
        authDomain: "uitc-job-request.firebaseapp.com",
        projectId: "uitc-job-request",
        storageBucket: "uitc-job-request.appspot.com",
        messagingSenderId: "527521221659",
        appId: "1:527521221659:web:0420cc258eacc50f0b3cbe",
        measurementId: "G-LFF12XX5NE"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    // * Button listeners for forms
    // @ form.html : after filling up personal info 
    $('#service-selection-btn').click(() => {
        logEvent(analytics, 'form_viewed');
    });

    // @ Confirm-Modal : after filling request info
    $('.service-request-btn').click(() => {
        logEvent(analytics, 'service_requests', {
            // h3 value
            service_name: $('.service-title').text()
        });
    });

    // TODO: PUT HERE OTHER LISTENERS


    

    





});