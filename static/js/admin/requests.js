$(document).ready(function() {

    // DROPDOWN
    $('.status-filters').click(function(){
        $('#triggerId-status').text($(this).text());
    });

    $('.service-filters').click(function(){
        var ser = $(this).text();
        $('#triggerId-service').text(ser);
        $('#table-body').empty();
        add_rows(ser=ser)
    });

    // MODAL
    // $("#modal-button").click(function(){
    //     $("#service-modal").text("Service: "+$('input[name="service"]:checked').val());
    //     $("#date-modal").text("Date: "+$("#triggerId").text() +" "+ $("#year").val());
    // })

    // UTILS    
    const SERVICE_STATE = {
        REJECTED: 0,
        PENDING: 1,
        ACCEPTED: 2,
        ONGOING: 3,
        COMPLETED: 4
    }
    
    const s_SERVICE_STATE = { 
        'rejected': SERVICE_STATE.REJECTED,
        'pending': SERVICE_STATE.PENDING,
        'accepted': SERVICE_STATE.ACCEPTED,
        'ongoing': SERVICE_STATE.ONGOING,
        'completed': SERVICE_STATE.COMPLETED
    }

    $('.modal').on('hidden.bs.modal', function (e) {
        $('.modal-body').empty();
    });
    
    function get_status (status) {
        if (status === 0) return 'REJECTED';
        else if(status === 1) return 'PENDING';
        else if(status === 2) return 'ACCEPTED';
        else if(status === 3) return 'ONGOING';
        else if(status === 4) return 'COMPLETED';
        else return '';
    }

    // ROW CLICK
    $('#table-body').on('click', '.request-data-row', function() {

        var rowId = $(this).attr('id');
        var modal = $('.modal-body');

        read_request(rowId).then(function(data) {
            if(!data) return;
            id = data.id
            data = data.data;
            
            $('.modal-title').text(data.service.name +" | "+data.service.type);
            var h5 = $('<h5>');
            var p = $('<p class="ps-3">');

            modal.append(h5.clone().text("User Info"));
            modal.append(p.clone().html("<b>Name:</b> "+data.user.name));
            modal.append(p.clone().html("<b>Email:</b> "+data.user.email));
            modal.append(p.clone().html("<b>Contact:</b> "+data.user.contact));
            modal.append(h5.clone().text("Request Info"));

            for(var s in data.service){
                modal.append(p.clone().html("<b>"+s.charAt(0).toUpperCase()+s.slice(1)+"</b>: "+data.service[s]));
            }
            
            modal.append(h5.clone().text("Date"));
            for(var s in data.dates){
                if(data.dates[s] == null) continue;
                modal.append(p.clone().html("<b>"+s.charAt(0).toUpperCase()+s.slice(1)+"</b>: "+data.dates[s]));
            }

            $('#the-actual-modal-button').click();

            $('.modal-btn').click(function(){
                var next_state;

                if(data.state == SERVICE_STATE.PENDING) next_state = SERVICE_STATE.ACCEPTED;
                else if (data.state == SERVICE_STATE.ACCEPTED) next_state = SERVICE_STATE.ONGOING;
                else if (data.state == SERVICE_STATE.ONGOING) next_state = SERVICE_STATE.COMPLETED;

                if($(this).attr('value') === 'accept') update_request(data.id, next_state);
                else update_request(data.id, SERVICE_STATE.REJECTED);
            })
        });
    });

    // Server side
    function add_rows(state_filter = null, service_filter = null) {
        read_request(id = null, state_filter, service_filter).then(data => {
            if (data != null) {
                JSON.parse(data).forEach(element => {
                    if (service_filter != null && service_filter != element.service_filter) return;
                    if (state_filter != null && state_filter != element.data);

                    var row = $('<tr></tr>');
                    row.attr('id', element.id);
                    row.attr('class', 'request-data-row');
                    row.append($('<td></td>').text(element.data.user.name));
                    row.append($('<td></td>').text(element.data.service.name));
                    row.append($('<td></td>').text(element.data.dates.requested));
                    row.append($('<td></td>').text(get_status(element.data.state)));
                    $("#table-body").append(row);
                });

            } else if(data == null){
                var row = $('<tr></tr>');
                row.append($('<td colspan="3">').text("No data"));
                $("#table-body").append(row);
            }
        });
    }
    
    function update_request(id, status = SERVICE_STATE.ACCEPTED, oic = null){
        data = {'id': id, 'state': status, 'oic': oic}
        $.ajax({         

            type: 'POST', 
            url: '/update_request/',
            data: JSON.stringify(data),
            contentType: 'application/json', 

            success: (response) => {
                alert(response);

            }, error: (xhr, status, error) => {
                alert(error);
        
        }});  
    }

    read_request = (id = null, state_filter = null, service_filter = null) => {
        return new Promise((resolve, reject) => {
            fetch(`/fetch_request?id=${id}&state_filter=${state_filter}&service_filter=${service_filter}`, {
                method: 'GET'
            })
              .then((response) => {
                return response.json();

            }).then((data) => {                
                // id filter
                if (id) {
                    var foundData = data.find(element => { return element.id === id; });
                    resolve(foundData || null);
                    
                } 
                //   NO ID
                else resolve(JSON.stringify(data) || null);
                

            }).catch((error) => {
                reject(error);
        });})

    }

    add_rows();
});
