from locust import HttpUser, task, between

class QuickstartUser(HttpUser):
    wait_time = between(1, 2)

    def on_start(self):
        self.client.get("http://localhost:8080/go/write?input=12")
        self.client.post("http://localhost:8080/go/sha256?firstinput=1999099&secondinput=6")
        self.client.get("http://localhost:8080/node/write?input=12")
        self.client.post("http://localhost:8080/node/sha256?firstinput=1999099&secondinput=6")




