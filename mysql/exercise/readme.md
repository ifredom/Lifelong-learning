# 查询


## 简单查询

> 查找部门12个月的薪资
mysql> select sal*12 as "dept sal" from emp；
> 查找薪资再2450 -5000的员工
mysql> select ename,sal from emp where sal>=2450 and sal<=5000;
mysql> select ename,sal from emp where sal between 2450 and 5000;

> 查找津贴为null的员工
mysql> select ename,sal from emp where comm is null;
mysql> select ename,sal from emp where comm is not null;


> 查找工作岗位是manager，并且薪资大于2500的员工
mysql> select ename,sal from emp where job="manager" and sal>2500;

> 查找工作岗位是 manager，或  analyst 的员工
mysql> select ename,sal,job from emp where job="manager" or job="analyst";

> 查找薪资高于2500，并且工作岗位是 manager，或 analyst 的员工
mysql> select ename,sal,job from emp where sal>2500 and (job="manager" or job="analyst");

> 查找工作岗位是 manager，或  analyst 的员工
mysql> select ename,sal,job from emp where  job in ("manager","analyst");

## 模糊查询 like

- 不区分大小写
- 查找姓名中含有字母 O 的员工
mysql> select ename,sal from emp where ename like "%o%";
- 查找姓名以字母 T 结尾的员工
mysql> select ename,sal from emp where ename like "%t";
- 查找姓名以字母 A 开始的员工
mysql> select ename,sal from emp where ename like "a%";
- 查找姓名中第二个字母是 A 的员工
mysql> select ename,sal from emp where ename like "_a%";
- 查找姓名中第三个字母是 A 的员工
mysql> select ename,sal from emp where ename like "__a%";
- 查找姓名含有下划线的员工
mysql> select ename,sal from emp where ename like "%\_%";

## 升序，降序
- 降序
mysql> select ename,sal from emp order by sal desc;
- 升序（默认）
mysql> select ename,sal from emp order by sal asc;

## 多条件查询
按照薪资降序排列，只有薪资相同时，才按照姓名升序排列

- 查找员工名字和薪资，按照薪资降序，再按照名字升序
> mysql>  select ename,sal from emp order by sal desc,ename asc;
> 
- 查找员工名字和薪资，按照薪资降序，再按照名字升序
> mysql>  select ename,sal from emp where sal between 2500 and 3000 order by sal desc;
> 
## 单行处理函数
mysql>  select lower(ename) from emp;
mysql>  select upper(ename) from emp;
- 查找员工名字第二个字母是A的员工姓名
mysql>  select ename from emp where substr(ename,2,1) = "A";
- concat()  查询所有员工，并以首字母大写的形式展示
mysql>  select concat(upper(substr(ename,1,1)),lower(substr(ename,2,length(ename)-1))) as "首字母大写显示" from emp ;