/**
 * Created by Administrator on 2018/4/2.
 */

(function () {

    document.addEventListener('touchmove', function (e) {
        e.preventDefault();
        e.stopPropagation()
    }, false);
    document.body.addEventListener('touchmove', function (e) {
        e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
    }, {passive: false}); //passive 参数不能省略，用来兼容ios和android


    function indexCenter() {
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
                  $(".fs-jf").html(_result.totalScore);
                  $(".fs-zc").html(_result.totalBills);
                  $(".fs-jx").html(_result.totalRecord);
                  $(".viphao").html("No.  "+ _result.userNo);
                  $(".vipdata").html(_result.createDate);
                  if(!_result.age)
                  {
                      window.sessionStorage.setItem("gerenziliao",JSON.stringify({
                          gender:"first",
                          haveChildren:"first",
                          phone:_result.phone,
                          position:"first",
                          age:"first"
                      }));
                  }else {
                      window.sessionStorage.setItem("gerenziliao",JSON.stringify({
                          gender:_result.gender,
                          haveChildren:_result.haveChildren,
                          phone:_result.phone,
                          position:_result.position,
                          age:_result.age
                      }));
                  }


                  window.sessionStorage.setItem("xiaodianinfo",JSON.stringify({
                      "isFirstStore": _result.isFirstStore,
                      "firstStoreScore": _result.firstStoreScore
                  }));

                  window.sessionStorage.setItem("setphone",_result.phone);
              }
          }
        
        function error(er) {
            
        }

        G$.ajax(data,sucess,error);
    }

    indexCenter()

    $(".mymessage").on("click",function () {
        window.location.href="centertab.html?v="+Math.random();
    })

    $(".mygminfo").on("click",function () {
        //购买
        window.location.href="goumailishi.html?v="+Math.random();
    })

    $(".myjpinfo").on("click",function () {
        //奖品
        window.location.href="centerjp.html?v="+Math.random();
    })

    $(".mykfinfo").on("click",function () {
        //我的客服
        window.location.href="kefucenter.html?v="+Math.random();
    })

    $(".fs-jfjf").on("click",function () {
        location.href="centerjp.html?type=jfjf&v="+Math.random();
    });

    $(".fs-zcc").on("click",function () {
        location.href="centerjp.html?type=zcc&v="+Math.random();
    });

    $(".fs-jxjx").on("click",function () {
        location.href="centerjp.html?type=jxjx&v="+Math.random();
    });

    $(".vipka").on("click",function () {
        window.location.href="centertab.html?v="+Math.random();
    })
})();