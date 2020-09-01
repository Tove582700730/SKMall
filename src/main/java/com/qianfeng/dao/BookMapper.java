package com.qianfeng.dao;

import com.qianfeng.pojo.Book;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BookMapper {


    int insert(Book record);//增加一本书
    int deleteByPrimaryKey(Integer bookId);//通过主键也就是id删除一本书
    int updateByPrimaryKey(Book record);//更新一本书的信息
    List<Book> selectAll();//查询所有的图书
    Book selectByPrimaryKey(@Param("bookId") Integer bookId);//通过bookId查询一本书

    List<Book> getBookByTypeId(Integer tid);

    /**
     * 根据类型id查询图书列表
     * @param tid
     * @return
     */


}