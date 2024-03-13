
# json 文件制定key 内容翻译

该项目是一个 Node.js 应用程序，用于将json文本内容从英语翻译为其他语言。它使用 Azure Cognitive Services 的文本翻译 API 进行翻译操作。

## 使用说明

### 安装依赖

在开始之前，请确保已安装 Node.js，并在项目目录中执行以下命令以安装所需的依赖：

```bash
npm install
```

### 配置

在运行应用程序之前，您需要提供 Azure Cognitive Services 的 API 密钥和终结点。请将这些凭据添加到一个名为 `.env` 的文件中，格式如下：

```plaintext
API_KEY=your-api-key
```

### 运行应用程序

您可以通过运行以下命令来执行该应用程序：

```bash
node your_script.js path_to_file.json target_key
```

- `your_script.js`: 替换为您的脚本文件名。
- `path_to_file.json`: 替换为要翻译的 JSON 文件的路径。
- `target_key`: 替换为要翻译的目标键。

### 示例

```bash
node translate.js data.json content
```

这将从 `data.json` 文件中读取数据，并将其中 `content` 键的英文内容翻译为中文。

## 注意事项

- 请确保您的 JSON 文件格式正确，并且要翻译的目标键存在于 JSON 中。
- 该应用程序仅支持英语到其他语言的翻译。
- 在运行之前，请确保已安装并配置了 `dotenv` 模块，并且您的 API 密钥和终结点信息正确。

## 贡献

欢迎提出问题、建议和改进！如果您发现了任何 bug 或有任何建议，请随时在 GitHub 上创建一个 issue。

## 许可证

该项目基于 [MIT 许可证](LICENSE)。
