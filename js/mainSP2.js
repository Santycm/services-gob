var splide = new Splide(".slider__home", {
  classes: {
    arrows: "splide__arrows hidden",
    pagination: "splide__pagination ",
    page: "splide__pagination__page border-2 border-solid  w-3 h-3  lg:w-4 lg:h-4 shadow-md ",
  },
  rewind: true,
  autoplay: "play",
});
splide.mount();

const loadServices = async () => {
  const response = await fetch("./js/serv-tram.json");
  const data = await response.json();
  return data;
};

window.addEventListener("load", async () => {
  const services = await loadServices();
  loadAll(services);
});

const loadAll = (services) => {
  services[0].ts.forEach((item) => {
    
      createCardS1(item);
  });
};

const cards = document.getElementById("cards");



const createCardS1 = (service) => {
  let card = document.createElement("LI");
  card.setAttribute(
    "class",
    "relative flex border-[1px] border-gray-300 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-500 group"
  );
  card.innerHTML = `
        <div class="h-full w-[12px] group-hover:w-full absolute bg-principal  duration-700 transition-all"></div>
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