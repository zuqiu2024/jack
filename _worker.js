// blog_worker.js

// ================== 博客文章数据 ==================
const blogPosts = [

  // ===== 免费赛事示例 =====
  {
    id: 1,
    title: "免费赛事｜经典友谊赛回顾",
    date: "2026-01-10",
    content: `
      <h2>经典友谊赛回顾</h2>

      <p>本场比赛为免费赛事，供球迷交流观看。</p>

      <img src="这里换成你的图片URL"
        style="max-width:100%;border-radius:10px;margin:10px 0;">

      <p>比赛节奏紧凑，场面精彩。</p>

      <h3>📁 视频观看</h3>
      <a href="你的免费网盘链接" target="_blank">
        点击前往观看
      </a>

      ${commentBlock()}
    `
  },

  // ===== 付费赛事示例（方案A） =====
  {
    id: 2,
    title: "付费赛事｜焦点大战完整版",
    date: "2026-01-11",
    content: `
      <h2>焦点大战 · 完整回放</h2>

      <p>本场比赛为高清完整版回放，需付费获取。</p>

      <img src="这里放比赛图片URL"
        style="max-width:100%;border-radius:10px;margin:10px 0;">

      <hr>

      <h3>💰 获取方式（方案 A）</h3>

      <img src="这里放你的付款码图片URL"
        style="max-width:240px;border-radius:10px;">

      <p style="margin-top:15px;font-weight:bold;">
        请把付款截图放不到邮箱：<br>
        zhanxuxiang2022@163.com
      </p>

      <p>
        我就告诉你视频网盘链接
      </p>

      ${commentBlock()}
    `
  },

  // ===== 02 世界杯 · 中国队 =====
  {
    id: 201,
    title: "02世界杯｜中国 vs 巴西",
    date: "2002-06-08",
    content: `
      <h2>中国 vs 巴西</h2>

      <p>
        2002 年韩日世界杯，中国队对阵世界冠军巴西队。
      </p>

      <img src="这里换成比赛图片URL"
        style="max-width:100%;border-radius:10px;margin:10px 0;">

      <hr>

      <h3>💰 回放获取（付费）</h3>

      <img src="这里放你的付款码图片URL"
        style="max-width:240px;border-radius:10px;">

      <p style="margin-top:15px;font-weight:bold;">
        请把付款截图放不到邮箱：<br>
        zhanxuxiang2022@163.com
      </p>

      <p>
        我就告诉你视频网盘链接
      </p>

      ${commentBlock()}
    `
  }

];

// ================== 评论区函数 ==================
function commentBlock() {
  return `
  <div style="margin-top:3rem;">
    <script src="https://giscus.app/client.js"
      data-repo="zuqiu2024/jack"
      data-repo-id="R_kgDOQy0W2A"
      data-category="General"
      data-category-id="DIC_kwDOQy0W2M4C0ha1"
      data-mapping="pathname"
      data-theme="light"
      data-lang="zh-CN"
      crossorigin="anonymous"
      async>
    </script>
  </div>
  `;
}

// ================== HTML 模板 ==================
function generateHTML(title, body) {
  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} | 足球风光</title>
<style>
body{font-family:sans-serif;max-width:900px;margin:auto;padding:20px}
.post-item{border:1px solid #ddd;padding:20px;margin-bottom:20px;border-radius:12px}
.post-title{font-size:1.4rem;color:#2563eb;text-decoration:none}
header img{max-width:100%;border-radius:12px;margin:15px 0}
.back-link{display:inline-block;margin-top:20px}
</style>
</head>
<body>

<header>
  <h1>足球风光</h1>

  <!-- 这里放首页顶部图片 -->
  <img src="这里换成你的首页图片URL">

  <nav>
    <a href="/">首页</a> |
    <a href="/worldcup-2002">02韩日世界杯</a>
  </nav>
</header>

<main>
${body}
</main>

<footer>
  <p>© 足球风光</p>
</footer>

</body>
</html>
`;
}

// ================== 首页 ==================
function generateHomePage() {
  const list = blogPosts.map(p => `
    <article class="post-item">
      <a class="post-title" href="/post/${p.id}">${p.title}</a>
      <div>${p.date}</div>
    </article>
  `).join("");

  return generateHTML("首页", list);
}

// ================== 文章页 ==================
function generatePostPage(id) {
  const post = blogPosts.find(p => p.id === id);
  if (!post) {
    return generateHTML("未找到", `<p>文章不存在</p>`);
  }

  return generateHTML(
    post.title,
    `<article class="post-item">
      ${post.content}
      <a class="back-link" href="/">← 返回首页</a>
    </article>`
  );
}

// ================== 专题页 ==================
function generateWorldCup2002Page() {
  return generateHTML(
    "02韩日世界杯 · 中国队",
    `
    <article class="post-item">
      <h2>🇨🇳 02 韩日世界杯 · 中国队</h2>
      <ul>
        <li><a href="/post/201">中国 vs 巴西</a></li>
      </ul>
      <a class="back-link" href="/">← 返回首页</a>
    </article>
    `
  );
}

// ================== Worker 入口 ==================
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    if (path === "/") {
      return new Response(generateHomePage(), {
        headers: { "content-type": "text/html;charset=UTF-8" }
      });
    }

    if (path === "/worldcup-2002") {
      return new Response(generateWorldCup2002Page(), {
        headers: { "content-type": "text/html;charset=UTF-8" }
      });
    }

    if (path.startsWith("/post/")) {
      const id = parseInt(path.split("/")[2]);
      return new Response(generatePostPage(id), {
        headers: { "content-type": "text/html;charset=UTF-8" }
      });
    }

    return new Response("404 Not Found", { status: 404 });
  }
};