addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  let uploadMessage = "";
  if (request.method === 'POST') {
    const formData = await request.formData();
    const file = formData.get('file');
    if (file) {
      const text = await file.text();
      await UPLOADKV.put('config_template', text); // UPLOADKV不存在就添加，存在就覆盖（设置->变量->KV 命名空间绑定->变量名称）
      uploadMessage = `${file.name}文件内容上传成功！`;
    }
  }
  let config_template = await UPLOADKV.get('config_template'); // 获取KV中config_template变量的值
  const html = `
      <form action="./" method="POST" enctype="multipart/form-data" style="width: 327px; border: 1px solid #9d8f8f; padding: 8px;">
        <input type="file" name="file">
        <input type="submit" value="上传文件">
      </form>
      <p style="line-height: 14px;">${uploadMessage}</p>
      <p style="line-height: 14px;">当前，KV中config_template变量对应的值：</p>
      <textarea rows="42" cols="250">${config_template}</textarea>
    `;
  return new Response(html, {
    headers: { 'content-type': 'text/html;charset=UTF-8' },
  })
}