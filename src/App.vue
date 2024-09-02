<script setup>
  import { ref, reactive, onMounted } from 'vue'

  const API_URL = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'

  const monedas = ref([
    { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
    { codigo: 'MXN', texto: 'Peso Mexicano'},
    { codigo: 'EUR', texto: 'Euro'},
    { codigo: 'GBP', texto: 'Libra Esterlina'},
  ])

  const criptomonedas = ref([])

  const formulario = reactive({
    moneda: '',
    criptomoneda: ''
  })

  onMounted(() => {
    fetch(API_URL)
        .then((respuesta => respuesta.json()))
        .then(({Data}) => criptomonedas.value = Data)
  })

  const obtenerCotizacion = () => {
    if (Object.values(formulario).includes('')) {
      console.log('Selecciona una moneda y una criptomoneda')
      return
    }
    console.log('Consultando API...', formulario.moneda, formulario.criptomoneda)
  }

</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>
    <div class="contenido">
      <form
          @submit.prevent="obtenerCotizacion"
          class="formulario">
        <div class="campo">
          <label for="moneda">Moneda:</label>
          <select
              v-model="formulario.moneda"
              id="moneda">
            <option value="">Seleccionar</option>
            <option
                v-for="moneda in monedas"
                :value="moneda.codigo">
                  {{ moneda.texto }}
            </option>
          </select>
        </div>
        <div class="campo">
          <label for="criptomonedas">Criptomoneda:</label>
          <select
              :value="formulario.criptomoneda"
              v-model="formulario.criptomoneda"
              id="criptomonedas">
            <option value="">Seleccionar</option>
            <option
                v-for="criptomoneda in criptomonedas"
                :value="criptomoneda.CoinInfo.Name">
              {{ criptomoneda.CoinInfo.FullName }} ({{ criptomoneda.CoinInfo.Name }})
            </option>
          </select>
        </div>
        <input
            type="submit"
            value="Cotizar">
      </form>
    </div>
  </div>
</template>
