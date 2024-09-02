<script setup>
  import useCripto from './composables/useCripto.js'
  import Alerta from './components/Alerta.vue'
  import Spinner from './components/Spinner.vue'
  import Cotizacion from './components/Cotizacion.vue'

  const {
    monedas,
    formulario,
    error,
    criptomonedas,
    cargandoCotizacion,
    obtenerCotizacion,
    cotizacion,
    mostrarResultados
  } = useCripto()

</script>

<template>
  <div class="contenedor">
    <h1 class="titulo">Cotizador de <span>Criptomonedas</span></h1>
    <div class="contenido">
      <Alerta
          v-if="error !== ''">
        {{ error }}
      </Alerta>
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
      <Spinner v-if="cargandoCotizacion" />
      <Cotizacion
          v-if="mostrarResultados"
          :cotizacion="cotizacion"/>
    </div>
  </div>
</template>
