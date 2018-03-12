#!/bin/bash
npm run build
git add .
git commit -m '后续优化更新'
git push -u origin master

echo '正在更新到远程仓库'

