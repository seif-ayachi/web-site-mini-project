const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
    const activitySelect = document.getElementById("bookingActivity");
    const participantInput = document.getElementById("participants");
    const dateInput = document.getElementById("bookingDate");
    const formMessage = document.getElementById("formMessage");
    const bookingSummary = document.getElementById("bookingSummary");

    const today = new Date();
    const todayText = new Date(today.getTime() - today.getTimezoneOffset() * 60000)
        .toISOString().split("T")[0];

    dateInput.min = todayText;

    activities.forEach(function(activity) {
        const option = document.createElement("option");
        option.value = activity.id;
        option.textContent = activity.title + " — " + activity.location;
        activitySelect.appendChild(option);
    });

    const activityFromLink = new URLSearchParams(window.location.search).get("activity");

    if (activityFromLink && activities.some(function(item) {
        return item.id === activityFromLink;
    })) {
        activitySelect.value = activityFromLink;
    }

    function calculatePrice() {
        const selectedActivity = activities.find(function(activity) {
            return activity.id === activitySelect.value;
        });

        const numberOfPeople = Number(participantInput.value);
        const subtotal = selectedActivity.price * numberOfPeople;
        let discount = 0;

        if (numberOfPeople >= 4 && numberOfPeople <= 6) {
            discount = subtotal * 0.10;
        }

        const total = subtotal - discount;

        document.getElementById("unitPrice").textContent = selectedActivity.price + " TND";
        document.getElementById("subtotal").textContent = subtotal.toFixed(2) + " TND";
        document.getElementById("discount").textContent = discount.toFixed(2) + " TND";
        document.getElementById("total").textContent = total.toFixed(2) + " TND";

        return {
            activity: selectedActivity,
            people: numberOfPeople,
            subtotal: subtotal,
            discount: discount,
            total: total
        };
    }

    activitySelect.addEventListener("change", calculatePrice);
    participantInput.addEventListener("input", calculatePrice);
    calculatePrice();

    bookingForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const priceDetails = calculatePrice();
        const phone = document.getElementById("phone").value.trim();
        const validPeople = priceDetails.people >= 1 && priceDetails.people <= 6;
        const validDate = dateInput.value !== "" && dateInput.value >= todayText;

        if (!bookingForm.checkValidity() || phone === "" || !validPeople || !validDate) {
            bookingForm.classList.add("was-validated");
            formMessage.innerHTML = '<div class="alert alert-danger">Please check the required fields, email, phone number, date and number of participants.</div>';
            bookingSummary.classList.add("d-none");
            return;
        }

        formMessage.innerHTML = "";
        bookingSummary.classList.remove("d-none");
        bookingSummary.innerHTML = `
            <strong>Simulation saved on this page.</strong><br>
            Activity: ${priceDetails.activity.title}<br>
            Date: ${dateInput.value}<br>
            Participants: ${priceDetails.people}<br>
            Total: ${priceDetails.total.toFixed(2)} TND<br>
            <small>No actual booking has been made.</small>`;
    });

    bookingForm.addEventListener("reset", function() {
        setTimeout(function() {
            bookingForm.classList.remove("was-validated");
            formMessage.innerHTML = "";
            bookingSummary.classList.add("d-none");
            calculatePrice();
        }, 0);
    });
}
