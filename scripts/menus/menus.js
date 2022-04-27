function openList() {
    filterBtn.forEach((button) => {
        button.addEventListener("click", () => {
            button.nextElementSibling.style.display = "block"
            button.style.display = "none"
        })
    })
}

function closeList() {
    document.querySelector("html").addEventListener("click", (e) => {
        if(!document.querySelector(".btn").classList.contains("btn")) alert("alarte")
    })
}