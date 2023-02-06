const main = document.querySelectorAll(".main")
const memePhoto = document.querySelector(".memePhoto")
const btn = document.querySelectorAll("button")
const inputs = document.querySelectorAll("input")
const topText = document.querySelector(".topText h2")
const bottomText = document.querySelector(".bottomText h2")
const linkas = document.querySelector(".linkas")


function getMemes (){
    fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())
        .then(data => {
            console.log(data.data.memes)
            data.data.memes.map(photo=>{
                main[1].innerHTML +=`
                <div class="box d-flex j-center a-center"><img src="${photo.url}" alt=""></div> 
                `
            })
            const pics = document.querySelectorAll(".box")
            pics.forEach((el) => {
                el.onclick = (event) => {
                    console.log(event)
                    generate(event.target.src)
                    window.scrollTo(0,0)
                }
            })
        })


}

function generate(url){
    memePhoto.src = `${url}`
}


getMemes()

btn[0].onclick =()=>{
    if (inputs[0].value.length > 4) topText.innerHTML = inputs[0].value
    if (inputs[1].value.length > 4) bottomText.innerHTML = inputs[1].value


}

btn[1].onclick =()=>{
    const item = {
        "topText": inputs[0].value,
        "bottomText": inputs[1].value,
        "imageUrl": memePhoto.src
    }
    const fetchOption = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(item)
    }
    fetch("http://167.99.138.67:9191/generate", fetchOption)
        .then(res=> res.json())
        .then (data =>{
            console.log(data)
            linkas.innerHTML =`
            <a href="${data.data.url}">ATSISIUSTI</a>
            `
        })

}

console.log(linkas)