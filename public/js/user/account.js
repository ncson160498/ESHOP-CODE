$(document).ready(function () {
    let userInfoObject = localStorage.getItem('userInfo');

    const userInfo = JSON.parse(userInfoObject);

    $("#accountEmail").val(userInfo.email)
    $("#accountName").val(userInfo.name)

})