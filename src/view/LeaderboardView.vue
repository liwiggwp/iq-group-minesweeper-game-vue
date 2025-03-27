<template>
  <div class="leaderboard">
    <h1>Таблица рекордов</h1>
    <table>
      <thead>
        <tr>
          <th></th>
          <th>Игрок</th>
          <th>Время</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(leader, index) in leaders" :key="index">
          <td style="font-weight: bold">{{ index + 1 }}</td>
          <td>{{ leader.player }}</td>
          <td>{{ leader.time }}</td>
        </tr>
      </tbody>
    </table>
    <CustomButton @click="$router.push('/')" width="100"
      >Вернуться к настройкам</CustomButton
    >
  </div>
</template>

<script>
import CustomButton from "@/components/ui/CustomButton.vue";

export default {
  components: {
    CustomButton,
  },
  data() {
    return {
      leaders: [],
    };
  },
  mounted() {
    this.leaders = this.$store.getters.TOPLEADERS;
  },
};
</script>

<style>
.leaderboard {
  max-width: 400px;
  margin: auto;
  text-align: center;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  border-radius: 10px;
  overflow: hidden;
  font-size: 20px;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f4f4f4;
  font-weight: bold;
}
tr:nth-child(even) {
  background-color: #f9f9f9;
}
tr:hover {
  background-color: #f1f1f1;
}
</style>