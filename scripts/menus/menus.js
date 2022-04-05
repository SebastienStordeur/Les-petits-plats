function openList() {
    filterBtn.forEach((button) => {
        button.addEventListener("click", () => {
            button.nextElementSibling.style.display = "block"
            button.style.display = "none"
        })
    })
}

function closeList() {
    document.addEventListener("click", () => {
        
    })
}