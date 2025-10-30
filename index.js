    const button = document.querySelector('.main_btn')
    const input = document.querySelector('.main_input')
    const java_div = document.querySelector('.java_div')

    window.addEventListener('load',async()=>{
        console.log('322')
        const sessionCity = localStorage.getItem('city')||null
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

        try {
            const {temp, city} = await getWeather(input_value)
            p.textContent = `в ${city} ощущается как: ${temp}°C`
        } catch (error) {
            p.textContent = '❌ Город не найден или ошибка сети'
            p.style.color = 'red'
        }
    }
    async function getWeather(city){
        const res = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`)
        const data = await res.json()
        return {
            temp: data.current_condition[0].FeelsLikeC,
            city: data.nearest_area[0].areaName[0].value

        }
        // console.log(data);
    }

    function saveCity(city){
        localStorage.setItem('city',city)
    }
