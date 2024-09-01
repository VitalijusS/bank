# Bank

_API project_
<br>

## 🌟 About

The purpose of this project is to learn Express.js and API.

## 🎯 Project features/goals

-   API 

## 🧰 Getting Started

### 💻 Prerequisites

Node.js - _download and install_

```
https://nodejs.org
```

Git - _download and install_

```
https://git-scm.com
```

Insomnia (or other equivalents) - _download and install_

```
https://insomnia.rest/download
```

### 🏃 Run locally

Would like to run this project locally? Open terminal and follow these steps:

1. Clone the repo to your selected folder
    ```sh
    git clone https://github.com/VitalijusS/bank .
    ```
2. Install NPM packages
    ```sh
    npm i
    ```
3. Run the server
    ```sh
    npm run dev
    ```

## 📝Instructions 

### /api/account
    **Registers new account**

    **HTTP request method:** POST

    **Link example:** http://localhost:5018/api/account

    **Data to send:** First name, last name, birthday 

    **Data rules/restrictions:** JSON format, follow the data struction from example, first and last name: first letter must be capita, length more than 2 letters and up to 20, only english aplhabet. Date: format is YYYY-MM-DD (1999-01-30) person must be 18 or older and can't put dates before 1900th year.

    **Data example:** 
    ```JSON
        {   
	        "firstName":"Tomas",
	        "lastName":"Tomaitis",
	        "birthday":"1999-12-24"
        }
    ```
    

### /api/account/{accountFirstName-accountLastName}
    **Returns full name and date of birth**

    **HTTP request method:** GET

    **Link example:** http://localhost:5018/api/account/Jonas-Jonaitis

    **Data to send:** None

### /api/account/{accountFirstName-accountLastName}
    **Deletes account**

    **HTTP request method:** DELETE

    **Link example:** http://localhost:5018/api/account/Jonas-Jonaitis

    **Data to send:** None

### /api/account/{accountFirstName-accountLastName}
    **Changes account information**

    **HTTP request method:** PUT

    **Link example:** http://localhost:5018/api/account/Jonas-Jonaitis

    **Data to send:** First name, last name, birthday 

    **Data rules/restrictions:** JSON format, follow the data struction from example, first and last name: first letter must be capita, length more than 2 letters and up to 20, only english aplhabet. Date: format is YYYY-MM-DD (1999-01-30) person must be 18 or older and can't put dates before 1900th year.

    **Data example:** 
    ```JSON
        {
	        "firstName":"jonas",
	        "lastName":"jonaitis",
	        "birthday":"1999-01-01"
        }
    ```

### /api/account/{accountFirstName-accountLastName}/name
    **Returns first name of the account**

    **HTTP request method:** GET

    **Link example:** http://localhost:5018/api/account/Jonas-Jonaitis/name

    **Data to send:** None
    
 
### /api/account/{accountFirstName-accountLastName}/name
    **Updates first name of the account**

    **HTTP request method:** PUT

    **Link example:** http://localhost:5018/api/account/Jonas-Jonaitis/name

    **Data to send:** First name

    **Data rules/restrictions:** JSON format, follow the data struction from example, first letter must be capita, length more than 2 letters and up to 20, only english aplhabet.

    **Data example:** 
    ```
        {
	        "firstName":"Petras"
        }
    ```
    
### /api/account/{accountFirstName-accountLastName}/surname
    **Returns last name of the account**

    **HTTP request method:** GET

    **Link example:** http://localhost:5018/api/account/Jonas-Jonaitis/surname

    **Data to send:** None
 
### /api/account/{accountFirstName-accountLastName}/surname
    **Updates last name of the account**

    **HTTP request method:** PUT

    **Link example:** http://localhost:5018/api/account/Jonas-Jonaitis/surname

    **Data to send:** Last name

    **Data rules/restrictions:** JSON format, follow the data struction from example, first letter must be capita, length more than 2 letters and up to 20, only english aplhabet.

    **Data example:** 
        
### /api/account/{accountFirstName-accountLastName}/dob
    **Returns date of birth**

    **HTTP request method:** GET

    **Link example:** http://localhost:5018/api/account/Jonas-Jonaitis/dob

    **Data to send:** None
 
### /api/account/{accountFirstName-accountLastName}/dob
    **Updates date of birth**

    **HTTP request method:** PUT

    **Link example:** http://localhost:5018/api/account/Jonas-Jonaitis/dob

    **Data to send:** Date of birth

    **Data rules/restrictions:** JSON format, follow the data struction from example, format is YYYY-MM-DD (1999-01-30) person must be 18 or older and can't put dates before 1900th year.

    **Data example:** 
    ```
        {
	        "birthday":"1999-04-31"
        }
    ```

### /api/withdrawal
    **Withdraws the money form account**

    **HTTP request method:** POST

    **Link example:** http://localhost:5018/api/withdrawal

    **Data to send:** First name, last name, ammount of money to withdraw in cents

    **Data rules/restrictions:** JSON format, follow the data struction from example, already existing account first and last name, amount of money in cents, can't withdraw more money than account has.

    **Data example:** 
    ```
    {
	    "firstName":"Jonas",
	    "lastName":"Jonaitis",
	    "money":10000
    }
    ```

### /api/deposit
    **Deposits money to the account**

    **HTTP request method:** POST

    **Link example:** http://localhost:5018/api/deposit

    **Data to send:** First name, last name, ammount of money to deposit in cents

    **Data rules/restrictions:** JSON format, follow the data struction from example, already existing account first and last name, amount of money in cents.

    **Data example:** 
    ```
    {
	    "firstName":"Jonas",
	    "lastName":"Jonaitis",
	    "money":10000
    }
    ```

### /api/transfer
    **Transfers money between accounts**

    **HTTP request method:** POST

    **Link example:** http://localhost:5018/api/transfer

    **Data to send:** First and last name of sender, first and last name of receiver, ammount of money in cents

    **Data rules/restrictions:** JSON format, follow the data struction from example, already existing accounts first and last names, amount of money in cents.


    **Data example:** 
    ```
        {
	        "firstNameSending":"Jonas",
	        "lastNameSending":"Jonaitis",
	        "firstNameReceiving":"Ona",
	        "lastNameReceiving":"Onaite",
	        "money":1000
        }
    ```


Data can be sent using "Insomnia" app in the body section using JSON format.

## 🎅 Authors

Vitalijus: [Github](https://github.com/vitalijuss)
