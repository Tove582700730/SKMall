package com.qianfeng.dao;

import com.qianfeng.pojo.OrderDetail;
import java.util.List;

public interface OrderDetailMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(OrderDetail record);

    OrderDetail selectByPrimaryKey(Integer id);

    List<OrderDetail> selectAll();

    int updateByPrimaryKey(OrderDetail record);

    /**
     * 添加订单详情
     * @param orderDetail
     */
    void addOrderDetail(OrderDetail orderDetail);

    List<OrderDetail> getOrderDetailListByoid(Integer oid);
}