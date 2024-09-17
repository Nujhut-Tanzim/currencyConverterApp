optionList();
async function optionList() {
    const jsonFilePath =
        "https://gist.githubusercontent.com/ibrahimhajjaj/a0e39e7330aebf0feb49912f1bf9062f/raw/d160e7d3b0e11ea3912e97a1b3b25b359746c86a/currencies-with-flags.json";
    const res = await fetch(jsonFilePath);
    const flags = await res.json();
    function populateSelect(selectId, flags) {
        const select = document.getElementById(selectId);
        flags.forEach(function (flag) {
            const option = document.createElement("option");
            option.value = flag.code;
            option.textContent = flag.code;
            select.appendChild(option);
        });
    }

    populateSelect("fromCurrency", flags);
    populateSelect("toCurrency", flags);
}

async function flagImage1() {
    const fromCurrency = document.getElementById("fromCurrency").value;

    const jsonFilePath = "currencies-with-flags.json";
    const res = await fetch(jsonFilePath);
    const flags = await res.json();
    const container = document.getElementById("flags-container1");
    container.innerHTML = "";
    flags.forEach(function (flag) {
        if (flag.code == fromCurrency) {
            const img = document.createElement("img");
            img.src = flag.flag;
            img.alt = flag.name;
            container.appendChild(img);
        }
    });
}
async function flagImage2() {
    const toCurrency = document.getElementById("toCurrency").value;

    const jsonFilePath = "currencies-with-flags.json";
    const res = await fetch(jsonFilePath);
    const flags = await res.json();
    const container = document.getElementById("flags-container2");
    container.innerHTML = "";
    flags.forEach(function (flag) {
        if (flag.code == toCurrency) {
            const img = document.createElement("img");
            img.src = flag.flag;
            img.alt = flag.name;
            container.appendChild(img);
        }
    });
}

async function convert() {
    const resultDiv = document.getElementById("result1");
    const amount = parseFloat(document.getElementById("amount").value);
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;
    const app = document.getElementById("app").value;

    if (!amount || !fromCurrency || !toCurrency) {
        resultDiv.className = "alert alert-danger";
        resultDiv.classList.remove("d-none");
        resultDiv.classList.add("d-open");
        resultDiv.textContent = "Please enter amount and select currencies.";
        return;
    }

    if (app == "wise") {
        let convertedAmount = await WiseApp(fromCurrency, toCurrency, amount);
        resultDiv.className = "alert alert-success";
        resultDiv.classList.remove("d-none");
        resultDiv.classList.add("d-open");
        resultDiv.textContent = convertedAmount;
        console.log(convertedAmount);
    } else if (app == "exchangeRate") {
        let convertedAmount = await ExchangeRateApp(
            fromCurrency,
            toCurrency,
            amount
        );
        resultDiv.className = "alert alert-success";
        resultDiv.classList.remove("d-none");
        resultDiv.classList.add("d-open");
        resultDiv.textContent = convertedAmount;
        console.log(convertedAmount);
    }
}

async function WiseApp(from, to, amount) {
    try {
        const apiKey = "";
        console.log("from ", from, " to ", to);
        let response = await axios.get(
            `https://api.sandbox.transferwise.tech/v1/rates?source=${from}&target=${to}`,
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                },
            }
        );
        console.log(response.data);

        let rate = response.data[0].rate;
        let convertedAmount = amount * rate;
        return convertedAmount;
    } catch (error) {
        console.error(error);
    }
}

async function ExchangeRateApp(from, to, amount) {
    try {
        apiKey = "";

        console.log("from ", from, " to ", to);

        const apiUrl = `https://api.currencylayer.com/convert?access_key=${apiKey}&from=${from}&to=${to}&amount=${amount}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error(
                `API request failed with status ${response.status}`
            );
        }

        let data = await response.json();
        const convert = data.result;
        const convert1 = convert.toFixed(2);
        return convert1;
    } catch (error) {
        console.error(error);
    }
}

async function Send() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const messagesend = document.getElementById("message").value;
    const resultDiv = document.getElementById("result");

    if (name.length === 0) {
        resultDiv.classList.remove("d-none");
        resultDiv.classList.add("d-open");
        resultDiv.textContent = "Please Enter Name";
    } else if (email.length === 0) {
        resultDiv.classList.remove("d-none");
        resultDiv.classList.add("d-open");
        resultDiv.textContent = "Please Enter Email";
    } else if (messagesend.length === 0) {
        resultDiv.classList.remove("d-none");
        resultDiv.classList.add("d-open");
        resultDiv.textContent = "Please Enter Message";
    } else {
        try {
            let res = await axios.post("/send-message", {
                name: name,
                email: email,
                message: messagesend,
            });

            if (res.status === 200) {
                resultDiv.classList.remove("d-none");
                resultDiv.classList.add("d-open");
                resultDiv.classList.add("alert", "alert-success");
                resultDiv.textContent = res.data.message;
                document.getElementById("save-form1").reset();
            } else {
                resultDiv.classList.remove("d-none");
                resultDiv.classList.add("d-open");
                resultDiv.classList.add("alert", "alert-danger");
                resultDiv.textContent = "Failed to send message.";
            }
        } catch (error) {
            resultDiv.classList.remove("d-none");
            resultDiv.classList.add("d-open");
            resultDiv.classList.add("alert", "alert-danger");
            resultDiv.textContent =
                "An error occurred while sending the message.";
        }
    }
}
