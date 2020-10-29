const add_form = document.getElementById("add_form");
const first_num = document.getElementById("fi").value;
const second_num = document.getElementById("si").value;
const find_form = document.getElementById("find_form");
const line_num = document.getElementById("ln").value;

function nodeadd() {
    add_form.addEventListener("submit", (e) => {
        e.preventDefault();
        const request = new XMLHttpRequest();
        request.open("post", `http://localhost:3000/node/sha256?firsinput=${first_num}&secondinput=${second_num}`)
        request.onload = function() {
            // console.log(request.responseText);
            document.getElementById("result_area").style.visibility = "visible";
            document.getElementById("result").innerHTML = request.responseText;

        }
        request.send(new FormData(add_form));
    })
}

function goadd() {
    add_form.addEventListener("submit", (e) => {
        e.preventDefault();
        const request = new XMLHttpRequest();
        request.open("post", `http://localhost:8080/go/sha256?firstinput=${first_num}&secondinput=${second_num}`)
        request.onload = function() {
            document.getElementById("result_area").style.visibility = "visible";
            document.getElementById("result").innerHTML = request.responseText;
        }
        request.send(new FormData(add_form));
    })
}

function nodefind() {
    find_form.addEventListener("submit", (e) => {
        e.preventDefault();
        const request = new XMLHttpRequest();
        console.log(line_num);
        request.open("get", `http://localhost:3000/node/write?input=${line_num} `)
        request.onload = function() {

                document.getElementById("find_area").style.visibility = "visible";
                document.getElementById("find_result").innerHTML = request.responseText;
            }
            // request.send(null);
        request.send(new FormData(find_form));
    })

}

function gofind() {
    find_form.addEventListener("submit", (e) => {
        e.preventDefault();
        const request = new XMLHttpRequest();
        request.open("get", `http://localhost:8080/go/write?input=${line_num}`)
        request.onload = function() {
                document.getElementById("find_area").style.visibility = "visible";
                document.getElementById("find_result").innerHTML = request.responseText;
            }
            // request.send(null);
    })
}