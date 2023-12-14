const qrText = document.getElementById('qr-text')
const qrCodeBox = document.getElementById('qrCodeBox')
const qrCodeImage = document.getElementById('qrCodeImage')
const generateText = document.getElementById('generateText')
const generate = document.getElementById('generateBtn')

generate.addEventListener("click" , displayQR)

function displayQR() {
    if (qrText.value !=='') {
        qrCodeBox.classList.remove('d-none')
        generateQR() 
        generateText.innerHTML = qrText.value
        qrText.value = ""
    } else {
        alert("yapma")
        qrCodeBox.classList.add('d-none')
    }
}

function generateQR() {
    qrCodeImage.src = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + qrText.value
}

function copyQR() {
    navigator.clipboard.writeText(generateText.innerHTML)
    .then(function () {
        alert('kopyalandı: ' + generateText.innerHTML )
    })
    .catch(function(err) {
        console.error('metin kkopyalanmadı', err)
    });
}

function downloadQR() {
    const imgUrl = qrCodeImage.src

    fetch(imgUrl)
        .then(response => response.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = generateText.innerHTML;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        })
        .catch(error => {
            console.error('İndirme hatası:', error);
        });
}