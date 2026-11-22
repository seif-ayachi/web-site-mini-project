const featuredActivities = document.getElementById("featuredActivities");

if (featuredActivities) {
    const selectedActivities = [activities[1], activities[3], activities[2], activities[7]];

    selectedActivities.forEach(function(activity) {
        const column = document.createElement("div");
        column.className = "col-sm-6 col-lg-3";
        column.innerHTML = `
            <article class="card activity-card">
                <img src="images/${activity.image}" alt="${activity.title} in ${activity.location}">
                <div class="card-body">
                    <span class="category-label">${activity.category}</span>
                    <h3>${activity.title}</h3>
                    <p>${activity.hook}</p>
                    <div class="card-bottom">
                        <span class="price">${activity.price} TND</span>
                        <a class="text-link" href="activities.html">Explore →</a>
                    </div>
                </div>
            </article>`;
        featuredActivities.appendChild(column);
    });
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const message = document.getElementById("contactMessage");

        if (!contactForm.checkValidity()) {
            contactForm.classList.add("was-validated");
            message.innerHTML = '<div class="alert alert-danger">Please complete all fields with valid information.</div>';
            return;
        }

        message.innerHTML = '<div class="alert alert-success">Your message is ready. This is a local demonstration, so nothing was sent.</div>';
        contactForm.reset();
    });
}

const currentPage = window.location.pathname.split("/").pop() || "index.html";
const navLinks = document.querySelectorAll(".navbar .nav-link");

navLinks.forEach(function(link) {
    if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
        link.setAttribute("aria-current", "page");
    }
});
