!function(){
    $.ajax({
        url: '138.128.192.220:9000',
        data: {message: `$m.rint(1,3)`},
        success: (data) => {
            console.log(data)
        }
    })
}()