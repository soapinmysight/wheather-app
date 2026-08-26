document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("household-form");
    const status = document.getElementById("household-status");

    form.addEventListener("submit", async function (event) {
        event.preventDefault();

        const householdMember = {
            name: document.getElementById("member-name").value,
            gender: document.getElementById("member-gender").value,
            age: document.getElementById("member-age").value,
            wardrobe: document.getElementById("member-wardrobe").value,
        };

        status.textContent = "Gezinslid wordt opgeslagen...";

        const response = await fetch("/api/household-members", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(householdMember),
        });

        const data = await response.json();

        status.textContent = data.message;
        form.reset();
    });
});