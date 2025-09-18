<template>
  <div class="header">
    <h1>Todo App</h1>
    <p>Stay organized and get things done</p>
  </div>
</template>

<style scoped>
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 30px;
  text-align: center;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  font-weight: 300;
}

.header p {
  font-size: 1.1rem;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }
  
  .header {
    padding: 20px;
  }
}
</style>