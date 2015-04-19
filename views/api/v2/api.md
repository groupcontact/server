### 目录

1.  [创建用户](#createUser)
2.  [更新用户信息](#updateUser)

<h3 id="createUser">1. 注册用户</h3>

post请求至:

<pre><code>/api/v2/users</code></pre>

**参数**:

*   `phone`: 用户的手机号
*   `password`: 密码

**返回结果**

<pre><code>{
    status: 0,
    info: "",
    id:
}</code></pre>

**注释**:

若有匹配的手机号与密码, 则不新创建，返回的`id`为原来的用户ID。

`status`为1时表示新增记录成功(或记录已存在但是`name`字段未设置), 为2时表示记录已存在, 且`name`字段已设置好

**测试地址**: [api/v2/test/createUser](/api/v2/test/createUser)

<h3 id="updateUser">2. 更新用户信息</h3>

put请求至:

<pre><code>/api/v2/users/:id</code></pre>

**参数**:

*   `name`: 新的用户名
*   `phone`: 新的手机号
*   `ext`: 新的扩展字段信息
*   `password`: 密码

**注释**:

为了符合Restful标准, 需要将用户ID作为参数放入链接中, 并且需要使用PUT的方法类型, 暂时不支持修改密码。

**测试地址**: [api/v2/test/updateUser](/api/v2/test/updateUser)
