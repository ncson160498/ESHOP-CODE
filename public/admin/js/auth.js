$(document).ready(function () {
    $("#registerUserForm").submit(() => {

        const emailInput = $("#registerEmail").val().toString()
        const nameInput = $("#registerName").val().toString()
        const passwordInput = $("#registerPass").val().toString()
        $.ajax({
            url: 'auth/register',
            type: 'POST',
            cache: false,
            data: { email: emailInput, username: nameInput, password: passwordInput },
            success: function (data) {
                if (data.Status === 1) {
                    alert("Tạo mới tài khoản thành công")
                    location.reload()
                }
            }
            , error: function (jqXHR, textStatus, err) {
                alert('that bai')
            }
        })
    })

    $("#loginAdminForm").submit(() => {
        const emailInput = $("#loginInputEmail").val().toString()
        const passwordInput = $("#loginInputPassword").val().toString()

        $.ajax({
            url: '/admin/login',
            type: 'POST',
            cache: false,
            data: { email: emailInput, password: passwordInput },
            success: function (data) {
                if (data.Status === 1 && data.data.admin === 1) {
                    isSuccessLogin = true
                    localStorage.setItem("login", true)
                    localStorage.setItem('userInfo', JSON.stringify(data.data));
                    $(location).prop('href', '/admin')
                }
                else if (data.Status === 1 && data.data.admin === 0) {
                    alert("Không phải tài khoản admin")
                }
                else {
                    alert(data.Message)
                }
            }
            , error: function (jqXHR, textStatus, err) {
                alert('that bai')
            }
        })
    })
})
