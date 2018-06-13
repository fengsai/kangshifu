/**
 * Created by qibao on 2018/6/4.
 */
;(function () {
    function tipcaozuo(txt,callback) {
        tipcaozuo.time=30;
        clearInterval(tipcaozuo.timer);
        $(".tipyincang").html(txt);
        $(".tipyincang").css('display',"block");

        tipcaozuo.timer=setInterval(function () {
            if(tipcaozuo.time>0)
            {
                //  console.log(tipcaozuo.time)
            }else{
                $(".tipyincang").css('display',"none");
                tipcaozuo.time=30;
                clearInterval(tipcaozuo.timer);
                if(callback)
                {
                    callback()
                }
                return;
            }
            tipcaozuo.time--;

        },30);
    }
    $(".querenbtn").on("click",function () {
        if($(".inputkon>input").val()=="")
        {
            tipcaozuo("串码不能为空");
            return;
        }

        window.location.href=""+$(".inputkon>input").val()
    })
    
})();