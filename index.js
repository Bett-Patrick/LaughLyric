document.addEventListener("DOMContentLoaded",() => {
    let url =""
    let category = document.querySelector("#category")
    category.addEventListener("change",(e)=>{
        // console.log(e.target.value)
        if(e.target.value ==="programming") {
            url = "https://v2.jokeapi.dev/joke/Programming?amount=5"
            fetchJokes(url)
        }
        else if(e.target.value ==="misc") {
            url = "https://v2.jokeapi.dev/joke/Misc"
            fetchJokes(url)
        }
        else if(e.target.value ==="pun") {
            url = "https://v2.jokeapi.dev/joke/Pun"
            fetchJokes(url)
        }
        else if(e.target.value ==="spooky") {
            url = "https://v2.jokeapi.dev/joke/Spooky"
            fetchJokes(url)
        }
        else if(e.target.value ==="christmas") {
            url = "https://v2.jokeapi.dev/joke/Christmas"
            fetchJokes(url)
        }
        
    })

    //fetch jokes based on category
    function fetchJokes(url){
        fetch(url)
        .then(res => res.json())
        .then((jokes) => {
            console.log(jokes)
            jokes.forEach((joke) => {
                console.log(joke.setup)
                renderJokes(joke.setup)        
            })
        })
    }
    //display the jokes based on category
    function renderJokes(joke){
        console.log(joke)
        let jokeDiv = document.createElement("div")
        jokeDiv.id = "joke-div"
        jokeDiv.textContent = joke
        document.querySelector(".jokes-container").appendChild(jokeDiv)
    }
})

