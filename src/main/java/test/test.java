package test;

import  java.util.*;
public class test<MVP> {

    public static void main(String[] args) {
        test aa = new test();
       Collection<String> arr = new ArrayList<>();
        arr.add("add");
        aa.show(333);

    }


        public  <MVP> void show(MVP mvp) {
            System.out.println(mvp.getClass());
        }

        public  <MVP> MVP show2(MVP mvp) {
            System.out.println(mvp.getClass());
            return mvp;
        }

}


