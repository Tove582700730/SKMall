package com.qianfeng.service;


import com.qianfeng.pojo.OrderAddVo;
import com.qianfeng.util.ResultVo;

import javax.servlet.http.HttpSession;

public interface OrderService {

    /**
     * 添加订单：
     *  1. 订单主表
     *  2. 订单详情表
     * @param orderAddVo
     * @param session
     * @return
     */
    ResultVo addOrder(OrderAddVo orderAddVo, HttpSession session);

    /**
     * 根据订单主表的id查询对应的所有详情
     */
    ResultVo getOrderDetailList(Integer oid,HttpSession session);
}
