<template>
  <div>
    <CustomHeader />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
import CustomHeader from "@/components/layout/CustomHeader.vue";

export default {
  components: {
    CustomHeader,
  },
};
</script>