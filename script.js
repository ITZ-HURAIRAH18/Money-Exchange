let drop = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("body button");
let fromCurrency = document.querySelector(".from select");
let toCurrency = document.querySelector(".to select");
let msg=document.querySelector(".msg");
// Log selected currencies when changed
fromCurrency.onchange = () => console.log(fromCurrency.value);
toCurrency.onchange = () => console.log(toCurrency.value);

let tot; // Initialize `tot` outside the scope

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '5ca170437bmshda95418c38b1deap13a156jsn65ea58e89cd2',
        'x-rapidapi-host': 'currency-converter241.p.rapidapi.com'
    }
};

// Convert currency function
async function convertCurrency(from, to, amount) {
    const url = `https://currency-converter241.p.rapidapi.com/conversion_rate?from=${from}&to=${to}`;

    try {
        const response = await fetch(url, options);
        const data = await response.json(); // Parse response as JSON

        // Assuming `data.rate` contains the conversion rate
        const rate = data.rate;
        const convertedAmount = rate * amount;
        msg.innerText=`${amount} ${fromCurrency.value} =${convertedAmount.toFixed(2)}  ${toCurrency.value}`

        console.log(`Conversion rate: ${rate}`);
        console.log(`Converted amount: ${convertedAmount} ${to}`);
    } catch (error) {
        console.error(error);
    }
}

// Populate dropdowns with currency codes
for (let select of drop) {
    for (let code in countryList) {
        let option = document.createElement("option");
        option.innerText = code;
        select.append(option);

        if (select.name === "from" && code === "USD") {
            option.selected = true;
        } else if (select.name === "to" && code === "PKR") {
            option.selected = true;
        }
    }

    // Update flag on currency change
    select.addEventListener("change", (evt) => {
        flag(evt.target);
    });
}

// Update flag image based on selected currency
const flag = (element) => {
    let currCode = element.value;
    console.log(currCode);
    
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    if (img) img.src = newSrc;
};

// Event listener for conversion button
btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    let amountInput = document.querySelector("form input");
    tot = amountInput.value;

    if (tot === "" || tot < 1) {
        tot = 1;
        amountInput.value = "1";
    }

   
    
    // Call the convertCurrency function with selected currencies and amount
    convertCurrency(fromCurrency.value, toCurrency.value, tot);
});
