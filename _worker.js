// blog_worker.js
// 博客的所有文章数据
const blogPosts = [
  {
    id: 1,
    title: "我的第一篇博客",
    date: "2025-12-30",
    content: `
      <p>这是我的第一篇博客文章，用于测试整个博客系统是否工作正常。</p>
      <p>Cloudflare Worker 的强大之处在于，它允许我们用纯 JavaScript 动态生成整个网站，无需复杂的服务器环境。</p>
      <p>如果你看到了这篇文章，说明你的个人博客已经成功运行！</p>
    `
  },
  {
    id: 2,
    title: "201八人集体介绍",
    date: "2025-12-31",
    content: `
      <p>201八人集体于2024年组成，是一个充满活力的团体。成员包括：</p>
      <ul>
        <li><strong>宿舍彭于晏（鸡头）</strong></li>
        <li><strong>鲜榨柠檬汁（柠檬）</strong></li>
        <li><strong>58（王志轩）</strong></li>
        <li><strong>把鸡头当儿子训（董佳耀）</strong></li>
        <li><strong>卷王（坤哥）</strong></li>
        <li><strong>阿牛（牛国举）</strong></li>
        <li><strong>大胖（自己猜）</strong></li>
        <li><strong>本网站编辑者（展）</strong></li>
      </ul>
      <p>我们因缘分相聚，共同书写这段有趣的回忆。</p>
    `
  },
  {
    id: 4,
    title: "祝你2026快乐",
    date: "2026-01-01",
    content: `
    <p>2025年已经翻篇了，2026还已来，以下是我对学校幻想。</p>
    <h3>1. 足球场上球门的稀缺性</h3>
    <p>首先，我想探讨一个哲学问题：<strong>没有球门的足球场，还能叫足球场吗？</strong></p>
    <p>我不知道是不是咱们学校足球有某种我尚未领悟的特殊规则——球员的终极目标该不会只是<em>带球</em>，而不需要<em>打门</em>吧？这极大地颠覆了我的认知。</p>
    <p>那么问题来了：门将站哪？球员射哪？总不能对着空气练习“无实物射门”表演吧。</p>
    <h3>2. 对羽毛球的改善</h3>
    <p>其次，让我们把目光投向东操场。<strong>东操场的羽毛球位能不能加个网？</strong></p>
    <p>没网玩个蛋啊！这就好比打篮球没有篮筐，纯属隔空意念运动。现在一群人在教学区的空地上打球，我本来不想说啥，六或七个也就算了。但当一群人挤在那儿挥拍，路怎么走？</p>
    <p>说真的，老子的头都差点<code>cos</code>羽毛球了。</p>
    <h3>3. 微机房的虚构</h3>
    <p>最后，让我们谈谈现实与虚构。<strong>就说现在都有多少人还不会用电脑处理正经事？</strong></p>
    <p>电脑室（机房）这个建筑，它是真实存在的，我亲眼见过。但“电脑课”这门课程，它仿佛只存在于校园传说里。</p>
    <p>有了机房，来个电脑课能咋？看看班里一些不会电脑的嘉豪装成啥了</p>
    <hr>
    <p><i>以上是一个学生对2026年的幻想。能实现那么一两条算我输。</i></p>
  `
  },
  {
    id: 5,
    title: "为人寻偶",
    date: "2026-01-02",
    content: `
    <h3>【在青春主场，寻找一位并肩奔跑的你】</h3>
    <p>你好！我是一名八年级的男生，也许在人群中并不算最高，但站在球场上时，我相信自己有着不输给任何人的专注与热情。身高是标准的“中场发动机”型，够灵活，也够稳妥——抢断、传球、上篮，我享受和队友一起奔跑、配合的每一刻。如果你也喜欢篮球，欢迎来球场看看，或许我们可以来一场轻松的配合；如果你对运动不太熟悉，那我也可以和你分享球场上的趣事，或是教你投出第一个三分球。</p>
    <p>球场下的我，朋友们常说是“值得交的类型”。性格比较直爽，乐于分享——无论是零食、笔记，还是下雨天唯一的一把伞。朋友遇到麻烦时，我习惯站出来帮忙，毕竟在我看来，人与人之间的真诚和义气，远比计较得失更重要。虽然偶尔会因为心直口快说错话，但始终愿意用行动去弥补、去证明。</p>
    <p>我希望遇见这样的你：开朗爱笑，对生活怀有好奇，愿意尝试新事物。我们可以一起在课后讨论难题，在周末约图书馆或操场；你可以是安静的倾听者，也可以是活力满满的组织者。重要的是，彼此能坦诚相待，互相鼓励，在有些迷茫又充满可能的年纪里，成为照亮对方前行的一缕阳光。</p>
    <p>如果你觉得，和一个爱打球、重义气、愿意把朋友放在心上的人做朋友（或者更进一步）听起来不赖，请给我一个简单的信号。我们可以从一次课间的招呼，或是一句“明天球场见”开始。</p>
    <p>期待相遇，不负青春。</p>
    `
  }
];

