package com.qianfeng.util;

import com.qianfeng.pojo.Users;
import org.apache.shiro.crypto.hash.Md5Hash;

public class Md5Util {

    /**
     * 封装一个返回加密之后结果的方法
     * 使用用户名作为盐，对密码进行加密
     */
    public static String secret(String salt,String password){
        Md5Hash md5Hash = new Md5Hash(password,salt,100);
        return md5Hash.toString();//返回加密之后的字符串
    }

    public static void main(String[] args) {
        String secret = secret("12345678", "123456");
        System.out.println(secret);
    }
}
