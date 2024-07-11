const loadServices = async () => {
  const response = await fetch("./js/serv-tram.json");
  const data = await response.json();
  return data;
};

window.addEventListener("load", async () => {
  const services = await loadServices();
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
});

const cards = document.getElementById("cards");

//Estilo correspondiente a la secretaria de salud
const createCardS1 = (service) => {
  let card = document.createElement("ARTICLE");
  card.setAttribute(
    "class",
    "flex border-[1px] border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-500 group"
  );
  card.innerHTML = `
        <div class="h-full w-[12px] bg-principal group-hover:bg-hoverPrincipal transition-colors duration-500"></div>
            <section class="py-[20px] px-[10px] grid gap-[10px] w-full">
                <h3 class="text-[15px] line-clamp-3 font-semibold leading-tight">${service.title}</h3>
                    <section class="flex items-center gap-[10px]">
                        <a href="${service.btn}" class="text-[10px] font-semibold bg-principal hover:bg-hoverPrincipal  text-white px-[10px] py-[6px] rounded-full">REALIZAR</a>
                        <a href="${service.link}" class="text-[12px]">Conoce más</a>
                    </section>
            </section>
            `;
  cards.appendChild(card);
};

const createCardS2 = (service) => {
  let card = document.createElement("ARTICLE");
  card.setAttribute(
    "class",
    "flex border-[1px] border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-500 group"
  );
  card.innerHTML = `
        <div class="h-full w-[12px] bg-second group-hover:bg-hoverSecond transition-colors duration-500"></div>
            <section class="py-[20px] px-[10px] grid gap-[10px] w-full">
                <h3 class="text-[15px] line-clamp-3 font-semibold leading-tight">${service.title}</h3>
                    <section class="flex items-center gap-[10px]">
                        <a href="${service.btn}" class="text-[10px] font-semibold bg-second hover:bg-hoverSecond  text-white px-[10px] py-[6px] rounded-full">REALIZAR</a>
                        <a href="${service.link}" class="text-[12px]">Conoce más</a>
                    </section>
            </section>
            `;
  cards.appendChild(card);
};

const searchInput = document.getElementById("searchInput");

const searchService = async (word) => {
  const response = await fetch("./js/serv-tram.json");
  const data = await response.json();

  

  data.forEach((item) => {
    item.ts.forEach((service) => {
      if (service.title.toLowerCase().includes(word.toLocaleLowerCase())) {
        results.add(service);
      }
    });
  });

  console.log("------------------")
  console.log(results)

  for(let i=0; i<results.size; i++){
    if(results[i].secret === "salud"){
      createCardS1(results[i]);
    }else{
      createCardS2(results[i]);
    }
  }
  results.clear();
};

const results = new Set();

searchInput.addEventListener("input", () => {
  cards.innerHTML = "";
  searchService(searchInput.value);
});
