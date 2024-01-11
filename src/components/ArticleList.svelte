<script>
  import { onMount } from "svelte";
  import { articles, currentArticlesPage } from "../stores";
  import Article from "./Article.svelte";
  import ArticleLoading from "./ArticleLoading.svelte";

  let component;
  let element;

  onMount(() => {
    articles.resetArticles();
    articles.fetchArticles();
  });

  $: {
    if (component) {
      element = component.parentNode;
      element.addEventListener("scroll", onScroll);
      element.addEventListener("resize", onScroll);
    }
  }

  const onScroll = (e) => {
    // 브라우저 스크롤 높이
    const scrollHeight = e.target.scrollHeight;
    // 화면 높이
    const clientHeight = e.target.clientHeight;
    // 현재 스크롤 위치
    const scrollTop = e.target.scrollTop;
    // 실제 스크롤 사이즈
    const realHeight = scrollHeight - clientHeight;
    const triggerHeight = realHeight * 0.7;

    const triggerComputed = () => {
      return scrollTop > triggerHeight;
    };

    const scrollTrigger = () => {
      return triggerComputed();
    };

    if (scrollTrigger()) {
      currentArticlesPage.increPage();
    }
  };
</script>

<!-- slog-list-wrap start-->
<div class="slog-list-wrap" bind:this={component}>
  <ul class="slog-ul">
    {#each $articles.articleList as article, index}
      <li class="mb-5">
        <Article {article} />
      </li>
    {/each}
  </ul>
</div>
<!-- slog-list-wrap end-->
