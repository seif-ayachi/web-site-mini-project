const grid = document.getElementById("activitiesGrid");
const searchInput = document.getElementById("activitySearch");
const categoryFilter = document.getElementById("categoryFilter");
const activityCount = document.getElementById("activityCount");
const noActivities = document.getElementById("noActivities");

function displayActivities() {
    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;

    const filteredActivities = activities.filter(function(activity) {
        const titleMatch = activity.title.toLowerCase().includes(searchText);
        const locationMatch = activity.location.toLowerCase().includes(searchText);
        const categoryMatch = selectedCategory === "All" || activity.category === selectedCategory;

        return (titleMatch || locationMatch) && categoryMatch;
    });

    activityCount.textContent = filteredActivities.length;
    noActivities.classList.toggle("d-none", filteredActivities.length > 0);
    grid.innerHTML = "";

    filteredActivities.forEach(function(activity) {
        const card = document.createElement("div");
        card.className = "col-sm-6 col-lg-4";
        card.innerHTML = `
            <article class="card activity-card">
                <img src="images/${activity.image}" alt="${activity.title} in ${activity.location}">
                <div class="card-body">
                    <span class="category-label">${activity.category} · ${activity.duration}</span>
                    <h3>${activity.title}</h3>
                    <p>${activity.hook}</p>
                    <div class="card-bottom">
                        <span class="price">${activity.price} TND</span>
                        <button class="btn btn-outline-primary btn-sm details-button" data-id="${activity.id}">View details</button>
                    </div>
                </div>
            </article>`;
        grid.appendChild(card);
    });
}

function showDetails(activityId) {
    const activity = activities.find(function(item) {
        return item.id === activityId;
    });

    if (!activity) {
        return;
    }

    document.getElementById("modalTitle").textContent = activity.title;
    document.getElementById("modalBody").innerHTML = `
        <img class="img-fluid rounded mb-3" src="images/${activity.image}" alt="${activity.title}">
        <p>${activity.description}</p>
        <p>
            <strong>Location:</strong> ${activity.location}<br>
            <strong>Duration:</strong> ${activity.duration}<br>
            <strong>Price:</strong> ${activity.price} TND per person
        </p>`;
    document.getElementById("modalBook").href = "reservation.html?activity=" + activity.id;

    const modal = document.getElementById("activityModal");
    bootstrap.Modal.getOrCreateInstance(modal).show();
}

if (grid) {
    searchInput.addEventListener("input", displayActivities);
    categoryFilter.addEventListener("change", displayActivities);

    grid.addEventListener("click", function(event) {
        const button = event.target.closest(".details-button");

        if (button) {
            showDetails(button.dataset.id);
        }
    });

    displayActivities();
}
