let header = document.querySelector("#header-newentry");
let headerContent = document.querySelector("#header-newentry").textContent;
current = 0;
header.innerHTML = "";

setInterval(() => {
    if(current < headerContent.length){
        header.innerHTML += headerContent.charAt(current);
        current++;
    }
}, 100);


/***********/

// Fetch All Teachers In Options



/***********/

/// Validation & Focus
let inputs = document.querySelectorAll("input,select");
let btnCorrectExam = document.querySelector("div.btn.btn-success");
let myAlert = document.querySelector("div.alert.alert-danger");
// Focus
inputs[0].focus();
// Get Today Data And set Date
var date = new Date();
var dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split("T")[0];
// Set Date
inputs[5].setAttribute("value", dateString);
let mainUrl = "http://localhost:8090/VipCenter/config";

// Correct Exam Function
let CorrectExamAPI = () => {

    let inputs = document.querySelectorAll("input,select");
    let url = `${mainUrl}/new_exam.php?name=${inputs[0].value}&teacher=${inputs[1].value}&leason=${inputs[2].value}&fulldegree=${inputs[3].value}&studegree=${inputs[4].value}&date=${inputs[5].value}`;

    if (inputs[0] !== "" && inputs[0].value.length >= 9 && !inputs[0].value.includes("ى") && inputs[3].value >= 30 && inputs[4].value > 0 && inputs[3].value >= inputs[4].value ) {

        fetch(url)
            .then(response => response.json())
            .then(data => {


                console.log(data);

                if (data.status == 1) {

                    console.log("done");

                    // Alert Setting
                    myAlert.textContent = "تم إضافة النتيجة بنجاح"
                    myAlert.classList.contains("alert-danger") ? myAlert.classList.replace("alert-danger", "alert-success") : null;
                    myAlert.classList.contains("d-none") ? myAlert.classList.remove("d-none") : null;
                    setTimeout(() => {
                        myAlert.classList.add("d-none");
                    }, 2500);
                    // Inputs After Add Setting 
                    inputs[0].focus();
                    inputs[0].value = "";
                    inputs[4].value = 0;

                }
            })
            .catch(error => {

                console.log(error);
                myAlert.classList.contains("d-none") ? myAlert.classList.remove("d-none") : null;
                myAlert.classList.contains("alert-success") ? myAlert.classList.replace("alert-success", "alert-danger") : null;
                myAlert.textContent = "يوجد خطأ بقواعد البيانات";
                setTimeout(() => {
                    myAlert.classList.add("d-none");
                }, 4000);

            });

    } else {

        myAlert.classList.contains("d-none") ? myAlert.classList.remove("d-none") : null;
        myAlert.classList.contains("alert-success") ? myAlert.classList.replace("alert-success", "alert-danger") : null;
        myAlert.textContent = "تأكد من كتابة الإسم به حرف الـ ي بالنقاط أو تأكد من درجات الطالب";
        setTimeout(() => {
            myAlert.classList.add("d-none");
        }, 4000);
        console.log("please Check data");

    }
}

document.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        CorrectExamAPI();
    }
})

btnCorrectExam.addEventListener("click", CorrectExamAPI)