(function () {

    var _dizhi=JSON.parse(window.sessionStorage.getItem("fsshouhuo"));
    var _shangpin=JSON.parse(window.sessionStorage.getItem("dyjpdata"));

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

    if(_dizhi)
    {
        $(".wudizhi").css("display","none");
        $(".yyyddzz").css("display","-webkit-box");
        $(".dizhiname").html(_dizhi.name);
        $(".dizhipone").html(_dizhi.phone);
        $(".dizhifont2").html((_dizhi.area?_dizhi.area:_dizhi.address)+""+(_dizhi.detailAddress?_dizhi.detailAddress:_dizhi.detailaddress));

    }else {

    }

    if(_shangpin){
        $(".shangpimg > img").attr("src",_shangpin.picUrl);
        $(".shangnan").html(_shangpin.prizeName)
    }

    $(".headdizhi").on("click",function () {
         window.location.href="centertab.html?type=dzi&v="+Math.random();
    })
    
    $(".btnsure").on("click",function () {
        if(!_dizhi)
        {
            tipcaozuo("请选择收货地址",function () {

            });

            return;
        }
        var data={
            type: 'post',
            httpType: G$.sweetHttp + "imasterkong/integralMall/addPrizeAddress.do",
            reqData: {
                "appId":params.appId,
                "openId":params.openId,
                "timestamp":+new Date(),
                "signParams":params.signParams,
                "id":_shangpin.id,
                "prizeSource":_shangpin.prizeSource,
                "prizeType":_shangpin.prizeType,
                "addressId":_dizhi.id
            }
        };

        Mparams(data);

        function sucess(result) {
            if(result.responseCode=="200")
            {
                $(".cpexchange").css("display","-webkit-box");

            }
        }
        function err(er) {
            
        }

        G$.ajax(data,sucess,err);
    })

        $(".bntexcange").on("click",function (e) {
            if(e.target.innerHTML=="再看看")
            {
                $(".cpexchange").css("display","none");

            }else if(e.target.innerHTML=="返回首页")
            {
                if(GetQueryString("fanhu")=="fanh")
                {
                    window.location.href="centerjp.html?v="+Math.random();


                }else {
                    window.location.href="jifenindex.html?v="+Math.random();

                }
            }
        })

})()