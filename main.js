const textareaFrom = document.querySelector("#textareaFrom");
const textareaTo = document.querySelector("#textareaTo");
const btnTranslate = document.querySelector("#btnTranslate");
const selects = document.querySelectorAll("select");

const countries = {
    "en-GB": "Inglês",
    "es-ES": "Espanhol",
    "it-IT": "Italiano",
    "ja-JP": "Japonês",
    "pt-BR": "Português",

};

selects.forEach((tag) => {
    for(let country in countries){
        let selected;
        if(tag.className.includes("textareaFrom") && country == "pt-Br"){
            selected = "selected";
        }else if(tag.className.includes("selectTo") && country == "en-GB"){
            selected = "selected";
        }
        const option = `<option value="${country}" ${selected}> ${countries[country]}</option>`;

        tag.insertAdjacentHTML("beforeend", option);
    }
});

btnTranslate.addEventListener("click", () => {
    if(textareaFrom.value){
        loadTranslation();
    }else{
        textareaTo.value = "";
    }
})

// Buscar nesse site aqui a api
//https://mymemory.translated.net/doc/spec.php
function loadTranslation(){
    //https://api.mymemory.translated.net/get?q=Olá Mundo!&langpair=en|it
    fetch(`https://api.mymemory.translated.net/get?q=${textareaFrom.value}&langpair=${selects[0].value}|${selects[1].value}`)
        .then((res) => res.json()).then((data) => {
            textareaTo.value = data.responseData.translatedText;
        })

}
