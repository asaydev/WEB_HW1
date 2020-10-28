package main

import (
	"bufio"
	"crypto/sha256"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"
)

var port = "8080"

type HashedResult struct {
	Result string
}

func main() {
	fmt.Println("Server Starts Successfully !")
	fmt.Println("Listen on port: " + port)
	handleRequest()
}

func handleRequest() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/sha256", sha)
	router.HandleFunc("/write", write)
	http.ListenAndServe(":"+port, router)
}

func write(w http.ResponseWriter, req *http.Request) {

	if req.Method == http.MethodGet {
		// get values from parametrs
		input := req.FormValue("input")

		//null value
		if input == "" {
			http.Error(w, "Please fill the variable", http.StatusBadRequest)
			return
		}

		inputInt, err := strconv.Atoi(input)

		if err != nil {
			http.Error(w, "Input is not number", http.StatusBadRequest)
			return
		}

		if inputInt <= 0 {
			http.Error(w, "Input must be positive number", http.StatusBadRequest)
			return
		}

		if 100 < inputInt {
			http.Error(w, "Input must be less than 100", http.StatusBadRequest)
			return
		}

		result, err := ReadLine(inputInt)

		if err != nil {
			http.Error(w, "Internal Error!", http.StatusInternalServerError)
			return
		}

		w.Write([]byte(result))
	}
}

func sha(w http.ResponseWriter, req *http.Request) {

	if req.Method == http.MethodPost {
		// get values from parametrs
		num1 := req.FormValue("firstinput")
		num2 := req.FormValue("secondinput")

		//null value
		if num1 == "" || num2 == "" {
			http.Error(w, "Please fill all the variables", http.StatusBadRequest)
			return
		}

		num1Int, err := strconv.Atoi(num1)

		if err != nil {
			http.Error(w, "First input is not number", http.StatusBadRequest)
			return
		}

		num2Int, err := strconv.Atoi(num2)

		if err != nil {
			http.Error(w, "Second input is not number", http.StatusBadRequest)
			return
		}

		resultInt := num1Int + num2Int
		resultString := strconv.Itoa(resultInt)
		hashofResult := sha256.Sum256([]byte(resultString))
		var hashed HashedResult
		hashed.Result = base64.StdEncoding.EncodeToString(hashofResult[:])
		//hashed := HashedResult{resultString}
		js, err := json.Marshal(hashed)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		w.Header().Set("Content-Type", "application/json")
		w.Write(js)
	}
}

func ReadLine(lineNum int) (line string, err error) {

	file, err := os.Open("filex.txt")
	if err != nil {
		return "", err
	}
	sc := bufio.NewScanner(file)
	var lastLine = 0
	for sc.Scan() {
		lastLine++
		if lastLine == lineNum {
			// you can return sc.Bytes() if you need output in []bytes
			return sc.Text(), sc.Err()
		}
	}
	return "", io.EOF
}
