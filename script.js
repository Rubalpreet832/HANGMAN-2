let start_inputs = document.querySelectorAll("input");
let start_button = document.querySelector("button");

start_inputs[0].addEventListener("focus", delete_text);
start_inputs[1].addEventListener("focus", delete_text);

start_button.addEventListener("click", edit_check);

let theWord;
let guessing_character;
let wrong_counter = 1;
let guessed_characters = [];
let guessed = false;
let you_won = false;
let you_lost = false;

function delete_text(e) {
  e.target.value = "";
  e.target.removeEventListener("focus", delete_text);
}



function edit_check() {
  if (start_inputs[1].value == "The word ..." ||
  start_inputs[1].value == "" ||
  start_inputs[1].value.charAt(0) == " "){
    alert("You must type a word, and it cannot start with a space");
  } else {
    if (start_inputs[0].value == "hint ..." ||
    start_inputs[0].value == ""){
      start_inputs[0].value = "no hint";
    }
    theWord = start_inputs[1].value;
    start_game();
  }
}



function start_game() {
  document.querySelector("img").src = "/home/rubalpreet/Desktop/steg7.png";
  document.querySelector("h2").textContent = "Hint: " + start_inputs[0].value;
  document.querySelectorAll("div > div")[3].innerHTML =
  "<ul id='charcter_list'>" +
  "<li>_</li>" +
  "</ul>" +
  "<input value='Character' maxlength='1'>" +
  "<button>Guess</button>";

  for (i = 1; i < theWord.length; i++){
    let list_item = document.createElement("li");
    if (theWord.charAt(i) == " "){
      list_item.appendChild(document.createTextNode("\xa0\xa0\xa0"));
    } else {
      list_item.appendChild(document.createTextNode("_"));
    }
    document.getElementById("charcter_list").appendChild(list_item);
  }

  let  guess_button = document.querySelector("button");
  guess_button.style.width = "70px";
  guess_button.style.height = "50px";
  guess_button.style.fontSize = "20px";
  guess_button.style.margin = "0px";
  guess_button.addEventListener("click", guess);

  let  guess_input = document.querySelector("input");
  guess_input.style.margin = "0px";
  guess_input.style.padding = "5px";
  guess_input.style.height = "30px";
  guess_input.style.fontSize = "20px";
  guess_input.addEventListener("focus", delete_text);
  guess_input.addEventListener("keypress", function enter (e) {
    if (e.key == "Enter"){guess()}
  });
}



function guess() {
  guessing_character = document.querySelector("input").value;
  for (i = 0; i < guessed_characters.length; i++){
    if (guessing_character == guessed_characters[i]){
      guessed = true;
    }
  }
  if (guessed == true){
    alert("you have allready guessed: " + guessing_character);
    document.querySelector("input").value = "";
    guessed = false;
  }
  else {
    if (theWord.indexOf(guessing_character) != -1 && guessing_character != " "){
      correct(guessing_character);
    } else {
      wrong(guessing_character);
    }
    if (you_won == false && you_lost == false){
      document.querySelector("input").value = "";
    }
    guessed_characters.push(guessing_character);
  }
}



function correct(e) {
  console.log(e + " was correct");
  let character_list = document.querySelectorAll("#charcter_list > li");

  for (i = 0; i < theWord.length; i++){
    if (e == theWord.charAt(i)){
      character_list[i].textContent = e;
    }
  }
  let win_check = 0;
  for (i = 0; i < character_list.length; i++){
    if (character_list[i].textContent != "_"){
      win_check++;
    }
  }
  if (win_check == character_list.length){
    you_won = true;
    document.querySelector("h2").textContent = "You won!"
    document.querySelector("h2").style.color = "green";
    document.querySelectorAll("div > div")[3].innerHTML = "<ul id='winning_word'></ul>";
    let winning_text = ""
    for(i = 0; i < character_list.length; i++){
      winning_text = winning_text + character_list[i].textContent
    }
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(winning_text));
    document.getElementById("winning_word").appendChild(li);
  }
}



function wrong(e) {
  console.log(e + " was wrong");
  let boxes = document.getElementsByClassName("wrong_counter");
  let which_box = Math.floor(Math.random() * 2);
  document.getElementsByClassName("wrong_character_box")
          [which_box].style.opacity = "100";
  let li = document.createElement("li");
  li.appendChild(document.createTextNode(e));
  boxes[which_box].appendChild(li);

  wrong_counter++;
  document.querySelector("img").src = "/steg7"+wrong_counter+".png";
  if (wrong_counter == 8){
    you_lost = true;
    document.querySelector("h2").textContent = "You lost!"
    document.querySelector("h2").style.color = "red";
    let character_list = document.querySelector("#charcter_list");
    document.querySelectorAll("div > div")[3].innerHTML = "<ul> </ul>";
    document.querySelectorAll("div > div")[3].appendChild(character_list);
    for (i = 0; i < character_list.childNodes.length; i++){
      character_list.childNodes[i].style.color = "red";
    }
  }
}