addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  let uploadMessage = "";
  let KV_key = "config_template"; // 默认KV密钥名称
  const user = await UPLOADKV.get('username'); // 获取KV中设置的用户名
  const pwd = await UPLOADKV.get('password'); // 获取KV中设置的密码
  if (request.method === 'POST') {
    const formData = await request.formData();
    const file = formData.get('file'); // 获取表单中文件域
    const username = formData.get('username'); // 获取表单中用户名
    const password = formData.get('password'); // 获取表单中密码
    const key_value = formData.get('key').trim(); // 获取表单中key
    if (key_value && file && username === user && password === pwd && !["username", "password"].includes(key_value)) {
      KV_key = key_value; // 更新KV密钥名称
      const text = await file.text();
      await UPLOADKV.put(KV_key, text.trim()); // UPLOADKV不存在就添加，存在就覆盖（设置->变量->KV 命名空间绑定->变量名称）
      uploadMessage = `${file.name}文件的内容写入KV变量中！`;
    }
  }
  let KV_key_Value = await UPLOADKV.get(KV_key); // 获取KV中config_template密钥的值
  const html = `
    <form action="./" method="POST" enctype="multipart/form-data" style="margin: auto auto; width: 462px; height:114px;border: 1px solid #9d8f8f; padding: 8px; line-height: 2.5em;">
      <div style="width: 100%; display: flex; align-items: center; justify-content: space-between;">
        <label>用户名：<input type="text" name="username" required></label>
        <label>密码： <input type="password" name="password" required></label>
      </div>
      <label>KV密钥：<input type="text" value="${KV_key}" name="key"></label>
      <div style="width: 100%; display: flex; justify-content: space-between;">
        <input type="file" name="file" required>
        <input type="submit" value="上传文件">
      </div>
    </form>
    <div style="margin: auto auto; width:100%; text-align:center;">
      <p style="line-height: 14px; color:red;"> ${uploadMessage} </p>
      <p style="line-height: 14px;">当前，KV中${KV_key}密钥对应的值(会更新到最新上传的内容)：</p>
      <textarea rows="36" cols="190">${KV_key_Value}</textarea>
    </div>
  `;
  return new Response(html, {
    headers: { 'content-type': 'text/html;charset=UTF-8' },
  })
}