<template>
  <v-main class="ma-5">
    <v-row align="center" justify="center">
      <v-col lg="8">
        <v-row>Usuário</v-row>
        <v-row>
          <v-text-field data-cy="nome-usuario" v-model="username"></v-text-field>
        </v-row>
        <v-row>
          <v-btn data-cy="btn-confirmar-login" @click="login()">Confirmar</v-btn>
        </v-row>
      </v-col>
    </v-row>
  </v-main>
</template>

<script>
const axios = require('axios')
export default {

  data () {
    return {
      username: null
    }
  },

  methods: {
    async login () {
      console.log(this.username)
      await axios.get('http://localhost:3000/login', {
        params: {
          nome: this.username
        }
      })
        .then(resp => {
          console.log(resp.data.id)
          const user = {
            id: resp.data.id,
            name: this.username
          }
          const ultimoPedido = resp.data.ultimoPedido
          this.$store.dispatch('atualizaUser', user)
          this.$store.dispatch('atualizaUltimoPedido', ultimoPedido)
          this.$router.push('/pedidos')
        })
        .catch(e => {
          console.log(e)
        })
    }
  }

}
</script>

<style>

</style>
