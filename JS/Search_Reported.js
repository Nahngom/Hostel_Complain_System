function displayReports(data) {
    const tableBody = document.getElementById("report-table");
    tableBody.innerHTML = ""; // Clear previous data

    data.forEach((report) => {
        const row = document.createElement("tr");
        row.innerHTML = `<td>${report.id}</td><td>${report.object_name}</td>`;
        tableBody.appendChild(row);
    });
}

fetch("http://localhost:3000/get-reports")
    .then(response => response.json())
    .then(data => displayReports(data))
    .catch(error => console.error("Error fetching reports:", error));