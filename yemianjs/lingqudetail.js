/**
 * Created by Administrator on 2018/4/14.
 */
;(function () {
    var urls="https://qrcrmimg.masterkong.com.cn/crm-images/";

    var _listdata=JSON.parse(window.sessionStorage.getItem("yljpdatas"));

    $(".lquname").html(''+_listdata.customerAddressInfo.name+'<span class="add_fs" style="padding-left: 0.5rem;">'+_listdata.customerAddressInfo.phone+'</span>');

    $(".yladdress").html(_listdata.customerAddressInfo.area+""+_listdata.customerAddressInfo.detailAddress);

    $(".myjpimg").css("backgroundImage","url("+_listdata.picUrl+")");

    var jplayuan=_listdata.prizeSource==1?"扫码":_listdata.prizeSource==2?"兑奖":_listdata.prizeSource==3?"抽奖":"";

    $(".chanpname").html(_listdata.prizeName);

    $('.fangshijifen').html(''+jplayuan+':<span style="padding-left: 0.375rem;" class="add_fs">'+_listdata.prizePrice+'</span>积分');

    $(".fsss_fangshi").html(jplayuan);

    $(".fss_bianhao").html(_listdata.id);

    $(".timebianhao").html(''+jplayuan+'时间:<span class="add_fs">'+_listdata.createDate+'</span>');
    $(".kuaigongsi").html(_listdata.express?_listdata.express:"暂无");
    $(".kuaididanhao").html(_listdata.expressNo?_listdata.expressNo:"暂无");


})();