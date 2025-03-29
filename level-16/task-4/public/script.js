function fetchUserId() {
    const userId = document.getElementById("userIdInput").value;
    if (!userId) {
        document.getElementById("response").innerText = "Please enter a user ID.";
        return;
    }

    fetch(`/users/${userId}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("response").innerText = data.message;
        })
        .catch(error => console.error("Error fetching user ID:", error));
}
