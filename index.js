const button = document.querySelector('.main_btn')
const input = document.querySelector('.main_input')
const java_div = document.querySelector('.java_div')

window.addEventListener('load',async()=>{
    console.log('322')
    const sessionCity = localStorage.getItem('city'||null)
    input.value = sessionCity
    await renderApp(sessionCity)
    input.value = ''

})

button.addEventListener('click',async()=>{
    const input_value = input.value.trim()
    if(input_value === ''){
        return
    }
    saveCity(input_value)

    java_div.innerHTML = ''
    input.value = ''
    renderApp(input_value)

   
})
async function renderApp(input_value){
     const p = document.createElement('div')
    p.textContent = 'загрузка...'
    java_div.appendChild(p)

    const temp = await getWeather(input_value)
    const city = await getCity(input_value)
     p.textContent = `в ${city} ощущается как: ${temp}°C`
}
async function getWeather(city){
    const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`)
    const data = await res.json()
    return data.current_condition[0].FeelsLikeC
    // console.log(data);
}
async function getCity(city){
    const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`)
    const data = await res.json()
    return data.nearest_area[0].areaName[0].value
    // console.log(data);
}
function saveCity(city){
    localStorage.setItem('city',city)
}
