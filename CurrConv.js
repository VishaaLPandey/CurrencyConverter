// Function to fetch and populate the currency options
function populateCurrencies() {
    var selectElements = document.querySelectorAll('select');

    fetch('https://api.exchangerate-api.com/v4/latest/USD')
        .then(response => response.json())
        .then(data => {
            var rates = data.rates;
            for (var currency in rates) {
                for (var select of selectElements) {
                    var option = document.createElement('option');
                    option.value = currency;
                    option.textContent = currency;
                    select.appendChild(option);
                }
            }
        })
        .catch(error => console.error('Error:', error));
}

// Function to convert currencies
function convert() {
    var amount = parseFloat(document.getElementById('amount').value);
    var fromCurrency = document.getElementById('fromCurrency').value;
    var toCurrency = document.getElementById('toCurrency').value;

    var apiUrl = `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            var exchangeRate = data.rates[toCurrency];
            var convertedAmount = (amount * exchangeRate).toFixed(2);
            document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
        })
        .catch(error => console.error('Error:', error));
}

// Populate currency options when the page loads
window.onload = populateCurrencies;
