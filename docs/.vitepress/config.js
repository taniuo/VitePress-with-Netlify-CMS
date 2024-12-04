module.exports = {
	title: 'VitePress template',
	description: 'A JAMstack website template with the VitePress and Netlify CMS config.',
	themeConfig: {
		repo: 'tsutoringo/VitePress-with-Netlify-CMS',
		docsDir: 'docs',
		editLinks: true,
		editLinkText: 'Edit this page on GitHub',
		lastUpdated: 'Last Updated',
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Guide', link: '/guide/' },
			{ text: 'GitHub', link: 'https://github.com/tsutoringo/VitePress-with-Netlify-CMS' }
		],
    		sidebar: {
      		'/post/': [
        		{
          		text: 'Posts',
          		// 自动生成 `docs/post` 目录下的文章目录
          		children: ['/post/']
        		}
      		],
      		// 其他路径可以保持 'auto' 或手动配置
      		'/': 'auto'
    		}
	}
}
