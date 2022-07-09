<script>
  let person = "Icons/person.png";
</script>

<div class="profile--container">
  <div class="profile--image">
    <img src={person} alt="Profile image" />
  </div>
  <div class="profile--info">
    <h1>User Name #2222</h1>
    <h2>King Fahd University of Petroleum and Minerals</h2>
    <h2>Software Engineering - senior</h2>
  </div>
</div>

<style>
  .profile--container {
    width: 25rem;
    height: 30rem;
    background-color: #F9F8FE;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    border-radius: 50px;
    margin: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    
  }
  .profile--info {
    margin-top: 3rem;
  }
  .profile--info > * {
    padding: 5px;
  }

  .profile--image {
    width: fit-content;
    border-radius: 50%;
    overflow: hidden;
  }
</style>
