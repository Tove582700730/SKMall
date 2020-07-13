$(function(){
    $('.qq_kefy_1').on('click',function(){
        location.href='/contactus'
        //BizQQWPA.gdtChat({
        //    nameAccount: '800127088',
        //    redirect: '',
        //    clkSrc: 'gdtFrom='
        //});
        //location.href="tencent://message/?Menu=yes&amp;amp;uin=800127088&amp;amp;Service=58&amp;amp;SigT=A7F6FEA02730C988537D9CC5CE430A5567DA7F65F24B35E09DC0300DA17981F5BFCBA939A546173637D909E37E2669DF3522597F2DB30A0A793473E4C25E13BB88E89F84486BD16AB9E4F33DDBBCF5642C28243F5D021A07A54E7AB204BAD7F21063CE3306B2E1BB977BDF2F718C9B8D7FFF885187A9257D&amp;amp;SigU=30E5D5233A443AB2ABD90A1102309948E4C56E7439DFE656228B176C435A88700C777E694E33624C2C33AAB6A6B73A030F979C4C389D89CDA47C54FDA512C8E7FB51ED70BAFDC189"
        //location.href="tencent://message/?Menu=yes&amp;amp;uin=800127088&amp;amp;Service=58&amp;amp;SigT=A7F6FEA02730C9880D4C49799D14D11F000B8246A06316D8EBAA2C44A0E7E1567FF7F94E5C4CDACC92DC79004D4277AEB9AFA37BDE0EE762C790F843BED9B0CD00D8294AAA9F4FCE4C2EF430C8AD27A96E91B7C220C24A10EA5844D0D4547521417D0EC233EB4E630A1EB29C82260E6E8548C2FCEE178289&amp;amp;SigU=30E5D5233A443AB22965D2784D767B30FCB45B6B90D8875C5487769C27F384FC2F5087CAE6EFDCE6D7927B05971FFD2F0E5534D1AB28668A5EC6BCCD09B8E718AD46BB5E59D688DD"
    });
    //$('.product_type').bind('mousemove',function(){
    //    $(this).parent().parent().parent().find('img').attr("src",$(this).attr('img_url'));
    //})
    $('.currency').bind('click',function(){
        curr_id = $(this).attr('curr_id')
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
    });
    $('#search_is_stattrak').on('change',function(){
        if($(this).prop('checked')){
            $(this).val(1)
        }else{
            $(this).val(0)
        }
    });
    $('#product_info').on('click','.js-icon-search',function(){
        $('#search_key').val($(this).attr('search_key'))
        $('#search_product_type_id').val($(this).attr('product_type_id'))
        $('#search_category_id').val($(this).attr('category_id'))
        var $form = $('#search_form')
        $form.submit()
    });
    $('#product_info').on('click','.js-relate-price',function(){
        $('#search_product_type_id').val($(this).attr('product_type_id'))
        $('#search_category_id').val($(this).attr('category_id'))
        $('#search_relate_price').val($(this).attr('unit_price'))
        var $form = $('#search_form')
        $form.submit()
    });
    $('.js-relate-price-parent').on('click','.js-relate-price',function(){
        $('#search_product_type_id').val($(this).attr('product_type_id'))
        $('#search_category_id').val($(this).attr('category_id'))
        $('#search_relate_price').val($(this).attr('unit_price'))
        var $form = $('#search_form')
        $form.submit()
    });

    $('#js-search-ul').on('click','.js-search-a',function(){
        $('#search_key').val($(this).attr('search_key'))
        $('#search_category_id').val($(this).attr('category_id'))
        $('#search_product_type_id').val($(this).attr('product_type_id'))
        var $form = $('#search_form')
        $form.submit()
    });
    $('.js-icon-search').on('click',function(){
        $('#search_key').val($(this).attr('search_key'))
        $('#search_product_type_id').val($(this).attr('product_type_id'))
        $('#search_category_id').val($(this).attr('category_id'))
        var $form = $('#search_form')
        $form.submit()
    });
    //$('.js-search-key').on('keyup', function () {
    //    is_login = $('#is_login').val()
    //    if(is_login){
    //        window.location.href = '/search'
    //    }
    //    var search_key = $(this).val()
    //    var $ul = $('#js-search-ul')
    //    $ul.children().remove()
    //    $.ajax({
    //        'type': "post",
    //        'url': "/get_search_product",
    //        'data': {'search_key': search_key},
    //        'dataType': "json",
    //        beforeSend: function () {
    //        },
    //        success: function (data) {
    //            if (data.succ) {
    //                products = data.products
    //                if (products) {
    //                    $ul.children().remove()
    //                    for (var i in products) {
    //                        var $li = $('<li><a class="js-search-a"></a></li>')
    //                        $li.find('a').text(products[i].name)
    //                        $li.find('a').attr('category_id',products[i].category_id)
    //                        $li.find('a').attr('product_type_id',products[i].product_type_id)
    //                        $li.find('a').attr('search_key', products[i].name)
    //                        $ul.append($li)
    //                    }
    //                }
    //            }
    //        }
    //    });
    //})
    $('#search_price_gte').on('keyup', function () {
        $(this).val($(this).val().replace(/[^0-9.]/g, ''))
        value = $(this).val()
        if(value.match(/^\d*?\.?\d*?$/)){
            $(this).val(value)
        }else{
            $(this).val(0)
        }
    });
    $('#search_price_lte').on('keyup', function () {
        $(this).val($(this).val().replace(/[^0-9.]/g, ''))
        value = $(this).val()
        if(value.match(/^\d*?\.?\d*?$/)){
            $(this).val(value)
        }else{
            $(this).val(0)
        }
    });
});
