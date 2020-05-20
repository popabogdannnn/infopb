function reqListenerAcasa() {
    let response = JSON.parse(this.responseText);
    let leftSide = document.createElement("div");
    leftSide.setAttribute("class", "left-side");
    let rightSide = document.createElement("div");
    rightSide.setAttribute("class", "right-side");

    for(let i = 0; i < response.length + 1; i++) {
        let probSQ = document.createElement("div");
        let headProblem = document.createElement("div");
        headProblem.setAttribute("class", "problem-head");
        probSQ.setAttribute("class", "problem-link");
        let button = document.createElement("button");
        let buttonDIV = document.createElement("div");
        buttonDIV.setAttribute("class", "button-div")
        if(i < response.length) {
            let prob = document.createElement("a");
            prob.setAttribute("href", "#");
            prob.innerHTML = response[i]["title"];
            prob.setAttribute("data-target", response[i]["id"]);
            prob.setAttribute("class", "a-problem");
            //prob.setAttribute("class", "nav-link");
            prob.addEventListener("click", navigate);
            headProblem.appendChild(prob);
            probSQ.appendChild(headProblem);
            button.innerText = "Delete";
            button.setAttribute("problem-id", response[i]["id"]);
            button.addEventListener("click", deleteProblem);
            buttonDIV.appendChild(button);
            
            let editButton = document.createElement("button");
            editButton.innerText = "Edit";
            editButton.addEventListener("click", () => {
                addProblem(response[i]["title"], response[i]["statement"], response[i]["input"], response[i]["output"], response[i]["id"]);
            })
            
            buttonDIV.appendChild(editButton);
        }
        else {
            button.innerText = "Add";
            button.addEventListener("click", addProblem);
            buttonDIV.appendChild(button);
        }
        probSQ.appendChild(buttonDIV);

        if(i % 2 == 0) {
            leftSide.appendChild(probSQ);
        }
        else {
            rightSide.appendChild(probSQ);
        }

        
    }

    document.getElementsByClassName("section")[0].appendChild(leftSide);
    document.getElementsByClassName("section")[0].appendChild(rightSide);
}

function addProblem(_title = "", _statement = "", _input = "", _output = "", _id = "") {
    clearSection();
    document.getElementsByClassName("section")[0].setAttribute("class", "section addProblem");
    
    let title = document.createElement("h3");
    //title.setAttribute("class", "problem-title");
    let titleInput = document.createElement("input");
    title.innerText = "Titlu";
    if(_statement != "") {
        titleInput.value = _title;
    }

    let statement = document.createElement("h3");
    statement.setAttribute("class", "problem-statement");
    let statementInput = document.createElement("input");
    statement.innerText = "Enunt";
    if(_statement != "") {
        statementInput.value = _statement;
    }
    
    let input = document.createElement("h3");
    let inputInput = document.createElement("input");
    input.innerText = "Date de intrare";
    if(_input != "") {
        inputInput.value = _input;
    }

    let output = document.createElement("h3");
    let outputInput = document.createElement("input");
    output.innerText = "Date de iesire";
    if(_output != "") {
        outputInput.value = _output;
    }

    let buttonSave = document.createElement("button");

    buttonSave.innerText = "Save";
    buttonSave.addEventListener("click", () => {
        let newProblem = {
            "title" : titleInput.value,
            "statement": statementInput.value,
            "input": inputInput.value,
            "output": outputInput.value,
            "id": _id
        }
        
        if(_id != "") {
            let oReq = new XMLHttpRequest();
            oReq.onerror = reqError;
            oReq.open('put', 'http://localhost:3000/problems/' + _id, true);
            oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            oReq.send(JSON.stringify(newProblem));
        }
        else {
            let oReq = new XMLHttpRequest();
            oReq.onerror = reqError;
            oReq.open('post', 'http://localhost:3000/problems', false);
            oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            oReq.send(JSON.stringify(newProblem));
        }
        renderAcasa();
    });

    document.getElementsByClassName("section")[0].appendChild(title);
    document.getElementsByClassName("section")[0].appendChild(titleInput);
    document.getElementsByClassName("section")[0].appendChild(statement);
    document.getElementsByClassName("section")[0].appendChild(statementInput);
    document.getElementsByClassName("section")[0].appendChild(input);
    document.getElementsByClassName("section")[0].appendChild(inputInput);
    document.getElementsByClassName("section")[0].appendChild(output);
    document.getElementsByClassName("section")[0].appendChild(outputInput);
    document.getElementsByClassName("section")[0].appendChild(buttonSave);
}

