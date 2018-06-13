/**
 * Created by Administrator on 2018/4/8.
 */
(function () {

    var lx=GetQueryString("lx");

    var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/;

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

    var inpys=$('input');

    $(".btninfosub").one("click",function () {
        var args=arguments.callee;
          if($(inpys[0]).val()=="")
          {
                tipcaozuo("姓名不能为空");
              $(".btninfosub").one("click",args);
                return;
          }

          if($(inpys[1]).val()=="")
          {
              tipcaozuo("联系方式不能为空");
              $(".btninfosub").one("click",args);
              return;
          }

          if(!myreg.test($(inpys[1]).val()))
          {
              tipcaozuo("联系方式不正确");
              $(".btninfosub").one("click",args);
              return;
          }

          if($(".txtarea").val()=="")
          {
              tipcaozuo("留言内容不能为空");
              $(".btninfosub").one("click",args);
              return;
          }
        if($(".txtarea").val().length>50)
        {
            tipcaozuo("留言内容超出范围");
            $(".btninfosub").one("click",args);
            return;
        }

        var data={
            type: 'post',
            httpType: G$.sweetHttp + "imasterkong/customer/addMsgLeave.do",
            reqData: {
                "appId":params.appId,
                "openId":params.openId,
                "categoryId":lx,
                "name":$(inpys[0]).val(),
                "phone":$(inpys[1]).val(),
                "detail":$(".txtarea").val(),
                "timestamp":+new Date()
            }
        };

        Mparams(data);
        
        function sucess(result) {
            if(result.responseCode=="200")
            {
                tipcaozuo("留言成功",function () {
                    window.location.href="kefucenter.html";
                })
            }
        }
        
        function error(er) {
            
        }

        G$.ajax(data,sucess,error)

    });



})();