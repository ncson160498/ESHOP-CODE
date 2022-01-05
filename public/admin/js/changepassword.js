$(document).ready(function () {
    $("#changePassAccountAdmin").click(() => {
        const id = $("#exampleInputId").val().toString()
        const oldPassInput = $("#exampleInputOldPass").val().toString()
        const newPassInput = $("#exampleInputNewPass").val().toString()
        const reNewPassInput = $("#exampleInputRenewPass").val().toString()

        if(oldPassInput == ''){
            alert('Vui Lòng Nhập PassWord Cũ!')
        }
        else if(newPassInput == ''){
            alert('Vui Lòng Nhập PassWord Mới!')
        }
        else if(newPassInput != reNewPassInput){
            alert('Nhập lại mật khẩu không đúng!')
        }
        else {
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
                        alert(data.Message)
                        $(location).prop('href', '/admin/account')
                        return
                    }
                    else {
                        alert(data.Message)
                    }
                }
                , error: function (jqXHR, textStatus, err) {
                    alert('Không thành công!')
                }
            })
        }

    })
})

