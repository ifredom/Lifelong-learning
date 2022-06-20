package com.example.commonmybatisplus;

import com.example.commonmybatisplus.dao.UserDao;
import com.example.commonmybatisplus.entity.UserEntity;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

/**
 * @Author ifredomvip@gmail.com
 * @Date 2022/6/20 9:08
 * @Version 1.0.0
 * @Description
 **/
@SpringBootTest
public class TransactionTest {

    @Autowired
    private TransactionTemplate transactionTemplate;

    @Autowired
    private UserDao userDao;

    /**
     * 编程式事务
     * https://github.com/itwanger/toBeBetterJavaer/blob/master/docs/springboot/transaction.md
    **/
    @Test
    public void loadContext() {
        transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(TransactionStatus status) {
                try {
                    UserEntity user = new UserEntity();
                    user.setName("transaction");
                    user.setAge(25);
                    user.setSex(2);
                    userDao.insert(user);

                    int i = 1 / 0;

                } catch (Exception e) {
                    System.out.println("异常" + e);
                    // 回滚
                    status.setRollbackOnly();
                }
            }
        });
    }

    @Test
	@Transactional
    public void loadContext1() {
        UserEntity user = new UserEntity();
        user.setName("transaction222");
        user.setAge(35);
        user.setSex(1);
        userDao.insert(user);
        int i = 1 / 0;
        System.out.println("异常11111============");
    }
}
