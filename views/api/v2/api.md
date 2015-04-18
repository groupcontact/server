### 目录

1.  [创建用户](#createUser)

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

若有匹配的手机号(密码也需要正确)，则不新创建，返回的`id`为原来的用户ID。

**测试地址**: [api/v2/test/createUser](/api/v2/test/createUser)