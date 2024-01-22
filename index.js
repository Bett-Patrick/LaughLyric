document.addEventListener("DOMContentLoaded",() => {
    let url =""
    let category = document.querySelector("#category")
    category.addEventListener("click",(e)=>{
        // console.log(e.target.value)
        if(e.target.value ==="programming") {
            document.querySelector(".jokes-container").innerHTML = ""
            url = "https://v2.jokeapi.dev/joke/Programming?amount=10"
            fetchJokes(url)
        }
        else if(e.target.value ==="misc") {
            document.querySelector(".jokes-container").innerHTML = ""
            url = "https://v2.jokeapi.dev/joke/Misc?amount=10"
            fetchJokes(url)
        }
        else if(e.target.value ==="pun") {
            document.querySelector(".jokes-container").innerHTML = ""
            url = "https://v2.jokeapi.dev/joke/Pun?amount=10"
            fetchJokes(url)
        }
        else if(e.target.value ==="spooky") {
            document.querySelector(".jokes-container").innerHTML = ""
            url = "https://v2.jokeapi.dev/joke/Spooky?amount=10"
            fetchJokes(url)
        }
        else if(e.target.value ==="christmas") {
            document.querySelector(".jokes-container").innerHTML = ""
            url = "https://v2.jokeapi.dev/joke/Christmas?amount=10"
            fetchJokes(url)
        }
        
    })
    //display any jokes when no category is chosen
    fetchJokes()
    //fetch jokes based on category
    function fetchJokes(url = "https://v2.jokeapi.dev/joke/Any?amount=10"){
        fetch(url)
        .then(res => res.json())
        .then((jokesObject) => {
            let jokes = jokesObject.jokes
            // console.log(jokes)
            jokes.forEach((joke) => {
                // console.log(joke)
                renderJokes(joke)        
            })
        })
    }
    //display the jokes based on category
    function renderJokes(joke){
        // console.log(joke.setup)
        let interactionSection = document.createElement("div")
        interactionSection.className = "interactions"
        interactionSection.innerHTML = `
            <div class="laugh-emoji">
                <img id = "laugh" src="./images/laugh.png" alt="laugh.jpg">
                <span class = "laugh-count"></span>
            </div>
            <div class="sad-emoji">
                <img id = "sad" src="./images/sad_emoji.png" alt="laugh.jpg">
                <span class = "sad-count"></span>
            </div>
            <div class="share-icon">
                <img id = "share" src="./images/share_icon.png" alt="laugh.jpg">
                <span class = "share-count"></span>
            </div>
        `
        interactionSection.addEventListener("click", (e) => {
            console.log(e)
            addInteractions(e)
        })
        let jokeDiv = document.createElement("div")
        jokeDiv.id = "joke-div"

        if (joke.type === 'single') {
            // console.log(joke)
            // console.log(joke.joke)
            jokeDiv.textContent = joke.joke
            jokeDiv.appendChild(interactionSection)
        }else if (joke.type === 'twopart') {
            // console.log(joke)
            let setup = joke.setup
            let delivery = joke.delivery
            // console.log(`${setup}\n${delivery}`)
            jokeDiv.textContent = `${setup}\n${delivery}`
            jokeDiv.appendChild(interactionSection)
        }
        document.querySelector(".jokes-container").appendChild(jokeDiv)
    }

    function addInteractions(e) {
        const clickedElement = e.target;
        
        // Find the closest interactions section for the clicked element 
        // by using "closest method"
        const interactionSection = clickedElement.closest('.interactions');
        let laughCount = 0
    let sadCount = 0
    let shareCount = 0
    
        if (interactionSection) {
            const laughCountElement = interactionSection.querySelector('.laugh-count');
            const sadCountElement = interactionSection.querySelector('.sad-count');
            const shareCountElement = interactionSection.querySelector('.share-count');
    
            if (clickedElement.id === 'laugh') {
                console.log('Laugh clicked');
                laughCount++;
                laughCountElement.textContent = `${laughCount} laughs`;
            } else if (clickedElement.id === 'sad') {
                console.log('Sad clicked');
                sadCount++;
                sadCountElement.textContent = `${sadCount} sads`;
            } else if (clickedElement.id === 'share') {
                console.log('Share clicked');
                shareCount++;
                shareCountElement.textContent = `${shareCount} shares`;
            }
        }
    }
    
    

    //Add, delete, edit jokes
    const formDiv = document.createElement("div")
    formDiv.innerHTML = `
        <form action="#" id="form-add-joke" method="POST">
            <h3>Add Joke</h3>
            <label for="type"></label></br>
                <select name="type" id="type">
                    <option value="single">single</option>
                    <option value="twopart">twopart</option>
                </select></br>
            <label for="joke"></label></br>
                <input type="text" name="joke" id="joke">
            <label for="setup"></label></br>
                <input type="text" name="setup" id="setup">
            <label for="delivery"></label></br>
                <input type="text" name="delivery" id="delivery">
        </form>
    `

    const addJoke = document.querySelector("#add-joke")
    addJoke.addEventListener("click",() => {
        formDiv.style.display = "block"
        document.querySelector(".jokes-container").innerHTML = formDiv
    })


})