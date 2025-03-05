async function callApi(endpoint, method = "GET", body = null) {
    const idInstance = document.getElementById("idInstance").value;
    const apiToken = document.getElementById("apiToken").value;
    
    if (!idInstance || !apiToken) {
        alert("Введите idInstance и ApiTokenInstance!");
        return;
    }

    const url = `https://api.green-api.com/waInstance${idInstance}/${endpoint}/${apiToken}`;
    const options = { method };

    if (body) {
        options.headers = { "Content-Type": "application/json" };
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        const data = await response.json();
        document.getElementById("response").textContent = JSON.stringify(data, null, 2);
    } catch (error) {
        document.getElementById("response").textContent = "Ошибка запроса: " + error;
    }
}

function getSettings() {
    callApi("getSettings");
}

function getStateInstance() {
    callApi("getStateInstance");
}

function sendMessage() {
    const phone = document.getElementById("phoneNumber").value;
    const message = document.getElementById("message").value;
    if (phone && message) {
        callApi("sendMessage", "POST", { chatId: phone + "@c.us", message });
    } else {
        alert("Введите номер и сообщение!");
    }
}

function sendFileByUrl() {
    const phone = document.getElementById("phoneNumber").value;
    const fileUrl = document.getElementById("fileUrl").value;
    
    if (phone && fileUrl) {
        callApi("sendFileByUrl", "POST", {
            chatId: phone + "@c.us",
            urlFile: fileUrl,
            fileName: fileUrl.split('/').pop(),
            caption: ""
        });
    } else {
        document.getElementById("error").textContent = "Введите номер и URL файла!";
    }
}
