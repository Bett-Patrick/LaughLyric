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
    //Function to display the jokes based on category
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
        interactionSection.addEventListener("click", (e) => addInteractions(e))

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

    //function to enable user interactions
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
                <input type="text" name="joke" placeholder="Type joke" class = "input" id="joke"><br>
            <label for="setup"><strong>Two part</strong></label><br>
                <input type="text" name="setup" placeholder="First part" class = "input" id="setup"><br>
                <input type="text" name="delivery" placeholder="Second part" class = "input" id="delivery"><br>
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
        // call the submitJoke() function
        document.querySelector("#form-add-joke").addEventListener("submit", (e) => {
            e.preventDefault()
            submitJoke()
        })
        //exit the POST form
        document.querySelector("#exit-btn").addEventListener("click",()=>{
            document.querySelector(".jokes-container").innerHTML = ""
            fetchJokes()
        })
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

    //function to submit joke
    function submitJoke(){
    // Retrieve values from form inputs
    const type = document.querySelector("#type").value
    const jokeInput = document.querySelector("#joke")
    const setupInput = document.querySelector("#setup")
    const deliveryInput = document.querySelector("#delivery")

    // Create a joke object based on the selected type
    let jokeObj = {};
    if (type === "single") {
        jokeObj = {
            type: "single",
            joke: jokeInput.value,
        };
    } else if (type === "twopart") {
        jokeObj = {
            type: "twopart",
            setup: setupInput.value,
            delivery: deliveryInput.value,
        };
    }
        updateJokes(jokeObj)
        renderJokeOfTheDay()
        // Clear form inputs
        jokeInput.value = "";
        setupInput.value = "";
        deliveryInput.value = "";
    }

    //POST joke to JSON
    function updateJokes(jokeObj){
        fetch("http://localhost:3000/jokes",{
            method : "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(jokeObj)
        })
        .then(res => res.json())
        .then((animal) => console.log(animal))
    }

    //fetch data from Local db.json and call renderJokeOfTheDay()
    fetchFromJson()
    function fetchFromJson(){
        fetch("http://localhost:3000/jokes")
        .then(res => res.json())
        .then((jokes) => {
            console.log(jokes)
            renderJokeOfTheDay(jokes[Math.floor(Math.random()*10)])
        })
    }
    
    //function to render joke of the day
    function renderJokeOfTheDay(jokeObj){
        const jokeOfTheDay = document.querySelector(".joke-of-the-day")
        const par = document.createElement("p")
        if (jokeObj.type === "single") {
            par.textContent = jokeObj.joke
        }else if (jokeObj.type === "twopart") {
            par.textContent = `${jokeObj.setup}\n${jokeObj.delivery}`
        }
        jokeOfTheDay.appendChild(par)

        //delete the joke of the day from the JSON file
        const deleteButton = document.querySelector("#delete-joke")
        deleteButton.addEventListener("click", () => {
            par.remove()
            console.log(jokeObj.id)
            deleteJoke(jokeObj.id)
            fetchFromJson()
        })
    }

    //deleteJoke() function
    function deleteJoke(id){
        fetch(`http://localhost:3000/jokes/${id}`,{
            method : "DELETE",
            headers : {
                "Content-Type" : "application/json"
            }
        })
        .then(res => res.json())
        .then(joke => console.log(joke))
    }

})