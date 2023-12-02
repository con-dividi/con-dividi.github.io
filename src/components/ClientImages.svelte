<script>
  export let image_src;
  export let onclick;
</script>

<img
  class="m-auto h-auto max-w-full rounded-lg"
  src={image_src}
  alt=""
  on:click={onclick}
/>