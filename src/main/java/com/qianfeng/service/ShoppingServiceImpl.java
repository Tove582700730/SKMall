package com.qianfeng.service;

import com.qianfeng.dao.BookMapper;
import com.qianfeng.dao.ShoppingMapper;
import com.qianfeng.pojo.Book;
import com.qianfeng.pojo.Shopping;
import com.qianfeng.pojo.Users;
import com.qianfeng.util.ResultVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpSession;
import java.util.List;

@Service
public class ShoppingServiceImpl implements ShoppingService {

    @Autowired
    private ShoppingMapper shoppingMapper;
    @Autowired
    private BookMapper bookMapper;

    @Override
    public ResultVo addShopping(Shopping shopping, HttpSession session) {
        Users loginUser = (Users) session.getAttribute("loginUser");
        if(loginUser==null){
            return ResultVo.error("未登录，请先登录");
        }else{
            shopping.setUid(loginUser.getUid());
            //先根据用户id和商品id查询购物车,如果查询为空，没有购买过，直接添加，如果不为空，更新数量
            Shopping oldShopping = shoppingMapper.getShoppingByuidAndbid(shopping);
            if(oldShopping==null){
                //直接添加
                shoppingMapper.addShopping(shopping);
            }else{
                //已经购买过，更新数量
                shopping.setNum(oldShopping.getNum()+shopping.getNum());
                shoppingMapper.updateShoppingCountByuidAndbid(shopping);
            }
            return ResultVo.success("购物车添加成功");
        }
    }

    @Override
    public ResultVo getShoppingList(HttpSession session) {
        Users loginUser = (Users) session.getAttribute("loginUser");
        if(loginUser==null){
            return ResultVo.error("未登录，请先登录");
        }else{
            //根据用户id查询购物车列表
            List<Shopping> shoppingList = shoppingMapper.getShoppingListByuid(loginUser.getUid());
            for (Shopping shopping:shoppingList){
                //查询图像信息并赋值给shopping对象
                Book book = bookMapper.selectByPrimaryKey(shopping.getBid());
                shopping.setBook(book);
            }
            return ResultVo.success("success",shoppingList);
        }

    }
}
