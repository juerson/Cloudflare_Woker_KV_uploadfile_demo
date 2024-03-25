Cloudflare Workers KV 练手Demo，通过上传文件，将文件中的所有内容写入KV某个密钥对应的值中。注意：这个代码，只适用于文本文件，不能处理二进制文件（如图片、音频、视频等）。

### 操作步骤：

1、在Workers KV创建一个命名空间名称，名称随意。比如，创建为“uploadfile”的命名空间名称

<img src="images\Snipaste_2024-03-26_00-30-15.png" />

2、创建Worker，名称随意，然后部署。

<img src="images\Snipaste_2024-03-26_00-14-23.png" />

3、在worker项目中，绑定创建的KV命名空间：

​	  (设置 -> 变量 -> KV 命名空间绑定 -> 添加绑定)

<img src="images\Snipaste_2024-03-25_23-24-04.png" />

- KV变量跟KV命名空间的关系：

<img src="images\Snipaste_2024-03-25_23-27-30.png" />

4、编辑代码（刚才创建的哪个worker项目），将index.js的所有代码复制到worker中保存。（这个步骤可以跟第2步骤一起做）

- 代码中的UPLOADKV与Worker项目中绑定的KV命令空间的变量名称有什么关系？

<img src="images\Snipaste_2024-03-25_23-39-13.png" />

5、设置 -> 触发器 -> 路由，下面有个网址（当然你也可以绑定自定义域，也就是自己的域名），点这个进去，就能打开刚才部署的worker项目，如下：

<img src="images\Snipaste_2024-03-25_23-45-06.png" />

- 这里上传的文件数据写到哪里去了?

<img src="images\Snipaste_2024-03-26_00-01-39.png" />

代码参考：https://developers.cloudflare.com/kv/reference/kv-bindings/