package com.qianfeng.util;

import java.util.List;

/**
 * 用来返回前端json数据的实体类
 */
public class ResultVo {

    /**
     * 状态码
     */
    private Integer code;
    /**
     * 状态描述
     */
    private String msg;
    /**
     * 返回结果
     */
    private Object data;
    /**
     * 构造方法私有化
     */
    private ResultVo(){

    }
    public static ResultVo success(String msg){
        return success(msg,null);
    }
    /**
     * 成功
     * code :0
     */
    public static ResultVo success(String msg,Object data){
        return createVo(0,msg,data);
    }
    public static ResultVo error(String msg){
        return error(msg,null);
    }
    /**
     * 失败
     * code:1
     */
    public static ResultVo error(String msg,Object data){
        return createVo(1,msg,data);
    }
    private static ResultVo createVo(Integer code,String msg,Object data){
        ResultVo resultVo = new ResultVo();
        resultVo.setCode(code);
        resultVo.setMsg(msg);
        resultVo.setData(data);
        return resultVo;
    }

    public Integer getCode() {
        return code;
    }

    public void setCode(Integer code) {
        this.code = code;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
