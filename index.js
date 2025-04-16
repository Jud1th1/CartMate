import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-7f16f-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings) //App variable with arguments to give the app settings we set up 
const database = getDatabase(app) //Database variable that uses the getDatabse and passes in app
const shoppingListInDB = ref(database, "shoppingList") //The reference 

// Get element
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list") //Add shopping list from html to js

// add an event listener 
addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)

    clearInputFieldEl()
})

// call onValue function so we can use realtime snapshot
onValue(shoppingListInDB, function(snapshot) {

    if (snapshot.exists()) { //this fixes our bug which prevents the last item from being removed
        let itemsArray = Object.entries(snapshot.val())
        
        clearShoppingListEl()
        //for loop to show each item
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]
            
            appendItemToShoppingListEl(currentItem)
        }
    } else {
        shoppingListEl.innerHTML = "No items yet... tell me what you need!"
    }
})

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

//add function to take in item and set value to empty string
function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function appendItemToShoppingListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]
    
    let newEl = document.createElement("li")
    
    newEl.textContent = itemValue

    newEl.addEventListener("click", function() { 
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemID}`) //to locate the item in question
        remove(exactLocationOfItemInDB) //remove function to remove items from the database
    })

    shoppingListEl.append(newEl)
}

const kiwi = document.querySelector("#kiwi img");
const grape = document.querySelector("#grape img");

function myToggle() {
  document.body.classList.toggle("purple-mode");

  const fruit = document.body.classList.contains("purple-mode") ? grape : kiwi;
  fruit.classList.add("bounce");
  setTimeout(() => fruit.classList.remove("bounce"), 300);
}
