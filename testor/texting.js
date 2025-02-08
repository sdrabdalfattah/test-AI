

let send = document.getElementById('send');
let response_container = document.getElementById('response_container');

send.onclick = async function() {
    let send_input = document.getElementById('send_content');
    let send_content = send_input.value.trim();


    send.innerHTML = `<div class="loader"><div></div><div></div></div>`;

    if (!send_content) {
        send_input.placeholder = 'Please enter a request';
        send.innerHTML = `<i class="fa-solid fa-paper-plane"></i>`;
        return;
    }

 

   let token_API = "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";

    let body = {
        "model": "gpt-4o-mini",
        "messages": [{"role": "user", "content": send_content}],
        "temperature": 0.7
      }

    let headers = {
        "Authorization": `Bearer ${token_API}`,
        "Content-Type": "application/json"
    };

    try {
        let response = await axios.post('https://api.openai.com/v1/chat/completions', body, { headers });
        console.log(response);


        let tarhib = document.getElementById('response_container_h3');
        if (tarhib) {
            tarhib.style.display = 'none';
        }

        let reply = response.data.choices[0].message.content;
        let response_content = `
            <div class="request">${send_content}</div>
            <div class="response">${reply}</div>`;
            response_container.style.borderBottom = '1px solid grey';
        response_container.innerHTML += response_content;
        send_input.value = '';
    } catch (error) {

        response_container.innerHTML += `<div style="color: red; text-align:center;">❌ خطأ أثناء معالجة الطلب: <span style="padding: 3px; border-radius: 5px; background-color: red; color: white;">${error.response?.status || "غير معروف"}</span></div>`;
        console.error("❌ فشل الطلب:", error);
    } finally {
        send.innerHTML = `<i class="fa-solid fa-paper-plane"></i>`;
document.getElementById('send_content').style.height ="50px"
    }
};




document.addEventListener("DOMContentLoaded", function () {
    const textarea = document.getElementById("send_content");

    textarea.addEventListener("input", function () {
        this.style.height = "auto"; // إعادة ضبط الارتفاع
        this.style.height = Math.min(this.scrollHeight, 180) + "px"; // ضبط الطول تلقائيًا بحد أقصى 400px
    });
});





