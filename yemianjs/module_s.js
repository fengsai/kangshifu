
/**
 * Created by Administrator on 2018/4/8.
 */
(function () {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
    var input=$("input");
    var time=60;
    var timer=null;

    $(".yanzhengma").one("click",function () {
        clearInterval(timer);
        var self=this;
        var args=arguments.callee;
        if($(input[0]).val()=="")
        {
            $(".tctip").html("手机号码不能为空");
            $(".Tcss_window").css("display","-webkit-box")
            $(this).one("click",args);
            return;

        }

        if(!myreg.test($(input[0]).val()))
        {
            $(".tctip").html("手机号码不正确");
            $(".Tcss_window").css("display","-webkit-box")
            $(this).one("click",args);
            return;
        }
        check.yanzhengma(function () {
            $(".yanzhengma").css("background-color","#f17280");
            $(".yanzhengma").html("获取验证码")
            $(self).one("click",args);
            time=60;
           // check.yzhengma="";
           // check.phoneNum="";
            clearInterval(timer);
        });
        $(".yanzhengma").css("background-color","#000000");
        $(".yanzhengma").html("倒计时...");
        timer=setInterval(function () {
            if(time<=0)
            {
                $(".yanzhengma").css("background-color","#f17280");
                $(".yanzhengma").html("获取验证码")
                $(self).one("click",args);
                time=60;
                //check.yzhengma="";
               // check.phoneNum="";
                clearInterval(timer);
            }else {
                $(".yanzhengma").css("background-color","#000000");
                $(".yanzhengma").html("倒计时"+time+"s");
                time--;
            }
        },1000);

    });

    $(".tcbtn").on("click",function () {
        $(".Tcss_window").css("display","none");
    })

})();