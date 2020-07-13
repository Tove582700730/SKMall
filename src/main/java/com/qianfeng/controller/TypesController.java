package com.qianfeng.controller;

import com.qianfeng.pojo.Types;
import com.qianfeng.service.TypesService;
import com.qianfeng.util.ResultVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/types")
public class TypesController {

    @Autowired
    private TypesService typesService;


    /**
     * 查询所有菜单集合(返回的集合一定是树结构)
     */
    @RequestMapping("/list")
    @ResponseBody
    public ResultVo getTypesList(){
        List<Types> typesList = typesService.getTypesList();
        return ResultVo.success("success",typesList);
    }
}
