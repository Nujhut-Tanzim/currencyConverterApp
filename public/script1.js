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

async function Save() {
    let account = document.getElementById("account_no").value;
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let amount = document.getElementById("amount").value;
    let fromCurrency = document.getElementById("fromCurrency").value;
    const resultDiv = document.getElementById("result");

    if (account.length === 0) {
        resultDiv.className = "alert alert-danger";
        resultDiv.classList.remove("d-none");
        resultDiv.classList.add("d-open");
        resultDiv.textContent = "Please Enter Account No.";
    } else if (name.length === 0) {
        resultDiv.className = "alert alert-danger";
        resultDiv.classList.remove("d-none");
        resultDiv.classList.add("d-open");
        resultDiv.textContent = "Please Enter Name.";
    } else if (email.length === 0) {
        resultDiv.className = "alert alert-danger";
        resultDiv.classList.remove("d-none");
        resultDiv.classList.add("d-open");
        resultDiv.textContent = "Please Enter Email.";
    } else if (amount.length === 0) {
        resultDiv.className = "alert alert-danger";
        resultDiv.classList.remove("d-none");
        resultDiv.classList.add("d-open");
        resultDiv.textContent = "Please Enter Amount.";
    } else if (fromCurrency.length === 0) {
        resultDiv.className = "alert alert-danger";
        resultDiv.classList.remove("d-none");
        resultDiv.classList.add("d-open");
        resultDiv.textContent = "Please Select Currency.";
    } else {
        apiKey = "";

        //console.log("from ", fromCurrency, " to ", toCurrency);

        const apiUrl = `https://api.currencylayer.com/convert?access_key=${apiKey}&from=${fromCurrency}&to=BDT&amount=${amount}`;
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Currency conversion API request failed.");
        }
        let data = await response.json();
        const convert = data.result;
        const convert1 = convert.toFixed(2);
        let res = await axios.post("/create-transaction", {
            account_no: account,
            name: name,
            email: email,
            amountBDT: convert1,
        });
        if (res.status === 200) {
            resultDiv.classList.remove("d-none");
            resultDiv.classList.add("d-open");
            resultDiv.textContent = res.data["message"];
            document.getElementById("save-form").reset();
        } else {
            resultDiv.className = "alert alert-danger";
            resultDiv.classList.remove("d-none");
            resultDiv.classList.add("d-open");
            resultDiv.textContent = "Transaction Failed";
        }
    }
}

async function Send() {
    const name = document.getElementById("name1").value;
    const email = document.getElementById("email1").value;
    const messagesend = document.getElementById("message").value;
    const resultDiv = document.getElementById("result1");

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
