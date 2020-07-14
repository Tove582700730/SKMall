package com.qianfeng.dao;

import com.qianfeng.pojo.Shopping;
import java.util.List;

public interface ShoppingMapper {
    int deleteByPrimaryKey(Integer sid);//删除操作的实现

    int insert(Shopping record);

    Shopping selectByPrimaryKey(Integer sid);

    List<Shopping> selectAll();

    int updateByPrimaryKey(Shopping record);

    /**
     * 添加到购物车
     * @param shopping
     */
    void addShopping(Shopping shopping);

    /**
     * 根据bid和uid查询购物车
     * @param shopping
     * @return
     */
    Shopping getShoppingByuidAndbid(Shopping shopping);

    /**
     * 根据bid和uid更新购物车数量
     * @param shopping
     */
    void updateShoppingCountByuidAndbid(Shopping shopping);

    /**
     * 根据用户id查询所有的购物车
     * @param uid
     * @return
     */
    List<Shopping> getShoppingListByuid(Integer uid);
}