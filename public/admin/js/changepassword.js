$(document).ready(function () {
    $("#changePassAccountAdmin").click(() => {
        const id = $("#exampleInputId").val().toString()
        const oldPassInput = $("#exampleInputOldPass").val().toString()
        const newPassInput = $("#exampleInputNewPass").val().toString()
        const reNewPassInput = $("#exampleInputRenewPass").val().toString()

        if(newPassInput == reNewPassInput){
            $.ajax({
                url: '/admin/changepassword',
                type: 'POST',
                cache: false,
                data: { 
                    id: id, 
                    oldpass: oldPassInput, 
                    newpass: newPassInput,     
                },
                success: function (data) {
                    if (data.Status === 1) {
                        $(location).prop('href', '/admin/account')
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
        }else{
            alert('Nhập lại mật khẩu không đúng!')
        }

    })
})

