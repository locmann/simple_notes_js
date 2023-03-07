// загрузка данных из localStorage и преобразование их в удобный вид
let array = JSON.parse(localStorage.getItem("array")) || [];
//обработчик на кнопку добавления
let addButton = document.querySelector(".addBut");
addButton.addEventListener('click', () => {
    let note = addNote("");
    let body = document.querySelector("div.container");
    body.appendChild(note);
    //добавляем в localStorage
    let qwe = note.querySelector('#note-text');
    let txt = qwe.innerHTML;
    array.push(txt);
    localStorage.setItem("array", JSON.stringify(array));
});

function start() {
    //загрузка заметки при первом запуске
    if (array.length == 0) {
        createNote();
    } else {
        //загрузка заметок из localStorage
        let body = document.querySelector("div.container");
        array.forEach((item) => {
            let note = addNote(item);
            body.appendChild(note);
        });
    }
}
//метод для создания самой первой заметки
function createNote() {
    let body = document.querySelector("div.container");
    let note = document.createElement('div');
    note.classList.add('note');
    //структура заметок
    note.innerHTML = `        
        <div class="note-actions">
            <button class="edit"><i class="fa-sharp fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-sharp fa-solid fa-trash-can"></i></button>
            <button class="bold"><i class="fa-solid fa-bold"></i></button>
            <button class="ital"><i class="fa-solid fa-italic"></i></button>
        </div>
        <p id="note-text">start note</p>
        <textarea class="hidden" id="note-textarea">start note</textarea>
    `;
    body.appendChild(note);
    actions(note);

    //добавление в localstorage
    let qwe = note.querySelector('#note-text');
    let txt = qwe.innerHTML;
    array.push(txt);
    localStorage.setItem("array", JSON.stringify(array));
}
//добавление заметок
function addNote(text) {
    let note = document.createElement('div');
    note.classList.add('note');
    //структура заметок
    note.innerHTML = `
        <div class="note-actions">
            <button class="edit"><i class="fa-sharp fa-solid fa-pen-to-square"></i></button>
            <button class="delete"><i class="fa-sharp fa-solid fa-trash-can"></i></button>
            <button class="bold"><i class="fa-solid fa-bold"></i></button>
            <button class="ital"><i class="fa-solid fa-italic"></i></button>
        </div>
        <p id="note-text">${text}</p>
        <textarea class="hidden" id="note-textarea">${text}</textarea>
    `;

    actions(note);
    return note;
}

function actions(note) {
    let editBut = note.querySelector('.edit');
    let deleteBut = note.querySelector('.delete');
    let noteText = note.querySelector('#note-text');
    let textArea = note.querySelector('#note-textarea');
    let boldBut = note.querySelector(".bold");
    let italBut = note.querySelector(".ital");
    let i = 0;
    let tmpStr;
    //редактирование заметки
    editBut.addEventListener('click', () => {
        //показать\скрыть поле записи
        noteText.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
        //логика сохранения заметок в localStorage
        if (i == 0) {
            tmpStr = noteText.innerHTML;
            i++;
        } else {
            let index = array.indexOf(tmpStr);
            array[index] = noteText.innerHTML;
            localStorage.setItem("array", JSON.stringify(array));
            i--;
        }
    });
    //удаление заметки
    deleteBut.addEventListener('click', () => {
        //поиск и удаление из localStorage
        let txt = noteText.innerHTML;
        let index = array.indexOf(txt);
        if (index > -1) {
            array.splice(index, 1);
            localStorage.setItem("array", JSON.stringify(array));
        }
        note.remove();
    });
    //изменение текста
    textArea.addEventListener('input', (e) => {
        noteText.innerHTML = e.target.value;
        flag = true;
    });
    //сделать текст жирным
    boldBut.addEventListener('click', () => {
        let qwe = note.querySelector('#note-text');
        qwe.classList.toggle('boldText');
    });
    //сделать текст курсивным
    italBut.addEventListener('click', () => {
        let qwe = note.querySelector('#note-text');
        qwe.classList.toggle('italicsText');
    });
}


