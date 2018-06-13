(function (w) {
    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;
    var input=document.getElementsByTagName("input");
    //main 模块控制
    function jsloading(src,id) {
        var script=document.createElement("script");
        script.type="text/javascript";
        script.src=src+"?v="+version;
        script.id=id;
        $(document.body).append(script)
    }
    // jsloading("yemianjs/center.js")
    //jsloading("yemianjs/addphone.js")

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
        yanzhengma:function (callback,timer) {
            this.datatime(2);
            this.datalist[2].reqData.phoneNum=$(".myphones").val();
            this.singn(this.datalist[2]);
            var self=this;
            function sucess(result) {
                if(result.responseCode=="200")
                {
                    //self.yzhengma=result.data.verificationCode;
                    //self.phoneNum=result.data.phoneNum;
                }else {
                    if(callback)
                    {
                      callback()
                    }
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
                       // window.location.href="center.html?v="+Math.random();
                        $(".container").html($("#centerIndex").html());
                        jsloading("yemianjs/center.js")

                    }else {
                        $(".container").html($("#main").html());
                        jsloading("yemianjs/module_s.js","fsfsphone");
                        console.log(self)
                        self.bindEvent(".btninfo",self.zhuce.bind(self));
                    }
                }
            }

            function error(err) {}

            G$.ajax(this.datalist[0],sucess,error);


        },
        zhuce:function (e) {
            console.log(input)
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
                $(".tctip").html("验证码能为空");
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
                    $(".container").html("");
                    $(document.body)[0].removeChild($("#fsfsphone")[0]);
                    $(".container").html($("#centerIndex").html());
                    jsloading("yemianjs/center.js")
                }else {
                    $(".tctip").html(result.responseDesc);
                    $(".Tcss_window").css("display","-webkit-box");
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

     w.check=new IndexCheck();

    w.check.check();
})(window)