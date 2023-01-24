<template>
  <div class="app">
    <!-- Navbar -->
    <b-navbar type="dark" variant="info">
      <b-container fluid="md">
        <b-navbar-brand to="/home">Leapsome Interview</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/home">Home</b-nav-item>
          <b-nav-item to="/praise">Praise Wall</b-nav-item>
        </b-navbar-nav>
      </b-container>
    </b-navbar>
    <!--/Navbar -->

    <!-- Container / Router -->
    <b-container fluid="md" class="main">
      <router-view />
    </b-container>
    <!--/Container / Router -->
  </div>
</template>

<style scoped>
.app {
  padding-bottom: 3rem;
}

.main {
  margin-top: 3rem;
}
</style>
