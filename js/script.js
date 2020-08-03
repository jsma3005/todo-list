let typedText = document.querySelector('.typed-text');
var typed = new Typed(typedText, {
    strings: ['Welcome To Our To-Do-List'],
    backSpeed: 50,
    typeSpeed: 80,
    backDelay: 5000,
    loop: true,
});

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

const openFormBtn = document.querySelector('.open-form');
const formContainer = document.querySelector('.form-container');
const addTaskBtn = document.querySelector('#addTask');
const inputTitle = document.querySelector('#inputTitle');
const inputText = document.querySelector('#inputText');
const taskContainer = document.querySelector('.task-container');

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

openFormBtn.addEventListener('click', () =>{
    formContainer.classList.toggle('toggle-form');
});

function cardTemplate(titleValue, textValue, modalIdCounter){
    let card = document.createElement('DIV');
    let cardBody = document.createElement('DIV');
    let cardTitle = document.createElement('H5');
    let cardText = document.createElement('p');
    let btnsBlock = document.createElement('DIV');
    let deleteBlock = document.createElement('DIV');
    let deleteBtn = document.createElement('BUTTON');
    let completeBlock = document.createElement('DIV');
    let completeBtn = document.createElement('BUTTON');
    let modalBlock = document.createElement('DIV');
    let modalInnerBlock = document.createElement('DIV');
    let modalContent = document.createElement('DIV');
    let modalHeader = document.createElement('DIV');
    let modalTitle = document.createElement('H5');
    let modalBody = document.createElement('DIV');
    let modalText = document.createElement('H5');
    let modalFooter = document.createElement('DIV');
    let confirmCompleteBtn = document.createElement('BUTTON');
    let cancelCompleteBtn = document.createElement('BUTTON');

    card.classList.add('card');
    cardBody.classList.add('card-body');
    cardTitle.classList.add('card-title', 'text-center');
    btnsBlock.classList.add('row', 'd-flex', 'justify-content-center');
    deleteBlock.classList.add('card-delete', 'text-center', 'mr-5');
    deleteBtn.classList.add('btn', 'btn-danger');
    completeBlock.classList.add('card-complete');
    completeBtn.classList.add('btn', 'btn-primary');
    completeBtn.setAttribute('data-toggle', 'modal');
    completeBtn.setAttribute('data-target', `#modal-${modalIdCounter}`);
    modalBlock.classList.add('modal', 'fade');
    modalBlock.setAttribute('id', `modal-${modalIdCounter}`);
    modalBlock.setAttribute('role', 'dialog');
    modalInnerBlock.classList.add('modal-dialog');
    modalInnerBlock.setAttribute('role', 'document');
    modalContent.classList.add('modal-content');
    modalHeader.classList.add('modal-header');
    modalTitle.classList.add('modal-title');
    modalBody.classList.add('modal-body');
    modalFooter.classList.add('modal-footer');
    confirmCompleteBtn.classList.add('btn', 'btn-primary', 'btn-confirm');
    confirmCompleteBtn.setAttribute('data-dismiss', 'modal');
    cancelCompleteBtn.classList.add('btn', 'btn-secondary');
    cancelCompleteBtn.setAttribute('data-dismiss', 'modal');

    cardTitle.innerHTML = titleValue;
    cardText.innerHTML = textValue;
    deleteBtn.innerHTML = "Delete";
    completeBtn.innerHTML = "Complete";
    modalTitle.innerHTML = "Complete task";
    modalText.innerHTML = "Are you really completed this task?";
    confirmCompleteBtn.innerHTML = "Yes";
    cancelCompleteBtn.innerHTML = "No";

    modalFooter.appendChild(confirmCompleteBtn);
    modalFooter.appendChild(cancelCompleteBtn);
    modalBody.appendChild(modalText);
    modalHeader.appendChild(modalTitle);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalInnerBlock.appendChild(modalContent);
    modalBlock.appendChild(modalInnerBlock);
    completeBlock.appendChild(completeBtn);
    completeBlock.appendChild(modalBlock);
    deleteBlock.appendChild(deleteBtn);
    btnsBlock.appendChild(deleteBlock);
    btnsBlock.appendChild(completeBlock);
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(btnsBlock);
    card.appendChild(cardBody);

    return card;

}

function addTaskToContainer(newCard){
    taskContainer.insertAdjacentElement('afterbegin', newCard);
}

// Счетчик id для новых блоков
let modalIdCounter = 2;

addTaskBtn.addEventListener('click', () =>{
    let cardContainer = cardTemplate(inputTitle.value, inputText.value, modalIdCounter);
    // modalIdCounter - принимает значение счетчика
    if(inputTitle.value == "" || inputText.value == ""){
        alert("Заполните пожалуйста все поля!");
        return;
    }else{
        addTaskToContainer(cardContainer);
        // каждый раз, когда добавляется новый элемент, id счетчика будет прибавляться
        modalIdCounter++;
    }
})


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Кнопка удаления

taskContainer.addEventListener('click', (e) =>{
    e.preventDefault();
    if(e.target.tagName == "BUTTON" && e.target.innerHTML == "Delete"){
        let answer = confirm("Вы действительно хотите удалить эту задачу?");
        if(answer == true){
            e.target.offsetParent.remove();
        }else{
            return;
        }
    }
})


// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// Завершение задачи

let btnComplete = document.querySelector('.card-complete');


taskContainer.addEventListener('click', (e) =>{
    if(e.target.tagName == "BUTTON" && e.target.innerHTML == "Yes"){
        let cardBlock = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        // cardBlock - первый родительский блок нажатой кнопки, если кнопка "Yes";
        cardBlock.style.textDecoration = "line-through";
    }else if(e.target.tagName == "BUTTON" && e.target.innerHTML == "No"){
        let cardBlock = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        cardBlock.style.textDecoration = "none";
        return;
    }
})

taskContainer.addEventListener('click', (e) =>{
    if(e.target.tagName == "BUTTON" && e.target.innerHTML == "Complete"){
        let cardTitle = e.target.parentElement.parentElement.parentElement.children[0].innerHTML;
        // cardTitle - Это заголовок, выпадающего модального окна


        let modalBlock = e.target.nextElementSibling.children[0].children[0].children[1];
        // console.dir(modalBlock);
        // modalBlock - главный блок, выпадающего модального окна

        
        modalBlock.innerHTML = `Are you really completed task "${cardTitle}"?`;
    }
    console.log(e.target.id);
    
})