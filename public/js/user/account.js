$(document).ready(function () {
    let userInfoObject = localStorage.getItem('userInfo');

    const userInfo = JSON.parse(userInfoObject);

    $("#accountEmail").val(userInfo.email)
    $("#accountName").val(userInfo.name)
    $("#accountPhone").val(userInfo.phone)
    $("#accountAddress").val(userInfo.address)


    $("#buttonEditInforUser").click(() => {
        const emailInput = $("#accountEmail").val().toString()
        const nameInput = $("#accountName").val().toString()
        const phoneInput = $("#accountPhone").val().toString()
        const addressInput = $("#accountAddress").val().toString()

        $.ajax({
            url: '/account',
            type: 'POST',
            cache: false,
            data: { id: userInfo.id, email: emailInput, name: nameInput, phone: phoneInput, address: addressInput},
            success: function (data) {
                if (data.Status === 1) {
                    isSuccessLogin = true
                    localStorage.setItem("login", true)
                    localStorage.setItem('userInfo', JSON.stringify(data.data[0]));
                    //$(location).prop('href', '/account')
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

