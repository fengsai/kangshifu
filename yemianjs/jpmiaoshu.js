/**
 * Created by Administrator on 2018/4/28.
 */
(function () {
    var listcash="";
    var html="";
    try {
        var listcash=JSON.parse(window.sessionStorage.getItem("listxtcash"));

        var len=listcash.length,
            i=0;

        for(;i<len;i++)
        {
            if(i==0)
            {
                html+='<div style="height:0.703125rem;"></div>';
            }
            html+='<div class="err1">恭喜你</div>';
            html+='<div class="err2" style="font-weight: bold;color: #eb122c;">'+listcash[i].text+'</div>';
            html+='<div style="height:0.703125rem;"></div>';
        }
        html+='<div style="height: 0.5625rem;text-align: center;font-size: 91.66666666666667%;color: #9e9e9e;">你已获得以上奖品，请点击“立即查看”到个人中心查看</div>';
        html+='<div style="height:3rem; "></div>';
    }catch (e)
    {
        html+='<div class="borboxsize" style="font-size: 125%;color: #b0b0b0;text-align: center;padding:3rem 1rem 0 1rem">'+window.sessionStorage.getItem("listxtcash")+'</div>';
    }

    $(".iscsss").html(html);
    $(".errbtn").on("click",function () {
        location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxbc62fa25ed57388b&redirect_uri=http://qrcrm.masterkong.com.cn/imasterkong/wx/myzoom&response_type=code&scope=snsapi_base&state=&component_appid=wx056c9a6dec938abc#wechat_redirect";
    })
})()