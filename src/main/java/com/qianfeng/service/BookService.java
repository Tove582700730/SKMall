package com.qianfeng.service;

import com.qianfeng.pojo.Book;

import java.util.List;

public interface BookService {

    /**
     * 根据类型id查询所有图书
     * @param tid
     * @return
     */
    public  abstract List<Book> getBookByTypeId(Integer tid);

    /**
     * 根据图书id查询详情
     * @param bid
     * @return
     */
   public abstract  Book getBookDetailById(Integer bid);


}
