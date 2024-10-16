// DOM selectors (variables that point to selected DOM elements) goes here 👇
const chat = document.getElementById("chat")
const inputWrapper = document.getElementById("input-wrapper")
const nameForm = document.getElementById("name-form")
const nameInput = document.getElementById("name-input")

let userName = "" //Global variable to store user name

// Functions goes here 👇

// A function that will add a chat bubble in the correct place based on who the sender is
const showMessage = (message, sender) => {
  // The if statement checks if the sender is the user and if that's the case it inserts
  // an HTML section inside the chat with the posted message from the user
  if (sender === "user") {
    chat.innerHTML += `
      <section class="user-msg">
        <div class="bubble user-bubble">
          <p>${message}</p>
        </div>
        <img src="assets/user.png" alt="User" />  
      </section>
    `
    // The else if statement checks if the sender is the bot and if that's the case it inserts
    // an HTML section inside the chat with the posted message from the bot
  } else if (sender === "bot") {
    chat.innerHTML += `
      <section class="bot-msg">
        <img src="assets/bot.png" alt="Bot" />
        <div class="bubble bot-bubble">
          <p>${message}</p>
        </div>
      </section>
    `
  }

  //Function to scroll to the bottom in chat
  setTimeout(() => {
    chat.scrollTop = chat.scrollHeight
  }, 100)
}

//Function to handle name input
const handleNameInput = (event) => {
  event.preventDefault()
  // Prevent form submission

  userName = nameInput.value //Store the username
  showMessage(userName, "user") //Show the user's name in the chat
  nameInput.value = "" //Clear the input field

  // After 1 second, show the next question by invoking the next function.
  // passing the name into it to have access to the user's name if we want
  // to use it in the next question from the bot.
  setTimeout(() => showDinoFacts(userName), 1000)
}

// A function to start the conversation
const greetUser = () => {
  // Here we call the function showMessage, that we declared earlier with the argument
  showMessage("Hello friend, what's your name?", "bot")
}

//A function to show dinosaur facts
const showDinoFacts = () => {
  showMessage(`Hi, ${userName}!`, "bot")

  setTimeout(() => {
    showMessage(
      "Do you want to learn some amazing facts about dinosaurs?",
      "bot"
    )

    //Yes & No buttons first question
    inputWrapper.innerHTML = `
    <button id="yesBtn">Yes</button>
    <button id="noBtn">No</button>
    `

    //Event listener for Yes button
    document.getElementById("yesBtn").addEventListener("click", () => {
      showMessage("Yes, please!", "user")
      setTimeout(() => {
        const randomFact = getRandomDinoFacts()
        showMessage(`Did you know? ${randomFact}`, "bot")

        askForMoreFacts()

        inputWrapper.innerHTML = ""
      }, 2000)
    })

    //Event listener for No button
    document.getElementById("noBtn").addEventListener("click", () => {
      showMessage("No, thanks!", "user")
      setTimeout(() => {
        showMessage("Okay, maybe next time! 👋", "bot")
      }, 1500)

      inputWrapper.innerHTML = ""
    })
  }, 2000)
}

//Function to ask user for more facts
const askForMoreFacts = () => {
  setTimeout(() => {
    showMessage("Would you like to hear another fact?", "bot")

    // Yes & No buttons for more facts
    inputWrapper.innerHTML = `
        <button id="moreYesBtn">Yes</button>
        <button id="moreNoBtn">No</button>
      `

    // Event listener for the Yes button for more facts
    document.getElementById("moreYesBtn").addEventListener("click", () => {
      showMessage("Yes, tell me more!", "user")
      setTimeout(() => {
        const randomFact = getRandomDinoFacts()
        showMessage(`Did you know? ${randomFact}`, "bot")
        askForMoreFacts() // Ask again if they want more facts
      }, 2000)

      inputWrapper.innerHTML = ""
    })

    // Event listener for the No button for more facts
    document.getElementById("moreNoBtn").addEventListener("click", () => {
      showMessage("No, that's enough for now!", "user")
      setTimeout(() => {
        showMessage(
          "Alright! If you change your mind, just let me know! 👋",
          "bot"
        )
      }, 1500)

      inputWrapper.innerHTML = ""
    })
  }, 2000)
}

//Function to get random dinosaur facts
const getRandomDinoFacts = () => {
  const facts = [
    "Dinosaurs lived on all continents.",
    "Dinosaurs became extinct about 65 million years ago.",
    "There were more than 700 species.",
    "Birds evolved from a group of meat-eating dinosaurs known as Theropods.",
    "The largest land-based dinosaur was the Argentinosaurus.",
    "Many dinosaurs had feathers.",
    "Some of the biggest dinosaurs were herbivores.",
    "Tyrannosaurus Rex was the most ferocious dinosaur.",
    "An asteroid hit and the dinosaurs became extinct.",
    "Many dinosaurs had feathers.",
  ]

  return facts[Math.floor(Math.random() * facts.length)]
}

//Eventlistener to the form
nameForm.addEventListener("submit", handleNameInput)

// Here we invoke the first function to get the chatbot to ask the first question when
// the website is loaded. Normally we invoke functions like this: greeting()
// To add a little delay to it, we can wrap it in a setTimeout (a built in JavaScript function):
// and pass along two arguments:
// 1.) the function we want to delay, and 2.) the delay in milliseconds
// This means the greeting function will be called one second after the website is loaded.
setTimeout(greetUser, 1000)
