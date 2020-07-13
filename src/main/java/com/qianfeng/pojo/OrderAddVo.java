package com.qianfeng.pojo;

import java.util.Arrays;

/**
 * 我为了接收前端提交的购物车id数组和总金额定义的类
 * 注意：这个类跟数据库没有对应关系
 */
public class OrderAddVo {
    private Integer[] sids;
    private Double totalMoney;

    public Integer[] getSids() {
        return sids;
    }

    public void setSids(Integer[] sids) {
        this.sids = sids;
    }

    public Double getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(Double totalMoney) {
        this.totalMoney = totalMoney;
    }

    @Override
    public String toString() {
        return "OrderAddVo{" +
                "sids=" + Arrays.toString(sids) +
                ", totalMoney=" + totalMoney +
                '}';
    }
}
