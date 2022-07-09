<script>
  import TodoPreviewItem from "./Todo--preview--item.svelte";
  let person = "Icons/person.png";

  let work;
</script>

<div class="todo--pre--container">
  <h1>Todo list</h1>
  <div class="todo--pre--list">
    <TodoPreviewItem />
  </div>
</div>

<style>
  .todo--pre--container {
    width: 40rem;
    height: 50rem;
    background-color: #f9f8fe;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    border-radius: 50px;
    margin: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 5rem;
    font-size: 50px;
  }
  .todo--pre--list {
    margin: 2rem;
    width: 100%;
    overflow: scroll;
    
  }
  h1 {
    border-bottom: 2px solid black;
  }
</style>
