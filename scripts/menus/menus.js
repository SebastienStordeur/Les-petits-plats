function openList() {
    for(let button of filterBtn) {
        button.addEventListener("click", () => {
            button.nextElementSibling.style.display = "block";
            button.style.display = "none";
        });
    };
};

function closeList() {
    document.addEventListener("click", () => {
        
    });
};