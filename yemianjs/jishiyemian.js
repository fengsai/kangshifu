/**
 * Created by Administrator on 2018/4/28.
 */
(function () {
    var time=null;
    var data={
        type: 'post',
        httpType: G$.sweetHttp + "imasterkong/customer/getCustomerInfo.do",
        reqData: {
            "appId":params.appId,
            "openId":params.openId,
            "timestamp":+new Date()
        }
    };

    Mparams(data);

    function sucess(result) {
        if(result.responseCode=="200")
        {
            var _result=result.data;
            $(".viphao").html("No.  "+ _result.userNo);
            $(".vipdata").html(_result.createDate);

            time=setTimeout(function () {
                window.location.href="jpmiaoshu.html?v="+Math.random();
            },2000);

        }
    }

    function error() {

    }

    G$.ajax(data,sucess,error);

})()