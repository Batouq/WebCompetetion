<script>
  let src = "Icons/logout_FILL0_wght400_GRAD0_opsz48.svg";
  let logo = "Icons/logo-white.png";
  let grid = "Icons/grid_view_FILL0_wght400_GRAD0_opsz48.svg";
  let school = "Icons/school_FILL0_wght400_GRAD0_opsz48.svg";
  let todo = "Icons/checklist_FILL0_wght400_GRAD0_opsz48.svg";
  let setting = "Icons/settings_FILL0_wght400_GRAD0_opsz48.svg";
</script>

<nav class="nav--container">
  <img class="logo " src={logo} alt="" />
  <ul class="list--container">
    <li class="list--item"><img class="hoverr svg" src={grid} alt="grid" /></li>
    <li class="list--item"><img class="hoverr svg" src={todo} alt="" /></li>
    <li class="list--item"><img class="hoverr svg" src={school} alt="" /></li>
    <li class="list--item">
      <img class="svg hoverr" src={setting} alt="setting" />
    </li>
  </ul>
  <img class="logout svg" {src} alt="sign out" />
</nav>

<style>
  .svg {
    filter: brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(1%)
      hue-rotate(237deg) brightness(103%) contrast(101%);
  }
  .logo {
    width: 200px;
    padding-top: 1rem;
    padding-left: 10px;
    cursor: pointer;
  }
  .hoverr:hover {
    filter: brightness(0) saturate(100%) invert(40%) sepia(68%) saturate(1482%)
      hue-rotate(100deg) brightness(126%) contrast(125%);
  }
  .list--item {
    display: flex;
    cursor: pointer;
    padding: 20px;
    justify-content: center;
    width: 100px;
  }

  .logout {
    align-self: center;
    width: 50px;
    padding-bottom: 1rem;
    cursor: pointer;
  }
  .logout:hover {
    filter: brightness(0) saturate(100%) invert(16%) sepia(89%) saturate(7487%)
      hue-rotate(359deg) brightness(108%) contrast(111%);
  }
  li {
    list-style: none;
  }
  .nav--container {
    color: white;
    width: fit-content;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .list--container {
    display: flex;
    flex-direction: column;
    align-self: center;
  }
</style>
