const loadServices = async () => {
  const response = await fetch("./js/serv-tram.json");
  const data = await response.json();
  return data;
};

window.addEventListener("load", async () => {
  const services = await loadServices();
  loadAll(services)
});

const loadAll = (services)=>{
  services.forEach((item) => {
    if (item.id === 0) {
      item.ts.map((service) => {
        createCardS1(service);
      });
    } else {
      item.ts.map((service) => {
        createCardS2(service);
      });
    }
  });
}

const cards = document.getElementById("cards");

//Estilo correspondiente a la secretaria de salud
const createCardS1 = (service) => {
  let card = document.createElement("ARTICLE");
  card.setAttribute(
    "class",
    "relative flex border-[1px] border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-500 group"
  );
  card.innerHTML = `
        <div class="h-full w-[12px] group-hover:w-full absolute bg-principal transition-colors duration-700 transition-all"></div>
            <section class="py-[20px] px-[10px] grid gap-[10px] w-full relative ml-[12px]">
                <h3 class="text-[15px] line-clamp-2 font-semibold leading-tight group-hover:text-white">${service.title}</h3>
                    <section class="flex items-center gap-[10px]">
                        <a href="${service.btn}" class="text-[10px] font-semibold bg-principal hover:bg-principal group-hover:bg-white group-hover:text-black text-white px-[10px] py-[6px] rounded-full">REALIZAR</a>
                        <a href="${service.link}" class="text-[12px] group-hover:text-white hover:font-bold">Conoce más</a>
                    </section>
            </section>
            `;
  cards.appendChild(card);
};

const createCardS2 = (service) => {
  let card = document.createElement("ARTICLE");
  card.setAttribute(
    "class",
    "relative flex border-[1px] border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-500 group"
  );
  card.innerHTML = `
        <div class="h-full w-[12px] group-hover:w-full absolute bg-second transition-colors duration-700 transition-all"></div>
            <section class="py-[20px] px-[10px] grid gap-[10px] w-full relative ml-[12px]">
                <h3 class="text-[15px] line-clamp-2 font-semibold leading-tight">${service.title}</h3>
                    <section class="flex items-center gap-[10px]">
                        <a href="${service.btn}" class="text-[10px] font-semibold bg-second group-hover:bg-white group-hover:text-black text-white hover:font-bold px-[10px] py-[6px] rounded-full">REALIZAR</a>
                        <a href="${service.link}" class="text-[12px] hover:font-bold">Conoce más</a>
                    </section>
            </section>
            `;
  cards.appendChild(card);
};

const searchInput = document.getElementById("searchInput");

const searchService = async (word) => {
  const response = await fetch("./js/serv-tram.json");
  const data = await response.json();

  let results = [];
  cards.innerHTML = "";

  data.forEach((item) => {
    item.ts.forEach((service) => {
      if (service.title.toLowerCase().includes(word.toLocaleLowerCase())) {
        results.push(service)
      }
    });
  });

  for(let i=0; i<results.length; i++){
    if(results[i].secret === "salud"){
      createCardS1(results[i])
    }else{
      createCardS2(results[i]);
    }
  }
  results = []
};

searchInput.addEventListener("input", function(){
  searchService(searchInput.value);
});

searchInput.addEventListener("keydown", (e)=>{
  if(e.key==="Enter"){
    viewResults();
  }
})

function viewResults(){
  cards.scrollIntoView({behavior:'smooth'})
}

const filterResult = async(filter)=>{
  const services = await loadServices();
  cards.innerHTML = "";
  services[filter].ts.forEach((item)=>{
    if(filter===0){
      createCardS1(item)
    }else{
      createCardS2(item)
    }
  })
  document.getElementById("buttonShowAll").classList.remove("hidden");
}

const showAll = async()=>{
  cards.innerHTML = "";
  document.getElementById("buttonShowAll").classList.add("hidden");
  const services = await loadServices();
  loadAll(services);
}