$(document).ready(function () {
    $("#registerUserForm").submit(() => {

        const emailInput = $("#registerEmail").val().toString()
        const nameInput = $("#registerName").val().toString()
        const phoneInput = $("#registerPhone").val().toString()
        const addressInput = $("#registerAddress").val().toString()
        const passwordInput = $("#registerPass").val().toString() 
        const passwordReInput = $("#registerReInputPass").val().toString() 

        if(passwordInput == passwordReInput){
            $.ajax({
                url: 'auth/register',
                type: 'POST',
                cache: false,
                data: { 
                    email: emailInput, 
                    phone: phoneInput,
                    username: nameInput, 
                    address: addressInput,
                    password: passwordInput, 
                },
                success: function (data) {
                    if (data.Status === 1) {
                        alert(data.Message)
                        location.reload()
                    }
                    else if(data.Status === 0) {
                        alert(data.Message)
                        location.reload()
                    }
                    else{
                        alert(data.Message)
                        return
                    }
                }
                , error: function (jqXHR, textStatus, err) {
                    alert('Không thành công')
                }
            })

        }else{
            alert("Mật Khẩu Nhập Lại Không Giống Nhau!")
        }

    })

    $("#loginUserForm").submit(() => {
        const emailInput = $("#loginEmail").val().toString()
        const passwordInput = $("#loginPass").val().toString()
        $.ajax({
            url: 'auth/login',
            type: 'POST',
            cache: false,
            data: { email: emailInput, password: passwordInput },
            success: function (data) {
                if (data.Status === 1) {
                    isSuccessLogin = true
                    localStorage.setItem("login", true)
                    localStorage.setItem('userInfo', JSON.stringify(data.data));
                    $(location).prop('href', '/')
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
