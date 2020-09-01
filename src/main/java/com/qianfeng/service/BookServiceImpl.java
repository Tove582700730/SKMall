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
    /* Service层调用Dao层  所以要初始化一个bookMapper */

    @Override//对接口中的两个方法的重写
    public List<Book> getBookByTypeId(Integer tid) {
        List<Book> bookList = bookMapper.getBookByTypeId(tid);
        return bookList;
    }

    @Override
    public Book getBookDetailById(Integer bid) {

        return bookMapper.selectByPrimaryKey(bid);
    }

   /* @Override
    public int addBook(Book book) {
        return bookMapper.insert(book);
    }*/

}
