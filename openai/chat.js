OPENAPI_KEY = ""


function talk(){
    data ={
        model: "gpt-3.5-turbo",
        messages: [
            {
                role: "user",
                content: "이순신장군이 누구지"
            }
        ]
    }

    $.ajax({
        type:"POST",
        url: "https://api.openai.com/v1/chat/completions",
        headers:{
            "Authorization": "Bearer " + OPENAPI_KEY
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8"

    }).done(function(response){
        console.log(response)

    }).fail(

    )
}

talk()