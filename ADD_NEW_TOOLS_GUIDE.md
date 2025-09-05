# 添加新AI工具操作指南

本指南将帮助你轻松地向AI工具导航平台添加新的AI工具和对应的网址链接。通过简单几步，你就可以扩展网站内容，为用户提供更多实用的AI工具资源。

## 步骤1: 准备工作

在添加新工具之前，请准备好以下信息：

1. **工具名称** - 例如："ChatGPT"、"文心一言"等
2. **工具描述** - 简要介绍工具的主要功能和特点
3. **官方网址** - 工具的官方网站链接
4. **工具图标** - 选择一个合适的Font Awesome图标（稍后详细说明如何选择）
5. **所属分类** - 确定工具应该放在哪个分类下（如"智能对话与知识处理"、"创意设计与内容生成"等）

## 步骤2: 打开并编辑index.html文件

1. 使用文本编辑器（如VS Code、记事本等）打开项目根目录下的 `index.html` 文件
2. 找到你想要添加新工具的分类部分

## 步骤3: 确定添加位置

在 `index.html` 文件中，每个分类都有类似以下的结构：

```html
<!-- 智能对话与知识处理 -->
<section class="tools-section">
    <h2 class="section-title">智能对话与知识处理</h2>
    <div class="tools-grid">
        <!-- 现有的工具卡片 -->
        <div class="tool-card">
            <!-- 工具卡片内容 -->
        </div>
        <!-- 这里是你可以添加新工具的位置 -->
    </div>
</section>
```

选择你想要添加新工具的分类，并在该分类的 `<div class="tools-grid">` 标签内找到合适的位置插入新的工具卡片。

## 步骤4: 创建新的工具卡片

在选定的位置，复制并粘贴以下工具卡片模板，然后根据你准备的信息进行修改：

```html
<div class="tool-card">
    <div class="tool-header">
        <i class="fas fa-robot tool-icon"></i>
        <h3 class="tool-name">工具名称</h3>
    </div>
    <p class="tool-description">工具描述，简要介绍工具的主要功能和特点。</p>
    <a href="https://example.com" target="_blank" rel="noopener noreferrer" class="tool-link">访问官网</a>
</div>
```

### 修改内容说明：

1. **工具图标** - 将 `fas fa-robot` 替换为合适的Font Awesome图标类名（见步骤5）
2. **工具名称** - 将 `工具名称` 替换为实际的工具名称
3. **工具描述** - 将 `工具描述，简要介绍工具的主要功能和特点。` 替换为实际的工具描述
4. **官方网址** - 将 `https://example.com` 替换为实际的工具官方网址

## 步骤5: 选择Font Awesome图标

为了保持网站的美观和一致性，建议使用Font Awesome图标。以下是选择和使用图标的方法：

1. 访问 [Font Awesome官方网站](https://fontawesome.com/icons) 浏览可用图标
2. 根据工具的特性选择一个合适的图标（例如，聊天工具可以用 `fa-comment`，创意工具可以用 `fa-paint-brush` 等）
3. 复制图标的类名（如 `fas fa-comment`）
4. 将复制的类名替换到工具卡片模板中的 `fas fa-robot` 位置

### 常用图标推荐：

- `fas fa-robot` - 适用于通用AI工具
- `fas fa-comment` 或 `far fa-comment-dots` - 适用于聊天/对话工具
- `fas fa-paint-brush` - 适用于创意设计工具
- `fas fa-code` - 适用于编程开发工具
- `fas fa-brain` - 适用于脑图或思维工具
- `fas fa-language` - 适用于翻译工具
- `fas fa-video` - 适用于视频相关工具
- `fas fa-image` - 适用于图像相关工具
- `fas fa-chart-line` - 适用于数据分析工具

## 步骤6: 保存并测试修改

1. 保存对 `index.html` 文件的修改
2. 在本地启动HTTP服务器以测试效果：
   - 打开命令提示符（CMD）或PowerShell
   - 导航到项目目录：`cd c:\Users\iris\Desktop\新建文件夹 (2)`
   - 运行命令：`python -m http.server 8000`
   - 打开浏览器，访问 `http://localhost:8000` 查看效果

## 步骤7: 提交修改到GitHub

1. 确认修改无误后，将更改提交到本地Git仓库：
   ```bash
git add index.html
git commit -m "添加新AI工具：工具名称"
   ```

2. 将修改推送到GitHub远程仓库：
   ```bash
git push origin main
   ```

3. 等待几分钟，GitHub Pages会自动更新网站内容

## 示例：添加一个新工具

假设我们要添加一个名为"Claude"的AI对话工具，具体操作如下：

1. 准备信息：
   - 工具名称：Claude（Anthropic）
   - 工具描述：由Anthropic开发的先进AI助手，擅长复杂推理和长文本处理
   - 官方网址：https://www.anthropic.com/
   - 工具图标：`fas fa-comment-dots`
   - 所属分类：智能对话与知识处理

2. 在`index.html`中找到"智能对话与知识处理"分类部分

3. 在工具网格中添加新的工具卡片：

```html
<div class="tool-card">
    <div class="tool-header">
        <i class="fas fa-comment-dots tool-icon"></i>
        <h3 class="tool-name">Claude（Anthropic）</h3>
    </div>
    <p class="tool-description">由Anthropic开发的先进AI助手，擅长复杂推理和长文本处理。</p>
    <a href="https://www.anthropic.com/" target="_blank" rel="noopener noreferrer" class="tool-link">访问官网</a>
</div>
```

4. 保存文件，本地测试，然后提交并推送到GitHub

## 注意事项

1. 确保工具描述简洁明了，突出工具的主要特点
2. 所有外部链接请务必添加 `target="_blank" rel="noopener noreferrer"` 属性，以确保在新标签页中打开并提高安全性
3. 如果添加的工具较多，可能需要考虑调整CSS样式以保持页面美观
4. 定期检查已添加的工具链接是否仍然有效，及时更新或移除失效链接
5. 如果你想创建新的分类，请参考现有的分类结构在HTML中添加新的 `<section>` 块

按照以上步骤，你可以轻松地向AI工具导航平台添加新的AI工具和网址，不断丰富网站内容！