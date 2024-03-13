const fs = require('fs');
require('dotenv').config();
const TextTranslationClient =
  require("@azure-rest/ai-translation-text").default;
  const LanguageDetect = require('languagedetect');
const lngDetector = new LanguageDetect();

// 获取命令行参数
const filePath = process.argv[2];
const targetKeys = process.argv.slice(3);

const apiKey = process.env.API_KEY;
const endpoint = "https://api.cognitive.microsofttranslator.com";
const region = "eastasia";
const translateCredential = {
  key: apiKey,
  region,
};
const translationClient = new TextTranslationClient(
  endpoint,
  translateCredential
);

if (!filePath || !targetKeys.length) {
  console.error('Please provide both a file path and a target key.');
  process.exit(1);
}

async function translateText(text) {
  console.log('--------------------------------------------------------')
  console.log(`准备翻译 ${text}`)
  const translateCredential = {
    key: apiKey,
    region,
  };
  const translationClient = new TextTranslationClient(
    endpoint,
    translateCredential
  );

  const inputText = [{ text: text }];
  const translateResponse = await translationClient.path("/translate").post({
    body: inputText,
    queryParameters: {
      to: "zh-CN",
    },
  });

  const translations = translateResponse.body;
  for (const translation of translations) {
    console.log('--------------------------------------------------------')
    console.log(
      `${ text }翻译成: '${translation?.translations[0]?.to}' 结果为: '${translation?.translations[0]?.text}'.`
    );
  }
  return Promise.resolve(translations[0].translations[0]?.text);
  
}



async function translateJSON(obj) {
  for (const key of Object.keys(obj)) {
    if (targetKeys.includes(key)) {
      const value = obj[key];
      try {
        const detect = lngDetector.detect(value, 1)
        if(detect.length&&detect[0][0]==='english'){
          const translatedValue = await translateText(value);
          obj[key] = translatedValue;
        }else{
          console.log(`${ detect }${value} 不为英语，无需翻译`)
        }
      } catch (error) {
        console.error('翻译错误:', error);
      }
    } else if (typeof obj[key] === 'object') {
      await translateJSON(obj[key]);
    }
  }
}

async function main() {
  // 读取JSON文件并解析为JavaScript对象
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  await translateJSON(data);
  // 写回修改后的数据到原始JSON文件
  const modifiedData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, modifiedData);
  
}

main().catch(error => console.error(error));