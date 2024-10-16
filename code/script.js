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
