Cloudflare Workers KV 练手Demo，通过上传文件，将文件中的所有内容写入KV某个密钥对应的值中。注意：这个代码，只适用于文本文件，不能处理二进制文件（如图片、音频、视频等）。

### 操作步骤：

1、在Workers KV创建一个命名空间名称，名称随意。比如，创建为“uploadfile”的命名空间名称。

<img src="images\创建KV.png" />

2、KV中，添加用户名、密码。

<img src="images\KV中，添加用户名和密码.png" />

3、创建Worker，名称随意，然后部署。

<img src="images\创建worker脚本.png" />

4、在worker项目中，绑定创建的KV命名空间：

​	  (操作步骤：设置 -> 变量 -> KV 命名空间绑定 -> 添加绑定)

<img src="images\绑定KV命令空间.png" />

- KV变量跟KV命名空间的关系：

<img src="images\绑定的KV命名空间的变量名称跟KV命名空间的关系.png" />

5、编辑代码（刚才创建的哪个worker项目），将index.js的所有代码复制到worker中保存。（这个步骤可以跟第2步骤一起做）

- 代码中的UPLOADKV与Worker项目中KV变量名称有什么关系？

<img src="images\代码中的UPLOADKV与Worker项目中KV变量名称有什么关系？.png" />

- 代码put函数与KV密钥和值关系图

<img src="images\代码put函数与KV密钥和值关系图.png" />

6、设置 -> 触发器 -> 路由，下面有个网址（当然你也可以绑定自定义域，也就是自己的域名），点这个进去，就能打开刚才部署的worker项目，如下：

<img src="images\网页运行效果.png" />

- 这里上传的文件数据写到哪里去了?

<img src="images\代码put函数与KV密钥和值关系图.png" />

代码参考：https://developers.cloudflare.com/kv/reference/kv-bindings/