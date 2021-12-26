var isSuccessLogin = false

$(document).ready(function () {
    let userInfoObject = localStorage.getItem('userInfo');
    const userInfo = JSON.parse(userInfoObject);

    $("#authorAdminLogin").val(userInfo.name)
})