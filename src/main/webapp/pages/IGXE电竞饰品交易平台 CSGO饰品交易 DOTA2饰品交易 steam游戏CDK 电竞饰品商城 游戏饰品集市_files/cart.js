var loadShoppingCart = function(){
    var is_login = $('#is_login').val()
    if(is_login == 0){
        return false
    }
    $.getJSON('/cart/quick_show', function(data){
        if (data && data.count > 0) {
            $('#div_mod_myCart').removeClass('empty')
            $('.url-shopping-cart').attr('href', url_shopping);
            $('#cart_count').text(data.count);
            $('.cart-total').text(data.total);
            var carts = data.carts;
            var lis = '';
            for (var c in carts) {
                lis += '<li><div class="com-img"><a href="#"><img src="' + carts[c].icon_url + '" alt=""/></a></div>'
                    + '<span>' + carts[c].name +'</span><strong>' + code_symbol + carts[c].unit_price + '</strong>'
                    + '<a href="javascript:;" class="icon icon-shanchu js-del-cart" cart_id="' + carts[c].id + '"></a></li>';
            }
            $('#ul_list').empty().append(lis);
        } else {
            $('#js-myCart-btn').find('.mod-myCart').hide();
            $('#cart_count').text(0);
            $('.cart-total').text('0.00');
            $('#div_mod_myCart').addClass('empty');
            $('.url-shopping-cart').attr('href', 'javascript:');
            $('#ul_list').empty();
        }
    });
};
$(function () {
    /* 加载购物车 */
    if (typeof(url_shopping) != 'undefined') loadShoppingCart();

    /* 收藏商品 */
    $('.js-add-cart-parent').on('click', '.favorite-add', function() {
    //$('.favorite-add').on('click', function() {
        var is_login = $('#is_login').val()
        if(is_login == 0) return false
        var sale_id = $(this).attr('sale_id');
        var obj = $(this);
        if (sale_id && obj.hasClass("active") == false) {
            $.ajax({
                'type': "GET",
                'url': "/favorite/add",
                'data': {'sale_id': sale_id},
                'dataType': "json",
                success: function (data) {
                    if (data.succ) {
                        obj.addClass("active");
                        alert('已收藏');
                    } else{
                        alert(data.message)
                    }
                },
                error: function (XmlHttpRequest, textStatus, errorThrown) {
                    alert('收藏失败')
                    Core.ui.loader.hide()
                }
            });
        }
    });

    /* 添加或取消收藏 新版 */
    $('.js-favorite').on('click', function(){
        if(!AjaxLogin.is_login()){
            return false;
        }

        var that = $(this);
        var type = that.attr('data-type');
        var item_id = that.attr('data-item-id');
        var url = "/user_favorite/add";
        if(that.hasClass('collectbok-fulfil')){
            url = "/user_favorite/cancel_by_type";
        }
        $.ajax({
            'type': "GET",
            'url': url,
            'data': {'type': type, 'item_id':item_id },
            'dataType': "json",
            beforeSend: function () {
                Core.ui.loader.show();
            },
            success: function (data) {
                Core.ui.loader.hide();
                if(data.message){
                    alert(data.message);
                }
                if(data.status){
                    if(that.hasClass('collectbok-fulfil')){
                        that.removeClass('collectbok-fulfil');
                    }else {
                        that.addClass('collectbok-fulfil');
                    }
                }

            },
            error: function (XmlHttpRequest, textStatus, errorThrown) {
                Core.ui.loader.hide();
            }
        });
    });

    $('.js-add-cart-parent').on('click','.add-cart',function () {
        AjaxLogin.is_login()
        var sale_id = $(this).attr('sale_id');
        var obj = $(this);
        if (sale_id) {
            $.ajax({
                'type': "GET",
                'url': "/cart/add",
                'data': {'sale_id': sale_id, 'sale_type': 1},
                'dataType': "json",
                 beforeSend: function () {
                     Core.ui.loader.show();
                 },
                 success: function (data) {
                     if (data.succ) {
                         obj.removeClass('add-cart').removeAttr('sale_id').css('background-color', 'gray');
                         loadShoppingCart();
                         var successPop = $('#js-pop-addSuccess');
                         layer.open({
                             type: 1,
                             title: ' ',
                             area: ['360px', 'auto'],
                             content: successPop,
                             success: function (layero, index) {
                             }
                         });
                     }else{
                         alert(data.message)
                         obj.removeClass('add-cart').removeAttr('sale_id').css('background-color', 'gray');
                     }
                     Core.ui.loader.hide()
                 },
                 error: function (XmlHttpRequest, textStatus, errorThrown) {
                     Core.ui.loader.hide()
                 }
            });
        }
    })
    $('.js-add-cart-detail').on('click',function () {
        AjaxLogin.is_login()
        var sale_id = $(this).attr('sale_id')
        if (sale_id) {
            $.ajax({
                'type': "GET",
                'url': "/cart/add",
                'data': {'sale_id': sale_id, 'sale_type': 1},
                'dataType': "json",
                 beforeSend: function () {
                     Core.ui.loader.show();
                 },
                 success: function (data) {
                     if (data.succ) {
                         window.location.href = '/payment_order'
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
    })
    $('.js-add-cart-parent').on('click','.add-cart-group',function () {
        AjaxLogin.is_login()
        var sale_id = $(this).attr('sale_id')
        if (sale_id) {
            $.ajax({
                'type': "GET",
                'url': "/cart/add",
                'data': {'sale_id': sale_id, 'sale_type': 4},
                'dataType': "json",
                 beforeSend: function () {
                     Core.ui.loader.show();
                 },
                 success: function (data) {
                     if (data.succ) {
                         //window.location.reload();
                         var successPop = $('#js-pop-addSuccess');
                         layer.open({
                             type: 1,
                             title: ' ',
                             area: ['360px', 'auto'],
                             content: successPop,
                             success: function (layero, index) {

                             }
                         });
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
    })
    $('.js-add-cart-group-detail').on('click',function () {
        AjaxLogin.is_login()
        var sale_id = $(this).attr('sale_id')
        if (sale_id) {
            $.ajax({
                'type': "GET",
                'url': "/cart/add",
                'data': {'sale_id': sale_id, 'sale_type': 4},
                'dataType': "json",
                 beforeSend: function () {
                     Core.ui.loader.show();
                 },
                 success: function (data) {
                     if (data.succ) {
                         window.location.href = '/payment_order'
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
    })
    //$('.js-del-cart').on('click', function () {
    $('#div_mod_myCart').on('click', '.js-del-cart', function () {
        AjaxLogin.is_login()
        var cart_id = $(this).attr('cart_id')
        var data = {}
        data['cart_id'] = cart_id;
        var obj = $(this);
        if(cart_id){
            $.ajax({
                'type': "GET",
                'url': "/cart/del",
                'data': data,
                'dataType': "json",
                beforeSend: function () {
                },
                success: function (data) {
                    if (data.succ) {
                        window.location.reload(true)
                    } else {

                    }
                }
            });
        }
    })
    $('#js-shopping-cart').on('click', '.js-del-cart', function () {
        AjaxLogin.is_login()
        var cart_id = $(this).attr('cart_id')
        var data = {}
        data['cart_id'] = cart_id;
        var obj = $(this);
        if(cart_id){
            $.ajax({
                'type': "GET",
                'url': "/cart/del",
                'data': data,
                'dataType': "json",
                beforeSend: function () {
                },
                success: function (data) {
                    if (data.succ) {
                        window.location.href = '/payment_order'
                    } else {

                    }
                }
            });
        }
    })
    $('.currency').bind('click',function(){
        var curr_id = $(this).attr('curr_id')
        $.ajax({
            'type': "GET",
            'url': "/set_currency",
            'data':{'currency_id':curr_id},
            'dataType':"json",
            beforeSend: function(){
            },
            success: function(data){
                if(data.succ){
                    window.location.reload()
                }
            }
        });
    })
    $('#pay_order').bind('click',function(){
        AjaxLogin.is_login()
        var flag = false
        var has_sold = $('#id_has_sold').val()
        if (has_sold==1){
            alert("购物车有商品已经出售，请删除后再进行支付！");
            return false;
        }
        var email_pattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        // if (!email_pattern.test($('#buyer_email').val())) {
        //     alert("请输入正确的邮箱地址！");
        //     $('#buyer_email').focus()
        //     flag = false;
        // }
        /*else if (!$.trim($('#buyer_name').val())) {
            alert("请输入姓名！");
            $('#buyer_name').focus()
            flag = false;
        }else if (!$.trim($('#buyer_phone').val())) {
            alert("请输入联系电话！");
            $('#buyer_phone').focus()
            flag = false;
        } */
        // else {
            flag = true;
        // }
        if($("#has_phone").html() == "0"){
            layer.confirm("购买前请点击此处绑定您的手机号", {btn:"点击此处"}, function(){
                window.open("/user_security");
            })
            return false
        }
        if($("#has_track_link").html() == "0"){
            layer.confirm("购买前请点击此处填写您的Steam交易链接", {btn:"点击此处"}, function(){
                window.open("/user_security");
            })
            return false
        }
        if(flag){
            var payment_method = $('input[name="payment_method"]:checked').val()
            if(payment_method==3){
                if (!$('#pay-pwd').val()) {
                    $('#pay-pwd').focus()
                    alert('请输入支付密码')
                    return false;
                }
                layer.confirm('确定使用余额支付', {title: '提示'}, function (index) {
                    layer.close(index);
                    var json_data ={};
                    var is_voucher = $('#is_voucher').val()
                    if(is_voucher == 1){
                        json_data['voucher_id']=$('#voucher_id').val()
                    }
                    $.ajax({
                        'type': "POST",
                        'url': "/check_wallet_balance",
                        'data': json_data,
                        'dataType': "json",
                        beforeSend: function () {
                        },
                        success: function (data) {
                            if (data.succ) {
                                var $form = $('#pay_order_form');
                                $('#pay_order').attr('disabled', 'disabled');
                                Core.ui.loader.show();
                                $form.submit();
                            }else {
                                layer.alert(data.message);
                                //alert(data.message)
                                //layer.msg(data.message,{width: 200});
                            }
                        }
                    });
                });

            }else {
                var $form = $('#pay_order_form');
                $('#pay_order').attr('disabled', 'disabled');
                Core.ui.loader.show();
                $form.submit();
            }
        }
    });

});



