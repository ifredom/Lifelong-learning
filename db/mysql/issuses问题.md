# issuses


1. SQL_ERROR_INFO: "Duplicate entry '9003' for key 'examination_info.exam_id'"  说明原来的表中已经有了id=9003的数据。
解决办法： replace into examination_info values(null,9003,"SQL","hard",90,"2021-01-01 00:00:00");

2. [Lock wait timeout exceeded; try restarting transaction](https://blog.csdn.net/wsjzzcbq/article/details/85237992)

3. ERROR 1111 Invalid group function

4. count(field) 和 count(*)区别。count(*)是统计总记录条数
count(field)是统计字段部位null的
