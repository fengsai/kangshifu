/**
 * Created by Administrator on 2018/4/16.
 */
(function () {

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
    var input=$("input");
    var time=60;
    var timer=null;

    var yzm_fs="";
    var phone_fs="";

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

        getYzm(args);
        $(".yanzhengma").css("background-color","#000000");
        $(".yanzhengma").html("倒计时...");
        timer=setInterval(function () {
            if(time<=0)
            {
                $(".yanzhengma").css("background-color","#f17280");
                $(".yanzhengma").html("获取验证码")
                $(self).one("click",args);
                time=60;
                yzm_fs="";
                phone_fs="";
                clearInterval(timer);
            }else {
                $(".yanzhengma").css("background-color","#000000");
                $(".yanzhengma").html("倒计时"+time+"s");
                time--;
            }
        },1000);

    });


    function getYzm(callback) {
        var data={
            type: 'post',
            httpType: G$.sweetHttp + "imasterkong/customer/smsVerification.do",
            reqData: {
                "openId":params.openId,
                "appId":params.appId,
                "phoneNum":$(".myphones").val(),
                "timestamp":+new Date()
            }
        }

        Mparams(data);

        function sucess(result) {
            if(result.responseCode=="200")
            {
                //yzm_fs=result.data.verificationCode;
                //phone_fs=result.data.phoneNum;
            }
        }
        
        function error(result) {
            $(".yanzhengma").one("click",callback);
        }


        G$.ajax(data,sucess,error)

    }

    $(".tcbtn").on("click",function () {
        $(".Tcss_window").css("display","none");
    })

    $(".btninfo").on('click',function () {
        var data={
                type: 'post',
                httpType: G$.sweetHttp + "imasterkong/customer/editPhoneNum.do",
                reqData: {
                    "appId":params.appId,
                    "openId":params.openId,
                    "signParams":params.signParams,
                    "phone":$(".myphones").val(),
                    "smsCode":$(".tianxieyzm").val(),
                    "timestamp":+new Date()
                }
            }
        if($(input[0]).val()=="")
        {
            $(".tctip").html("手机号码不能为空");
            $(".Tcss_window").css("display","-webkit-box")
            return;

        }

        if(!myreg.test($(input[0]).val()))
        {
            $(".tctip").html("手机号码不正确");
            $(".Tcss_window").css("display","-webkit-box")
            return;
        }

        // if($(input[0]).val()!=phone_fs)
        // {
        //     $(".tctip").html("手机号码与验证号码不一致");
        //     $(".Tcss_window").css("display","-webkit-box")
        //     return;
        //
        // }

        if($(".tianxieyzm").val()=="")
        {
            $(".tctip").html("验证码不能为空");
            $(".Tcss_window").css("display","-webkit-box")
            return;
        }

        Mparams(data);
        function sucess(result) {
            if(result.responseCode=="200")
            {
                var sjson=JSON.parse(window.sessionStorage.getItem("gerenziliao"));
                sjson.phone=$(".myphones").val();
                window.sessionStorage.setItem("gerenziliao",JSON.stringify(sjson));
                window.location.href="centertab.html?v="+Math.random()
            }else {
                $(".tctip").html(result.responseDesc);
                $(".Tcss_window").css("display","-webkit-box")
                return;
            }
        }

        function error(err) {}

        G$.ajax(data,sucess,error);
    })

})();