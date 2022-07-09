<script>
  let trash = "Icons/delete_FILL0_wght400_GRAD0_opsz48.svg";
  let newItem = "";

  let todoList = [
    { text: "Write my first post", status: true },
    { text: "Upload the post to the blog", status: false },
    { text: "Publish the post at Facebook", status: false },
  ];

  function addToList() {
    todoList = [...todoList, { text: newItem, status: false }];
    newItem = "";
  }

  function removeFromList(index) {
    todoList.splice(index, 1);
    todoList = todoList;
  }
</script>

<div class="container">
  <input
    style="width:30rem; height: 2rem; border: none; margin-bottom: 1.5rem;"
    bind:value={newItem}
    type="text"
    placeholder="new todo item.."
  />
  <button
    style="border:none ; background-color: #6AC977; width: fit-content;
padding: 20px 20px; border-radius: 50%;"
    on:click={addToList}>Add</button
  >

  <br />
  {#each todoList as item, index}
    <div class="item">
      <input style="" bind:checked={item.status} type="checkbox" />
      <span class:checked={item.status}>{item.text}</span>
      <span on:click={() => removeFromList(index)}>
        <img
          src={trash}
          alt=""
          width="40px"
          height="20pxpx"
          style="float: right;"
        />
      </span>
      <br />
    </div>
  {/each}
</div>

<style>
  .item {
    
    font-size: 25px;
    border: 1px solid black;
  }
  .container {
    margin: 1rem 1rem;
  }
  .checked {
    text-decoration: line-through;
    background-color: #6ac977;
  }
</style>
