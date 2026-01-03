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
      <p><strong>没有球门的足球场，还能叫足球场吗？</strong></p>
      <h3>2. 对羽毛球的改善</h3>
      <p>没网玩个蛋啊！</p>
      <h3>3. 微机房的虚构</h3>
      <p>电脑室是真实存在的，但电脑课仿佛不存在。</p>
      <hr>
      <p><i>以上是一个学生对2026年的幻想。</i></p>
    `
  },
  {
    id: 5,
    title: "为人寻偶",
    date: "2026-01-02",
    content: `
      <h3>【在青春主场，寻找一位并肩奔跑的你】</h3>
      <p>我是一名八年级男生，热爱篮球。</p>
      <p>希望遇见一个愿意并肩前行的人。</p>
    `
  },
  {
    id: 6,
    title: "崇拜希特勒的**",
    date: "2026-01-03",
    content: `
      <h2>崇拜希特勒的**</h2>

      <h3>1. 崇拜希特勒原因</h3>
      <p><strong>网络：</strong></p>
      <p>
        崇拜的主要原因是网络上一些 ** 营销号和历史虚无主义者，
        通过碎片化和所谓“美学包装”的方式歪曲历史事实，
        对纳粹罪行进行淡化甚至洗白。
      </p>

      <h3>2. 这类人的表现</h3>
      <p><strong>班级中</strong></p>
      <p>
        1. 敬不当手势<br>
        2. 高喊极端人物名字<br>
        3. 盲目鼓吹极端思想<br>
        4. 不允许任何质疑声音
      </p>

      <p><strong>特殊时间与场所的行为</strong></p>
      <p>
        在纪念反法西斯的重要日子里，
        仍有人佩戴不当标志并进行挑衅行为，
        对历史与现实都缺乏基本尊重。
      </p>
    `
  }
];

// 生成完整 HTML
function generateHTML(title, bodyContent) {
  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} | 我的个人博客</title>
<style>
body { font-family: sans-serif; max-width: 800px; margin: auto; padding: 20px; }
.post-item { border: 1px solid #ddd; padding: 20px; margin-bottom: 20px; border-radius: 10px; }
.post-title { font-size: 1.5rem; color: #2563eb; text-decoration: none; }
.back-link { display: inline-block; margin-top: 20px; }
#comments { margin-top: 40px; }
</style>
</head>
<body>
<header>
<h1>我的个人博客</h1>
<a href="/">首页</a>
</header>
<main>
${bodyContent}
</main>
<footer>
<p>文章总数：${blogPosts.length}</p>
</footer>
</body>
</html>
`;
}

// 首页
function generateHomePage() {
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const list = sortedPosts.map(p => `
    <article class="post-item">
      <a class="post-title" href="/post/${p.id}">${p.title}</a>
      <div>${p.date}</div>
      <a class="back-link" href="/post/${p.id}">阅读全文 →</a>
    </article>
  `).join("");

  return generateHTML("首页", list);
}

// 单篇文章页（已插入 Giscus）
function generatePostPage(id) {
  const post = blogPosts.find(p => p.id === id);
  if (!post) {
    return generateHTML("未找到", `<p>文章不存在</p><a href="/">返回</a>`);
  }

  return generateHTML(
    post.title,
    `<article class="post-item">
      <h2>${post.title}</h2>
      <div>${post.date}</div>

      ${post.content}

      <!-- 评论区 -->
      <div id="comments"></div>

      <a class="back-link" href="/">← 返回首页</a>
    </article>

    <!-- Giscus 评论系统 -->
    <script src="https://giscus.app/client.js"
      data-repo="你的GitHub用户名/你的仓库名"
      data-repo-id="你的REPO_ID"
      data-category="General"
      data-category-id="你的CATEGORY_ID"
      data-mapping="pathname"
      data-reactions-enabled="1"
      data-input-position="bottom"
      data-theme="light"
      data-lang="zh-CN"
      crossorigin="anonymous"
      async>
    </script>
    `
  );
}

// Worker 入口
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/") {
      return new Response(generateHomePage(), {
        headers: { "content-type": "text/html;charset=UTF-8" }
      });
    }

    if (path.startsWith("/post/")) {
      const id = parseInt(path.split("/")[2]);
      return new Response(generatePostPage(id), {
        headers: { "content-type": "text/html;charset=UTF-8" }
      });
    }

    return new Response(
      generateHTML("404", `<p>页面不存在</p><a href="/">返回首页</a>`),
      { headers: { "content-type": "text/html;charset=UTF-8" } }
    );
  }
};