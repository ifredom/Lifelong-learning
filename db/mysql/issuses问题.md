# issuses


1. SQL_ERROR_INFO: "Duplicate entry '9003' for key 'examination_info.exam_id'"  说明原来的表中已经有了id=9003的数据。
解决办法： replace into examination_info values(null,9003,"SQL","hard",90,"2021-01-01 00:00:00");

2. [Lock wait timeout exceeded; try restarting transaction](https://blog.csdn.net/wsjzzcbq/article/details/85237992)

3. ERROR 1111 Invalid group function

4. count(field) 和 count(*)区别。count(*)是统计总记录条数
count(field)是统计字段部位null的


5. SqlSession [org.apache.ibatis.session.defaults.DefaultSqlSession@14c971e2] was not registered for synchronization because synchronization is not active

6. 雪花算法生成得ID，在前端使用会有异常。JS默认智能处理16位得数字，所以需要后台将JSON接口中得数字传唤为String类型