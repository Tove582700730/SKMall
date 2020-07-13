package com.github.wxpay.sdk;

import java.io.InputStream;

public class MyWXConfig extends WXPayConfig {
    String getAppID() {
        return "wx632c8f211f8122c6";
    }

    String getMchID() {
        return "1497984412";
    }

    String getKey() {
        return "sbNCm1JnevqI36LrEaxFwcaT0hkGxFnC";
    }

    InputStream getCertStream() {
        return null;
    }

    IWXPayDomain getWXPayDomain() {
        return new WXPayDomain();
    }

    class WXPayDomain implements IWXPayDomain{

        public void report(String domain, long elapsedTimeMillis, Exception ex) {

        }

        public DomainInfo getDomain(WXPayConfig config) {
            return new DomainInfo("api.mch.weixin.qq.com",true);
        }
    }
}
