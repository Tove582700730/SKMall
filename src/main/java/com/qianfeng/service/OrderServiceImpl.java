package com.qianfeng.service;

import com.qianfeng.dao.BookMapper;
import com.qianfeng.dao.OrderDetailMapper;
import com.qianfeng.dao.OrdersMapper;
import com.qianfeng.dao.ShoppingMapper;
import com.qianfeng.pojo.*;
import com.qianfeng.util.ResultVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrdersMapper ordersMapper;
    @Autowired
    private ShoppingMapper shoppingMapper;
    @Autowired
    private OrderDetailMapper orderDetailMapper;
    @Autowired
    private BookMapper bookMapper;


    @Override
    public ResultVo addOrder(OrderAddVo orderAddVo, HttpSession session) {
        Users loginUser = (Users)session.getAttribute("loginUser");
        if(loginUser==null){
            return ResultVo.error("未登录");
        }else{
            //1. 添加订单主表(时间、用户id、总金额)
            Orders orders = new Orders();
            orders.setCreatetime(new Date());
            orders.setOrderPrice(orderAddVo.getTotalMoney());
            orders.setUid(loginUser.getUid());
            //在OrdersMapper中对order添加做了一个修改：
            // 添加数据之后直接返回刚刚添加自动递增生成的id，返回给传入的参数orders的属性
            // 总结：在执行addOrder之前，orders的id属性没有值，执行之后，就有id值了
            ordersMapper.addOrder(orders);
            //2. 添加订单详情表(订单主表id、商品id、数量)
            //2.1 遍历所有购物车的sid
            for(Integer sid:orderAddVo.getSids()){
                //根据购物车sid查询购物车对象，获取商品id和数量
                Shopping shopping = shoppingMapper.selectByPrimaryKey(sid);
                OrderDetail orderDetail = new OrderDetail();
                orderDetail.setBid(shopping.getBid());
                orderDetail.setNum(shopping.getNum());
                orderDetail.setOid(orders.getOid());
                //循环添加到订单详情中
                orderDetailMapper.addOrderDetail(orderDetail);
            }
            //为了便于前端查询订单详情，所以将订单主表的id返回给前端
            return ResultVo.success("success",orders.getOid());
        }

    }

    @Override
    public ResultVo getOrderDetailList(Integer oid,HttpSession session) {
        Users loginUser = (Users)session.getAttribute("loginUser");
        if(loginUser==null){
            return ResultVo.error("未登录");
        }else{
            List<OrderDetail> orderDetailList = orderDetailMapper.getOrderDetailListByoid(oid);
            for (OrderDetail orderDetail:orderDetailList){
                Book book = bookMapper.selectByPrimaryKey(orderDetail.getBid());
                orderDetail.setBook(book);
            }
            return ResultVo.success("success",orderDetailList);
        }
    }
}
