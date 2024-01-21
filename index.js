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
        let jokeDiv = document.createElement("div")
        if (joke.type === 'single') {
            console.log(joke)
            console.log(joke.joke)
            jokeDiv.textContent = joke.joke
        }else if (joke.type === 'twopart') {
            console.log(joke)
            let setup = joke.setup
            let delivery = joke.delivery
            console.log(`${setup}\n${delivery}`)
            jokeDiv.textContent = `${setup}\n${delivery}`
        }
        jokeDiv.id = "joke-div"
        jokeDiv.textContent = joke.setup
        document.querySelector(".jokes-container").appendChild(jokeDiv)
    }
})

