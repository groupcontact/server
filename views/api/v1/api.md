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
10. [查询用户](#findUser)
11. [列举好友](#listFriend)
12. [添加好友](#addFriend)
13. [删除好友](#deleteFriend)
14. [设置群组字段](#updateField)
15. [更新用户在群组中的信息](#updateUserInGroup)

<h3 id="createGroup">1. 创建群组</h3>

post请求至:

<pre><code>/api/v1/createGroup</code></pre>

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

**测试地址**: [/api/v1/test/createGroup](/api/v1/test/createGroup)

<h3 id="deleteGroup">2. 删除群组</h3>

post请求至:

<pre><code>/api/v1/deleteGroup</code></pre>

**参数**:

*   `gid`: 群组ID
*   `modifyToken`: 该群组的修改密码

**返回结果**:

<pre><code>{
    status: 0,
    info: ""
}</code></pre>

**测试地址**: [/api/v1/test/deleteGroup](/api/v1/test/deleteGroup)

<h3 id="createUser">3. 注册用户</h3>

post请求至:

<pre><code>/api/v1/createUser</code></pre>

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

**测试地址**: [api/v1/test/createUser](/api/v1/test/createUser)

<h3 id="listGroup">4. 查询用户加入的组</h3>

get请求至:

<pre><code>/api/v1/listGroup</code></pre>

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

**测试地址**: [/api/v1/test/listGroup](/api/v1/test/listGroup)

<h3 id="listUser">5. 查询组内所有用户</h3>

get请求至:

<pre><code>/api/v1/listUser</code></pre>

**参数**:

*   `gid`: 群组ID
*   `accessToken`: 群组访问ID

**返回结果**:

<pre><code>[
    {
        id: 1,
        name: "",
        phone: 13333333333,
        ext: ""

    }
]</code></pre>

**测试地址**: [/api/v1/test/listUser](/api/v1/test/listUser)

<h3 id="editUser">6. 更新个人信息</h3>

post请求至:

<pre><code>/api/v1/editUser</code></pre>

**参数**:

*   `uid`: 用户ID
*   `name`: 用户名
*   `phone`: 手机号
*   `ext`: 扩展字段

**返回结果**:

<pre><code>{
    status: 0,
    info: ""
}</code></pre>

**测试地址**: [/api/v1/test/editUser](/api/v1/test/editUser)

<h3 id="joinGroup">7. 加入某个群组</h3>

post请求至:

<pre><code>/api/v1/joinGroup</code></pre>

**参数**:

*   `uid`: 用户ID
*   `gid`: 群组ID
*   `accessToken`: 群组的访问密码

**返回结果**:

<pre><code>{
    status: 0,
    info: ""
}</code></pre>

**测试地址**: [/api/v1/test/joinGroup](/api/v1/test/joinGroup)

<h3 id="leaveGroup">8. 离开某个群组</h3>

post请求至:

<pre><code>/api/v1/leaveGroup</code></pre>

**参数**:

*   `uid`: 用户ID
*   `name`: 用户名
*   `gid`: 群组ID

**返回结果**:

<pre><code>{
    status: 0,
    info: ""
}</code></pre>

**测试地址**: [/api/v1/test/leaveGroup](/api/v1/test/leaveGroup)

<h3 id="searchGroup">9. 搜索群组</h3>

get请求至:

<pre><code>/api/v1/searchGroup</code></pre>

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

**测试地址**: [/api/v1/test/searchGroup](/api/v1/test/searchGroup)

<h3 id="findUser">10. 查询用户</h3>

get请求至:

<pre><code>/api/v1/findUser</code></pre>

**参数**:

*   `uid`: 用户ID
*   `name`: 用户名称

**返回结果**:

<pre><code>[
    {
        id: "",
        name: "",
        phone: ""
        ext: ""
    }
]</code></pre>

**测试地址**: [/api/v1/test/findUser](/api/v1/test/findUser)

<h3 id="listFriend">11. 列举好友</h3>

get请求至:

<pre><code>/api/v1/listFriend</code></pre>

**参数**:

*   `uid`: 用户ID
*   `name`: 用户名称

**返回结果**:

<pre><code>[
    {
        id: "",
        name: "",
        phone: ""
        ext: ""
    }
]</code></pre>

**测试地址**: [/api/v1/test/listFriend](/api/v1/test/listFriend)

<h3 id="addFriend">12. 添加好友</h3>

post请求至:

<pre><code>/api/v1/addFriend</code></pre>

**参数**:

*   `uid`: 用户ID
*   `fname`: 对方用户名
*   `fphone`: 对方手机号

**返回结果**:

<pre><code>{
    status: "",
    info: ""
}</code></pre>

**测试地址**: [/api/v1/test/addFriend](/api/v1/test/addFriend)

<h3 id="deleteFriend">13. 删除好友</h3>

post请求至:

<pre><code>/api/v1/deleteFriend</code></pre>

**参数**:

*   `uid`: 用户ID
*   `name`: 用户名
*   `fid`: 对方用户ID

**返回结果**:

<pre><code>{
    status: "",
    info: ""
}</code></pre>

**测试地址**: [/api/v1/test/deleteFriend](/api/v1/test/deleteFriend)

<h3 id="updateField">14. 设置群组字段</h3>

post请求至:

<pre><code>/api/v1/updateField</code></pre>

**参数**:

*   `gid`: 群组ID
*   `meta`: 群组字段信息(JSON对象格式)
*   `modifyToken`: 群组管理密码

**返回结果**:

<pre><code>{
    status: "",
    info: ""
}</code></pre>

**测试地址**: [/api/v1/test/updateField](/api/v1/test/updateField)

<h3 id="updateUserInGroup">15. 更新用户在群组中的信息</h3>

post请求至:

<pre><code>/api/v1/updateUserInGroup</code></pre>

**参数**:

*   `uid`: 用户ID
*   `gid`: 群组ID
*   `ext`: 用户信息(JSON对象格式)
*   `accessToken`: 群组的访问密码

**返回结果**:

<pre><code>{
    status: "",
    info: ""
}</code></pre>

**测试地址**: [/api/v1/test/updateUserInGroup](/api/v1/test/updateUserInGroup)
