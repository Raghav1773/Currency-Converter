const Base_URL = "https://v6.exchangerate-api.com/v6/761b7a4f8573e29f11fc7988";

const dropdowns = document.querySelectorAll(".dropdown");
const btn = document.querySelector("button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

for (let dropdown of dropdowns) {
  const select = dropdown.querySelector("select");
  for (curr_code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = curr_code;
    newOption.value = curr_code;
    if (select.name === "from" && curr_code === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && curr_code === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let curr_code = element.value;
  let countryCode = countryList[curr_code];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let parentBox = element.closest(".from") || element.closest(".to");
  let img = parentBox.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector("input");
  let amt_val = amount.value;
  if (amt_val === "" || amt_val < 1) {
    amt_val = 1;
    amount.value = "1";
  }
  console.log(fromCurr.value, toCurr.value);
  const URL = `${Base_URL}/latest/${fromCurr.value}`;
  let response = await fetch(URL);
  let data = await response.json();

  let rate = data.conversion_rates[toCurr.value];
  let converted = (amount.value * rate).toFixed(2);

  const result = document.querySelector("#result");
  result.innerText = `${amount.value} ${fromCurr.value} = ${converted} ${toCurr.value}`;
});
