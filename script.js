function calculatePrice() {
    const daysInput = document.getElementById('daysInput');
    const resultDiv = document.getElementById('result');
    const payButton = document.getElementById('payButton');

    const days = parseInt(daysInput.value);

    if (isNaN(days) || days <= 0) {
        resultDiv.innerHTML = `<p class="price-per-day">Please enter a valid number of days.</p>`;
        payButton.style.display = 'none'; // Hide button if input is invalid
        return;
    }

    // --- SMART CALCULATION LOGIC ---

    // Define the fixed price tiers
    const tiers = {
        1: 5,
        7: 25,
        30: 49,
        90: 99,
        180: 179,
        365: 299
    };

    let finalPrice;

    // Base price calculation using the most advantageous rate per day
    if (days >= 365) {
        finalPrice = Math.ceil(days * (tiers[365] / 365));
    } else if (days >= 180) {
        finalPrice = Math.ceil(days * (tiers[180] / 180));
        finalPrice = Math.min(finalPrice, tiers[365]); // Ensure it's not more expensive than a year
    } else if (days >= 90) {
        finalPrice = Math.ceil(days * (tiers[90] / 90));
        finalPrice = Math.min(finalPrice, tiers[180]); // Ensure it's not more expensive than 6 months
    } else if (days >= 30) {
        finalPrice = Math.ceil(days * (tiers[30] / 30));
        finalPrice = Math.min(finalPrice, tiers[90]); // Ensure it's not more expensive than 3 months
    } else if (days >= 7) {
        finalPrice = Math.ceil(days * (tiers[7] / 7));
        finalPrice = Math.min(finalPrice, tiers[30]); // Ensure it's not more expensive than a month
    } else { // 1 to 6 days
        finalPrice = days * tiers[1];
        finalPrice = Math.min(finalPrice, tiers[7]); // The crucial fix: cap at the 1-week price
    }

    const effectivePricePerDay = (finalPrice / days).toFixed(2);

    resultDiv.innerHTML = `
        <div class="final-price">Total Price: ₹${finalPrice}</div>
        <div class="price-per-day">Which is only ~₹${effectivePricePerDay} per day!</div>
    `;

    // Show the button with the result
    payButton.style.display = 'block';
}