// 生成完整的HTML页面框架
function generateHTML(title, bodyContent) {
  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title} | 我的个人博客</title>
    <style>
        :root {
            --primary-color: #2563eb;
            --text-color: #333;
            --bg-color: #f9fafb;
            --card-bg: #ffffff;
            --border-color: #e5e7eb;
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', sans-serif;
            line-height: 1.7;
            color: var(--text-color);
            background: var(--bg-color);
            padding: 20px;
            max-width: 800px;
            margin: 0 auto;
        }
        header {
            border-bottom: 2px solid var(--border-color);
            padding: 2rem 0;
            margin-bottom: 2rem;
            text-align: center;
        }
        .blog-title {
            font-size: 2.5rem;
            color: var(--primary-color);
            margin-bottom: 0.5rem;
        }
        .blog-subtitle {
            color: #666;
            font-weight: normal;
        }
        nav a {
            color: var(--primary-color);
            text-decoration: none;
            margin: 0 10px;
            font-weight: 500;
        }
        .post-list {
            list-style: none;
        }
        .post-item {
            background: var(--card-bg);
            border-radius: 10px;
            padding: 1.5rem;
            margin-bottom: 1.5rem;
            border: 1px solid var(--border-color);
            transition: box-shadow 0.3s;
        }
        .post-item:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .post-title {
            font-size: 1.5rem;
            color: var(--primary-color);
            margin-bottom: 0.5rem;
            text-decoration: none;
            display: block;
        }
        .post-date {
            color: #888;
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }
        .post-content {
            margin-top: 1rem;
        }
        .post-content h2, .post-content h3 {
            margin: 1.5rem 0 1rem;
            color: var(--text-color);
        }
        .post-content ul, .post-content ol {
            padding-left: 1.5rem;
            margin: 1rem 0;
        }
        .post-content code {
            background: #f1f5f9;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'SFMono-Regular', Consolas, monospace;
        }
        footer {
            text-align: center;
            margin: 3rem 0;
            color: #888;
            font-size: 0.9rem;
            padding-top: 2rem;
            border-top: 1px solid var(--border-color);
        }
        .back-link {
            display: inline-block;
            margin-top: 1.5rem;
            color: var(--primary-color);
            text-decoration: none;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <header>
        <h1 class="blog-title">我的个人博客</h1>
        <p class="blog-subtitle">分享想法、技术与生活</p>
        <nav>
            <a href="/">首页</a>
            <a href="#">关于</a>
            <a href="#">归档</a>
        </nav>
    </header>
    <main>
        ${bodyContent}
    </main>
    <footer>
        <p>© 2024 我的个人博客. 由 <a href="https://workers.cloudflare.com" target="_blank">Cloudflare Worker</a> 强力驱动。</p>
        <p>文章总数: ${blogPosts.length} 篇 | 最后更新: ${new Date().toLocaleDateString('zh-CN')}</p>
    </footer>
</body>
</html>
  `;
}

// 生成文章列表页的HTML内容
function generateHomePage() {
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  const postListItems = sortedPosts.map(post => `
    <article class="post-item">
      <a href="/post/${post.id}" class="post-title">${post.title}</a>
      <div class="post-date">发布于 ${post.date}</div>
      <div class="post-content">
        ${post.content.substring(0, 150)}${post.content.length > 150 ? '...' : ''}
      </div>
      <a href="/post/${post.id}" class="back-link">阅读全文 →</a>
    </article>
  `).join('');

  return generateHTML(
    "首页",
    `<h2 style="margin-bottom: 1.5rem;">最新文章</h2><div class="post-list">${postListItems}</div>`
  );
}

// 生成单篇文章页的HTML内容
function generatePostPage(postId) {
  const post = blogPosts.find(p => p.id === postId);
  if (!post) {
    return generateHTML(
      "文章未找到",
      `<h2>文章未找到</h2><p>抱歉，您要查找的文章不存在。</p><a href="/" class="back-link">← 返回首页</a>`
    );
  }

  return generateHTML(
    post.title,
    `<article class="post-item">
       <h2 class="post-title">${post.title}</h2>
       <div class="post-date">发布于 ${post.date} | 文章 ID: ${post.id}</div>
       <div class="post-content">${post.content}</div>
       <a href="/" class="back-link">← 返回首页</a>
     </article>`
  );
}

// Worker 主请求处理逻辑（这是必须的入口点）
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const path = url.pathname;

    let responseHTML;
    if (path === '/') {
      responseHTML = generateHomePage();
    } else if (path.startsWith('/post/')) {
      const postId = parseInt(path.split('/')[2]);
      responseHTML = isNaN(postId) ? generateHomePage() : generatePostPage(postId);
    } else {
      responseHTML = generateHTML(
        "页面未找到",
        `<h2>404 - 页面未找到</h2><p>您访问的页面 <code>${path}</code> 不存在。</p><a href="/" class="back-link">← 返回首页</a>`
      );
    }

    return new Response(responseHTML, {
      headers: { 'content-type': 'text/html;charset=UTF-8' },
    });
  },
};