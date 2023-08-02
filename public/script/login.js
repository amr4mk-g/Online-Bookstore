const url = "http://localhost:3000/api/user/login"
const emailEl = document.getElementById("userEmail");
const passwordEl = document.getElementById("userPassword");



async function signIn () { 
 let dataObj = {email: emailEl.value, password: passwordEl.value};
 try {
    let response = await fetch(url, {method: "POST", 
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(dataObj)
    });
    if (!response.ok) {
      alert("Login failed");
      return;
    }
    let data = await response.json();
    if (data.token) {
      localStorage.setItem("user-token", data.token);
      window.location.href = "index.html";
    } else {
      alert("Login failed: Invalid credentials");
    }
  } catch (error) {
    alert("An error occurred during login");
  }
}

