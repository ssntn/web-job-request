$(document).ready(function() {
   
    
    var client_data = {
        name: '',
        email: '',
        contact: '',
        service: '',
        
    }    

    $("#back-btn").click(function(e){
        e.preventDefault();
        window.history.back();
    });

    $("#next-btn").click(function(){
        if (client_data.service === null ){
            return;
        }
        
    });


});