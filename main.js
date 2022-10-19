
const searchBtn = document.getElementById('search');
const results=document.getElementById('results');
const userInput =document.getElementById('user-input');
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '976f3bc9b6msh785129b02be7970p1c5ebcjsn9fd18ea4ca47',
        'X-RapidAPI-Host': 'imdb8.p.rapidapi.com'
    }
};

searchBtn.addEventListener('click', callApiGeneralInfo)
results.addEventListener('click', viewDetails)

function callApiGeneralInfo()

{

    const  term=userInput.value;
    if (!term)return;
    fetch(`https://imdb9.p.rapidapi.com/auto-complete?q=${term.replace(/\s+/g,'%20')}`, options)
        .then(response => response.json())
        .then(response => fillCard(response))
        .catch(err => console.error(err));
}


function  viewDetails (e){

    if (e.target.matches('button.synopsis')){


        const target=e.target;
        showDetails(target,target);
        console.log("load");
    }
    if (e.target.matches('button.show')){

        const target=e.target.closest('.generalInfo')
        showSynopsis(target);
    }
    if (e.target.matches('button.back')){

        const target=e.target;
       hideSynopsis(target.closest('.details'))

    }
}
function fillCard(response){

    console.log(response.d[0])
    results.innerHTML="";
    for (i=0;i<response.d.length;i++){
        const  card=document.createElement("generalInfo")
        card.classList.add('col-md-auto');

        card.innerHTML=` <div class="card mt-3" style="width: 18rem; " >
                        <div class="generalInfo" id=${response.d[i].id}>
                            <img  src= ${response.d[i].i? response.d[i].i.imageUrl :"https://cdn.pixabay.com/photo/2016/08/07/15/34/do-not-take-photos-1576438_960_720.png"}  class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${response.d[i].l}</h5>
                                <p class="card-text">${response.d[i].y? response.d[i].y : "sin fecha"}</p>
                                <p class="card-text">${response.d[i].s}</p>
                                <button class="synopsis btn bg-success text-white">Ver resumen</button>
                            </div>
                        </div>

                        <div class="details hide ">
                            <div class="card-body reading">
                                <h5 class="card-title">Resumen</h5>
                                <div class="sinopsis">

                                    <p class="card-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                        !</p>
                                </div>
                                <button class="back btn bg-success text-white">Atrás</button>

                            </div>
                        </div>

                    </div>`
        results.appendChild(card);
    }
}

function showDetails(target){



        fetch(`https://imdb8.p.rapidapi.com/title/get-synopses?tconst=${target.closest('.generalInfo').id}`, options)
        .then(response => response.json())
        .then(response =>  updateDetails(response,target))
        .catch(err => console.error(err));
}


function  updateDetails(response,target){

    const  display=   target.closest('.generalInfo').nextElementSibling;
    const display_text=display.querySelector('.card-text');
    display_text.innerHTML=response[0]? response[0].text: "No se encontró resumen"
    showSynopsis(target.closest('.generalInfo'));
    target.classList.remove('synopsis');
    target.classList.add('show');
}
function showSynopsis(display)
{
   display.classList.add('hide');
   display.nextElementSibling.classList.remove('hide');
}

function hideSynopsis(display)
{
    display.classList.add('hide');
    display.parentNode.querySelector('.generalInfo').classList.remove('hide');
}
