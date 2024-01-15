<script>
  import { onMount, onDestroy, createEventDispatcher } from "svelte";
  import ArticleLoading from "./ArticleLoading.svelte";

  export let totalPageCount;
  export let currentPage;
  export let pageLock;
  export let loading;
  export let domTarget;

  let component;
  let element;

  const dispatch = createEventDispatcher();

  onMount(() => {
    component = document.querySelector(domTarget);
    element = component.parentNode;
  });

  onDestroy(() => {
    if (element) {
      element.removeEventListener("scroll", onScroll);
      element.removeEventListener("resize", onScroll);
    }
  });

  $: {
    if (element) {
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

    // 현재 페이지가 전체 페이지보다 작거나 같으면 true 리턴
    const countCheck = () => {
      const check = totalPageCount <= currentPage;
      return check;
    };

    // countCheck를 이용해 현재 페이지가 페이지 마지막일 경우 articlePageLock을 true 리턴 더이상 페이지 증가하지 않도록 락
    if (countCheck()) {
      dispatch("onPageLock");
    }

    const scrollTrigger = () => {
      return triggerComputed() && !countCheck() && !pageLock;
    };

    if (scrollTrigger()) {
      dispatch("increPage");
    }
  };
</script>

{#if loading}
  <ArticleLoading />
{/if}
