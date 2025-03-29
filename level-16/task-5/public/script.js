function search() {
    const query = document.getElementById("queryInput").value;
    const limit = document.getElementById("limitInput").value || 5;

    if (!query) {
        document.getElementById("response").innerText = "Please enter a search term.";
        return;
    }

    fetch(`/search?q=${query}&limit=${limit}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("response").innerText = data.message;
        })
        .catch(error => console.error("Error fetching search results:", error));
}
