document.addEventListener("DOMContentLoaded", function() {
    // const form = document.querySelector('form');
    const form = document.getElementById('comment-form');
    console.log(form);

    form.addEventListener("submit", handleSubmit);

    addClickToButtons();
    addClickMeButton();
})


function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    // const input = event.target[0];
    // const comment  = input.value;
    const commentInput = document.getElementById("new-comment");
    addComment(commentInput.value);
    commentInput.value = "";
    
}

function addComment(comment) {
    const commentsDiv = document.getElementById("comments-container");
    const commentDiv = document.createElement('div');
    const commentSpan = document.createElement('span');
    const frownyFace = document.createElement('span');
    const space = document.createElement('br');

    commentSpan.innerText = comment;
    frownyFace.innerHTML = "    &#9785;";
    frownyFace.className = "trash";

    frownyFace.addEventListener("click", (event) => {
        event.target.parentElement.remove();
    })
    
    commentDiv.append(commentSpan, frownyFace, space);
    commentsDiv.append(commentDiv);

    // possible security issue
    // commentsDiv.innerHTML += `<span>${comment}</span><br>`
}

function addClickToButtons() {
    const parent = document.getElementById("helicopter-parent");
    parent.addEventListener("click", (event) => {
        // console.dir(event.target)
        switch (event.target.dataset.name) {
            case "alert":
                alert("I was clicked");
                break;

            case "log":
                console.log("I was clicked");
                break;

            case "error":
                console.error("I was clicked");
                break;
        
            default:
                console.warn("Something else was clicked");
                break;
        }
    })
}


function addClickMeButton() {
    const button = document.getElementById("my-button");
    button.addEventListener("click", callback())

}

function callback(){
    console.log("hi")
    return function() {
        console.log("hello")
    }
}