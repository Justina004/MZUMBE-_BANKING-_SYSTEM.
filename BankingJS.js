let accounts = JSON.parse(localStorage.getItem('bank Accounts')) || [];

function saveAccounts(){
    localStorage.setItem('bankAccounts',JSON.stringify(accounts));
    displayAllAccounts();
}

function generateAccNumber() {
    return Math.floor(10000 + Math.random() * 900000);
}

function createAccount() {
    const name = document.getaelementById('accName').value.trim();
    const deposit = parseFloat(document.getElementById('accDeposit').value);

    if(!name || isNaN(deposit) || deposit < 0){
        alert('Please enter valid name and initial deposit');
        return;
    }

    const account = {
        accNumber: generateAccNumber(),
        name:name,
        balance: deposit,
        transactions: [{
            date: new date().toLocaleString,
            type: 'Account Created',
            amount: deposit,
            balance: deposit
        }]
    };

    accounts.push(account);
    saveAccounts();
    alert('Account Created! Account Number: ${account.accNumber}');
    document.getElementById('accName').value ='';
    document.getElementById('accDeposit').value = '';
}
function getAccount(accNum) {
    return accounts.fin(acc => acc.accNumber == accNum);
}

function addTransaction(acc, type, amount) {
    acc.transaction.push({
        date: new Date().toLocaleString(),
        type: type,
        amount: amount,
        balance: acc.balance
    });
}

function deposit() {
    const accNum = document.getElementById('accNumber').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const acc = getAccount(accNum);

    if(!acc || isNaN(amount) || amount <= 0){
        alert('Invalid account number or amount');
        return;
    }

    acc.balance += amount;
    addTransaction(acc, 'Deposit', amount);
    saveAccounts();
    alert('TZS ${amount} deposited successfully');
    showaccountDetails(acc);
}

function withdraw() {
    const accNum = document.getElementById('accNumber').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const acc = getAccount(accNum);

    if(!acc || isNaN(amount) || amount <= 0){
        alert('Invalid account number or amount');
        return;
    }
    if(acc.balance < amount){
        alert('Insufficient balance');
        return;
    }


    acc.balance -= amount;
    addTransaction(acc, 'Withdrawal', amount);
    saveAccounts();
    alert('TZS ${amount} withdrawn successfully');
    showaccountDetails(acc);
}

function transfer() {
    const fromAccNum = document.getElementById('fromAcc').value;
    const toAccNum = document.getElementById('toAcc').value;
    const amount = parseFloat(document.getElementById('transferAmt').value);


    const fromAcc = getAccount(fromAccNum);
    const toAcc = getAccount(toAccNum);

    if(!fromAcc || !toAcc || isNaN(amount) || amount <= 0){
        alert('Invalid account numbers or amount');
        return;
    }
    if(fromAcc.balance < amount){
        alert('Insufficient balance in sender account');
        return;
    }

    fromAcc.balance -= amount;
    toAcc.balance += amount;
    addTransaction(fromAcc, 'Transfer to ${to AccNum}', amount);
    addTransaction(toAcc, 'Transfer from ${fromAccNum}', amount);
    saveAccounts();
    alert('Transfer successful');
}

function searchAccount() {
    const accNum = document.getElementById('searchAcc').value;
    const acc = getAccount(accNum);
    if(!acc) {
        alert('Account nit found');
        return;
    }
    showaccountDetails(acc);
}

function showAccounDetails(acc){
    document.getElementById('accountDetails').classList.remove('hidden');
    const balanceclass = acc.balance < 10000 ? 'low-balance': 'high-balance';

    document.getElementById('detailsContent').innerHTML =`
    <p><b>Account No:</b> ${acc.accNumber}</p>
    <p><b>Name:</b> ${acc.name}</p>
    <p><b>Balance:</b><span class= "${balanceClass}">TZS ${acc.balance.toLocaleString()}</span><p/>`;

    const tbody = document.querySelector('#txnTable tbody');
    tbody.innerHTML = '';
    acc.transactions.slice().reverse().forEach(txn => {
        tbody.innerHTML += `
        <tr>
        <td>${txn.date}</td>
        <td>${txn.type}</td>
        <td>TZS ${txn.amount.toLocaleString()}</td>
        <td>TZS ${txn.balance.toLocaleString()}</td>
        </tr>
        `;
    });
}

function deleteAccount(){
    const AccNum = document.getElementById('searchAcc').value;
    const index = accounts.findIndex(acc => acc.accNumber==accNum);
    if (index === -1) {
        alert('account not found');
        return;
    }
    if (confirm('Delete this account?')){
        accounts.splice(index, 1);
        saveAccounts();
        document.getElementById('accountDetails').classList.add('hidden');
        alert('Account deleted');
    }
}

function displayAllAccounts() {
    const tbody = document.querySelector('#accountsTable tbody');
    tbody.innerHTML = '';
    accounts.forEach(acc => {
        const balanceClass = acc.balance < 10000 ? 'low-balance' : 'high-balance';
        const status = acc.balance < 10000 ? 'low' : 'Active';
        tbody.innerHTML += `
        <tr>
        <td>${acc.accNumber}</td>
        <td>${acc.name}</td>
        <td class="${balanceClass}">TZS ${acc.balance.toLocalestring()}</td>
        <td>${status}</td>
        </tr>
        `;
    });
}

window.load = displayAllAccounts

