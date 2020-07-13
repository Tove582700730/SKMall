package com.qianfeng.controller;

import com.qianfeng.pojo.Book;
import com.qianfeng.pojo.Shopping;
import com.qianfeng.service.BookService;
import com.qianfeng.service.ShoppingService;
import com.qianfeng.util.ResultVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController//即是controller，而且这个类中的所有方法返回的都是json对象
@RequestMapping("/books")
public class BookController {

    @Autowired
    private BookService bookService;
    @Autowired
    private ShoppingService shoppingService;

    @RequestMapping("/getBookByTypeId")
    public ResultVo getBookByTypeId(Integer tid){
        //调用service层的根据类型id查询图书列表的方法
        List<Book> bookList = bookService.getBookByTypeId(tid);
        return ResultVo.success("success",bookList);
    }
    @RequestMapping("/bookDetailById")
    public ResultVo getBookDetailById(Integer bid){
        Book book = bookService.getBookDetailById(bid);
        return ResultVo.success("success",book);
    }

    @RequestMapping("/addShopping")
    public ResultVo addShopping(@RequestBody Shopping shopping, HttpSession session){
        ResultVo resultVo = shoppingService.addShopping(shopping,session);
        return resultVo;
    }
    @RequestMapping("/getShoppingList")
    public ResultVo getShoppingList(HttpSession session){
        ResultVo resultVo = shoppingService.getShoppingList(session);
        return resultVo;
    }
}
