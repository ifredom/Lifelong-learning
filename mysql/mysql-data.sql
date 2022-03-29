CREATE TABLE `tl_student` (
  `user_id` varchar(64),
  `username` varchar(255) COMMENT '姓名',
  `sex` int(1) default 1 COMMENT '性别',
  `department` varchar(255) COMMENT '部门',
  PRIMARY KEY (`user_id`)
) ENGINE = `InnoDB` DEFAULT CHARACTER SET utf8mb4 COMMENT = '菜单管理';
INSERT INTO `tl_student` (`user_id`, `username`, `sex`, `department`)
VALUES ('12345678', 'admin', 1, "development");
INSERT INTO `tl_student` (`user_id`, `username`, `sex`, `department`)
VALUES ('asads', 'guess', 2, "boss");