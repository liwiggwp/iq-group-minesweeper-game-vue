<template>
  <div class="error404">
    <h1>404</h1>
    <p>Страница не найдена</p>
    <img src="@/assets/error404.png" class="error404-image" />
    <CustomButton @click="$router.push('/')" width="200px">
      Вернуться на главную
    </CustomButton>
  </div>
</template>

<script>
import CustomButton from "@/components/ui/CustomButton.vue";

export default {
  components: {
    CustomButton,
  },
};
</script>

<style scoped>
.error404 {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  background-color: #f8f9fa;
  color: #333;
}

.error404 h1 {
  font-size: 80px;
  margin: 0;
}

.error404-image {
  width: 400px;
  height: 400px;
}
</style>