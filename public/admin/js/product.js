$(document).ready(function () {
    $("#editProductAdmin").click(() => {
        const id = $("#exampleInputId").val().toString()
        const nameInput = $("#exampleInputName").val().toString()
        const quanlityInput = $("#exampleInputQuanlity").val().toString()
        const sizeInput = $("#exampleInputSize").val().toString()
        const priceInput = $("#exampleInputPrice").val().toString()
        const categoryInput = $("#categorySelected").val().toString()
        const trademarkInput = $("#trademarkSelected").val().toString()

        $.ajax({
            url: '/admin/product/edit',
            type: 'POST',
            cache: false,
            data: { 
                id: id, 
                name: nameInput, 
                quanlity: quanlityInput, 
                size: sizeInput, 
                price: priceInput,
                category: categoryInput,
                trademark: trademarkInput,
            },
            success: function (data) {
                if (data.Status === 1) {
                    $(location).prop('href', '/admin/product')
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

