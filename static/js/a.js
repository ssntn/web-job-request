$(document).ready(function() {

    selected = {};
    // CHECKBOX
    $('.form-check-input').click(function(){

        if (!$(this).is(':checked')) {  
            return;
        } 
        
        $('.form-check-input').not(this).prop('checked', false);
        selected.value = $(this).val();
        selected.id = $(this).attr('id');
    });

    // DROPDOWN
    $('#month').on('change', function(){        
        $('#month-input').val($('#month').find(":selected").text());
    });

    $("#modal-button").click(function(){
        $("#service-modal").text("Type: "+$('input[name="service"]:checked').val());
        $("#date-modal").text("Date: "+$('#month').find(":selected").text() +" "+ $("#year").val());
    })

});
