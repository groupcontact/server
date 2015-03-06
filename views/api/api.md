### 目录

1.  [创建群组](#createGroup)
2.  [删除群组](#deleteGroup)
3.  [注册用户](#createUser)
4.  [查询用户加入的组](#listGroup)
5.  [查询组内所有用户](#listUser)
6.  [更新个人信息](#editUser)
7.  [加入某个组](#joinGroup)
8.  [离开某个组](#leaveGroup)
9.  [搜索群组](#searchGroup)

<h3 id="createGroup">1. 创建群组</h3>

post请求至:

<pre><code>/api/createGroup</code></pre>

**参数**:

*   `name`: 群组名称
*   `desc`: 群组描述
*   `accessToken`: 访问密码
*   `modifyToken`: 修改密码

**返回结果**:

<pre><code>{
    status: 0,
    info: "",
    id: 0
}</code></pre>

**测试地址**: [/apitest/createGroup](/apitest/createGroup)

<h3 id="deleteGroup">2. 删除群组</h3>

post请求至:

<pre><code>/api/delete</code></pre>

**参数**:

*   `gid`: 群组ID
*   `modifyToken`: 该群组的修改密码

**返回结果**:

<pre><code>{
    status: 0,
    info: ""
}</code></pre>

**测试地址**: [/apitest/deleteGroup](/apitest/deleteGroup)

<h3 id="createUser">3. 注册用户</h3>

post请求至:

<pre><code>/api/createUser</code></pre>

**参数**:

*   `name`: 用户名
*   `phone`: 用户的手机号

**返回结果**

<pre><code>{
    status: 0,
    info: "",
    id: 1
}</code></pre>

**注释**:

若有匹配的用户名与手机号，则不新创建，返回的`id`为原来的用户ID。

**测试地址**: [apitest/createUser](/apitest/createUser)

<h3 id="listGroup">4. 查询用户加入的组</h3>

get请求至:

<pre><code>/api/listGroup</code></pre>

**参数**:

*   `uid`: 用户ID

**返回结果**

<pre><code>[
    {
        id: "",
        name: "",
        desc: ""
    }
]</code></pre>

**测试地址**: [/apitest/listGroup](/apitest/listGroup)

<h3 id="listUser">5. 查询组内所有用户</h3>

get请求至:

<pre><code>/api/listUser</code></pre>

**参数**:

*   `gid`: 群组ID
*   `accessToken`: 群组访问ID

**返回结果**:

<pre><code>[
    {
        id: 1,
        name: "",
        phone: 13333333333
    }
]</code></pre>

**测试地址**: [/apitest/listUser](/apitest/listUser)

<h3 id="editUser">6. 更新个人信息</h3>

post请求至:

<pre><code>/api/editUser</code></pre>

**参数**:

*   `uid`: 用户ID
*   `name`: 用户名
*   `phone`: 手机号

**返回结果**:

<pre><code>{
    status: 0,
    info: ""
}</code></pre>

**测试地址**: [/apitest/editUser](/apitest/editUser)

<h3 id="joinGroup">7. 加入某个群组</h3>

post请求至:

<pre><code>/api/joinGroup</code></pre>

**参数**:

*   `uid`: 用户ID
*   `gid`: 群组ID
*   `accessToken`: 群组的访问密码

**返回结果**:

<pre><code>{
    status: 0,
    info: ""
}</code></pre>

**测试地址**: [/apitest/joinGroup](/apitest/joinGroup)

<h3 id="leaveGroup">8. 离开某个群组</h3>

post请求至:

<pre><code>/api/leaveGroup</code></pre>

**参数**:

*   `uid`: 用户ID
*   `gid`: 群组ID

**返回结果**:

<pre><code>{
    status: 0,
    info: ""
}</code></pre>

**测试地址**: [/apitest/leaveGroup](/apitest/leaveGroup)

<h3 id="searchGroup">9. 搜索群组</h3>

get请求至:

<pre><code>/api/searchGroup</code></pre>

**参数**:

*   `name`: 群组名称

**返回结果**:

<pre><code>[
    {
        id: "",
        name: "",
        desc: ""
    }
]</code></pre>

**测试地址**: [/apitest/searchGroup](/apitest/searchGroup)
