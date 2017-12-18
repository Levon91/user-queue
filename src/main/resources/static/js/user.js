$(document).ready(function () {

    $('body').on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });

    $('[data-toggle="popover"]').click(function () {
        var id = $(this).prop('id');
        el = $(this);
        console.log(id);
        $.get('user/' + id + '/_info', function (response) {
            console.log(response);
            el.unbind('click').popover({
                content: prepareContent(response),
                title: 'User details',
                html: true,
                delay: {show: 100, hide: 0}
            }).popover('show');
        });
    });

    function prepareContent(data) {
        content = $("#popover_html").html();
        content = content.replace(/p_name/g, data.firstName);
        content = content.replace(/p_surname/g, data.lastName);
        content = content.replace(/p_ahead/g, data.aheadUser);
        return content;
    }

    $('.update-item').click(function (event) {
        var id = $(this).prop('id');
        var firstName = $(event.target).closest('tr').find('#fname a').text();
        var lastName = $(event.target).closest('tr').find('#lname').text();
        $('.update-item-id').val(id);
        $('#update-item-fname').val(firstName);
        $('#update-item-lname').val(lastName);
        console.log('update-id ' + id);
        console.log('update-fname ' + firstName);
        console.log('update-lname ' + lastName);
    });

    $('.update-item-confirm').click(function (event) {

        var formData = {
            id: $(".update-item-id").val(),
            firstName: $("#update-item-fname").val(),
            lastName: $("#update-item-lname").val()
        };
        console.log(id);
        $.ajax({
            type: 'POST',
            url: 'user/_update',
            contentType: 'application/json',
            data:JSON.stringify(formData),
            dataType:'json',

            success: function (result) {
                console.log('SUCCESS CASE result:', result);
                $(".alert-info").fadeTo(1000, 700).slideUp(700, function () {
                    $('#update-user-modal').modal('hide');
                    $(".alert-info").alert('close');
                });

                // $('#table-users').find('> tbody').append(generateRow(result.id, result.firstName, result.lastName));

            },
            error: function (e) {
                console.log('ERROR CASE result:', e);
                $(".alert-success").fadeTo(1000, 700).slideUp(700, function () {
                    $(".alert-danger").alert('close');
                    $('#update-user-modal').modal('hide');
                });
            }
        });
    });

    $('.remove-item').click(function (event) {
        var id = $(this).prop('id');
        $('.remove-item-id').val(id);
    });

    $('.remove-item-confirm').click(function (event) {
        var id = $('.remove-item-id').val();
        console.log(id);
        $.ajax({
            type: 'GET',
            url: 'user/' + id + '/_delete',
            success: function (result) {
                console.log('SUCCESS CASE result:', result);
                $(".alert-info").fadeTo(1000, 700).slideUp(700, function () {
                    $('#remove-user-modal').modal('hide');
                    $(".alert-info").alert('close');
                });
                var rowToDelete = $('#' + id).closest('tr');
                var nextRow = rowToDelete.next();

                nextRow.remove();
                rowToDelete.remove();
            },
            error: function (e) {
                console.log('ERROR CASE result:', e);
                $(".alert-success").fadeTo(1000, 700).slideUp(700, function () {
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
            type: 'POST',
            contentType: 'application/json',
            url: 'user/_add',
            data: JSON.stringify(formData),
            dataType: 'json',
            success: function (result) {
                console.log('SUCCESS CASE result:', result);
                $(".alert-success").fadeTo(1000, 700).slideUp(700, function () {
                    $(".alert-success").alert('close');
                    $('#add-user-modal').modal('hide');
                });

                $('#table-users').find('> tbody').append(generateRow(result.id, result.firstName, result.lastName));
            },
            error: function (e) {
                console.log('ERROR CASE result:', e);
                $(".alert-success").fadeTo(1000, 700).slideUp(700, function () {
                    $(".alert-danger").alert('close');
                    $('#add-user-modal').modal('hide');
                });
            }
        });

        function generateRow(id, firstName, lastName) {
            return '<tr data-toggle="collapse" data-target="#user-info-collapse">'
                + '<td>' + id + '</td>'
                + '<td><a href="#" data-toggle="popover" data-placement="top" id="' + id + '">' + firstName + '</a></td>'
                + '<td>' + lastName + '</td>'
                + '<td>'
                + '<a href="#" id="' + id + '" data-toggle="modal" data-target="#update-user-modal" class="update-item"><span class="glyphicon glyphicon-pencil"></span></a>&nbsp;&nbsp;'
                + '<a href="#" id="' + id + '" data-toggle="modal" data-target="#remove-user-modal" class="remove-item"><span class="glyphicon glyphicon-trash"></span></a>'
                + '</td></tr>';
        }
    }
});