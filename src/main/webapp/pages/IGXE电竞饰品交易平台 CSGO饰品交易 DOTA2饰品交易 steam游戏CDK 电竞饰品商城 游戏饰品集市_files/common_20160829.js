
;(function($){

    /**
     * tool function
     */
    ;(function(){
        var Core = Core || {};

        Core.ui = {};

        Core.ui.tab = function(tabBar,tabContent,type,callback){
            var tabs = tabBar;
            var contents = tabContent;
            var type = type || 'mouseover';

            tabs.on(type,function(){
              var curTab = $(this);
              var index = curTab.attr('data-index') || curTab.index();
              var curContent = contents.eq(index);

              curContent.siblings().hide();
              curContent.show();
              curTab.siblings().removeClass("active");
              curTab.addClass("active");

              callback && callback(curTab);
            });
        }

        Core.ui.menu = function($menu){

            var con = $menu.find('.mod-dropMenu');

            $menu.on('mouseover',function(){
                $menu.addClass('active');
                con.stop().slideDown();
            }).on('mouseleave',function(){
                $menu.removeClass('active');
                con.stop().slideUp();
            });


        }

        Core.ui.dropMenu = function($btn,$con,callback){
            var btn = $btn;
            var con = $con;
            var timer = null;

            if(btn.length == 0){
              return;
            }

            btn.on('mouseover',function(){
                clearTimeout(timer);
                con.show();
            }).on('mouseout',function(){

                timer = setTimeout(function(){
                    con.hide();
                },500);
            });

            con.on('mouseover',function(){
                clearTimeout(timer);
            }).on('mouseleave',function(){
                timer = setTimeout(function(){
                    con.hide();
                },500);
            });

            callback && callback();
        }


        Core.ui.loader = (function(){
            var idx = 0;

            return {
                show : function(){
                    idx = layer.load(1,{
                        area:['40px','40px'],shade:['0.5','#000000']
                    });
                },
                hide:function(){
                    layer.close(idx);
                }
            }
        })();

        window.alert = function(str,callback){
            layer.msg(str,{
                area:'auto',
                time:2000
            },function(){
                callback && callback();
            });
        }

        window.Core = Core;
    })(jQuery);

    /**
     * config layer
     */
    if(typeof layer != 'undefined'){

        //配置layer
        layer.config({
            area: 'auto',
            shade: [0.8, '#0C121A'],
            //shadeClose:true,
            maxmin:false,
            moveOut: true,
            moveType:1
        });
    }

    $(document).ready(function(){
        try {
            //提示
            $('.mini-tooltip').tooltipster({
                theme: 'tooltipster-borderless'
            });
        } catch (e) {
        }
        //新选项卡
        try {
            $('.js-common-tabs').tabslet();
        } catch (e) {
        }

        //center高度计算
        (function(){
            var header = $('#header');
            var center = $('#center');
            var footer = $('#footer');
            var win = $(window);

            function setCenterHeight(){
                var h = win.height() - header.outerHeight() - footer.outerHeight();
                center.css({
                    minHeight: h < 0 ? 0 : h
                });
            }
            setCenterHeight();
            win.on('resize orientationchange',function(){
                setCenterHeight();
            });
        })();


        //select
        (function(){
            var selects = $('.com-select');
            if(selects.length == 0){
                return;
            }

            selects.select2({
                placeholder:$(this).attr('data-placeholder')
            });
            selects.on('change',function(){
                var s = $(this);
                s.next('.select2').find('.select2-selection__rendered').addClass('active');
            });
        })();

        //首页轮播
        (function(){
            if(typeof Swiper == 'undefined' || $('#js-swiper-container-banner').length == 0){
                return;
            }
            var mySwiper = new Swiper('#js-swiper-container-banner', {
               autoplay:5000,
               pagination : '.swiper-pagination',
               paginationClickable :true,
               autoplayDisableOnInteraction:false,
               simulateTouch:false
               //loop:true
            });
        })();




        //recommanded
        (function(){
           function pptSwiper(a, b, c, d, e, f, g, h) {
                if (typeof Swiper == 'undefined' || $(a).length == 0) {
                    return;
                }

                var slideLength = $(a).find('.swiper-slide').length;
                var loop_flag = false;
                if (typeof h == 'undefinded') {
                    loop_flag = true;
                } else if(h == 0) {
                    loop_flag =false
                }else{
                    loop_flag = slideLength < h ? false : true;
                }
                var hotSwiper = new Swiper(a, {
                    loop: loop_flag,
                    paginationClickable: true,
                    slidesPerView: d || 1,
                    simulateTouch: true,
                    pagination: e || '',
                    slidesPerGroup: f || 1,
                    autoplay: g || 0,
                    autoplayDisableOnInteraction: false

                })

                var prevBtn = $(b);
                var nextBtn = $(c);
                if (prevBtn.size() > 0) {
                    prevBtn.click(function () {
                        hotSwiper.swipePrev();
                    });
                }
                if (nextBtn.size() > 0) {
                    nextBtn.click(function () {
                        hotSwiper.swipeNext();
                    });
                }


                function stop(o) {
                    o.hover(function () {
                        hotSwiper.stopAutoplay();
                    }, function () {
                        hotSwiper.startAutoplay();
                    });
                }

                stop(prevBtn);
                stop(nextBtn);
                stop($(a));

                return hotSwiper;
            }

            pptSwiper('#js-hotRecommend-swiper','#js-hotRecommend-btn-prev','#js-hotRecommend-btn-next',3);
            pptSwiper('#js-proDuctRecommend-swiper','#js-proDuctRecommend-btn-prev','#js-proDuctRecommend-btn-next',4);
            pptSwiper('#js-high-shop-swiper','#js-high-shop-swiper-btn-prev','#js-high-shop-swiper-btn-next',1,null,null,3000);
            pptSwiper('#js-dotaRecommand-swiper','#js-dotaRecommand-btn-prev','#js-dotaRecommand-btn-next',4,null,1,0,0);
            //新版首页
            pptSwiper('#js-dota2Recommend-swiper', '#js-dota2Recommend-btn-prev', '#js-dota2Recommend-btn-next', 1, '#js-dota2Recommend-pager', 1, 0, 5);
            pptSwiper('#js-hotRecommend-swiper_index', '#js-hotRecommend-btn-prev', '#js-hotRecommend-btn-next', 1, '#js-hotRecommend-pager-treature-index', 1, 0, 5);
            pptSwiper('#js-hotRecommend-swiper_index_2', '#js-hotRecommend-btn-prev2', '#js-hotRecommend-btn-next2', 1, '#js-hotRecommend-pager2', 1, 0, 5);
            pptSwiper('#js-salesData-swiper1', null, null, 5, null, 1, 3000, 5);
            pptSwiper('#js-salesData-swiper2', null, null, 5, null, 1, 3000, 5);
            pptSwiper('#js-salesData-swiper3', null, null, 5, null, 1, 3000, 5);
            pptSwiper('#js-hotRecommend-swiper-treature-index', '#js-hotRecommend-btn-prev-ksl', '#js-hotRecommend-btn-next-ksl', 1, '#js-hotRecommend-pager-treature-index', 1, 0, 6);
            pptSwiper('#js-hotRecommend-swiper2-treature-index', '#js-hotRecommend-btn-prev2-ksl', '#js-hotRecommend-btn-next2-ksl', 1, '#js-hotRecommend-pager2-treature-index', 1, 0,6);
            pptSwiper('#js-ant-thumb-swiper','#js-ant-thumb-swiper-btn-prev','#js-ant-thumb-swiper-btn-next',5,null,1,0,0);


            pptSwiper('#js-bants-partner-swiper','#js-bants-partner-prev','#js-bants-partner-next','auto',null,5,null,false);

            pptSwiper('#js-vip-right-swiper',null,null,1,'#js-vip-right-pager',1,null);
            pptSwiper('#js-user-right-swiper',null,null,1,'#js-user-right-pager',1,null);
        })();

        //回到顶部
        (function(){
            var toTop = $('#js-toTop');
            toTop.click(function(){
                $("html,body").animate({scrollTop:0},200);
            });
        })();

        //新增头像窗口
        (function(){
            var show_user_pane = $('#js-show-user-pane');
            var user_float_pane = show_user_pane.find('.users-float-pane');
            show_user_pane.on('mouseenter',function(){
                user_float_pane.addClass('is-open');
            });

            show_user_pane.on('mouseleave',function(){
                user_float_pane.removeClass('is-open');
            });

        })();


        //浮动导航
        (function(){
            var nav = $('#js-navBox');
            var win = $(window);

            if(win.scrollTop() > 130){
                nav.addClass('active');
            }
            win.on('scroll',function(){
                var top = $(this).scrollTop();
                if(top > 130){
                    nav.addClass('active');
                }else{
                    nav.removeClass('active');
                }
            });
        })();

        /**
         * 导航切换
         */
        (function(){
          $(".mod-nav-hd>ul>li").on('mouseover',function(){
              var that = $(this);
              that.siblings('li').removeClass("active");
              that.siblings('li').find('.mod-subnav').stop().slideUp();
              that.addClass('active');

              var subnav = that.find(".mod-subnav");
              subnav.stop().slideDown();

          });

          $(".mod-nav-hd>ul>li").on('mouseout',function(){
              var that = $(this);
              that.removeClass("active");
              that.find('.mod-subnav').stop().slideUp();
          });

        })();


        //搜索
        (function(){
            var scBtn = $('#js-search-btn');
            var scCon = $('#js-search-con');
            var doc = $(document);

            scBtn.click(function(event){
                scCon.addClass('active');
                event.stopPropagation();
            });

            scCon.click(function(event){
                scCon.find('.mod-searchResult').slideDown();
                event.stopPropagation();
            });


            doc.click(function(){
                scCon.find('.mod-searchResult').hide();
                scCon.removeClass('active');
            });
        })();



        //高级搜索
        (function(){
            var adBtn = $('#js-advanceSearch-btn');
            var adCon = $('.mod-advanceSearch');

            adBtn.on('click',function(event){
                layer.open({
                    type:1,
                    title:'高级搜索',
                    content:adCon,
                    area:'auto',
                    shade:false
                });
            });
        })();

        //我的购物车
        (function(){
            var adBtn = $('#js-myCart-btn');
            var adCon = adBtn.find('.mod-myCart');
            var adtimer = 0;

            adBtn.on('mouseenter',function(event){
                clearTimeout(adtimer);
                if (!$('#div_mod_myCart').hasClass('empty')) adCon.show();
            }).on('mouseleave',function(){
                clearTimeout(adtimer);
                adtimer = setTimeout(function () {
                    adCon.hide();
                },200);
            });
        })();



        //下拉菜单
        (function(){
            var menus = $('.com-menu');
            menus.each(function(i,v){
                var menu = $(this);
                var _this = this;
                var dropMenu = menu.find(' > .mod-dropMenu');

                _this.timer = _this.timer || 0;

                menu.on('mouseenter',function(){
                    clearTimeout(_this.timer);
                    menu.addClass('active');
                    dropMenu.stop().show();
                }).on('mouseleave',function(){

                    _this.timer = setTimeout(function(){
                        menu.removeClass('active');
                        dropMenu.stop().hide();
                    },100);
                });
            });

        })();

        //cashout
        (function(){
            var bank = $('#js-banks');
            var moreBank = $('#js-moreBank');

            bank.on('click','.item',function(){
                var s = $(this);
                s.find('.save').slideDown();
                s.siblings('.item').find('.save').slideUp();
            });

            moreBank.on('change',function(){
                var s = $(this);
                var v = s.val();

                moreBank.parent().siblings('.item[data-bank='+ v +']').show();

                // moreBank.parent().siblings('.item').each(function(i,va){
                //     console.log(va);
                //     if($(va).attr('data-bank') == v) {
                //         $(va).show();
                //     }else{
                //         $(va).hide();
                //     }
                // });
            });
        })();


        //afterLogin
        (function(){
            var userinfo = $('#js-edit-userinfo');
            userinfo.on('click','.icon-bianji',function(){
                var s = $(this);
                s.parent().find('.b').attr('contenteditable',"true").addClass('active').focus();
                s.siblings('.icon-baocun').show();
                s.hide();
            });

            userinfo.on('click','.icon-baocun',function(){
                var s = $(this);
                s.parent().find('.b').removeAttr('contenteditable').removeClass('active');
                s.siblings('.icon-bianji').show();
                s.hide();
            });

            userinfo.on('keydown',function(event){
                if(event.keyCode == 13){
                    return false;
                }
            });

            userinfo.on('keydown','.b',function(){
                var s = $(this);
                var text = s.text();
                if(text.length >= 25){
                    var str = text.substring(0,text.length-1);
                    s.text(str);
                    alert('长度超过限制');
                    return false;
                }
            });

            userinfo.on('paste',function(s){
                return false;
            });

        })();


        //file upload
        (function(){
            var uploader = $('#js-upload-file');
            var fileHandler = uploader.find('input[type=file]');
            var fileName = uploader.find('input[type=text]');
            var fileUploadBtn = uploader.find('.com-btn');

            fileUploadBtn.on('click',function(){
                fileHandler.trigger('click');
            });

            fileHandler.on('change',function(){
                fileName.val(fileHandler.val());

                setTimeout(function(){
                    alert('上传成功');
                    fileUploadBtn.val('等待验证');

                    setTimeout(function(){
                        fileUploadBtn.val('验证成功');
                        fileUploadBtn.off('click');
                    },3000);
                },2000);
            });

        })();


        //singlesale
        (function(){
            var leftInventory = $('#js-leftInventory');
            var singleSale = $('#js-singleSale');
            var rightInventory = $('#js-rightInventory');
            var clickDeposit = $('#js-clickDeposit');

            if(singleSale.length == 0){
                return;
            }

            var leftList = leftInventory.find('.js-list');
            var rightList = rightInventory.find('.js-list');


            leftInventory.on('click','li',function(){
                var s = $(this);
                s.addClass('active');
                s.siblings('li').removeClass('active');
                singleSale.removeClass('active');
                rightInventory.find('li').removeClass('active');

                //修改中间singleSale部分的数据
                //
                //
                //end
            });

            rightInventory.on('click','li',function(){
                var s = $(this);
                s.addClass('active');
                s.siblings('li').removeClass('active');
                singleSale.addClass('active');
                leftInventory.find('li').removeClass('active');

                //修改中间singleSale部分的数据
                //
                //
                //end
                //

            });

            //保存
            singleSale.on('click','.js-save',function(){
                rightList.find('li').removeClass('active');
                rightList.prepend(leftList.find('li.active').append('<i class="icon icon-shanchu"></i>'));
                singleSale.addClass('active');

                var uploader = $('#js-uploader-btn');
                uploader.trigger('click');
            });

            //取消
            rightInventory.on('click','.icon-shanchu',function(event){
                var s = $(this);

                if(s.parents('li').hasClass('active')){
                    singleSale.removeClass('active');
                }

                leftList.append(s.parents('li'));
                s.remove();
                event.stopPropagation();



            });

            rightInventory.on('click','.js-save',function(){
                //存入数据...
                //
                //
                //end

                if(rightList.children().length == 0){
                    alert('没有可存入的物品');
                    return;
                }

                layer.open({
                    type:1,
                    title:'提示',
                    content:clickDeposit,
                    area:'auto'
                });

            });

        })();


        //bundleSale
        (function(){
            var leftInventory = $('#js-leftInventory');
            var bundleSale = $('#js-bundleSale');
            var rightInventory = $('#js-rightInventory');
            var clickDeposit = $('#js-clickDeposit');

            if(bundleSale.length == 0){
                return;
            }

            var leftList = leftInventory.find('.js-list');
            var rightList = rightInventory.find('.js-list');


            leftInventory.on('click','li',function(){
                var s = $(this);

                rightList.prepend(s.append('<i class="icon icon-shanchu"></i>'));
            });


            //取消
            rightInventory.on('click','.icon-shanchu',function(){
                var s = $(this);
                leftList.append(s.parents('li'));
                s.remove();

            });

            bundleSale.on('click','.js-save',function(){
                if(rightList.children().length == 0){
                    alert('请选择物品');
                    return;
                }
                alert('保存成功');
            });



            rightInventory.on('click','.js-save',function(){
                if(rightList.children().length == 0){
                    alert('请选择物品');
                    return;
                }

                layer.open({
                    type:1,
                    title:'提示',
                    content:clickDeposit,
                    area:'auto'
                });
            });

        })();



        //帮助
        (function(){
            var win = $(window);
            var helpBar = $('#js-bar-help');
            var helpCon = $('#js-con-help');
            var helpCon2 = $('#js-con-help2');
            var steps = $('.mod-howToSaleStep');
            var floorIndex = 0;
            var floorArr = [];
            var flag = true;

            if(helpCon.length == 0){
                return;
            }

            for(var i = 0;i < steps.length;i++){
                floorArr.push(steps.eq(i).offset().top - 220);
            }

            floorArr.push(1000000000);


            function addActive(){
                helpBar.addClass('active');
                helpCon.addClass('active');
                helpCon2.addClass('active');
            }

            function removeActive(){
                helpBar.removeClass('active');
                helpCon.removeClass('active');
                helpCon2.removeClass('active');
            }

            function setPosition(t){

                if(flag){
                    t += 50;
                }

                for(var i = 0;i< floorArr.length;i++){

                    if(t > floorArr[i]){
                        continue;
                    }

                    floorIndex = (i-1 < 0) ? 0 : i-1;
                    break;
                }



                helpCon.find('li a').removeClass('active');
                helpCon.find('li').eq(floorIndex).find('a').addClass('active');
            }


            (function(){
                var top = win.scrollTop();
                if( top > 130 && top < helpCon2.height()){
                    flag = false;
                    addActive();
                    setPosition(top);

                }
            })();

            win.on('scroll',function(){
                var top = win.scrollTop();

                if(top > 130 && top < helpCon2.height()){
                    addActive();
                }else{
                    removeActive();
                }

                setPosition(top);
            });

            helpCon.on('click','li a',function(){
                var s = $(this);
                var index = s.attr('data-index');

                // s.parents('li').siblings().find('a').removeClass('active');
                // s.addClass('active');

                var top = steps.eq(index).offset().top - 220;
                if(!helpCon.hasClass('active')){
                    top -= 40;
                }

                $('html,body').stop().animate({scrollTop:top},500);
            });
        })();

        //图片懒加载
        (function(){

            $("img.fn-lazy").lazyload({
                 effect : "fadeIn",
                 threshold : 200
            });

            var t = $(window).scrollTop() ;
            $('html,body').animate({'scrollTop': t - 5});

        })();
        //收藏商品
        (function(){

            $('body').on('click','.js-coll-like',function(event) {
                var s = $(this);
                var product_id = s.attr("product_id");
                if(s.hasClass('active')){
                    //if (product_id) {
                    //    $.ajax({
                    //        'type': "POST",
                    //        'url': "/dota2/favorite_del",
                    //        'data': {'product_id': product_id},
                    //        'dataType': "json",
                    //         beforeSend: function () {
                    //             Core.ui.loader.show();
                    //         },
                    //         success: function (data) {
                    //             if (data.succ) {
                    //                s.removeClass('active');
                    //             }else{
                    //                 alert(data.message)
                    //             }
                    //             Core.ui.loader.hide()
                    //         },
                    //         error: function (XmlHttpRequest, textStatus, errorThrown) {
                    //             Core.ui.loader.hide()
                    //         }
                    //    });
                    //}
                    //s.removeClass('active');
                    //layer.msg('已取消');
                }else{
                    AjaxLogin.is_login();
                    if (product_id) {
                        $.ajax({
                            'type': "POST",
                            'url': "/dota2/favorite_add",
                            'data': {'product_id': product_id},
                            'dataType': "json",
                             beforeSend: function () {
                                 Core.ui.loader.show();
                             },
                             success: function (data) {
                                 if (data.succ) {
                                    s.addClass('active');
                                    layer.msg('已收藏');
                                 }else{
                                     alert(data.message)
                                 }
                                 Core.ui.loader.hide()
                             },
                             error: function (XmlHttpRequest, textStatus, errorThrown) {
                                 Core.ui.loader.hide()
                             }
                        });
                    }


                }

            });
        })();
        //帮助栏
        (function(){
            var helpMenu = $('#js-help-menu');

            helpMenu.on('click','.js-item',function(){
                var that = $(this);
                that.parent().toggleClass('active');
                that.next().slideToggle(200);
            });
        })();

        //浮动卡片
        try{

            $('body').on('mouseenter','.card-tooltip',function(){

                var that = $(this);
                var self = this;

                self.tooltipTimer = self.tooltipTimer || 0;

                if(!that.hasClass('tooltipstered')){

                    that.tooltipster({
                        content:$('<span class="tooltipster-loading">加载中...</span>'),
                        theme: 'tooltipster-popover',
                        interactive:false,
                        side:'right',
                        delay : [500,200],
                        trigger: 'hover',
                        updateAnimation:'fade',
                        functionBefore: function(instance, helper) {

                            var $origin = $(helper.origin);
                            var ajaxurl = $origin.attr('data-card-detail-url');

                            // 通过ajax获取到HTML片段
                            if ($origin.data('loaded') !== true) {

                                $.get(ajaxurl, function(data) {
                                    instance.content($(data));
                                    $origin.data('loaded', true);
                                });

                            }
                        }
                    });

                    self.tooltipTimer = setTimeout(function(){
                        that.tooltipster('show');
                    },800);
                }

            });

            $('body').on('mouseleave','.card-tooltip',function(){
                var that = $(this);
                var self = this;

                clearTimeout(self.tooltipTimer);
            });
        }catch(e){}


    });
    //微信二维码
    $(function(){
        var weixinQimg = $('#js-weixin-qr-img');
        var qrimg = weixinQimg.find('.weixin-qr');
        var timehandler = 0;
        weixinQimg.mouseover(function(){
            qrimg.show();
            clearTimeout(timehandler);
        });

        weixinQimg.mouseleave(function(){
            timehandler = setTimeout(function(){
                qrimg.hide();
            },200);

        });

        qrimg.mouseover(function(){
            clearTimeout(timehandler);
        });

        qrimg.mouseleave(function(){
            timehandler = setTimeout(function(){
                qrimg.hide();
            },200);
        });
    });





    //IE9 复制链接
    window.copylink = function(link){

        var text = '请按Ctrl+C复制链接：<input size="' + link.length + '" class="linker" value="' + link + '"';
        layer.msg(text, {
            time: 10000,
            success: function(layero, index) {
                layero.find('.linker').select();
                $(document).keydown(function(e) {
                    if (e.ctrlKey == true && e.keyCode == 67) {
                        setTimeout(function() {
                            layer.close(index);
                        }, 500);
                    }
                });
            }
        });
    }

})(jQuery);


//	模拟gif
function simulationGif(insert, imgName, imgSrc, frames, singleW, speed) {
	var index = 1;
	var dom = $("<div class=\"simulationGif\" style='width:" + singleW + "px;overflow:hidden;'>" +
		"<img id='" + imgName + "' src='" +imgSrc+imgName + ".png' />" +
		"</div>");
	$("" + insert).append(dom);

	dom.find("img").load(function() {
		setInterval(function() {
			index += 1;
			if(index < frames) {
				$("#" + imgName)
					.css({
						'margin-left': '-' + index * singleW + 'px'
					});
			} else {
				index = 1;
			}
		}, speed)
	})
}