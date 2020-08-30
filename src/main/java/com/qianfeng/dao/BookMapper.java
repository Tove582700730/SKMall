package com.qianfeng.dao;

import com.qianfeng.pojo.Book;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface BookMapper {
    int deleteByPrimaryKey(Integer bookId);

    int insert(Book record);

    Book selectByPrimaryKey(@Param("bookId") Integer bookId);

    List<Book> selectAll();

    int updateByPrimaryKey(Book record);

    /**
     * 根据类型id查询图书列表
     * @param tid
     * @return
     */
    List<Book> getBookByTypeId(Integer tid);
}