# Longclaw URI Search

一个 Chrome 浏览器扩展插件，为 Longclaw 管理后台的绑定接口页面增加 URI 搜索功能。

## 功能特性

- **URI 过滤搜索**：在"选择应用接口"页面增加 URI 输入框，支持快速搜索和过滤接口
- **实时搜索**：支持回车键快速搜索
- **一键清空**：提供清空按钮快速重置搜索条件
- **状态同步**：弹窗页面显示当前 URI 过滤值状态

## 安装方式

### 开发模式安装

1. 打开 Chrome 浏览器，进入 `chrome://extensions/`
2. 开启右上角的"开发者模式"
3. 点击"加载已解压的扩展程序"
4. 选择本项目的根目录

### 生产环境安装

1. 将项目打包为 `.crx` 文件
2. 拖拽到 `chrome://extensions/` 页面安装

## 使用方式

1. 访问 Longclaw 管理后台的绑定接口页面
2. 在"选择应用接口"标签旁会出现 URI 搜索输入框
3. 输入 URI 关键词后按回车或点击"搜索"按钮
4. 点击"清空"按钮可重置搜索条件

## 项目结构

```
langclaw-plugins/
├── manifest.json      # 扩展配置文件
├── popup.html         # 弹窗页面
├── popup.js           # 弹窗逻辑
├── inject.js          # 内容脚本，注入页面
├── page.js            # 页面逻辑脚本
├── content.css        # 样式文件
├── icons/             # 图标资源
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md          # 项目说明文档
```

## 技术栈

- **Manifest V3**：使用最新的 Chrome 扩展 API
- **JavaScript**：原生 JavaScript 实现
- **CSS**：自定义样式

## 支持的域名

- `longclaw-admin.ebanma.com`
- `longclaw-admin.csvw.ebanma.com`
- `longclaw-admin.fawww.ebanma.com`
- `longclaw-admin-qa.ebanma.com`
- `longclaw-admin-qa.csvw.ebanma.com`
- `longclaw-admin-dev.fawww.ebanma.com`

## 版本信息

- **当前版本**：4.1.0
- **Manifest 版本**：3

## 许可证

MIT License
