const fs = require('fs');
const path = require('path');

function generateRoutes(baseDir = 'docs') {
  const routes = {
    '/': [],
    '/guide/': [],
    '/post/': []
  };
  const walk = (dir, parent = '') => {
    fs.readdirSync(dir).forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory() && file !== 'public' && file !== '.vitepress') {
        walk(filePath, path.join(parent, file));
      } else if (path.extname(file) === '.md') {
        // 生成路由路径
        let routePath = path.relative(baseDir, filePath);
        routePath = routePath.replace(/index\.md$/, '');
        routePath = routePath.replace(/\.md$/, '.html');

        // 确保路由路径以斜杠开头
        if (!routePath.startsWith('/')) routePath = `/${routePath}`;

        // 将路由添加到相应的目录
        if (parent === '/guide') {
          routes['/guide/'].push({
            text: path.basename(file, '.md').charAt(0).toUpperCase() + path.basename(file, '.md').slice(1),
            link: routePath
          });
        } else if (parent === '/post') {
          routes['/post/'].push({
            text: path.basename(file, '.md').charAt(0).toUpperCase() + path.basename(file, '.md').slice(1),
            link: routePath
          });
        }
      }
    });
  };

  walk(baseDir);
  return routes;
}

function updateVitePressConfig(routes) {
  const configPath = path.join(baseDir, '.vitepress', 'config.js');
  let configContent = fs.readFileSync(configPath, 'utf-8');

  // 更新sidebar配置
  const sidebarRegex = /themeConfig:\s*{[\s\S]*?}/;
  const newSidebar = `themeConfig: ${JSON.stringify({
    repo: 'taniuo/VitePress-with-Netlify-CMS',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Edit this page on GitHub',
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/' },
      { text: 'Post', link: '/post/' }
    ],
    sidebar: routes
  }, null, 2)}`;

  configContent = configContent.replace(sidebarRegex, newSidebar);
  fs.writeFileSync(configPath, configContent, 'utf-8');
}

// 运行脚本
const routes = generateRoutes();
updateVitePressConfig(routes);
