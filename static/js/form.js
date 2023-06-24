$(document).ready(function() {

    var client_data = {
        name: '',
        email: '',
        contact: '',
        service: '',
    }

    // ACCORDION
    $('.accordion-button').click(function() {
        $(this).find('button' ).click();

        var collapsed = !(String($(this).attr('class')).toLowerCase()).includes("collapsed");
        var selected = String($(this).attr('id'));
        
        if(collapsed){
            client_data.service = selected.slice(-1);
            $("#service-form").attr("action", "/form_"+client_data.service);
        }else {
            client_data.service = "";
            $("#service-form").attr("action", "");
        } 
        
        toggle_checks();
    });

    // CHECKBOX
    $("#terms").change(function() {
        toggle_checks();
    });

    
    function toggle_checks(){
        var check = $("#terms").is(":checked") && client_data.service != "";
        console.log(check);
        $("#service-selection-btn").attr('disabled', !check);
    }

});