function reqListener() {

}

async function deleteProblem(ev) {
    let problemID = ev.target.getAttribute("problem-id");
    let oReq = new XMLHttpRequest();
    oReq.onload = reqListener;
    oReq.onerror = reqError;
    await oReq.open('delete', 'http://localhost:3000/problems/' + problemID, false);
    await oReq.send();
    renderAcasa();
}

function reqError(err) {
    console.log('Fetch Error :-S', err);
}

function clearSection() {
    while(document.getElementsByClassName("section")[0].firstChild) {
        let lastChild = document.getElementsByClassName("section")[0].lastChild;
        document.getElementsByClassName("section")[0].removeChild(lastChild);
    }
} 

function renderAcasa() {
    clearSection();
    document.getElementsByClassName("section")[0].setAttribute("class", "section acasa");
    let oReq = new XMLHttpRequest();
    oReq.onload = reqListenerAcasa;
    oReq.onerror = reqError;
    oReq.open('get', 'http://localhost:3000/problems', true);
    oReq.send();
    
   
   // location.reload();
}

function renderDespre() {
    clearSection();
    document.getElementsByClassName("section")[0].setAttribute("class", "section despre");
    let image = document.createElement("img");
    image.setAttribute("src", "res/MEME.png");
    image.setAttribute("class", "imgMeme");
    let creatorName = document.createElement("h3");
    creatorName.innerText = "©Bogdan Ioan Popa";
    let project = document.createElement("h3");
    project.innerText = "Proiect Tehnici Web";
    document.getElementsByClassName("section")[0].appendChild(creatorName);
    document.getElementsByClassName("section")[0].appendChild(project);
    document.getElementsByClassName("section")[0].appendChild(image);
}

function reqListenerProblem() {
    let response = JSON.parse(this.responseText);
    let title = document.createElement("h3");
    title.setAttribute("class", "problem-title");
    title.innerText = response["title"];

    let statement = document.createElement("p");
    statement.setAttribute("class", "statement-text");
    statement.innerText = response["statement"];

    let input = document.createElement("h3");
    input.setAttribute("class", "input-output");
    input.innerText = "Date de intrare";
    let inputValue = document.createElement("p");
    inputValue.setAttribute("class", "statement-text"); 
    inputValue.innerText = response["input"];

    let output = document.createElement("h3");
    output.setAttribute("class", "input-output");
    output.innerText = "Date de ieșire";
    let outputValue = document.createElement("p");
    outputValue.setAttribute("class", "statement-text"); 
    outputValue.innerText = response["output"];

    document.getElementsByClassName("section")[0].appendChild(title);
    document.getElementsByClassName("section")[0].appendChild(statement);
    document.getElementsByClassName("section")[0].appendChild(input);
    document.getElementsByClassName("section")[0].appendChild(inputValue);
    document.getElementsByClassName("section")[0].appendChild(output);
    document.getElementsByClassName("section")[0].appendChild(outputValue);
}

function renderProblem(problemID) {
    clearSection();
    document.getElementsByClassName("section")[0].setAttribute("class", "section problema");
    let oReq = new XMLHttpRequest();
    oReq.onload = reqListenerProblem;
    oReq.onerror = reqError;
  
    oReq.open('get', 'http://localhost:3000/problems/' + problemID, true);
    oReq.send();
}

function navigate(ev) {
    ev.preventDefault();
    let nextPage = ev.target.getAttribute("data-target");
    if(nextPage == "Acasa") {
        renderAcasa();
        return;
    }

    if(nextPage == "Despre") {
        renderDespre();
        return;
    }

    renderProblem(nextPage);
}

function init() {
    document.querySelectorAll(".nav-link").forEach((link) => {
        link.addEventListener("click", navigate);
    });
    renderAcasa();
}

document.addEventListener('DOMContentLoaded', init);