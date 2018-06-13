/**
 * Created by Administrator on 2018/3/26.
 */
;(function ($) {
    var lb_remainTime=5000;

    function setLB(obj,bool){
        var $dragBln = false;

        $(".main_image").touchSlider({
            flexible : true,
            speed : 200,
            btn_prev : $("#btn_prev"),
            btn_next : $("#btn_next"),
            paging : $(".flicking_con a"),
            counter : function (e){
                $(".flicking_con a").removeClass("on").eq(e.current-1).addClass("on");


            }
        });

        $(".main_image").bind("mousedown", function() {
            $dragBln = false;
        });

        $(".main_image").bind("dragstart", function() {
            $dragBln = true;
        });

        var timers = setInterval(function(){
            $("#btn_next").click();
        }, lb_remainTime);

        $(".main_visual").hover(function(){
            clearInterval(timers);
        },function(){
            timers = setInterval(function(){
                $("#btn_next").click();
            },lb_remainTime);
        });

        $(".main_image").bind("touchstart",function(){
            clearInterval(timers);
        }).bind("touchend", function(){
            timers = setInterval(function(){
                $("#btn_next").click();
            }, lb_remainTime);
        });
    }

    var height3=4.25*parseFloat(document.documentElement.style.fontSize);
    $('.main_visual').height(height3);
    $('.main_image').height(height3);

    function list(data,content) {
        var html="";
        for(var i=0;i<20;i++)
        {
            html+='<div class="lists bx bxh" style="box-sizing:border-box;">';
            html+='<div class="lists-sub">';
            html+='<img src="">';
            html+='</div>';
            html+='<div class="bxf1 h1 bx bxv" style="padding-left: 0.4rem;padding-top:0.46875rem;margin-right: 0.625rem;box-sizing: border-box;">';
            html+='<div class="w1 break_main" style="font-size: 100%;color:#212121;">渤海之滨天津'+i+'</div>';
            html+='<div class="w1 hanshuxianshi" style="line-height:1.3;padding-top: 0.1875rem;font-size: 83.3333333%;color:#8b8b8b;word-break: break-all;box-sizing: border-box;">渤海之滨天津渤海之滨天津渤海之滨天津渤海之滨天津渤海之滨天津渤海之滨天津渤海之滨冯赛的冯赛冯赛冯赛的冯赛冯赛冯赛的冯赛冯赛冯赛的冯赛冯赛';
            html+='</div>';
            html+='</div>';
            html+='</div>';
        }

        $("#item1").html(html);
        tablist();
    }

    setLB()

    var items=document.getElementsByClassName("fnt");

    function tablist() {
        var curName="select";
        for(var i=0;i<items.length;i++)
        {
            (function (i) {
                items[i].onclick=function () {
                    $("#sc").scrollTop(0);
                    // document.getElementById("sc").onscroll=function () {
                    //     console.log(111)
                    // };
                    var reg = new RegExp("(^| +)" + curName + "( +|$)", "g");
                      for(var j=0;j<items.length;j++)
                      {
                          items[j].className=items[j].className.replace(reg," ");
                          $("#item"+(j+1)).css("display","none");
                      }

                     this.className+=" "+curName;
                     $("#item"+(i+1)).css("display","block");

                }
            })(i)
        }
    }

list()

 }($));


