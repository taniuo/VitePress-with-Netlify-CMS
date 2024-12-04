const fs = require('fs');
const path = require('path');

// 扫描Markdown文件并生成路由配置
function generateRoutes(baseDir = 'docs') {
  const routes = [];
  const walk = (dir) => {
    fs.readdirSync(dir).forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walk(filePath);
      } else if (path.extname(file) === '.md') {
        // 生成路由路径
        let routePath = path.relative(baseDir, filePath);
        routePath = routePath.replace(/README\.md$/, '');
        routePath = routePath.replace(/\.md$/, '.html');

        // 确保路由路径以斜杠开头
        if (!routePath.startsWith('/')) routePath = `/${routePath}`;

        // 生成路由对象
        routes.push({
          text: path.basename(file, '.md'),
          link: routePath
        });
      }
    });
  };

  walk(baseDir);
  return routes;
}

// 生成并更新VitePress配置
function updateVitePressConfig(routes) {
  const configPath = path.join('.vitepress', 'config.js');
  let configContent = fs.readFileSync(configPath, 'utf-8');
  
  // 假设我们要更新sidebar的配置
  const sidebarRegex = /sidebar:\s*{[\s\S]*?}/;
  const newSidebar = `sidebar: ${JSON.stringify({ '/': routes }, null, 2)}`;
  
  configContent = configContent.replace(sidebarRegex, newSidebar);
  fs.writeFileSync(configPath, configContent, 'utf-8');
}

// 运行脚本
const routes = generateRoutes();
updateVitePressConfig(routes);
