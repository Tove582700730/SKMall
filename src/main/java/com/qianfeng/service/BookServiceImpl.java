package com.qianfeng.service;

import com.qianfeng.dao.BookMapper;
import com.qianfeng.pojo.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookMapper bookMapper;

    @Override//对接口中的两个方法的重写
    public List<Book> getBookByTypeId(Integer tid) {
        List<Book> bookList = bookMapper.getBookByTypeId(tid);
        return bookList;
    }

    @Override
    public Book getBookDetailById(Integer bid) {

        return bookMapper.selectByPrimaryKey(bid);
    }
}
