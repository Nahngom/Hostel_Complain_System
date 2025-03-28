function displayReports(data) {
    const tableBody = document.getElementById("report-table");
    tableBody.innerHTML = ""; // clr previous data

    data.forEach((report) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${report.id}</td>
            <td>${report.object_name}</td>
            <td><button class="delete-btn" data-id="${report.id}">Delete</button></td>
        `;

        tableBody.appendChild(row);
    });

    document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function () {
            const reportId = this.getAttribute("data-id");
            deleteReport(reportId);
        });
    });
}

function deleteReport(reportId) {
    fetch(`http://localhost:3000/delete-report/${reportId}`, {
        method: "DELETE"
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message); 
        fetchReports();
    })
    .catch(error => console.error("Error deleting report:", error));
}

//
//fFetch rpt Initially
function fetchReports() {
    fetch("http://localhost:3000/get-reports")
        .then(response => response.json())
        .then(data => displayReports(data))
        .catch(error => console.error("Error fetching reports:", error));
}

// Load reports on page load
fetchReports();

function plotBarChart(data) {
    console.info("chart here");
}

function fetchbarchartdata() {
    fetch("http://localhost:3000/get-barchartdata")
    .then(response => response.json())
    .then(data => plotBarChart(data))
    .catch(error => console.error("error fetching barchart data", error));
}
fetchbarchartdata();

export {fetchReports};
