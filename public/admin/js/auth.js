$(document).ready(function () {
    $("#register_Admin").click(() => {
        const emailInput = $("#exampleInputEmail").val().toString()
        const nameInput1 = $("#exampleFirstName").val().toString()
        const nameInput2 = $("#exampleLastName").val().toString()
        const name = nameInput1 + nameInput2;
        const passwordInput = $("#exampleInputPassword").val().toString()
        const repasswordInput = $("#exampleRepeatPassword").val().toString()
        const phoneInput = $("#exampleInputPhone").val().toString()
        const addressInput = $("#exampleInputAddress").val().toString()
        if(passwordInput == repasswordInput){
            $.ajax({
                url: '/adminauth/register',
                type: 'POST',
                cache: false,
                data: { 
                    email: emailInput, 
                    phone: phoneInput,
                    address: addressInput, 
                    username: name, 
                    password: passwordInput 
                },
                success: function (data) {
                    if (data.Status === 1) {
                        alert("Tạo mới tài khoản thành công")
                        // location.reload()
                        $(location).prop('href', '/admin/login')
                    }
                    else
                    {
                        alert(data.Message)
                        return
                    }
                }
                , error: function (jqXHR, textStatus, err) {
                    alert('that bai')
                }
            })

        }else{
            alert("Mật khẩu không giống nhau!")
        }
    })

    $("#login_Admin").click(() => {
        
        const emailInput = $("#loginInputEmail").val().toString()
        const passwordInput = $("#loginInputPassword").val().toString()

        $.ajax({
            url: '/adminauth/login',
            type: 'POST',
            cache: false,
            data: { email: emailInput, password: passwordInput },
            success: function (data) {               
                if (data.Status === 1) {
                    isSuccessLogin = true
                    localStorage.setItem("login", true)
                    localStorage.setItem('userInfo', JSON.stringify(data.data));
                    $(location).prop('href', '/admin')
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
