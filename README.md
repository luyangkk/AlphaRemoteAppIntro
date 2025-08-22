# 微单影控 - 官方网站

这是 微单影控 iOS 应用的官方介绍网站，专为 GitHub Pages 部署而设计。

## 项目结构

```
AlphaRemoteIntroPages/
├── index.html          # 主页面
├── styles.css          # Apple 风格样式表
├── script.js           # 交互脚本
├── screenshots/        # 应用截图
│   ├── IMG_5946-portrait.png
│   ├── IMG_5947-portrait.png
│   ├── IMG_5948-portrait.png
│   ├── IMG_5949-portrait.png
│   └── IMG_5950-portrait.png
└── README.md          # 项目说明
```

## 设计特色

### Apple 设计语言
- 遵循 Apple 官方设计规范
- 使用 SF Pro Display 字体系列
- 支持 Light/Dark 模式自动切换
- 流畅的动画和过渡效果

### 响应式设计
- 完美适配桌面、平板和手机设备
- 断点设计：768px (平板)、480px (手机)
- 移动优先的布局策略

### 性能优化
- 图片预加载
- CSS 变量管理主题色彩
- 防抖滚动事件处理
- 交叉观察器(Intersection Observer)实现懒加载动画

## 部署到 GitHub Pages

### 方法一：通过 GitHub 仓库设置

1. 将此文件夹内容推送到 GitHub 仓库
2. 进入仓库的 Settings → Pages
3. 选择 Source 为 "Deploy from a branch"
4. 选择分支 (通常是 `main` 或 `gh-pages`)
5. 选择文件夹 (如果在子目录中，选择相应文件夹)
6. 点击 Save

### 方法二：通过 GitHub Actions 自动部署

创建 `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Pages
        uses: actions/configure-pages@v4
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './AlphaRemoteIntroPages'
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 技术栈

- **HTML5**: 语义化标签，SEO 友好
- **CSS3**: 
  - CSS Grid 和 Flexbox 布局
  - CSS 变量 (自定义属性)
  - 媒体查询响应式设计
  - CSS 动画和过渡
- **Vanilla JavaScript**:
  - 交叉观察器 API
  - 滚动事件处理
  - 平滑滚动实现
  - 移动端菜单交互

## 浏览器兼容性

- ✅ Chrome 88+
- ✅ Firefox 85+
- ✅ Safari 14+
- ✅ Edge 88+
- ✅ iOS Safari 14+
- ✅ Android Chrome 88+

## 本地开发

1. 克隆仓库到本地
2. 使用任意 HTTP 服务器运行项目:

```bash
# 使用 Python 3
python -m http.server 8000

# 使用 Node.js (需要安装 http-server)
npx http-server

# 使用 PHP
php -S localhost:8000
```

3. 在浏览器中打开 `http://localhost:8000`

## 自定义配置

### 颜色主题
在 `styles.css` 的 `:root` 选择器中修改 CSS 变量:

```css
:root {
  --primary-blue: #007AFF;      /* 主色调 */
  --text-primary: #1d1d1f;     /* 主要文字颜色 */
  --background-primary: #ffffff; /* 主背景色 */
  /* ... 更多变量 */
}
```

### 内容更新
- 修改 `index.html` 中的文字内容
- 替换 `screenshots/` 文件夹中的应用截图
- 更新应用商店链接

### 动画效果
在 `script.js` 中调整动画参数:
- 滚动阈值
- 动画持续时间
- 缓动函数

## SEO 优化

- 包含完整的 meta 标签
- 使用语义化 HTML 结构
- 图片添加适当的 alt 属性
- 结构化数据标记 (可进一步添加)

## 许可证

此项目遵循 MIT 许可证。

## 贡献

欢迎提交 Issue 和 Pull Request 来改进网站。