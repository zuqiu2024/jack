// blog_worker.js
// 博客的所有文章数据
const blogPosts = [
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
    id: 3,
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
    id: 4,
    title: "为人寻偶",
    date: "2026-01-02",
    content: `
      <h3>【在青春主场，寻找一位并肩奔跑的你】</h3>
      <p>我是一名八年级男生，热爱篮球。</p>
      <p>希望遇见一个愿意并肩前行的人。</p>
    `
  },
  {
    id: 5,
    title: "崇拜希特勒的**",
    date: "2026-01-03",
    content: `
      <h2>崇拜希特勒的**</h2>
      <h3>1. 崇拜希特勒原因</h3>
      <p><strong>网络：</strong></p>
      <p>
        崇拜的大多原因一群人崇拜希特勒，纳粹的主要出处，
        多靠网络一些**营销号和一些**历史虚无主义者的**语录。
      </p>
    `
  },
  {
    id: 6,
    title: "我的绘画",
    date: "2026-01-04",
    content: `
      <p>这是我的第一张绘画，如何呢？</p>

      <img 
        src="https://raw.githubusercontent.com/zuqiu2024/jack/main/first.jpg"
        alt="我的绘画"
        style="max-width:100%;border-radius:12px;margin:1.5rem 0;"
      >
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
body{font-family:sans-serif;max-width:800px;margin:auto;padding:20px}
.post-item{border:1px solid #ddd;padding:20px;margin-bottom:20px;border-radius:10px}
.post-title{font-size:1.5rem;color:#2563eb;text-decoration:none}
.back-link{display:inline-block;margin-top:20px}
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

// 单篇文章（含评论区）
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
      <a class="back-link" href="/">← 返回首页</a>
    </article>

    <div style="margin-top:3rem;">
      <script src="https://giscus.app/client.js"
        data-repo="zuqiu2024/jack"
        data-repo-id="R_kgDOQy0W2A"
        data-category="General"
        data-category-id="DIC_kwDOQy0W2M4C0ha1"
        data-mapping="pathname"
        data-strict="0"
        data-reactions-enabled="1"
        data-emit-metadata="1"
        data-input-position="bottom"
        data-theme="light"
        data-lang="zh-CN"
        crossorigin="anonymous"
        async>
      </script>
    </div>`
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
