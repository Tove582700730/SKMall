package com.qianfeng.dao;

import com.qianfeng.pojo.Types;
import java.util.List;

public interface TypesMapper {
    int deleteByPrimaryKey(Integer tid);

    int insert(Types record);

    Types selectByPrimaryKey(Integer tid);

    List<Types> selectAll();

    int updateByPrimaryKey(Types record);
}