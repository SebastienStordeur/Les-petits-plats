export class Recipe {
    constructor(data) {
        this.name = data.name;
        this.description = data.description
        this.time = data.time
    }
    
    createCard() {
        return `
            <article class="recipe">
                <div class="photo-recipe"></div>
                <div class="infos-recipe">
                    <div class="title-div">
                        <h2 class="name-recipe">${this.name}</h2>
                        <span class="duration">
                            <i class="fa-solid fa-clock"></i>
                            ${this.time}
                        </span>
                    </div>
                </div>
            </article>
        `
    }
}

const recipe = new Recipe()