package com.qianfeng.controller;

import com.github.wxpay.sdk.MyWXConfig;
import com.github.wxpay.sdk.WXPay;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.EncodeHintType;
import com.google.zxing.MultiFormatWriter;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.decoder.ErrorCorrectionLevel;
import io.goeasy.GoEasy;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/pay")
public class WxPayController {

    /**
     * 调用统一下单的接口,根据微信支付返回的链接生成微信支付的二维码
     */
    @RequestMapping("/generateCode")
    public void generateCode(Integer oid, HttpServletResponse response){
        //1. 加载自己配置的MyWXConfig类(里面有对应商家的应用id 商家id 密钥)
        MyWXConfig myWXConfig = new MyWXConfig();
        try {
            WXPay wxpay = new WXPay(myWXConfig);
            Map<String, String> data = new HashMap<String, String>();
            data.put("body", "千锋-山科大");//商品描述
            data.put("out_trade_no", System.currentTimeMillis()+"");//商户订单号  唯一
            data.put("device_info", "");
            data.put("fee_type", "CNY");//人民币
            data.put("total_fee", "1");//1分钱  单位是分
            data.put("spbill_create_ip", "123.12.12.123");
            //这里使用的是内网穿透的ip，来调用下面的通知的接口
            data.put("notify_url", "http://vfbf68.natappfree.cc/pay/notifyUrl");//异步接收微信支付结果通知的回调地址
            data.put("trade_type", "NATIVE");  // 此处指定为扫码支付
            data.put("product_id", "12");
            //2. 调用统一下单接口
            //返回的resp中包含生成二维码的支付短链接
            Map<String, String> resp = wxpay.unifiedOrder(data);
            //3. 使用zxing将链接生成二维码
            HashMap<EncodeHintType, Object> hints = new HashMap<>();
            hints.put(EncodeHintType.CHARACTER_SET,"utf-8");//编码格式
            hints.put(EncodeHintType.ERROR_CORRECTION,ErrorCorrectionLevel.M);//容错率
            //边距
            hints.put(EncodeHintType.MARGIN,2);
            //生成二维码图片
            BitMatrix bitMatrix = new MultiFormatWriter().encode(resp.get("code_url"), BarcodeFormat.QR_CODE, 200, 200, hints);
            //把生成的图片使用输出流反馈给前端
            MatrixToImageWriter.writeToStream(bitMatrix,"png",response.getOutputStream());
            System.out.println("二维码创建完成");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    /**
     * 微信异步通知商家支付结果的接口
     */
    @RequestMapping("/notifyUrl")
    public void notifyUrl(HttpServletResponse response){
        //1. 告诉我们此平台的前端(用户能够看到的界面)支付成功的消息
        // 使用消息推送第三方库(goeasy)去按照频道推送成功的消息，接收方也要按照频道接收消息
        GoEasy goEasy = new GoEasy("http://rest-hangzhou.goeasy.io","BC-6b81de867ffe45c6bcab6c69719314f4");// 应用详情中的common key
        //推送消息的频道
        goEasy.publish("qianfeng", "success");
        //2. 告诉微信平台我收到消息了
        try {
            response.getWriter().write("<xml>\n" +
                    "  <return_code><![CDATA[SUCCESS]]></return_code>\n" +
                    "  <return_msg><![CDATA[OK]]></return_msg>\n" +
                    "</xml>");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
