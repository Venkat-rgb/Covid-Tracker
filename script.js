"use strict";
const textBox = document.querySelector(".countries__input");
const btn = document.querySelector(".btn");
const countries = document.querySelector(".countries");

function checkEqual(word1, word2) {
  word1 = word1.toLowerCase();
  word2 = word2.toLowerCase();
  if (word1 === word2) return true;
  else return false;
}

const getCountry = async function (e) {
  try {
    if (this.value === "") return;
    const countryName = this.value.trim();

    let res = await fetch(`https://api.covid19api.com/summary`);
    if (!res.ok) throw new Error("Unable to get your data");

    const data = await res.json();

    const countriesArr = data.Countries;
    const currCountry = countriesArr.find((item) => {
      return checkEqual(item.Country, countryName);
    });

    if (!currCountry) return;

    res = await fetch(
      `https://restcountries.com/v3.1/alpha/${currCountry.CountryCode}`
    );
    if (!res.ok) throw new Error("Unable to get your image");

    const [imageData] = await res.json();

    const htmlData = `
          <article class="country">
              <img class="country__img" src=${imageData.flags.png} />
              <div class="country__data">
                  <h3 class="country__name">${currCountry.Country}</h3>
                  <p class="country__row">New Confirmed:
                    <span class="cases__number">
                        ${currCountry.NewConfirmed.toLocaleString("en-US")}
                    </span>
                  </p>
                  <p class="country__row">New Deaths:
                    <span class="cases__number">
                    ${currCountry.NewDeaths.toLocaleString("en-US")}
                    </span>
                  </p>
                  <p class="country__row">New Recovered:
                    <span class="cases__number">
                    ${currCountry.NewRecovered.toLocaleString("en-US")}
                    </span>
                  </p>
                  <p class="country__row">Total Confirmed:
                    <span class="cases__number">
                    ${currCountry.TotalConfirmed.toLocaleString("en-US")}
                    </span>
                  </p>
                  <p class="country__row">Total Deaths:
                    <span class="cases__number">
                    ${currCountry.TotalDeaths.toLocaleString("en-US")}
                    </span>
                  </p>
                  <p class="country__row">Total Recovered:
                    <span class="cases__number">
                    ${currCountry.TotalRecovered.toLocaleString("en-US")}
                    </span>
                  </p>
              </div>
          </article>
        `;
    countries.innerHTML = htmlData;
    countries.style.opacity = 1;
    textBox.value = "";
  } catch (err) {
    console.error(err.message);
  }
};

textBox.addEventListener("change", getCountry);
btn.addEventListener("click", getCountry);
