document.addEventListener("DOMContentLoaded",() => {
    let url =""
    let category = document.querySelector("#category")
    category.addEventListener("change",(e)=>{
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
                <span class = "laugh-count">0</span>
            </div>
            <div class="sad-emoji">
                <img id = "sad" src="./images/sad_emoji.png" alt="laugh.jpg">
                <span class = "sad-count">0</span>
            </div>
            <div class="share-icon">
                <img id = "share" src="./images/share_icon.png" alt="laugh.jpg">
                <span class = "share-count">0</span>
            </div>
        `
        interactionSection.addEventListener("click", (e) => {
            console.log(e)
            addInteractions(e)
        })
        let jokeDiv = document.createElement("div")
        jokeDiv.id = "joke-div"

        if (joke.type === 'single') {
            // console.log(joke.joke)
            jokeDiv.textContent = joke.joke
            jokeDiv.appendChild(interactionSection)
        }else if (joke.type === 'twopart') {
            // console.log(joke)
            let setup = joke.setup
            let delivery = joke.delivery
            jokeDiv.textContent = `${setup}\n${delivery}`
            jokeDiv.appendChild(interactionSection)
        }
        document.querySelector(".jokes-container").appendChild(jokeDiv)
    }

    function addInteractions(e) {
        const clickedElement = e.target;
        
        // Find the closest interactions section for the clicked element 
        // i.e(laugh,sad,share) by using "closest method"
        const interactionSection = clickedElement.closest('.interactions');
    
        if (interactionSection) {
            const laughCountElement = interactionSection.querySelector('.laugh-count');
            const sadCountElement = interactionSection.querySelector('.sad-count');
            const shareCountElement = interactionSection.querySelector('.share-count');
    
            let laughCount = parseInt(laughCountElement.textContent)
            let sadCount = parseInt(sadCountElement.textContent)
            let shareCount = parseInt(shareCountElement.textContent)
            console.log(laughCount)
            if (clickedElement.id === 'laugh') {
                console.log('Laugh clicked');
                laughCount++
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
    
    
    //Add, delete, edit jokes Section:

    /** Add joke form */
    const formDiv = document.createElement("div")
    formDiv.className = "form-div"
    formDiv.innerHTML = `
        <form action="#" id="form-add-joke" method="POST">
            <h3>Add Joke</h3>
            <label for="type">Select joke type</label><br>
                <select name="type" id="type">
                    <option value="single">single</option>
                    <option value="twopart">twopart</option>
                </select><br>
            <label for="joke"> <strong>Single</strong> </label><br>
                <input type="text" name="joke" placeholder="Type joke" id="joke"><br>
            <label for="setup"><strong>Two part</strong></label><br>
                <input type="text" name="setup" placeholder="First part" id="setup"><br>
                <input type="text" name="delivery" placeholder="Second part" id="delivery"><br>
            <button type="submit" id = "submit-btn">Submit</button><br>
            <button id = "exit-btn">Exit</button>
        </form>
    `
    //append the form when add joke is clicked
    const addJoke = document.querySelector("#add-joke")
    addJoke.addEventListener("click",() => {
        formDiv.style.display = "block"
        document.querySelector(".jokes-container").innerHTML = ""
        document.querySelector(".jokes-container").appendChild(formDiv)
    

        // call the function that disables/enables inputs based on selected type
        const selectType = document.querySelector("#type");
        selectType.addEventListener("change", (e) => {
            const selectedType = e.target.value;
            disableInputs(selectedType)
        });          
    })

     // Function thst disable/enable inputs based on the selected type
     function disableInputs(selectedType){
        const singleInput = document.querySelector("#joke");
        const twoPartInputs = document.querySelectorAll("#setup, #delivery");
        if (selectedType === "single") {
            singleInput.disabled = false;
            twoPartInputs.forEach(input => input.disabled = true);
        } else if (selectedType === "twopart") {
            singleInput.disabled = true;
            twoPartInputs.forEach(input => input.disabled = false);
        }
    }
})