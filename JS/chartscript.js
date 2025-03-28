document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3000/get-barchartdata")
        .then(response => response.json())
        .then(data => plotBarChart(data))
        .catch(error => console.error("Error fetching barchart data", error));
});

function plotBarChart(data) {
    const ctx = document.getElementById("barChart").getContext("2d");
    const labels = data.map(item => item.object_name);
    const values = data.map(item => item.time_difference);

    const chartWidth = Math.max(600, labels.length * 80);
    document.getElementById("chart-container").style.width = `${chartWidth}px`;

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Time Difference (seconds)",
                data: values,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: { autoSkip: false }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
