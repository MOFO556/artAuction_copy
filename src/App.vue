<template>
  <div id="app">
    <link rel="stylesheet" href="animate.min.css">
  <!--  <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <transition name="slide-fade" mode="out-in">
      <router-view />
    </transition>

  </div>
</template>


<style>

  @import url('https://fonts.googleapis.com/css?family=Nunito:400,600,700&display=swap');

  html{
    background:grey;
    overflow: hidden;
  }

  .inner{
    background: white;
    width: 360px;
    height: 640px;
  }

  .outer
  {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }

#app {
  font-family: "Nunito", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}



</style>
