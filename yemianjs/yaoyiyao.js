/**
 * Created by Administrator on 2018/4/11.
 */
(function () {
    function loadingtime() {
        var img=['yaoyiyao/yaoyiyaobg.jpg',"yaoyiyao/yaoyiyao.png",'yaoyiyao/biaoti.png'];
        var i=0,
            count=0,
            len=img.length;
        for(;i<len;i++)
        {
            var img_fs=new Image();
            img_fs.onload=function () {
                count++;
                if(count>=img.length)
                {
                    setTimeout(function () {
                        $(".Tcss_window_windows").css("display","none");
                    },500);
                }
            }

            img_fs.src=img[i];
        }
    }

    loadingtime();
    
    var _datalist=JSON.parse(window.sessionStorage.getItem("shoujiangdata_fs"))
    var SHAKE_THRESHOLD = 800;
    var last_update = 0;
    var x =0,
        y =0,
        z =0,
        last_x=0 ,
        last_y=0 ,
        last_z = 0;
    var startyao=true;
    if (window.DeviceMotionEvent) {

        window.addEventListener('devicemotion', deviceMotionHandler, false);
    } else {
        //alert('摇一摇');
    }

    function deviceMotionHandler(eventData) {
        eventData.preventDefault();
        var acceleration = eventData.accelerationIncludingGravity;
        var curTime = new Date().getTime();
            //alert(curTime - last_update)
        if ((curTime - last_update) > 1000) {
            var diffTime = curTime - last_update;
            last_update = curTime,
            x = acceleration.x;
            y = acceleration.y;
            z = acceleration.z;
            var speed = Math.abs(x + y + z - last_x - last_y - last_z) / diffTime * 100000;
            if (speed > (SHAKE_THRESHOLD+600)) {
                if(navigator.vibrate)
                {
                    navigator.vibrate(1000)

                }
                doResult();
            }
            last_x = x;
            last_y = y;
            last_z = z;
        }
    }

    function doResult() {
        document.getElementById("loading").className = "loading loading-show";
        choujiangcomm();
        window.removeEventListener("devicemotion",deviceMotionHandler,!1);
    }
    
    function choujiangcomm() {
        var data={
            type: 'post',
            httpType: G$.sweetHttp + "imasterkong/integralMall/luckyDraw.do",
            reqData: {
                "appId":params.appId,
                "openId":params.openId,
                "timestamp":+new Date(),
                "signParams":params.signParams,
                "prizeId":_datalist.prizeId
            }
        };
        Mparams(data);

        function sucess(result) {
            //alert(JSON.stringify(result));
           if(result.responseCode=="200")
           {
               var urls="https://qrcrmimg.masterkong.com.cn/crm-images/";

               $(".cpimg>div").css("backgroundImage","url("+urls+result.data.picUrl+")");
               $(".yaoyapimgfs").css("backgroundImage","url("+urls+result.data.picUrl+")");
               $(".fontsucess").html(result.data.prizeName);
               $(".yaoyaottle").html(result.data.prizeName);
               $(".zjtipchanpin").on("click",function () {
                   $(".zjtipchanpin").removeClass('result-show');
                    $(".yaoyaosuceetip").css("display","-webkit-box");
                    $(".yaoyaobtnlingqu").one("click",function () {
                        $(".Tcss_window").css("display","none");
                        result.data.picUrl=urls+result.data.picUrl;
                        var _addressdata=result.data.customerAddressInfo["detailAddress"]?result.data.customerAddressInfo:"wu";
                        if(_addressdata=="wu")
                        {

                        }else {
                            window.sessionStorage.setItem("fsshouhuo",JSON.stringify(_addressdata));
                        }

                        window.sessionStorage.setItem("dyjpdata",JSON.stringify(result.data));
                        window.location.href="shouhuolingqu.html?v="+Math.random();
                    })
               });
               setTimeout(function(){
                   $(".yun").css("display","none");
                   $(".yaoyaotitle").css("display","none");
                   $(".zhongjiangtitile").css("display","block");
                   $(".witheline").css("display","block");
                   $("#shipeiyanse").css("display","none");
                   $("#shipeiyanse1").css("display","block");
                   document.getElementById("loading").className = "loading";
                  // window.addEventListener('devicemotion', deviceMotionHandler, false);
                   $(".zjtipchanpin").addClass('result-show');
                   if(navigator.vibrate)
                   {
                       navigator.vibrate(0)
                   }

               }, 100);
           }else {
               $(".cpimg>div").css("display","none");
               $(".yaoyaottle").html("很遗憾,奖品擦身而过!");
               setTimeout(function(){
                   $(".yun").css("display","none");
                   $(".yaoyaotitle").css("display","none");
                   $(".zhongjiangtitile").css("display","block");
                   $(".witheline").css("display","block");
                   $("#shipeiyanse").css("display","none");
                   $("#shipeiyanse1").css("display","block");
                   document.getElementById("loading").className = "loading";
                  // window.addEventListener('devicemotion', deviceMotionHandler, false);
                   $(".zjtipchanpin").addClass('result-show');
                   if(navigator.vibrate)
                   {
                       navigator.vibrate(0)
                   }
                   // navigator.vibrate(0)
               }, 100);

               $(".zjtipchanpin").on("click",function () {
                   $(".zjtipchanpin").removeClass('result-show');
                   $(".yaoyaoerrortip").css("display","-webkit-box");
                   $(".yaoyaobtnlingqus").on("click",function () {
                        window.location.href="jifenindex.html";
                   })
               })

           }
        }

        function error(er) {
            //alert(JSON.stringify(er));
        }

        G$.ajax(data,sucess,error)
    }

    //choujiangcomm()

})();