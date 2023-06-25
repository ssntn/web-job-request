$(document).ready(function() {
    // DROPDOWN
    $('.status-filters').click(function(){
        $('#triggerId-status').text($(this).text());
    });
    
    $('.service-filters').click(function(){
        $('#triggerId-service').text($(this).text());
    });

    $("#modal-button").click(function(){
        $("#service-modal").text("Service: "+$('input[name="service"]:checked').val());
        $("#date-modal").text("Date: "+$("#triggerId").text() +" "+ $("#year").val());
    })

});
