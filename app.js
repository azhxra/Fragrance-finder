const API_URL = "https://fragrance-finder-orpin.vercel.app";


// ================================
// GET ALL PERFUMES
// ================================

async function loadPerfumes() {

    try {

        const response = await fetch(`${API_URL}/perfumes`);

        const data = await response.json();

        displayPerfumes(data.perfumes);

    }

    catch (error) {

        console.error(error);

        document.getElementById("perfumeList").innerHTML =
            "Unable to connect to the API.";

    }
}


// ================================
// DISPLAY PERFUMES
// ================================

function displayPerfumes(perfumes) {

    const perfumeList =
        document.getElementById("perfumeList");

    perfumeList.innerHTML = "";


    perfumes.forEach(perfume => {

        const card = document.createElement("div");

        card.className = "perfume-card";


        card.innerHTML = `

            <!-- IMAGE -->

            <img
                class="perfume-image"
                src="${perfume.image || 'https://via.placeholder.com/400x200?text=Perfume'}"
                alt="${perfume.brand} ${perfume.name}"
            >


            <!-- BRAND -->

            <div class="perfume-brand">
                ${perfume.brand}
            </div>


            <!-- MODEL / NAME -->

            <h3>
                ${perfume.name}
            </h3>


            <!-- PRICE -->

            <div class="perfume-price">
                ${perfume.price || "Price unavailable"}
            </div>


            <!-- MAIN 3 DETAILS -->

            <div class="perfume-info">

                <p>
                    <strong>Season:</strong>
                    ${perfume.season || "All season"}
                </p>

                <p>
                    <strong>Longevity:</strong>
                    ${perfume.longevity || "8-12 hours"}
                </p>

                <p>
                    <strong>Sillage:</strong>
                    ${perfume.sillage || "Heavy"}
                </p>

            </div>


            <!-- EXTRA 4 DETAILS -->

            <div class="extra-details">

                <p>
                    <strong>Year:</strong>
                    ${perfume.year || "N/A"}
                </p>

                <p>
                    <strong>Scent Family:</strong>
                    ${perfume.scent_family || "N/A"}
                </p>

                <p>
                    <strong>Top Notes:</strong>
                    ${perfume.top_notes || "N/A"}
                </p>

                <p>
                    <strong>Description:</strong>
                    ${perfume.description || "N/A"}
                </p>

            </div>


            <!-- VIEW ALL DETAILS BUTTON -->

            <button class="details-button">
                View All Details
            </button>

        `;


        // ================================
        // VIEW ALL DETAILS BUTTON
        // ================================

        const detailsButton =
            card.querySelector(".details-button");

        const extraDetails =
            card.querySelector(".extra-details");


        detailsButton.addEventListener("click", () => {

            extraDetails.classList.toggle("show");


            if (extraDetails.classList.contains("show")) {

                detailsButton.textContent =
                    "Hide Details";

            }

            else {

                detailsButton.textContent =
                    "View All Details";

            }

        });


        perfumeList.appendChild(card);

    });

}


// ================================
// GET ONE PERFUME
// ================================

async function viewPerfume(id) {

    try {

        const response =
            await fetch(`${API_URL}/perfumes/${id}`);

        const perfume =
            await response.json();


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


// ================================
// SEARCH
// ================================

async function searchPerfumes() {

    const query =
        document.getElementById("searchInput").value.trim();


    // If search box is empty,
    // show all perfumes

    if (!query) {

        loadPerfumes();

        return;

    }


    try {

        const response =
            await fetch(
                `${API_URL}/perfumes/search?q=${encodeURIComponent(query)}`
            );


        const data =
            await response.json();


        displayPerfumes(data.results);

    }

    catch (error) {

        console.error(error);

        alert("Search failed.");

    }

}


// ================================
// LOAD ALL 20 WHEN PAGE OPENS
// ================================

loadPerfumes();
