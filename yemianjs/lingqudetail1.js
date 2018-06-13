/**
 * Created by qibao on 2018/6/4.
 */
/**
 * Created by Administrator on 2018/4/14.
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
    var urls="https://qrcrmimg.masterkong.com.cn/crm-images/";

    var _listdata=JSON.parse(window.sessionStorage.getItem("yljpdatas"))?JSON.parse(window.sessionStorage.getItem("yljpdatas")):{};

    //$(".lquname").html(''+_listdata.customerAddressInfo.name+'<span class="add_fs" style="padding-left: 0.5rem;">'+_listdata.customerAddressInfo.phone+'</span>');

   // $(".yladdress").html(_listdata.customerAddressInfo.area+""+_listdata.customerAddressInfo.detailAddress);

   $(".myjpimg").css("backgroundImage","url("+_listdata.picUrl+")");

    var jplayuan=_listdata.prizeSource==1?"扫码":_listdata.prizeSource==2?"兑奖":_listdata.prizeSource==3?"抽奖":"";

    $(".chanpname").html(_listdata.prizeName);

    $('.fangshijifen').html(''+jplayuan+':<span style="padding-left: 0.375rem;" class="add_fs">'+_listdata.prizePrice+'</span>积分');

    $(".fsss_fangshi").html(jplayuan);

    $(".fss_bianhao").html(_listdata.id);

    $(".timebianhao").html(''+jplayuan+'时间:<span class="add_fs">'+_listdata.createDate+'</span>')
     quanzhuanma(_listdata.couponsCode)
    $(".xiaohaojif").html("注: 已消耗"+_listdata.prizePrice+"积分");

    function quanzhuanma(s) {
        var data={
            type: 'post',
            httpType: G$.sweetHttp + "imasterkong/integralMall/getCouponsCode.do",
            reqData: {
                "appId":params.appId,
                "openId":params.openId,
                "timestamp":+new Date(),
                "couponsCode":s,
                "signParams":params.signParams
            }
        };
        Mparams(data);

        function sucess(result) {
            if(result.responseCode=="200")
            {
                $('#fuzhis').attr("data-clipboard-text",result.data);
                $(".fuzhidata").html(result.data);
                //$(".fuzhibtn").on("click",function () {
                var btn = document.getElementById('fuzhis');
                var clipboard = new Clipboard(btn);
                clipboard.on('success', function(e) {
                    tipcaozuo("复制成功",function () {

                    })
                });

                clipboard.on('error', function(e) {
                    tipcaozuo("复制失败",function () {

                    })
                });
            }
        }

        function error(er) {

        }

        G$.ajax(data,sucess,error);
    }
})();