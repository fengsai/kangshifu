/**
 * Created by Administrator on 2018/4/28.
 */
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
        check.yanzhengma(args);
        $(".yanzhengma").css("background-color","#000000");
        $(".yanzhengma").html("倒计时...");
        timer=setInterval(function () {
            if(time<=0)
            {
                $(".yanzhengma").css("background-color","#f17280");
                $(".yanzhengma").html("获取验证码")
                $(self).one("click",args);
                time=60;
                check.yzhengma="";
                check.phoneNum="";
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


    function IndexCheck() {
        this.datalist=[
            {
                type: 'post',
                httpType: G$.sweetHttp + "imasterkong/customer/isSubmit.do",
                reqData: {
                    "appId":params.appId,
                    "openId":params.openId,
                    "timestamp":""
                }
            },

            {
                type: 'post',
                httpType: G$.sweetHttp + "imasterkong/customer/submitCustomerInfo.do",
                reqData: {
                    "appId":params.appId,
                    "openId":params.openId,
                    "signParams":params.signParams,
                    "phone":$(".myphones").val(),
                    "timestamp":+new Date()
                }
            },

            {
                type: 'post',
                httpType: G$.sweetHttp + "imasterkong/customer/smsVerification.do",
                reqData: {
                    "openId":params.openId,
                    "appId":params.appId,
                    "phoneNum":$(".myphones").val(),
                    "timestamp":""
                }
            }


        ]
    }

    IndexCheck.prototype={
        datatime:function (index) {
            this.datalist[index].reqData.timestamp =+new Date();
        },
        yzhengma:"",
        phoneNum:"",
        singn:function (data) {
            if(data.reqData["sign"])
            {
                delete data.reqData["sign"];
            }
            Mparams(data);
        },
        yanzhengma:function (callback) {
            this.datatime(2);
            this.datalist[2].reqData.phoneNum=$(".myphones").val();
            this.singn(this.datalist[2]);
            var self=this;
            function sucess(result) {
                if(result.responseCode=="200")
                {
                   // self.yzhengma=result.data.verificationCode;
                   // self.phoneNum=result.data.phoneNum;
                }

            }

            function error(err) {

            }

            G$.ajax(this.datalist[2],sucess,error)
        },
        check:function () {
            this.datatime(0);
            this.singn(this.datalist[0]);
            var self=this;
            function sucess(result) {
                if(result.responseCode=="200")
                {
                    if(result.data==1)
                    {
                        laoyonghu();

                    }else {
                        self.bindEvent(".btninfo",self.zhuce.bind(self));
                    }
                }
            }

            function error(err) {}

            G$.ajax(this.datalist[0],sucess,error);


        },
        zhuce:function () {
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

            // if($(input[0]).val()!=this.phoneNum)
            // {
            //     $(".tctip").html("手机号码与验证码手机不匹配");
            //     $(".Tcss_window").css("display","-webkit-box")
            //     return;
            // }

            if($(".tianxieyzm").val()=="")
            {
                $(".tctip").html("验证码不能为空");
                $(".Tcss_window").css("display","-webkit-box")
                return;
            }
            this.datatime(1);
            this.datalist[1].reqData.phone=$(".myphones").val();
            this.datalist[1].reqData.smsCode=$(".tianxieyzm").val();
            this.singn(this.datalist[1]);

            function sucess(result) {
                if(result.responseCode=="200")
                {
                    window.location.href="jishiyemian.html?v="+Math.random();
                    window.sessionStorage.setItem("listxtcash",JSON.stringify(result.data))
                }else {
                    $(".tctip").html(result.responseDesc);
                    $(".Tcss_window").css("display","-webkit-box")
                    return;
                }
            }

            function error(err) {}

            G$.ajax(this.datalist[1],sucess,error);
        },
        bindEvent:function (el,callback) {
            $(el).on("click",function () {
                callback()
            })
        }

    }

    var check=new IndexCheck();

    check.check();

    function laoyonghu() {
        var data={
            type: 'post',
            httpType: G$.sweetHttp + "imasterkong/customer/drawPrize.do",
            reqData: {
                "appId":params.appId,
                "openId":params.openId,
                "signParams":params.signParams,
                "timestamp":+new Date()
            }
        }

        Mparams(data);

        function sucess(result) {
            if(result.responseCode=="200")
            {
               // window.location.href="jpmiaoshu.html?v="+Math.random();
                window.sessionStorage.setItem("listxtcash",JSON.stringify(result.data))
            }else {
               // window.location.href="jpmiaoshu.html?v="+Math.random();
                window.sessionStorage.setItem("listxtcash",result.responseDesc);
               // location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx90e3e0d858d34114&redirect_uri=http://test.sweetmartcn.com/imasterkong/wx/myzoom&response_type=code&scope=snsapi_base&state=&component_appid=wxdd11004590dde614#wechat_redirect";
            }

            window.location.href="jpmiaoshu.html?v="+Math.random();
        }
        
        function error(e) {
            
        }

        G$.ajax(data,sucess,error);
    }

})();