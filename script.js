'use strict'

document.getElementById('form1').addEventListener('submit', function (e){
    e.preventDefault();
    let name = this.elements['name'].value.trim();
    let lastName = this.elements['lastName'].value.trim();
    let message = this.elements['msg'].value.trim();
    let email = this.elements['email'].value.trim();

    if (name.length < 3) {
        Swal.fire({
            icon: 'warning',
            title: 'Ошибка',
            text: 'Имя должно содержать не менее 3 символов!'
        })
    }
    else if (lastName.length < 3) {
        Swal.fire({
            icon: 'warning',
            title: 'Ошибка',
            text: 'Фамилия должна содержать не менее 3 символов!',
        })
    }
    else if (email == '') {
        Swal.fire({
            icon: 'warning',
            title: 'Ошибка',
            text: 'Поле почты не может быть пустым!'

        })
    }
    else if (message == '') {
        Swal.fire({
            icon: 'warning',
            title: 'Ошибка',
            text: 'Сообщение не может быть пустым!',
            })
    }
    else {
        Swal.fire({
            icon: 'success',
            title: 'Сообщение отправлено, ожидайте ответа'

        })
    }

    const url = 'http://127.0.0.1';

    fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, lastName, email, message })
  })
    .then(response => {
      document.getElementById('status').textContent = "Форма успешно отправлена!";
      console.log("Успех:", response);
    })
    .catch(error => {
      document.getElementById('status').textContent = "Ошибка при отправке.";
      console.error("Ошибка:", error);
    });


})

document.getElementById('form2').addEventListener('submit', function (e){
    e.preventDefault();

    let name = this.elements['fName'].value.trim();
    let address = this.elements['address'].value.trim();
    let comment = this.elements['comment'].value.trim();
    let check = this.elements['checkbox'].checked;

    if (name.length < 3) {
        Swal.fire({
            icon: 'warning',
            title: 'Ошибка',
            text: 'Имя должно содержать не менее 3 символов!'
        })
    }
    else if (address.length < 5) {
        Swal.fire({
            icon: 'warning',
            title: 'Ошибка',
            text: 'Адрес должен содержать не менее 5 символов!'
        })
    }
    else if (!check) {
            Swal.fire({
            icon: 'warning',
            title: 'Ошибка',
            text: 'Необходимо принять условия договора-оферты'
        })
    }

    else { 
    Swal.fire({
        title: 'Заказ создан',
        html: `
        <p><strong>Имя:</strong> ${name}</p>
        <p><strong>Адрес:</strong> ${address}</p>
        <p><strong>Комментарий:</strong> ${comment || 'Отсутствует'}</p>
        `,
        icon: 'success',
        });
    }

     const url = 'http://127.0.0.1';

    fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, address, comment})
  })
    .then(response => {
      document.getElementById('status').textContent = "Форма успешно отправлена!";
      console.log("Успех:", response);
    })
    .catch(error => {
      document.getElementById('status').textContent = "Ошибка при отправке.";
      console.error("Ошибка:", error);
    });


})


fetch('reviews.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('responsesRow');

        data.forEach(review => {
            const rev = document.createElement('div');
            rev.className = 'response';

            rev.innerHTML = `
            <div class="responseHead">
                <img src="1110.png" alt="">
                <p class="responseTitle">${review.title}</p>
            </div>
            <p class="responseText">${review.text}</p>
            `;

            container.appendChild(rev);
        });
    });
