import { computed, onMounted, reactive, ref } from 'vue'

export default function useCripto() {

    const API_URL = 'https://min-api.cryptocompare.com/data'
    const monedas = ref([
        { codigo: 'USD', texto: 'Dolar de Estados Unidos'},
        { codigo: 'MXN', texto: 'Peso Mexicano'},
        { codigo: 'EUR', texto: 'Euro'},
        { codigo: 'GBP', texto: 'Libra Esterlina'},
    ])
    const formulario = reactive({
        moneda: '',
        criptomoneda: ''
    })
    const criptomonedas = ref([])
    const cotizacion = ref({})
    const cargandoCotizacion = ref(false)
    const error = ref('')

    onMounted(() => {
        const url = `${API_URL}/top/mktcapfull?limit=20&tsym=USD`
        fetch(url)
            .then((respuesta => respuesta.json()))
            .then(({Data}) => criptomonedas.value = Data)
    })

    const obtenerCotizacion = () => {
        cotizacion.value = {}
        if (Object.values(formulario).includes('')) {
            error.value = 'Selecciona una moneda y una criptomoneda'
            setTimeout(() => {
                error.value = ''
            }, 2000)
            return
        }
        mostrarValoresCotizacion()
    }

    const mostrarValoresCotizacion = async() => {
        const { moneda, criptomoneda } = formulario
        const url = `${API_URL}/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
        const respuesta = await fetch(url)
        const datos = await respuesta.json()
        cargandoCotizacion.value = true
        setTimeout(() => {
            cotizacion.value = datos.DISPLAY[criptomoneda][moneda]
            cargandoCotizacion.value = false
        }, 2000)
    }

    const mostrarResultados = computed(() => {
        return Object.values(cotizacion.value).length > 0
    })

    return {
        API_URL,
        monedas,
        criptomonedas,
        formulario,
        error,
        cotizacion,
        cargandoCotizacion,
        obtenerCotizacion,
        mostrarResultados
    }

}
