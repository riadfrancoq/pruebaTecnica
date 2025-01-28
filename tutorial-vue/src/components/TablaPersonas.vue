<template>
<div id="tabla-personas">
    <div v-if="loading" class="alert alert-info" role="alert">
        No se han agregado personas
    </div>
    <table class="table">
        <thead>
            <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="persona in users.result" :key="persona.id">
                <td v-if="editando === true">
                    <input type="text" class="form-control" v-model="persona.nombre" />
                </td>
                <td v-else>
                    {{ persona.nombre}}
                </td>
                <td v-if="editando === true">
                    <input type="text" class="form-control" v-model="persona.apellido" />
                </td>
                <td v-else>
                    {{ persona.apellido}}
                </td>
                <td v-if="editando === true">
                    <input type="email" class="form-control" v-model="persona.email" />
                </td>
                <td v-else>
                    {{ persona.email}}
                </td>
                <td v-if="editando === true">
                    <button class="btn btn-success">💾 Guardar</button>
                    <button class="btn btn-secondary ml-2" @click="editando = false">❌ Cancelar</button>
                </td>
                <td v-else>
                    <button class="btn btn-info" @click="editando = true">✏️ Editar</button>
                    <button class="btn btn-danger ml-2">🗑️ Eliminar</button>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script> 

export default {
  name: "TablaPersonas",
  data() {
    return {
        editando: false,
    }
  },
  props: {
    users: Object,
    loading: Boolean
  },


}
</script>

<style scoped>

</style>