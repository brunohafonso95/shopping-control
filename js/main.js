// data section

let list = [
    {
        desc: 'rice',
        amount: 1,
        value: 5.40
    },
    {
        desc: 'beer',
        amount: 12,
        value: 1.99
    },
    {
        desc: 'meat',
        amount: 1,
        value: 15.00
    }
];

// data section

// auxiliar functions 

function getTotal(list) {
    let total = 0;
    list.forEach(({amount, value}) => {
        total += amount * value;
    });
    return formatMoney(total);
}

String.prototype.capitalize = function() {
    const text = this.toString().toLowerCase();
    return text.charAt(0).toUpperCase() + text.substring(1);
}

function formatMoney(value, currency = 'R$') {
    return `${currency} ${parseFloat(value).toFixed(2).toString().replace('.', ',')}`;
}

function validation(desc, amount, value) {
    const alert = document.getElementById('alert');
    alert.innerHTML = ''; 
    const errors = [];
    const descInput = document.querySelector('input[name=desc]'); 
    const amountInput = document.querySelector('input[name=amount]');
    const valueInput =  document.querySelector('input[name=value]');

    descInput.classList.remove('invalid-input');
    amountInput.classList.remove('invalid-input');
    valueInput.classList.remove('invalid-input');


    if(desc === '' || desc === null) {
        descInput.classList.add('invalid-input');
        errors.push('You must inform a description.');
    }

    if(amount < 1) {
        amountInput.classList.add('invalid-input');
        errors.push('The minimum amount is 1.');
    }

    if(parseFloat(value).toString() === 'NaN' || value === '' || value === null) {
        value = value.replace(/\D+/g, '')
        valueInput.classList.add('invalid-input');
        errors.push('The value is invalid.');
    }

    const list = document.createElement('ul');
    errors.forEach(error => {
        const li = document.createElement('li');
        li.textContent = error;
        list.appendChild(li);
    });

    if(errors.length) {
        alert.classList.remove('hide');
        alert.appendChild(list);
    } else {
        alert.classList.add('hide');
    }
    
    return errors.length > 0;
}

function saveListStorage(list) {
    const jsonStr = JSON.stringify(list);
    localStorage.setItem('list', jsonStr);
}

function getListStorage() {
    const listStorage = JSON.parse(localStorage.getItem('list'));
    if(listStorage) {
        list = listStorage;
    }

    setList(list);
}

//  auxiliar functions

// crud functions

function setList(list) {
    const table = document.getElementById('listTable');
    table.innerHTML = ` <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Amount</th>
                                    <th>Value</th>
                                    <th>Action</th>
                                </tr>
                            </thead>`;
    let rows = '';
    if(list.length) {
        list.forEach(({desc, amount, value}, index) => {
            rows += `<tr>
                <td>${desc.capitalize()}</td>
                <td>${amount}</td>
                <td>${formatMoney(value)}</td>
                <td>
                    <button onclick="setUpdate(${index})" class="btn btn-default">Edit</button>
                    <button onclick="deleteItem(${index})" class="btn btn-default">Delete</button>
                </td>
            </tr>`;
        });
        table.innerHTML += `<tbody>${rows}<tbody>`;
    } else {
        table.innerHTML += `<tbody>
                                <tr>
                                    <td class="no-items" colspan="4">No items registered</td>
                                </tr>
                            <tbody>`;
    }

    document.getElementById('total').innerHTML = getTotal(list);
    saveListStorage(list);
}

function addData() {
    const desc = document.querySelector('input[name=desc]').value; 
    const amount = document.querySelector('input[name=amount]').value;
    const value =  document.querySelector('input[name=value]').value;
    if(!validation(desc, amount, value)) {
        list.unshift({
            desc,
            amount,
            value
        });
        setList(list);
        resetForm();
    } 
}

function updateItem() {
    const index = document.getElementById('itemId').value;
    const desc = document.querySelector('input[name=desc]').value; 
    const amount = document.querySelector('input[name=amount]').value;
    const value =  document.querySelector('input[name=value]').value;
    if(!validation(desc, amount, value)) {
        list[index] = { desc, amount, value };
        setList(list);
        resetForm();
    }
}

function setUpdate(index) {
    resetForm();
    const { desc, amount, value } = list[index];
    document.getElementById('itemId').value = index;
    document.querySelector('input[name=desc]').value = desc; 
    document.querySelector('input[name=amount]').value = amount;
    document.querySelector('input[name=value]').value = value;
    document.getElementById('btnUpdate').classList.remove('hide');
    document.getElementById('add').classList.add('hide');
    document.getElementById('clear').classList.add('hide');
}

function deleteItem(index) {
    const { desc } = list[index];
    const choose = confirm(`are you sure that want to delete ${desc} ?`);
    if(choose) {
        list.splice(index, 1);
        setList(list);
    }
}

function deleteList() {
    const choose = confirm(`are you sure that want to delete the entire list ?`);
    if(choose) {
        list = [];
        setList(list);
    }
}

function resetForm() {
    validation("desc", 5, 4);
    document.querySelector('input[name=desc]').value = ''; 
    document.querySelector('input[name=amount]').value = '';
    document.querySelector('input[name=value]').value = '';
    document.getElementById('itemId').value = '';
    document.getElementById('btnUpdate').classList.add('hide');
    document.getElementById('add').classList.remove('hide');
    document.getElementById('clear').classList.remove('hide');
}

// crud function

// events

document.getElementById('add').addEventListener('click', addData);
document.getElementById('cancel').addEventListener('click', resetForm);
document.getElementById('clear').addEventListener('click', resetForm);
document.getElementById('save').addEventListener('click', updateItem);
document.getElementById('deleteList').addEventListener('click', deleteList);

// events

// on init call functions

getListStorage();

// on init call functions