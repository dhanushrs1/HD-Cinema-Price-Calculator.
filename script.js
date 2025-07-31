function calculatePrice() {
    const daysInput = document.getElementById('daysInput');
    const resultDiv = document.getElementById('result');

    const days = parseInt(daysInput.value);

    if (isNaN(days) || days <= 0) {
        resultDiv.innerHTML = `<p class="price-per-day">Please enter a valid number of days.</p>`;
        return;
    }

    let pricePerDay;
    let finalPrice;

    if (days >= 365) {
        // Yearly rate
        pricePerDay = 299 / 365;
    } else if (days >= 180) {
        // 6-Month rate
        pricePerDay = 179 / 180;
    } else if (days >= 90) {
        // 3-Month rate
        pricePerDay = 99 / 90;
    } else if (days >= 30) {
        // Monthly rate
        pricePerDay = 49 / 30;
    } else if (days >= 7) {
        // Weekly rate
        pricePerDay = 25 / 7;
    } else {
        // Daily rate
        pricePerDay = 5;
    }

    finalPrice = Math.ceil(days * pricePerDay);
    const effectivePricePerDay = (finalPrice / days).toFixed(2);

    resultDiv.innerHTML = `
        <div class="final-price">Total Price: ₹${finalPrice}</div>
        <div class="price-per-day">Which is only ~₹${effectivePricePerDay} per day!</div>
    `;
}
