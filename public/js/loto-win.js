const ipcRenderer = require('electron').ipcRenderer
let preloader=document.getElementById('preloader')

Vue.component('sorteo-section', {
    props: {
        name: String,
        date: String,
        score: String,
        image: String
    },
    methods: {
        getDay(date){
            dayDate = new Date(date.replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3")).getDay()
            dayCurrent= new Date().getDay()
            
            if(dayCurrent==dayDate)return 'today'
            else return ''
        }
        
    },
    template: `
        <div class="card sorteo-section">
            <div class="sorteo">
                <div class="title">
                  <strong>{{name}}</strong>
                </div>
                <img :src=image alt="" class="img-sorteo">
                <span :class="getDay(date)" class="date-sorteo">{{date}}</span>
                <div class="score-section" v-html="score">
                    
                </div>
            </div>
        </div>
`
})

const app = new Vue({
    el: '#app',
    data:{
        nacional:[],
        lotoreal:[],
        leidsa:[],
        newyork:[],
        americanas:[],
        loteka:[],
    }
})

ipcRenderer.on('return-json', (evt, jsonData) => {
    jData = JSON.parse(jsonData)
    console.log(jData[0].sorteos);
    app.nacional=jData[0].sorteos
    app.lotoreal=jData[2].sorteos
    app.leidsa=jData[1].sorteos
    app.newyork=jData[5].sorteos
    app.americanas=jData[4].sorteos
    app.loteka=jData[3].sorteos
    preloader.style.display = "none";
})