#ReactTest
###安装react环境
```
npm install -g create-react-app
```
###启动命令
```
npm run start
```
###内部云端打包系统：
```
//第一步
index_package.html//使用该网页内容替换index.html
//第二步
src/index.js//修改app入口
import App from './appcreater/App';//使用这个入口
//第三部
npm run build 发布后，把 libpackage 放到 build 文件夹里
备注：
fileserver 文件夹为本地测试的 node 服务器
```
