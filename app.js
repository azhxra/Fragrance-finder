const API_URL = "https://YOUR-API.vercel.app";


// GET ALL PERFUMES
async function loadPerfumes() {
    try {
        const response = await fetch(`${API_URL}/perfumes`);
        const data = await response.json();
        displayPerfumes(data.perfumes);
    }

    catch (error) {
        console.error(error);
        document.getElementById("perfumeList").innerHTML = "Unable to connect to the API.";
    }
}


// DISPLAY PERFUMES
function displayPerfumes(perfumes) {
    const perfumeList =
        document.getElementById("perfumeList");

    perfumeList.innerHTML = "";

    perfumes.forEach(perfume => {
        const card = document.createElement("div");
        card.className = "perfume-card";
        card.innerHTML = `
            <div class="perfume-year">${perfume.year}</div>
            <h3>${perfume.brand} ${perfume.name}</h3>
            <p class="perfume-family">${perfume.scent_family}</p>
            <p>Notes: ${perfume.top_notes}</p>
            <p>${perfume.description}</p>
            <button onclick="viewPerfume(${perfume.id})"> View Details</button>
        `;

        perfumeList.appendChild(card);
    });

}

// GET ONE PERFUME
async function viewPerfume(id) {

    try {
        const response = await fetch(`${API_URL}/perfumes/${id}`);
        const perfume = await response.json();

        alert(`
            ${perfume.brand} ${perfume.name} (${perfume.year})
            Scent Family:
            ${perfume.scent_family}

            Top Notes:
            ${perfume.top_notes}

            Description:
            ${perfume.description}
        `);
    }
    catch (error) {
        console.error(error);
        alert("Unable to retrieve perfume.");
    }

}

// SEARCH
async function searchPerfumes() {

    const query = document.getElementById("searchInput").value;
    if (!query) {
        loadPerfumes();
        return;
    }
    try {
        const response =
            await fetch(`${API_URL}/perfumes/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();
        displayPerfumes(data.results);
    }

    catch (error) {
        console.error(error);
        alert("Search failed.");
    }
}

loadPerfumes();
