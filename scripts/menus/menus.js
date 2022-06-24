function openList() {
    filterBtn.forEach((button) => {
        button.addEventListener("click", () => {
            button.nextElementSibling.style.display = "block"
            button.style.display = "none"
        })
    })
}

function closeList() {
    const closingListButtons = document.querySelectorAll(".closing-list");

    closingListButtons.forEach(closingListButton => {
        closingListButton.addEventListener("click", () => {
            closingListButton.parentElement.style.display = "none";
            closingListButton.parentElement.previousElementSibling.style.display = "flex";
        });
    });
};