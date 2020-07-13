package com.qianfeng.pojo;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

public class Types implements Serializable {
    private Integer tid;

    private String tname;

    private Integer level;

    private Integer pid;

    /**
     * 每一个菜单里面都可能会有多个子菜单
     */
    private List<Types> childTypes = new ArrayList<>();

    public List<Types> getChildTypes() {
        return childTypes;
    }

    public void setChildTypes(List<Types> childTypes) {
        this.childTypes = childTypes;
    }

    private static final long serialVersionUID = 1L;

    public Integer getTid() {
        return tid;
    }

    public void setTid(Integer tid) {
        this.tid = tid;
    }

    public String getTname() {
        return tname;
    }

    public void setTname(String tname) {
        this.tname = tname == null ? null : tname.trim();
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    @Override
    public String toString() {
        return "Types{" +
                "tid=" + tid +
                ", tname='" + tname + '\'' +
                ", level=" + level +
                ", pid=" + pid +
                ", childTypes=" + childTypes +
                '}';
    }
}