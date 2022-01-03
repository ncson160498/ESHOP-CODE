var isSuccessLogin = false

$(document).ready(function () {
    let userInfoObject = localStorage.getItem('userInfo');
    const userInfo = JSON.parse(userInfoObject);

    let name = userInfo.name

    $("#authorAdminLogin").val(name)
})