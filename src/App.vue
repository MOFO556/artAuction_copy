<template>
  <div id="app">
  <!--  <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view />

  </div>
</template>

<style>

  @import url('https://fonts.googleapis.com/css?family=Nunito:400,600,700&display=swap');



#app {
  font-family: "Nunito", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
/*

@font-face {
  font-family: 'Geometria';
  src: local('Geometria Thin'), local('Geometria-Thin'),
  url('~@/assets/fonts/geometria/Geometria-Thin.woff') format('woff'),
  url('~@/assets/fonts/geometria/Geometria-Thin.woff2') format('woff2');
  font-weight: 100;
  font-style: normal;
}
*/


</style>
