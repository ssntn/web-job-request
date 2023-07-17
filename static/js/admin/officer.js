$(document).ready(() => {

    
    $("#save").click(() => {
        var checkedCheckboxes = $('.form-check-input:checked')
        var values = [];
        var labels = [];

        checkedCheckboxes.each(function() {
          values.push($(this).val().trim());
          labels.push($(this).next("label").text().trim());
        });

        var name = $('#name').val();
        var email = $('#email').val();

        $.ajax({
            type: "POST",
            url: "/create_admin",
            data: JSON.stringify({ roles: values, email: email, name: name }),
            contentType: "application/json; charset=utf-8",

            success: (response) => {
                alert('TAKE NOTE OF THIS PASSWORD: '+response);

            },error: (xhr, status, error) => {
                alert(error);

            }

        });
    });

});