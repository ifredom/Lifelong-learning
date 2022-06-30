# mongodb

[mongodb操作](https://juejin.cn/post/6844903959149150216#heading-3)
[mongodb文档](https://www.springcloud.cc/spring-data-mongodb.html#get-started:first-steps:spring)
spring data MongoDB

导出集合数据：
```bash
mongoexport -d firstdemo -c device -o device.json
```

## MongoTemplate类进行增删改查

> 增

- insert：插入一个对象。如果存在具有相同id的现有文档，则会生成错误。

- insertAll：将Collection个对象作为第一个参数。此方法根据先前指定的规则检查每个对象并将其插入到适当的集合中。

- save：保存对象，覆盖可能具有相同id的任何对象。

```java
@Service
public class MongodbService {
    @Autowired
    private MongoTemplate mongoTemplate;

    /**
     * 新增文档
     *
     * @param userDTO
     * @return
     */
    public UserDTO insert(UserDTO userDTO) {
        //insert方法并不提供级联类的保存，所以级联类需要先自己先保存
        return mongoTemplate.insert(userDTO);
    }

    public UserDTO save(UserDTO userDTO) {
        Sort sort = new Sort(Sort.Direction.DESC, "name");
        userDTO = mongoTemplate.findOne(Query.query(Criteria.where("")).with(sort), UserDTO.class);
        return mongoTemplate.save(userDTO);
    }

    /**
     * 删除文档
     * NOTE:remove方法不支持级联删除所以要单独删除子数据
     * @param name
     */
    public void remove(String name) {
        //根据名字查询数据并删除
        UserDTO userDTO = mongoTemplate.findOne(Query.query(Criteria.where("name").is(name)), UserDTO.class);
        //remove方法不支持级联删除所以要单独删除子数据
        List<AddressDTO> addressList = userDTO.getAddressList();
        for (AddressDTO addressDTO : addressList) {
            mongoTemplate.remove(addressDTO);
        }
        //删除主数据
        mongoTemplate.remove(userDTO);
    }

    /**
     * 更新文档
     * @param userDTO
     */
    public void update(UserDTO userDTO) {
        mongoTemplate.updateFirst(Query.query(Criteria.where("name").is(userDTO.getName())), Update.update("age", userDTO.getAge()), UserDTO.class);
    }

    /**
     * 查询文档
     * @param name
     */
    public void find(String name) {
        Sort sort = new Sort(Sort.Direction.DESC, "name");
        List<UserDTO> userDTOS = mongoTemplate.find(Query.query(Criteria.where("name").is(name)), UserDTO.class);
        //基于sort排序使用findOne查询最新一条记录
        UserDTO userDTO = mongoTemplate.findOne(Query.query(Criteria.where("name").is(name)).with(sort), UserDTO.class);
        //模糊查询
        List<UserDTO> userDTOList = mongoTemplate.find(Query.query(Criteria.where("name").is(name).regex(name)).with(sort), UserDTO.class);
        //分页查询
        Pageable pageable = PageRequest.of(3, 20, sort);
        List<UserDTO> userDTOPageableList = mongoTemplate.find(Query.query(Criteria.where("name").is(name)).with(pageable), UserDTO.class);
        //总数
        long conut = mongoTemplate.count(Query.query(Criteria.where("name").is(name)), UserDTO.class);
        Page<UserDTO> page = new PageImpl(userDTOPageableList, pageable, conut);
    }
}
```
## Criteria
