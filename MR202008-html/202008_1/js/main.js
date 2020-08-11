var ltIE9 = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) < 9;
var isIE = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) <= 10;
var ltIE8 = (navigator.userAgent.replace(/^.*MSIE\s+(\d+\.\d+).*$/ig, '$1') * 1) < 8;
$(function() {

    var main_banner_id = 0;
    var news_banner_id = 0;
    var auto_play_main_banner;
    var auto_play_news_banner;
    var auto_play_main_banner_time = 7000;
    var auto_play_news_banner_time = 3000;

    /** 線上進度查詢 **/
    function getProcessStatus(){

        var response = {};
        response.name = '客戶姓名';
        response.statusAry = [];
         /*status 提供3種狀態 : 執行完畢:complete / 執行中:processing / 尚未執行:not-yet / 結案:close */
        var random = Math.floor((Math.random()*5)+1);

        switch(random)
        {
            case 1:
                response.step = '本案無法核貸';
                response.statusAry.push({title:'案件登錄',status:'complete',date:'2013/11/05',time:'15:20'});
                response.statusAry.push({title:'案件審核',status:'complete',date:'2013/11/05',time:'15:20'});
                response.statusAry.push({title:'結案',status:'close',date:'2013/11/05',time:'15:20'});
                response.statusAry.push({title:'',status:'not-yet',date:'',time:''});
                response.statusAry.push({title:'',status:'not-yet',date:'',time:''});
            break;
            case 2:
                response.step = '結案';
                response.statusAry.push({title:'案件登錄',status:'complete',date:'2013/11/05',time:'15:20'});
                response.statusAry.push({title:'案件審核',status:'complete',date:'2013/11/05',time:'15:20'});
                response.statusAry.push({title:'徵信照會',status:'complete',date:'2013/11/05',time:'15:20'});
                response.statusAry.push({title:'核貸通知',status:'complete',date:'2013/11/05',time:'15:20'});
                response.statusAry.push({title:'分行撥款成功',status:'complete',date:'2013/11/05',time:'15:20'});
            break;
            case 3:
                response.step = '案件審核';
                response.statusAry.push({title:'案件登錄',status:'complete',date:'2013/11/05',time:'15:20'});
                response.statusAry.push({title:'案件審核',status:'processing',date:'2013/11/05',time:'15:20'});
                response.statusAry.push({title:'徵信照會',status:'not-yet',date:'',time:''});
                response.statusAry.push({title:'核貸通知',status:'not-yet',date:'',time:''});
                response.statusAry.push({title:'分行撥款成功',status:'not-yet',date:'',time:''});
            break;
            case 4:
                response.step = '徵信照會';
                response.statusAry.push({title:'案件登錄',status:'complete',date:'2013/11/05',time:'15:20'});
                response.statusAry.push({title:'案件審核',status:'complete',date:'2013/11/05',time:'15:20'});
                response.statusAry.push({title:'徵信照會',status:'processing',date:'2013/11/05',time:'15:20'});
                response.statusAry.push({title:'核貸通知',status:'not-yet',date:'',time:''});
                response.statusAry.push({title:'分行撥款成功',status:'not-yet',date:'',time:''});
            break;
            case 5:
                response.step = '案件登錄';
                response.statusAry.push({title:'案件登錄',status:'processing',date:'2013/11/05',time:'15:20'});
                response.statusAry.push({title:'案件審核',status:'not-yet',date:'',time:''});
                response.statusAry.push({title:'徵信照會',status:'not-yet',date:'',time:''});
                response.statusAry.push({title:'核貸通知',status:'not-yet',date:'',time:''});
                response.statusAry.push({title:'分行撥款成功',status:'not-yet',date:'',time:''});
            break;
        }
       


        var html = '';
        html += '<div class="process">';
        html += '<div class="msg">';
        html += '親愛的<span class="name">'+response.name+'</span>您好，<br/>';
        html += '目前您的案件申請進度：<span class="result">'+response.step+'</span>';
        html += '</div>';

        html += '<div class="chart">';
        html += '<ul class="step">';

        //製作圖表橫線
        var total = response.statusAry.length;
        var i;
        for(i=0;i<total;i++){
            html += '<li class="'+response.statusAry[i].status+'">';
            html += '<span class="title">'+response.statusAry[i].title+'</span>';
            html += '<span class="status"></span>';
            html += '<span class="date">'+response.statusAry[i].date+'<br/>'+response.statusAry[i].time+'</span>';
            html += '</li>';
        }

        html += '</ul>';
        
        $('.page .process').remove();
        //
        html += '<ul class="bar">';
        total = response.statusAry.length-1;
        for(i=0;i<total;i++){
            html += '<li class="'+response.statusAry[i].status+'"></li>';
        }
        html += '</ul>';
        html += '</div>';
        html += '</div>';


        $('.page-content').append(html);
    }
    /** 線上進度查詢 end **/
    function hasSmoothing(){
        if (typeof (screen.fontSmoothingEnabled) != "undefined") {
            return screen.fontSmoothingEnabled;
        } else {
            try {
                // Create a 35x35 Canvas block.
                var canvasNode = document.createElement("canvas");
                canvasNode.width = "35";
                canvasNode.height = "35"

                // We must put this node into the body, otherwise 
                // Safari Windows does not report correctly.
                canvasNode.style.display = "none";
                document.body.appendChild(canvasNode);
                var ctx = canvasNode.getContext("2d");

                // draw a black letter "O", 32px Arial.
                ctx.textBaseline = "top";
                ctx.font = "32px Arial";
                ctx.fillStyle = "black";
                ctx.strokeStyle = "black";

                ctx.fillText("O", 0, 0);

                // start at (8,1) and search the canvas from left to right,
                // top to bottom to see if we can find a non-black pixel.  If
                // so we return true.
                for (var j = 8; j <= 32; j++) {
                    for (var i = 1; i <= 32; i++) {
                        var imageData = ctx.getImageData(i, j, 1, 1).data
                        var alpha = imageData[3];

                        if (alpha != 255 && alpha != 0 && alpha > 180) {
                            return true; // font-smoothing must be on.
                        }
                    }

                }

                // didn't find any non-black pixels - return false.
                return false;
            }
            catch (ex) {
                // Something went wrong (for example, Opera cannot use the
                // canvas fillText() method.  Return null (unknown).
                return null;
            }
        }
    }
    function jumpMainBanner(btn) {
        if (typeof btn == 'undefined') {
            if ($(".tab-nav li.active").next().length > 0)
                btn = $(".tab-nav li.active").next();
            else
                btn = $(".tab-nav li").first();
        }
        if ($(btn).hasClass('active'))
            return false;
        var direction = 1;
        if ($(".tab-content li.on").index() > $(btn).index())
            direction = -1;

        var current_banner = $(".tab-content li.on");
        $(current_banner).css('position', 'absolute').css('left', 0).css('top', 0);
        TweenMax.set($(current_banner), { left: 0, top: 0, zIndex: 5 });
        TweenMax.to($(current_banner), .7, { left: -direction * $(".tab-content").width(), ease: Sine.easeInOut });


        var dest_x = -1 * $(".tab-content").width() * $(btn).index();
        $(".tab-content li").eq($(btn).index())
        var next_banner = $(".tab-content li").eq($(btn).index());
        TweenMax.set($(next_banner), { left: 0, zIndex: 4 });


        $(".tab-content li").eq($(btn).index()).addClass('on').siblings().removeClass('on');
        $(btn).addClass('active').siblings().removeClass('active');

        clearInterval(auto_play_main_banner);
        auto_play_main_banner = setInterval(jumpMainBanner, auto_play_main_banner_time);
    }
    function jumpNewsBanner(btn,ele) {

        if (typeof btn == 'undefined') {

            if($(".news .tabs").length==0)
            {
               var pager = $(".news").find(".banner .pager");  
            }
            else{
                var pager = $(".news .tabs-content >div").eq($(".news .tabs .active").parent().index()).find(".banner .pager");
            }
            
            if ($("li .active", pager).parent().next().length > 0)
            {
                btn = $("li .active", pager).parent().next();
            }
            else{
                btn = $("li", pager).first();
            }
            ele = $("ul li", pager.siblings()).eq(btn.index());
        }

        if ($("a", btn).hasClass("active"))
            return false;

        TweenMax.to($(ele).parent(), .55, { marginLeft : $(ele).index() *$(ele).width() * -1});

        $("a", btn).addClass("active");
        $("a", btn.siblings()).removeClass("active");
        clearInterval(auto_play_news_banner);
        auto_play_news_banner = setInterval(jumpNewsBanner, auto_play_news_banner_time);
    }

    /************************/
    /* setup main menu
    /************************/

    $("ul.first-level").addClass('column-' + $("ul.first-level>li").not('.border').length);
    //
    //
    $("ul.first-level>li").each(function () {
        if (!$(this).hasClass('.border')) {

            var len = Math.ceil($(this).find(".sf-sub li").length / 3);

            $(this).find(".sf-mega").addClass('column-' + len);

            if ($(this).find('figure.menu-banner').length > 0) {
                $(this).find(".sf-mega").addClass('hasBanner');
            }

            if ($(this).find(".sf-sub").length > 0) {
                //
                var $ul = $(this).find(".sf-sub");
                var $lis = $(this).find(".sf-sub").find('li');
                var length = $lis.length;
                //pull them off

                //make your new ul, to put the dom elements in
                for (var i = 0; i < len - 1; i++) {
                    //console.log(i*3,3);
                    var $last6lis = $($lis.splice(0, 3)).remove();

                    // console.log($last6lis);
                    var $newUl = $('<ul class="sub column-' + i + '"></ul>');
                    $ul.before($newUl.html($last6lis));
                }
                $ul.addClass('column-' + len);
                $ul.removeClass('sf-sub');
                $ul.addClass('sub');
                //html+='</ul>';
                //
            }

        }

        if ($(this).find('>a').length > 0) {

            var menu_w = $(this).outerWidth();

            var submenu_w = $(this).find(".sf-mega").outerWidth(true);

            var diff_menu_submenu_w = submenu_w - menu_w;
            var pos_x = $(this).offset().left - $(this).parent().offset().left;

            $(this).find(".sf-mega").css('left', -1);
            if (submenu_w + pos_x > $("#sub-menu .center").width()) {
                $(this).find(".sf-mega").css('right', -2).css('left', 'auto');
                if (diff_menu_submenu_w > pos_x) {
                    if (diff_menu_submenu_w / 2 + pos_x + menu_w > $("#sub-menu .center").width()) {
                        var add = diff_menu_submenu_w / 2 + pos_x + menu_w - $("#sub-menu .center").width();
                        $(this).find(".sf-mega").css('left', menu_w / 2 - submenu_w / 2 - add);
                    } else if (pos_x - diff_menu_submenu_w / 2 < 0) {
                        var add = diff_menu_submenu_w - pos_x;
                        $(this).find(".sf-mega").css('left', -pos_x + 1);
                    } else {
                        $(this).find(".sf-mega").css('left', menu_w / 2 - submenu_w / 2);
                    }
                }
            }
        }
    })

    //
    $('#sub-menu').superfish({ speedOut: 0, delay: 0, speed: 'fast' });
//    $('#sub-menu .first-level >li >a').click(function (event) {
//        //event.stopPropagation();
//        $(this).parent().siblings().removeClass("sfHover").find(">a").each(function () {
//            $(this).next().fadeOut(0);
//        });
//        $(this).parent().toggleClass("sfHover");
//        if ($(this).parent().hasClass("sfHover")) {
//            $(this).next().fadeIn(0);
//
//        } else {
//            $(this).next().slideUp(0);
//        }
//    });

    /************************/
    /* main banner
    /************************/

    if($("#promotion-wrap .banner").length>0){
        $("#promotion-wrap .banner .tab-content ul li").each(function(i){

            TweenMax.set($(this), { left: 0, zIndex: 5-i });
            $(this).css('position', 'absolute');
        })
        $(".tab-nav li").click(function () {
            jumpMainBanner(this);
        });

        $("#promotion-wrap .banner .tab-nav").addClass('column-'+$("#promotion-wrap .banner .tab-content ul li").length);

        auto_play_main_banner = setInterval(jumpMainBanner, auto_play_main_banner_time);
    }
    /************************/
    /* news banner
    /************************/

    if ($(".news .banner .content li").length > 0) {

        if ($(".news .banner ul.pager").length == 0) {
            $('<ul class="pager"/>').insertAfter($(".news .banner .content"));
        }
        //$(".news .banner .content").css('visibility', 'hidden');

        $(".news .banner").each(function (i, d) {
            var bannerSet = $(d);

            if ($(this).find('>ul li').length > 1) {
                var container = $("<div/>").css('width', $("li", bannerSet).width()).css('overflow', 'hidden');
                $("ul.content", bannerSet).width($("li", bannerSet).length * $("li", bannerSet).width()).show().appendTo(container);
                container.insertBefore($("ul.pager", bannerSet));
                $("li", bannerSet).each(function (i, d) {
                    //        console.log(this)
                    var ele = this;
                    var btn = $('<li><a href="javascript:"><i class="icon-circle"></i></a></li>');
                   
                    btn.click(function () {
                        jumpNewsBanner(btn,ele)
                    });
                    $("ul.pager", bannerSet).append(btn);
                });
                $("ul.pager li a:eq(0)", bannerSet).addClass('active');
            }
            //$('<ul class="current content" />').css('position', 'absolute')
            //    .append($("ul.content li:eq(0)", bannerSet).clone()).insertBefore($(".content", bannerSet));
        });


        auto_play_news_banner = setInterval(jumpNewsBanner, auto_play_news_banner_time);
    }

    if ($(".news .tabs-content >div").length > 1) {
        $(".news .tabs-content >div:gt(0)").hide();
    }


    /************************/
    /* tabs
    /************************/
    $("ul.tabs li").each(function () {
        $(this).click(function () {
            var name = $(this).find('a').attr("data-name");
            var target = $(this).parent().parent().find('.tabs-content').find('.' + name).eq(0);
            target.show().siblings().hide();
            $(this).find('a').eq(0).addClass('active');
            $(this).siblings().find('a').removeClass('active');
        })
    })
    /************************/
    /* footer
    /************************/

    $(".back-to-top a").click(function () {
        TweenMax.to(window, .5, { scrollTo: { y: 0, ease: Sine.easeOut } });
    })

    $("#sitemap-open").click(function () {
        $(this).toggleClass('ed');
        if ($('.href-list').is(':not(:visible)')) {
            $('.href-list').slideDown(750);
        } else {
            $('.sitemap .href-list').slideUp(350);
        }

    });

    if (ltIE8) {
        if($("body").hasClass("home")){
            $(".tools").after('<div class="msg block ie8-hint"><ul class="box box-link"><li class="info">請使用IE8.0以上版本之瀏覽器</li></ul></div>');
        }
    }
    //skin input radiobutton / checkbox

    
    if($('.applyStep input').length>0){
        $('.applyStep input').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
            increaseArea: '20%' // optional
        });
    }
    
    
    
    $('#carousel').flexslider({
        animation: "slide",
        controlNav: false,
        animationLoop: false,
        slideshow: false,
        itemWidth: 100,
        itemMargin: 10,
        asNavFor: '#slider'
    });
       
    $('#slider').flexslider({
        animation: "slide",
        controlNav: false,
        directionNav: false,
        animationLoop: false,
        slideshow: true,
        sync: "#carousel"
    });
    
    /** news list **/
    if($("body").hasClass("news-list"))
    {
        $(".select .all input:checkbox").on('ifChecked', function(event){
            $(".select .options input:checkbox").iCheck('check');
        });

        $(".select .all input:checkbox").on('ifUnchecked',function(event){
             $(".select .options input:checkbox").iCheck('uncheck');
        })
        $(".select .options li input:checkbox").on('ifUnchecked', function(event){
           $(".select .all .icheckbox_square-green").removeClass('checked');
           $(".select .all .icheckbox_square-green input:checkbox").prop("checked", false);
        });
    }


    /** content menu **/
    if($('.menu > ul > li > a').length>0){
        $('.menu > ul > li > a').each(function() {
            if($(this).text().length>9)
            {
                $(this).addClass('large');
            }
        })
    }

    if($('.menu > ul > li > ul > li a').length>0){
      $('.menu > ul > li > ul > li a').each(function() {

        if($(this).text().length>7)
        {
            $(this).addClass('large');
        }
     })
      }

      /*
   	 if($('.member dt').length>0){
		 
		 $('.member.login dt').click(function(){
            $(this).next('dd').slideToggle();
            $(this).toggleClass('active');
          })
		  
		  $('.member.logout .func .more a').click(function(){
			  $(this).parent().parent().find('a').addClass('active');
			  $(this).removeClass('active');
            $(this).parent().parent().prev().slideDown("slow",function(){
				$(this).prev().addClass('active');
			});
          })
		  
		  $('.member.logout .func .less a').click(function(){
			  $(this).parent().parent().find('a').addClass('active');
			  $(this).removeClass('active');
            $(this).parent().parent().prev().slideUp("slow",function(){
				$(this).prev().removeClass('active');
			});
          })
      }*/

    /* accordion menu*/
    if($('.accordion-menu').length>0){
        $('.accordion-menu > ul > li > a').click(function() {
            var target = $( this).parent().find('ul').eq(0);
            if ( target.is( ":hidden" ) ) {
                target.slideDown('normal');
                $(this).addClass('active');
            } else {
                target.slideUp('normal');
                $(this).removeClass('active');
            }
        });     

        $('.accordion-menu > ul > li').each(function(){

            if(!$(this).find('>a').hasClass('active')){
                $(this).find('>ul').hide();
            }
        }) 
    }

    /* fix for ie8 */
    if ($(".lt-ie9").length > 0) {
        
       

        /************************/
        /* detect clearType
        /************************/


        var result = hasSmoothing();
        if (result) {
            $('html').addClass('hasFontSmoothing-true');
        } else if (result == false) {
            $('html').addClass('hasFontSmoothing-false');
        } else { // result == null
            $('html').addClass('hasFontSmoothing-unknown');
        }

        setTimeout(function(){$("#sub-menu .first-level li .sf-mega").each(function (i, d) {
            d = $(d);
            var w = 1 + d.parent().outerWidth(); d.parent().css('padding-left').replace(/px|inherit|auto/, '') * 1 + d.parent().css('padding-right').replace(/px|inherit|auto/, '') * 1;
            var i = $("<i class='border-mask' />");
            i.width(w);
            i.appendTo(d.parent())
        });},1000)

    }

    /*apply page*/
    if($('body.apply').length>0){
        
        if($('aside.steps').length>0){
           $('aside.steps ul li').each(function(){
                if($(this).find('span').text().length>5){
                    $(this).find('span').addClass('multiline');
                }
           })
        }
        if($('.page-content input').length>0){
            $('.page-content input').iCheck({
                checkboxClass: 'icheckbox_square-green',
                radioClass: 'iradio_square-green',
                increaseArea: '20%' // optional
            });
        }
    }
    /*online page*/
    if($('body.online').length>0){

        if($('.page .form .submit a').length>0){
           $('.page .form .submit a').click(function(){
                getProcessStatus();
            })
        }
        //check process status
        if($('.page .process .chart').length>0){
            $('.page .process').each(function(){
                var statusAry = [];
                 $(this).find('.chart').find('.step').find('li').each(function(){
                    statusAry.push($(this).attr("class"));
                })

                var total = statusAry.length-1;
                var html = '<ul class="bar">';
                for(var i=0;i<total;i++){
                    html += '<li class="'+statusAry[i]+'"></li>';
                }
                html += '</ul>';
                $(this).find('.chart').prepend(html);
            })
        }
    }

});