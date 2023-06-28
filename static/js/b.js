$(document).ready(function() {

    $('.form-select').change(function(){ 
        if($(this).attr('id')!='Temporary')
            $('#temporary').remove();
    });

    $("#modal-button").click(function(){
        // $("#service-modal").text("Type: "+$('input[name="service"]:checked').val());
        // $("#date-modal").text("Date: "+$("#triggerId").text() +" "+ $("#year").val());

        var serv = $('input[name="service-type"]:checked');
        var at = $('input[name="account-type"]:checked');
        var a = $('input[name="account"]:checked');
        var d = $('select[name="department"] option:selected');
        var date = new Date($('#birthday').val());
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var bday = [month, day, year].join('/');
        
        var data = {
            serv : {
                value: at.val(),
                label: $('label[for="' + serv.attr('id') + '"]').text().trim()
            },
            ent : {
                value: $('input[name="account-type"]:checked').val(),
                label: $('label[for="' + at.attr('id') + '"]').text().trim()
            },
            acct : {
                value: $('input[name="account"]:checked').val(),
                label: $('label[for="' + a.attr('id') + '"]').text().trim()
            },
            dept : {
                value: d.val(),
                label: d.text().trim()
            },
            bday : bday
        };
        
        const def = 'Not yet selected'
        var m_serv = $('#serv-modal');
        var m_ent = $('#type-modal');
        var m_acct = $('#site-modal');
        var m_dept = $('#dept-modal');
        var m_bday = $('#date-modal');
        
        m_serv.text(m_serv.text().replace(def, data.serv.label))
        m_ent.text(m_ent.text().replace(def, data.ent.label))
        m_acct.text(m_acct.text().replace(def, data.acct.label))
        m_dept.text(m_dept.text().replace(def, data.dept.label))
        m_bday.text(m_bday.text().replace(def, data.bday))

        var jsonData = JSON.stringify(data);
        // alert(jsonData); 
    });
});
