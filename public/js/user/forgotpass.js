$(document).ready(function () {

    $("#resetPasswordUser").on("click", function () {   
        const emailInput = $("#exampleInputEmail").val().toString()

        if(emailInput == ''){
            alert('Vui Lòng Nhập Email!')
        }
        else if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).test(emailInput)){
            alert('Vui Lòng Nhập Đúng Dạng Email!')
        }
        else{
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
        }
    })
})

