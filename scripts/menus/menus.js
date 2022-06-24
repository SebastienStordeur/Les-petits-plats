function openList() {
    for(let button of filterBtn) {
        button.addEventListener("click", () => {
            button.nextElementSibling.style.display = "block";
            button.style.display = "none";
        });
    };
};

function closeList() {
    const closingListButtons = document.querySelectorAll(".closing-list");

    for(let closingListButton of closingListButtons) {
        closingListButton.addEventListener("click", () => {
            closingListButton.parentElement.style.display = "none";
            closingListButton.parentElement.previousElementSibling.style.display = "flex";
        })
    }
};