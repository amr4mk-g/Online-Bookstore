const url = "http://localhost:3000/api/user/signup"
const nameEl = document.getElementById("userName");
const emailEl = document.getElementById("userEmail");
const passwordEl = document.getElementById("userPassword");

async function signUp () { 
 let dataObj = {name: nameEl.value, email: emailEl.value, password: passwordEl.value};
 try {
    let response = await fetch(url, {method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dataObj)
    });
    if (!response.ok) {
      alert("SignUp failed");
      return;
    }
    let data = await response.json();
    if (data.token) {
      localStorage.setItem("user-token", data.token);
      window.location.href = "index.html";
    } else {
      alert("SignUp failed: Invalid credentials");
    }
  } catch (error) {
    alert("An error occurred during signUp");
  }
}

