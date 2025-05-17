
function toggleView(view) {
    document.getElementById("tableSection").style.display = view === "table" ? "block" : "none";
    document.getElementById("cards-container").style.display = view === "card" ? "block" : "none";
}
