
$(document).ready(function () {

    $('.remove-item').click(function(event) {
        var id=$(this).prop('id');
        $('.remove-item-id').val(id);
    });

    $('.remove-item-confirm').click(function(event) {
        var id = $('.remove-item-id').val();
        console.log(id);
        $.ajax({
            type: "GET",
            url: id + "/_delete",
            success: function (result) {
                console.log('SUCCESS CASE result:', result);
                $(".alert-info").fadeTo(1000, 700).slideUp(700, function(){
                    $('#remove-user-modal').modal('hide');
                    $(".alert-info").alert('close');
                });
                // location.reload();
                var rowToDelete = $('#'+id).closest('tr');
                var nextRow = rowToDelete.next();

                nextRow.remove();
                rowToDelete.remove();
            },
            error: function (e) {
                console.log('ERROR CASE result:', e);
                $(".alert-success").fadeTo(1000, 700).slideUp(700, function(){
                    $(".alert-danger").alert('close');
                    $('#remove-user-modal').modal('hide');
                });
            }
        });
    });

    $("#user-form").submit(function (event) {
        event.preventDefault();
        ajaxPost();
    });

    function ajaxPost() {
        var formData = {
            firstName: $("#first-name").val(),
            lastName: $("#last-name").val()
        };

        $.ajax({
            type: "POST",
            contentType: "application/json",
            url: "add-user",
            data: JSON.stringify(formData),
            dataType: 'json',
            success: function (result) {
                console.log('SUCCESS CASE result:', result);
                $(".alert-success").fadeTo(1000, 700).slideUp(700, function(){
                    $(".alert-success").alert('close');
                    $('#add-user-modal').modal('hide');
                });

                $('#table-users > tbody').append(generateRow(result.id, result.firstName, result.lastName));
            },
            error: function (e) {
                console.log('ERROR CASE result:', e);
                $(".alert-success").fadeTo(1000, 700).slideUp(700, function(){
                    $(".alert-danger").alert('close');
                    $('#add-user-modal').modal('hide');
                });
            }
        });

        function generateRow(id, firstName, lastName) {
            return '<tr data-toggle="collapse" data-target="#user-info-collapse"><td>' +
                id + '</td><td>' + firstName + '</td><td>' + lastName + '</td><td>' +
                + '<a href="#" id="rm-btn" role="button" data-toggle="modal" data-target="#remove-user-modal" class="btn btn-danger">Remove</a>'
                +'</td></tr>';
        }

        resetData();

        function resetData() {
            $("#firs-tname").val("");
            $("#last-name").val("");
        }

    }

    function formSuccess() {
        $(".modal").close();
    }

    function toggler(divId) {
        $("#" + divId).toggle();
    }
});