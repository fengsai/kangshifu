/**
 * Created by qibao on 2018/5/2.
 */
(function () {

    var map, geolocation;
    //加载地图，调用浏览器定位服务
    map = new AMap.Map('container', {
        resizeEnable: true
    });

    function onComplete(data) {

        index(data.position.lat,data.position.lng,data.addressComponent.adcode);
    }
    //解析定位错误信息
    function onError(data) {
        wx.closeWindow();
    }

    map.plugin('AMap.Geolocation', function() {
        geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,
            timeout: 10000,
            buttonOffset: new AMap.Pixel(10, 20),
            zoomToAccuracy: true,
            buttonPosition:'RB'
        });
        map.addControl(geolocation);
        geolocation.getCurrentPosition();
        AMap.event.addListener(geolocation, 'complete', onComplete);
        AMap.event.addListener(geolocation, 'error', onError);
    });
    
    
    function index(lat,lng,adcode) {
        var data={
            type: 'post',
            httpType: G$.sweetHttp + "imasterkong/info/interactive.do",
            reqData: {
                openId:params.openId,
                appId:params.appId,
                areaId:adcode,
                lng:lng,
                lat:lat,
                "timestamp":+new Date()
            }
        };
        Mparams(data);

        function sucess(result) {
            if(result.responseCode=="200")
            {
                window.location.href=result.data.url;
            }else {
                $(".tc_fsfs>div.bxf1").html(result.responseDesc)
                $(".Tcss_window").css("display","-webkit-box");
            }
        }

        function error(e) {

        }

        G$.ajax(data,sucess,error);
    }

    $(".btncs").on("click",function () {
        wx.closeWindow();
    })

})();