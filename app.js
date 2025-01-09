const express = require("express");
const app = express();

const urlencodedParser = express.urlencoded({extended: false});

app.use(express.static("public"));
app.set("view engine", "hbs");

app.post("/register.html", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);

    let section = [];

    if(request.body.maths !== undefined)
        section.push(request.body.maths);
    if(request.body.physics !== undefined)
        section.push(request.body.physics);
    if(request.body.informatics !== undefined)
        section.push(request.body.informatics);

    response.render("confirm.hbs", {
        "name": request.body.name,
        "phone": request.body.phone,
        "email": request.body.email,
        "section": section.length > 0 ? section.join(", ") : '',
        "birthday": request.body.birthday,
        "report": request.body.report,
        "theme": request.body.theme !== undefined ? request.body.theme : '-'
    });
});

app.post("/test.html", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log("request", request.body);

    let counter = 0;
    let error_list = [];

    if(request.body.q1 !== undefined) {
        console.log(1);
        if (Array.isArray(request.body.q1)){
            console.log(2);
            if ( request.body.q1.every((item) => [ 'q1a1', 'q1a2' ].includes(item))){
                console.log(3);
                counter += 1;
            }else{
                counter -= 1;
                error_list.push(1)
            }
        }else{
            counter -= 1;
            error_list.push(1)
        }
    }else{
        counter -= 1;
        error_list.push(1)
    }
       
        if (request.body.q2 === 'q2a2'){
            counter += 1;
        }else{
            counter -= 1;
            error_list.push(2)
        }
        if (request.body.q3 === 'q3a1'){
            counter += 1;
        }else{
            counter -= 1;
            error_list.push(3)
        }
        if (request.body.q4 === 'Web-технологии'){
            counter += 1;
        }else{
            counter -= 1;
            error_list.push(4)
        }
        if (request.body.q51 === 'q51a4'){
            counter += 0.5;
        }else{
            counter -= 1;
            error_list.push(5)
        }
        if (request.body.q52 === 'q52a4'){
            counter += 0.5;
        }else{
            counter -= 1;
            error_list.push(5)
        }
        if (request.body.q6 === 'q6a1'){
            counter += 1;
        }else{
            counter -= 1;
            error_list.push(6)
        }
        let error_list_unique = error_list.filter((elem, index, array) => array.indexOf(elem) == index);
        let response_server = { "error_list": error_list_unique, "count": counter};

        console.log("response", response_server);

    response.render("answer.hbs", response_server);
});


app.listen(3000, ()=>console.log("Сервер запущен..."));