# 自定义域名设置指南

本指南将帮助你为AI工具导航平台配置自定义域名，让访问者可以通过你自己的域名（如 `aitools.example.com`）访问网站，而不是默认的 `username.github.io` 地址。

## 步骤1: 获取自定义域名

首先，你需要从域名注册商处购买一个域名。常见的域名注册商包括：

- [阿里云](https://wanwang.aliyun.com/)
- [腾讯云](https://dnspod.cloud.tencent.com/)
- [GoDaddy](https://www.godaddy.com/)
- [Namecheap](https://www.namecheap.com/)

选择一个你喜欢的域名并完成购买。

## 步骤2: 在GitHub Pages中配置自定义域名

### 方法A: 通过GitHub仓库设置

1. 访问你的GitHub仓库页面：`https://github.com/abc18074763859-crypto/abc18074763859-crypto.github.io`
2. 点击顶部导航栏的 **Settings** 选项
3. 在左侧菜单中找到并点击 **Pages**
4. 在 **Custom domain** 部分的输入框中，输入你购买的自定义域名（例如：`aitools.example.com`）
5. 点击 **Save** 按钮保存设置
6. 确保勾选了 **Enforce HTTPS** 选项，以启用HTTPS加密访问

### 方法B: 通过添加CNAME文件

1. 在项目根目录创建一个名为 `CNAME` 的文件（没有文件扩展名）
2. 在文件中添加你的自定义域名，例如：
   ```
aitools.example.com
   ```
3. 将此文件提交并推送到GitHub仓库
4. 然后按照方法A的步骤1-6完成设置

## 步骤3: 配置DNS解析记录

接下来，你需要在域名注册商的DNS管理控制台中配置DNS解析记录，将你的自定义域名指向GitHub Pages服务器。

### 对于子域名（如 `aitools.example.com`）

1. 登录你的域名注册商的DNS管理控制台
2. 添加一条 **CNAME记录**：
   - 主机记录：`aitools`（根据你想要的子域名设置）
   - 记录类型：`CNAME`
   - 记录值：`abc18074763859-crypto.github.io`
   - TTL：选择默认值或较小的值（如10分钟）
3. 保存设置

### 对于根域名（如 `example.com`）

如果你想使用根域名（不带www前缀），有两种方法：

#### 方法1: 使用CNAME记录（部分注册商支持）

1. 添加一条 **CNAME记录**：
   - 主机记录：`@`
   - 记录类型：`CNAME`
   - 记录值：`abc18074763859-crypto.github.io`
   - TTL：选择默认值

#### 方法2: 使用A记录

1. 添加四条 **A记录**，分别指向GitHub Pages的IP地址：
   - 主机记录：`@`
   - 记录类型：`A`
   - 记录值：`185.199.108.153`
   - TTL：选择默认值
2. 重复添加另外三条A记录，记录值分别为：
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

> 注意：GitHub Pages的IP地址可能会随时间变化，请参考[GitHub官方文档](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)获取最新IP地址。

## 步骤4: 验证域名设置

DNS记录更新可能需要一段时间（通常为几分钟到24小时）才能生效。你可以通过以下方式验证设置是否成功：

1. 等待一段时间后，在浏览器中输入你的自定义域名，查看是否能正常访问网站
2. 使用 `nslookup` 命令检查DNS记录是否正确解析（在命令提示符或终端中执行）：
   ```bash
   nslookup aitools.example.com
   ```
3. 回到GitHub仓库的Pages设置页面，检查是否显示绿色的"DNS check successful"提示

## 步骤5: 更新网站配置（可选）

为了确保网站在使用自定义域名时正常工作，你可能需要更新以下配置：

1. 在 `index.html` 文件中，确保所有内部链接都使用相对路径（如 `/css/style.css`）而不是绝对路径
2. 如果你使用了Google Analytics或其他跟踪服务，请更新相关设置以包含新域名

## 常见问题排查

1. **网站无法通过自定义域名访问**
   - 等待更长时间让DNS记录生效
   - 检查DNS记录配置是否正确
   - 确认GitHub Pages设置中的自定义域名拼写正确

2. **HTTPS错误**
   - 确保在GitHub Pages设置中勾选了"Enforce HTTPS"选项
   - 等待GitHub为你的域名生成SSL证书（通常需要24小时内）

3. **子域名和根域名同时使用**
   - 如果你想同时使用 `example.com` 和 `www.example.com`，需要为两个域名分别配置DNS记录
   - 在GitHub Pages设置中，你只需要设置一个主域名，另一个可以通过重定向实现

## 更多资源

- [GitHub官方文档：配置自定义域名](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub官方文档：管理自定义域名](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
- [使用自定义域名与GitHub Pages](https://pages.github.com/)

如果你在设置过程中遇到任何问题，可以参考以上资源或联系域名注册商的客服支持。