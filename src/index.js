let editMode = false;
// after editing, the button will continue to say edit and edit the same comment so this sets the default mode to not be edit so the submit button will return to normal

document.addEventListener("DOMContentLoaded", function() {
    // const form = document.querySelector('form'); This will just grab the first form on the page
    const form = document.getElementById('comment-form');
    // this will grab a specific form in case you have multiple forms on one page
    console.log(form);

    form.addEventListener("submit", handleSubmit)
    // grabbing the form and adding an Event Listener
    // VERY IMPORTANT THAT YOU GRAB THE FORM NOT THE BUTTON for this event listener


    addClickToButtons();
    addClickMeButton();
})


function handleSubmit(event) {
    event.preventDefault();
    // prevents the page from reloading when you hit submit/ stops a get or post from happening 
    console.log(event);
    // const input = event.target[0];
    // finding where the user submitted thing is going
    // const comment  = input.value;
    // showing the value of the input 
    const commentInput = document.getElementById("new-comment");
    if (!!editMode){
        editMode.children[0].innerText = commentInput.value 
        // if editMode is true we are grabbing the child we are editing and updating the value of that div
        document.getElementById('submit-comment').value = "Submit";
        // grab edit button since we are in edit mode and want to switch the button back to submit
        editMode = false;
        // we want to set edit mode back to false so the button and the comment go back to normal
    } else {
        addComment(commentInput.value);
        // else do things normally
    }
    // addComment(commentInput.value);
    commentInput.value = "";
    // clearing out the input field after something is submitted
}

function addComment(comment) {
    const commentsDiv = document.getElementById("comments-container");
    // this creates a div container for all the comments
    const commentDiv = document.createElement('div');
    // this creates a div container for each individual comment
    // this is important so that when we delete a comment, we are not deleting the entire comment section
    // it is easier to delete the div instead of each individual element
    const commentSpan = document.createElement('span');
    const frownyFace = document.createElement('span');
    const space = document.createElement('br');
    const editButton = document.createElement('button');

    commentSpan.innerText = comment;
    frownyFace.innerHTML = "    &#9785;";
    frownyFace.className = "trash";
    // from CSS file which will turn it red
    editButton.innerText = "Edit me"

    editButton.addEventListener("click", handleEditButton);

    frownyFace.addEventListener("click", (event) => {
        event.target.parentElement.remove();
        // removing the parent (commentDiv) which is easier than removing all the individual children
    })
    
    commentDiv.append(commentSpan, editButton, frownyFace, space);
    // adding to each individual comment a span element with the text, a frowny face, and a break
    commentsDiv.append(commentDiv);
    // adding to the entire comment section an individual comment div

    // possible security issue
    // commentsDiv.innerHTML += `<span>${comment}</span><br>`
} 

function handleEditButton(event) {
    // there will be many edit buttons so we should know which button it is which is why we are passing in event
    const commentDiv = event.target.parentElement;
    // parentElement will get you the parent div
    // we want to grab the text put it in the input field and change the submit button and then change the text that renders in the div
    let comment = commentDiv.children[0].innerText;
    // grab the individual comment div
    const submitBtn = document.getElementById('submit-comment');
    // grab the submit button
    const input = document.getElementById('new-comment');
    // get the text input 
    input.value = comment;
    // change the value of the text input to the comment we are editing
    submitBtn.value = "Edit";
    // change the submit button's value to Edit 
    // however it will stay as edit currently 
    editMode = commentDiv; 

}

function addClickToButtons() {
    // as a JS developer you want to make sure that you don't add too many events as that will slow things down, so that is why all these events are put into one event function
    const parent = document.getElementById("helicopter-parent");
    parent.addEventListener("click", (event) => {
        // console.dir(event.target) this will show you what was clicked
        switch (event.target.dataset.name) {
            // dataset method comes from the html where the buttons have data-name
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
    button.addEventListener("click", callback)

}

function callback(){
    console.log("hi")
    return function() {
        console.log("hello")
    }
}