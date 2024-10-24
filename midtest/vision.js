VISION_API_KEY = "";

function processFile(event) {
    content = event.target.result;
    imagestring = content.replace('data:image/jpeg;base64,', '');
    document.getElementById("gimage").src = content;
}

function uploadFiles(files) {
    file = files[0];
    reader = new FileReader();
    reader.onloadend = processFile;
    reader.readAsDataURL(file);
}

function qjsdurhood(likelihood) {
    switch (likelihood) {
        case "VERY_UNLIKELY":
            return "많이 적음";
        case "UNLIKELY":
            return "적음";
        case "POSSIBLE":
            return "보통";
        case "LIKELY":
            return "많음";
        case "VERY_LIKELY":
            return "매우 높음";
    }
}

function analyze() {
    data = {
        requests: [{
            image: {
                content: imagestring
            },
            features: [{
                type: "FACE_DETECTION",
                maxResults: 100
            }]
        }]
    };

    $.ajax({
        type: "POST",
        url: 'https://vision.googleapis.com/v1/images:annotate?key=' + VISION_API_KEY,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8"

    }).done(function (response) {
        console.log(response)
        faceAnnotations = response.responses[0].faceAnnotations;
        if (faceAnnotations && faceAnnotations.length > 0) {
            resultText = '';
            faceAnnotations.forEach((face, index) => {
                resultText += `얼굴 ${index + 1}:\n`;
                resultText += `웃는 정도: ${qjsdurhood(face.joyLikelihood)}\n`;
                resultText += `슬픈 정도: ${qjsdurhood(face.sorrowLikelihood)}\n`;
                resultText += `화난 정도: ${qjsdurhood(face.angerLikelihood)}\n`;
                resultText += `모자를 썼을확률:${qjsdurhood(face.headwearLikelihood)}\n`;
                resultText += `놀란 정도: ${qjsdurhood(face.surpriseLikelihood)}\n\n`;
            });

            document.getElementById("result").value = resultText;

        } else {
            document.getElementById("result").value = "얼굴을 감지하지 못했습니다.";
        }

    }).fail(function (error) {
        console.log(error);
        document.getElementById("result").value = "API 요청에 실패했습니다.";
    });

}
