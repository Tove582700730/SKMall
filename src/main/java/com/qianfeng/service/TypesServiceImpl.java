package com.qianfeng.service;

import com.qianfeng.dao.TypesMapper;
import com.qianfeng.pojo.Types;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TypesServiceImpl implements TypesService {

    @Autowired
    private TypesMapper typesMapper;


    @Override
    public List<Types> getTypesList() {
        //1. 直接查询所有的类型，返回集合
        List<Types> typesList = typesMapper.selectAll();//集合长度是19
        //2. 定义一个集合，用来存储最后的树状菜单
        List<Types> finalTypesList = new ArrayList<>();
        //3. 定义一个集合，用来存储所有的父菜单
        List<Types> parentTypeList = new ArrayList<>();
        //4. 遍历所有的菜单
        for (Types type:typesList){
            //找出所有的一级菜单
            if(type.getPid()==null){
                //一定是一级菜单
                finalTypesList.add(type);
                //一级菜单就是父菜单
                parentTypeList.add(type);
            }else{
                //有可能是二级、三级
                //遍历所有的父菜单
                for(Types parent:parentTypeList){
                    //条件：子菜单的pid和父菜单的tid一致
                    if(parent.getTid().equals(type.getPid())){
                        //将子菜单添加到此父菜单的子菜单集合中
                        parent.getChildTypes().add(type);
                        //这个菜单也有可能是别人的父菜单
                        parentTypeList.add(type);
                        break;
                    }
                }
            }
        }
        return finalTypesList;
    }
}
