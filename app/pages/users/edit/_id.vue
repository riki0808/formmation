<template>
  <h1>アカウント設定</h1>
</template>

<script>
export default {
  asyncData(ctx) {
    console.log(ctx.params.id);
    // このIDを元にデータを取ってくる
  },
};
</script>
