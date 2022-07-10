<script>
  import Nav from "./components/Nav.svelte";
  import Profile from "./components/Profile.svelte";
  import TodoPreview from "./components/Todo-preview.svelte";
  import Watch from "./components/watch.svelte";
  import MediaQuery from "./MediaQuery.svelte";
</script>

<MediaQuery query="(min-width: 800px)" let:matches>
  {#if matches}
    <main>
      <div class="container">
        <Nav />
        <div class="thepages-containers">
          <TodoPreview />
          <Profile />
          <Watch />
        </div>
      </div>
    </main>
  {/if}
  <main>
    <div class="container">
      <Nav />
      <div class="thepages-containers">
        <TodoPreview />
        <Profile />
        <Watch />
      </div>
    </div>
  </main>
</MediaQuery>

<style>
  .container {
    height: 100%;
    display: flex;
  }

  .thepages-containers {
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    border-radius: 100px;
    margin-top: 20px;
    margin-right: 20px;
    margin-bottom: 20px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
      rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
      rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    width: 100%;
  }
</style>
