package com.qianfeng.controller;

import com.qianfeng.pojo.OrderAddVo;
import com.qianfeng.service.OrderService;
import com.qianfeng.util.ResultVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@RestController
@RequestMapping("/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    /**
     * 既有选中购物车的id数组，又有总金额
     * @param orderAddVo
     * @return
     */
    @RequestMapping("/add")
    public ResultVo add(@RequestBody OrderAddVo orderAddVo, HttpSession session){
        ResultVo resultVo = orderService.addOrder(orderAddVo,session);
        return resultVo;
    }
    /**
     * 根据订单主表的id查询对应的所有详情
     */
    @RequestMapping("/list")
    public ResultVo getOrderDetailList(Integer oid,HttpSession session){
        ResultVo resultVo = orderService.getOrderDetailList(oid,session);
        return resultVo;
    }
}
