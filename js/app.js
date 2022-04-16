function showResults(results) {
  const container = document.querySelector(".results");
  const template = document.querySelector("#result-item-template");
  for (const r of results) {
    console.log(r);
    const imgEl = template.content.querySelector(".result-item-img");
    imgEl.src = r.thumbnail;

    const titleEl = template.content.querySelector(".result-item-title");
    titleEl.textContent = r.title;

    const conditionEl = template.content.querySelector(
      ".result-item-condition"
    );
    conditionEl.textContent = r.attributes[1].value_name;

    const sellEl = template.content.querySelector(".result-item-sell-count");
    sellEl.textContent = r.sold_quantity;

    const priceEl = template.content.querySelector(".result-item-price");
    priceEl.textContent = "$" + r.price;

    const clone = document.importNode(template.content, true);

    container.appendChild(clone);
  }
}

//solucionar porque trae todos los datos

function removeResults() {
  const templateEl = document.querySelector(".results");
  while (templateEl.lastElementChild) {
    templateEl.removeChild(templateEl.lastElementChild);
  }
}

function countResults(resNumb) {
  const contadorEl = document.querySelector(".results-count");
  contadorEl.textContent = resNumb;
}

function main() {
  const formEl = document.querySelector(".search-form");
  console.log(formEl);
  formEl.addEventListener("submit", function (e) {
    e.preventDefault();
    
    const search = e.target.search.value;

    fetch("https://api.mercadolibre.com/sites/MLA/search?q=" + search)
      .then((response) => response.json())
      .then((res) => {
        removeResults();
        countResults(res.paging.total);
        showResults(res.results);
      });
  });
}

main();
