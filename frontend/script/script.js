const add_form = document.getElementById("add_form");
const first_num = document.getElementById("fi").value;
const second_num = document.getElementById("si").value;
const find_form = document.getElementById("find_form");

function nodeadd() {
    add_form.addEventListener("submit", (e) => {
        e.preventDefault();
        const request = new XMLHttpRequest();
        request.open("post", `http://localhost:3000/node/sha256?firsinput=${first_num}&secondinput=${second_num}`)
        request.onload = function() {
            // console.log(request.responseText);
            document.getElementById("result_area").style.visibility = "visible";
            var obj = JSON.parse(request.responseText);
            if (typeof obj.message == "undefined") {
                document.getElementById("result").innerHTML = obj.result;
            } else {
                document.getElementById("result").innerHTML = obj.message;
            }
            console.log(request.responseText);
        }
        request.send(new FormData(add_form));
    })
}

function goadd() {
    add_form.addEventListener("submit", (e) => {
        e.preventDefault();
        const request = new XMLHttpRequest();
        request.open("post", `http://localhost:8080/sha256?firstinput=${first_num}&secondinput=${second_num}`)
        request.onload = function() {
            document.getElementById("result_area").style.visibility = "visible";
            var obj = JSON.parse(request.responseText);
            document.getElementById("result").innerHTML = obj.result;
        }
        request.send(new FormData(add_form));
    })
}


function nodefind() {
    find_form.addEventListener("submit", (e) => {
        e.preventDefault();
        const request = new XMLHttpRequest();
        request.open("get", `http://localhost:3000/node/write?input=${document.getElementById("ln").value}`)
        request.onload = function() {
            document.getElementById("find_area").style.visibility = "visible";
            var obj = JSON.parse(request.responseText);
            if (typeof obj.message == "undefined") {
                document.getElementById("find_result").innerHTML = obj.result;
            } else {
                document.getElementById("find_result").innerHTML = obj.message;
            }

            console.log(request.responseText);
        }
        request.send(new FormData(find_form));
    })

}

function gofind() {
    find_form.addEventListener("submit", (e) => {
        e.preventDefault();
        const request = new XMLHttpRequest();
        request.open("get", `http://localhost:8080/write?input=${document.getElementById("ln").value}`)
        request.onload = function() {
            document.getElementById("find_area").style.visibility = "visible";
            var obj = JSON.parse(request.responseText);

            document.getElementById("find_result").innerHTML = obj.result;
        }
        request.send(new FormData(find_form));
    })
}