<template>
<div id="app" class="container">
    <div class="row">
        <div class="col-md-12">
            <h1>Personas</h1>
        </div>
    </div>
    <div class="row">
        <div class="col-md-12">
            <formulario-persona :correoExists="correoExists"  @add-persona="agregarPersona"/>
            <tabla-personas :users="users" :loading="loading" />
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
import {toRaw,ref, onMounted} from 'vue';
import TablaPersonas from '@/components/TablaPersonas.vue';
import FormularioPersona from '@/components/FormularioPersona.vue';

export default {
    name: 'app',
    components: {
        TablaPersonas,
        FormularioPersona,
    },
    data() {
        return {
            correoExists: {value: false}
        }
    },
    methods: {
         async agregarPersona(persona) {
            try {

            const person = toRaw(persona);
            console.log(person);
            const response = await axios.post("http://localhost:5000/api/people", person);
            const data = response.data;
            console.log(data);
            } catch (error) {
                this.correoExists.value = true;
            }
            }


        },
    setup() {
    const loading = ref(true);
    const users = ref([]);
    const fetchUsers = async () => {
            try {
            const fetch = await axios.get('http://localhost:5000/api/people');
            const data = fetch.data;
            users.value = data;
            console.log(data);

            } catch (error) {
            console.log("Hubo un error en cargar los usuarios ");

            } finally {
                loading.value = false;
            }
      
        };

    onMounted(fetchUsers);
    return {
        loading,
        users
    }
  }
    }
    
   
   
    

</script>
<style>
body {
    background: #f9f9f9;
}
</style>