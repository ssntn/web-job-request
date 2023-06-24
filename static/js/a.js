$(document).ready(function() {

    // CHECKBOX
    $('.form-check-input').click(function(){

        if (!$(this).is(':checked')) {  
            selected = {};
            return;
        } 
        
        $('.form-check-input').not(this).prop('checked', false);
        selected.value = $(this).val();
        selected.id = $(this).attr('id');
    });

    // DROPDOWN
    $('.dropdown-item').click(function(){
        $('.dropdown-toggle').text($(this).text());
        $('#month-input').val($(this).text());
    });

    $("#modal-button").click(function(){
        $("#service-modal").text("Service: "+$('input[name="service"]:checked').val());
        $("#date-modal").text("Date: "+$("#triggerId").text() +" "+ $("#year").val());
    })

});
