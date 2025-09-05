# AI 工具导航平台

一个简洁、美观的AI工具导航平台，汇集了各类人工智能工具，帮助用户快速找到所需的AI服务。

## 如何让其他人访问这个网站

### 步骤1: 将项目推送到GitHub

1. 在[GitHub](https://github.com/)上创建一个新的仓库（仓库名称可以是任意的，例如 `ai-tools-navigation`）
2. 创建仓库时不要初始化 README、.gitignore 或许可证
3. 在本地仓库中添加 GitHub 远程仓库地址：

```bash
# 将下面的URL替换为你在GitHub上创建的仓库地址
git remote add origin https://github.com/你的用户名/你的仓库名.git
```

4. 将本地代码推送到GitHub：

```bash
git push -u origin main
```

### 步骤2: 设置GitHub Pages让网站可访问

1. 推送代码后，进入GitHub上的仓库页面
2. 点击顶部导航栏的 **Settings** 选项
3. 在左侧菜单中找到并点击 **Pages**
4. 在 **Source** 部分，从下拉菜单中选择 **main** 分支，然后点击 **Save**
5. 稍等片刻，GitHub Pages会为你生成一个可访问的网址（通常格式为 `https://你的用户名.github.io/你的仓库名/`）

### 步骤3: 分享网站给他人

1. 一旦GitHub Pages设置成功，你可以通过生成的URL分享给任何人
2. 其他人只需在浏览器中输入这个URL，就可以访问你的AI工具导航平台

## 项目结构

- `index.html`: 主页面HTML结构
- `style.css`: 网站样式文件
- `script.js`: 交互功能JavaScript代码
- `DEPLOYMENT_GUIDE.md`: 部署指南（包含更多部署方式）

## 其他部署方式

如果你想尝试其他免费部署方式，请查看 `DEPLOYMENT_GUIDE.md` 文件，其中详细介绍了以下部署选项：

- GitHub Pages
- Netlify
- Vercel
- 腾讯云开发静态网站托管

## 自定义内容

你可以根据需要修改以下内容：

1. 在 `index.html` 中添加、修改或删除AI工具条目
2. 在 `style.css` 中调整网站样式和主题
3. 在 `script.js` 中优化交互体验

## 如何更新网站

1. 在本地修改文件
2. 提交更改：
   ```bash
   git add .
   git commit -m "更新说明"
   ```
3. 推送到GitHub：
   ```bash
   git push origin main
   ```
4. GitHub Pages会自动更新网站内容（通常需要几分钟时间）