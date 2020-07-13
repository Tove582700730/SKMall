package com.qianfeng.dao;

import com.qianfeng.pojo.OrderDetail;
import com.qianfeng.pojo.Orders;
import java.util.List;

public interface OrdersMapper {
    int deleteByPrimaryKey(Integer oid);

    int insert(Orders record);

    Orders selectByPrimaryKey(Integer oid);

    List<Orders> selectAll();

    int updateByPrimaryKey(Orders record);

    /**
     * 添加订单主表内容
     * @param orders
     */
    void addOrder(Orders orders);


}