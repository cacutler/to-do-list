<template>
  <div class="app-container">
    <slot></slot>
  </div>
</template>
<style scoped>
.app-container {
  max-width: 900px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
/* Add your global styles here */
</style>