#!/bin/bash
npm run build
git add .
git commit -m '后续优化更新'
git push -u origin master
echo '前端已经更新到远程仓库'

cd ../server/
git add .
git commit -m '后续优化更新'
git push -u origin master
echo '后端已经更新到远程仓库'

cd ../client/

