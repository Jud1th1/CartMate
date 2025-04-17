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
const shoppingListEl = document.getElementById("shopping-list") 


//Submit form input and prevent empty string in form submission
document.getElementById("item-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const inputValue = inputFieldEl.value.trim();
  
    if (inputValue !== "") {
      push(shoppingListInDB, inputValue);
      clearInputFieldEl();
    }
  });


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

function appendItemToShoppingListEl([itemID, itemValue]) {
    const newEl = document.createElement("li");
    newEl.textContent = itemValue;
    newEl.tabIndex = 0; // makes it focusable

    newEl.addEventListener("click", () => {
        const itemRef = ref(database, `shoppingList/${itemID}`);
        remove(itemRef);
    });

    newEl.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const itemRef = ref(database, `shoppingList/${itemID}`);
            remove(itemRef);
        }
    });

    shoppingListEl.append(newEl);
}

//Toggle JS
const kiwi = document.querySelector("#kiwi img");
const grape = document.querySelector("#grape img");

function myToggle() {
  document.body.classList.toggle("purple-mode");

  const fruit = document.body.classList.contains("purple-mode") ? grape : kiwi;
  fruit.classList.add("bounce");
  setTimeout(() => fruit.classList.remove("bounce"), 300);
}

const toggleLabel = document.querySelector(".togglebtn");
toggleLabel.addEventListener("click", myToggle);
