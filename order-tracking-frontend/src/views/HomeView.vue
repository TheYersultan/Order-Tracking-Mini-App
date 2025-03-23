<template>
  <v-container>
    <v-card flat>
      <v-card-title class="d-flex align-center pe-2">
        Тапсырыстарды қадағалау

        <v-spacer></v-spacer>


      </v-card-title>

      <v-divider></v-divider>

      <v-card-title class="d-flex align-center pe-2">
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="dialog = true"
          class="text-capitalize mt-5 ml-auto"
        >
          Тапсырысты қосу
        </v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="orders"
        class="mt-1"
        density="comfortable"
        elevation="2"
        hover
      >
        <template v-slot:[`item.itemName`]="{ item }">
          {{ item.itemName }}
        </template>

        <template v-slot:[`item.photoUrl`]="{ item }">
          <v-img
            v-if="item.photoUrl"
            :src="`http://localhost:3000${item.photoUrl}`"
            :width="60"

            class="rounded-lg my-2"
          ></v-img>
          <span v-else>No Image</span>
        </template>

        <template v-slot:[`item.address`]="{ item }">
          <span class="font-weight-medium">{{ item.address }}</span>
        </template>


        <template v-slot:[`item.status`]="{ item }">
          <v-chip
            :color="getStatusColor(item.status)"
            :text="getStatusText(item.status)"
            class="text-uppercase"
            size="small"
            label
          ></v-chip>
        </template>

      </v-data-table>

      <v-dialog v-model="dialog" max-width="500px"  :fullscreen="$vuetify.display.mobile">
        <v-card>
          <v-card-title class="text-h6 bg-primary text-white pa-4">
            Жаңа тапсырыс
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="addOrder" class="pa-4">
              <v-text-field
                v-model="newOrder.itemName"
                label="Тапсырыстың аты"
                required
                variant="outlined"
                class="mb-4"
                :rules="[v => !!v || 'Тапсырыстың аты міндетті']"
              ></v-text-field>

              <v-text-field
                v-model="newOrder.address"
                label="Мекен-жайы"
                required
                variant="outlined"
                class="mb-4"
                :rules="[v => (v !== null && v !== '' && v !== undefined) || 'Мекен-жайы міндетті']"
              ></v-text-field>

              <v-file-input
                label="Суретті жүктеу"
                @change="handleFileUpload"
                accept="image/*"
                variant="outlined"
                class="mb-4"
                :rules="[v => (v !== null && v !== '' && v !== undefined) || 'Суретті таңдау міндетті']"

              ></v-file-input>

              <v-select
                v-model="newOrder.status"
                :items="statuses"
                label="Статус"
                variant="outlined"
                class="mb-4"
                :rules="[v => (v !== null && v !== '' && v !== undefined) || 'Статус міндетті']"
              ></v-select>

              <v-card-actions class="pa-0">
                <v-spacer></v-spacer>
                <v-btn color="red" @click="dialog = false" variant="text">Жабу</v-btn>
                <v-btn type="submit" color="primary" :loading="loading" variant="elevated">
                  Сақтау
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const orders = ref([]);
const statuses = ref(["Өңдеуде", "Жеткізілді"]);
const dialog = ref(false);
const loading = ref(false);
const selectedFile = ref(null);
const search = ref("");


const getStatusColor = (status) => (status === 'Delivered' ? 'green' : 'red');
const getStatusText = (status) => (status === 'Delivered' ? 'Жеткізілді' : 'Өңдеуде');

const newOrder = ref({
  itemName: "",
  address: "",
  status: "",
});

const headers = [
  { title: "Тапсырыс аты", key: "itemName", align: "start" },
  { title: "Фото", key: "photoUrl", align: "start" },
  { title: "Мекен-жайы", key: "address", align: "start" },
  { title: "Статус", key: "status", align: "start" },
];

const fetchOrders = async () => {
  try {
    const response = await axios.get("http://localhost:3000/orders");
    orders.value = response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
  }
};

const handleFileUpload = (event) => {
  selectedFile.value = event.target.files[0];
};

const addOrder = async () => {
  if (!newOrder.value.itemName || !newOrder.value.address || !newOrder.value.status || !selectedFile.value) {
    return;
  }

  loading.value = true;
  try {
    const formData = new FormData();
    formData.append("itemName", newOrder.value.itemName);
    formData.append("address", newOrder.value.address);

    const statusMap = {
      "Өңдеуде": "In Progress",
      "Жеткізілді": "Delivered",
    };
    formData.append("status", statusMap[newOrder.value.status] || newOrder.value.status);

    if (selectedFile.value) {
      formData.append("photo", selectedFile.value);
    }

    await axios.post("http://localhost:3000/orders", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    newOrder.value = { itemName: "", address: "", status: "" };
    selectedFile.value = null;
    await fetchOrders();
    dialog.value = false;
  } catch (error) {
    console.error("Error adding order:", error);
  }
  loading.value = false;
};



onMounted(fetchOrders);
</script>

<style scoped>

* {
  font-family: Arial, Helvetica, sans-serif !important;
}
.v-data-table {
  border-radius: 10px;
  overflow: hidden;
}

.v-card-title {
  font-size: 1.5rem;
  font-weight: bold;
}

/* .v-data-table .v-data-table-header .v-data-table-header__content th {
  font-weight: bolder !important;
} */
.v-chip {
  font-weight: bold;
}

.v-img {
  border: 1px solid #ddd;
}

.v-btn {
  text-transform: capitalize;
  font-weight: bold;
}

.v-text-field {
  max-width: 100%;
}

.v-dialog .v-card {
  border-radius: 12px;
}

.v-dialog .v-card-title {
  background-color: #1976d2;
  color: white;
  padding: 16px;
  text-align: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
}
.v-file-input {
    margin-left: -40px;
  }



.v-dialog .v-card-text {
  padding: 16px;
}

@media (max-width: 600px) {
  .v-card-title {
    font-size: 1.2rem;
    flex-direction: column;
    align-items: flex-start;
  }

  .v-btn {
    font-size: 0.8rem;
    margin-top: 8px;
  }

  .v-data-table {
    padding: 0;
  }

  .v-data-table .v-data-table-header {
    font-size: 0.8rem;
  }

  .v-data-table .v-data-table-row {
    font-size: 0.8rem;
  }

  .v-dialog .v-card {
    border-radius: 0;
  }


  .v-dialog .v-card-title {
    font-size: 1.2rem;
    padding: 12px;
  }

  .v-dialog .v-card-text {
    padding: 12px;
  }

  .v-text-field,
  .v-select,
  .v-file-input {
    font-size: 0.9rem;
  }
  .v-file-input {
    margin-left: -40px;
  }

  .v-btn {
    font-size: 0.9rem;
  }
}
</style>
