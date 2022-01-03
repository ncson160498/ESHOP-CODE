$(document).ready(function () {

    $("#resetPasswordUser").on("click", function () {   
        const emailInput = $("#exampleInputEmail").val().toString()

        $.ajax({
            url: '/forgotpassword',
            type: 'POST',
            cache: false,
            data: { 
                email: emailInput,
            },
            success: function (data) {
                if (data.Status === 1) {
                    alert(data.Message)
                    $(location).prop('href', '/login')
                    return
                }
                else {
                    alert(data.Message)
                }
            }
            , error: function (jqXHR, textStatus, err) {
                alert('Không thành công')
            }
        }) 
    })
})

