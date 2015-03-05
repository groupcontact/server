### 目录

1.  [创建群组](#createGroup)
2.  [删除群组](#deleteGroup)
3.  [注册用户](#register)
4.  [查询用户加入的组](#listGroup)
5.  [查询组内所有用户](#listUser)
6.  [更新个人信息](#update)
7.  [加入某个组](#join)
8.  [离开某个组](#leave)

<h3 id="createGroup">创建群组</h3>

post请求至:

<pre><code>/api/create</code></pre>

**参数**:

*   `name`: 群组名称
*   `desc`: 群组描述
*   `accessToken`: 访问密码
*   `modifyToken`: 修改密码

**返回结果**:

<pre><code>{
    status: 0,
    gid: 1
}</code></pre>

**注释**:

返回的json字段中`status`表示操作是否成功，若`status=0`，则`gid`表示群组ID。

<h3 id="deleteGroup">删除群组</h3>

post请求至:

<pre><code>/api/delete</code></pre>

**参数**:

*   `gid`: 群组ID
*   `modifyToken`: 该群组的修改密码

**返回结果**:

<pre><code>{
    status: 0
}</code></pre>

<h3 id="register">注册用户</h3>

post请求至:

<pre><code>/api/register</code></pre>

**参数**:

*   `name`: 用户名
*   `phone`: 用户的手机号

**返回结果**

<pre><code>{
    status: 0,
    uid: 1
}</code></pre>

**注释**:

若有匹配的用户名与手机号，则不新创建，返回的`uid`为原来的用户ID。


<h3 id="listGroup">查询用户加入的组</h3>

get请求至:

<pre><code>/api/listGroup</code></pre>

**参数**:

*   `uid`: 用户ID

**返回结果**

<pre><code>[
    {
        name: "",
        desc: ""
    }
]</code></pre>


<h3 id="listUser">查询组内所有用户</h3>

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

<h3 id="update">更新个人信息</h3>

post请求至:

<pre><code>/api/update</code></pre>

**参数**:

*   `uid`: 用户ID
*   `name`: 用户名
*   `phone`: 手机号

**返回结果**:

<pre><code>{
    status: 0
}</code></pre>

<h3 id="join">加入某个群组</h3>

post请求至:

<pre><code>/api/join</code></pre>

**参数**:

*   `uid`: 用户ID
*   `gid`: 群组ID
*   `accessToken`: 群组的访问密码

**返回结果**:

<pre><code>{
    status: 0
}</code></pre>

<h3 id="leave">离开某个群组</h3>

post请求至:

<pre><code>/api/leave</code></pre>

**参数**:

*   `uid`: 用户ID
*   `gid`: 群组ID

**返回结果**:

<pre><code>{
    status: 0
}</code></pre>