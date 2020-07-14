package com.qianfeng.service;

import com.qianfeng.pojo.Shopping;
import com.qianfeng.util.ResultVo;

import javax.servlet.http.HttpSession;

public interface ShoppingService {
    /**
     * 添加到购物车
     * @param shopping
     * @param session
     * @return
     */
    ResultVo addShopping(Shopping shopping, HttpSession session);
   // ResultVo deletebook(Shopping shopping, HttpSession session);
    ResultVo getShoppingList(HttpSession session);

    ResultVo deleteShopping(Integer sid);
}
