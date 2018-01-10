!function(){
    // $.ajax({
    //     url: '138.128.192.220:9000',
    //     data: {message: `$m.rint(1,3)`},
    //     success: (data) => {
    //         console.log(data)
    //     }
    // })
    // setTimeout(function() {
        // $('.li-content').addClass('active')
    // }, 1000);
    $(window).scroll(()=>{
        var me = window.scrollY + window.innerHeight;
        console.log(me)
        $('.li-content').each(function(i, e){
            if(e.offsetTop > me) {
                console.log(this)
                $(this).addClass('active')
            }
        })
    })
}()