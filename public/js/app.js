//Nav
const nav = document.getElementById('nav');

//nav buttons
const createEmployee = document.getElementById('create');
const searchEmployee = document.getElementById('search');

//close search model 
const closeCreateModel = document.getElementById('close');
const closeSearchModel = document.getElementById('closeSearchModel');

//tableData
const employeeData = document.getElementById('employeeData');

//table button bin
const deleteEmployee = document.querySelectorAll('.deleteEmployee');

//I wanted table rows to alternate on color to stand out :P
const color = document.querySelector('.color').children;


for(let i = 0; i < color.length; i++ ) {
    if(i % 2 === 0) {
    //console.log(color[i])
    color[i].style.backgroundColor = '#2b9fdd';
    color[i].style.color = 'white';

    //wanted all the bins to be black this works
    color[i].children[4].style.color = 'black';
    
    } else {
        color[i].style.backgroundColor = '#d0d0fa';
    }
    
};


//is when a user is deleted created or updated I want page to reload so the data shows without the user having to refresh themselves
function refreshPage(){
    window.location.reload(true);
}




//models that appear after either nav button click
const searchbox = document.getElementById('searchbox');
const createBox = document.getElementById('createbox');

searchEmployee.addEventListener('click', () => {
   searchbox.style.display = 'block';
   employeeData.style.opacity = '0.2';
   nav.style.opacity = '0.2';
});




createEmployee.addEventListener('click', () => {
    createBox.style.display = 'block';
    employeeData.style.opacity = '0.2';
    nav.style.opacity = '0.2';
});


//search for one employee by full name
//if search was a success this container will appear
const employeeFound = document.getElementById('employee-found-wrap');



const nameFound = document.getElementById('nameFound');
const emailFound = document.getElementById('emailFound');
const departmentFound = document.getElementById('departmentFound');
const locationFound = document.getElementById('locationFound');

//btn
const edit = document.getElementById('edit');

const editName = document.getElementById('editName');
const editEmail = document.getElementById('editEmail');
const editDepartment= document.getElementById('editDepartment');
const editLocation = document.getElementById('editLocation');

const submitUpdate = document.getElementById('submitUpdate');



  //input value to attempt to match a name from the database;
  let singleEmployee = document.getElementById('singleEmployee')
//when user clicks search in search model this will fire
const findEmployee = document.getElementById('findEmployee');
findEmployee.addEventListener('click', () => {
    
  
    //employee manager
    fetch(`http://localhost:3001/employees/${singleEmployee.value}`, {
        method: "GET",
        headers: {
        'Content-type': 'application/json'
        }
        
    }).then(res => {
        if(res.status === 200){
        
            return res.json();
        } 

    }).then(function(data) {
        
        nameFound.style.display = 'inline-block';
        emailFound.style.display = 'inline-block';
        departmentFound.style.display = 'inline-block';
        locationFound.style.display = 'inline-block';

        editName.style.display ='none';
        editEmail.style.display ='none';
        editDepartment.style.display ='none';
        editLocation.style.display ='none';

        nameFound.innerText = data[0][0];
        emailFound.innerText = data[0][1];
        departmentFound.innerText = data[0][2];
        locationFound.innerText = data[0][3];

        employeeFound.style.display = 'block';
        edit.style.display = 'block';
        submitUpdate.style.display = 'none';
        
    //need to send a user not found on those credientials
    }).catch((error) => {
       alert('Employee not on Database')
    });
    
    //erase input value after search is done 
    singleEmployee.value = ''

})

edit.addEventListener('click', () =>  {
    
    nameFound.style.display = 'none';
    emailFound.style.display = 'none';
    departmentFound.style.display = 'none';
    locationFound.style.display = 'none';
    edit.style.display = 'none';
   
    editName.style.display = 'block';
    editEmail.style.display =  'block'; 
    editDepartment.style.display = 'block';
    editLocation.style.display = 'block';

    editName.placeholder = nameFound.innerText;
    editEmail.placeholder = emailFound.innerText;
    editDepartment.placeholder = departmentFound.innerText;
    editLocation.placeholder = locationFound.innerText; 

    submitUpdate.style.display = 'block';
    
});

submitUpdate.addEventListener('click', () => {
    
    const editNameSent = editName.value === '' ? editName.placeholder : editName.value;
    const editEmailSent = editEmail.value === '' ? editEmail.placeholder : editEmail.value;
    const editDepartmentSent = editDepartment.value === '' ? editDepartment.placeholder : editDepartment.value;
    const editLocationSent = editLocation.value === '' ? editLocation.placeholder : editLocation.value;
    
    
    fetch(`http://localhost:3001/updateEmployee`, {
        method: "PUT",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            originalName: editName.placeholder,
            name: editNameSent,
            email: editEmailSent,
            department: editDepartmentSent,
            location: editLocationSent
        })
    }).then(res => {
          if(res.ok) {

            refreshPage(); 
          }
    })

})

//closes search model top right button
closeSearchModel.addEventListener('click', () => {
    
    findEmployee.style.display = 'inline-block';
    singleEmployee.style.display = 'inline-block';

    nameFound.style.display = 'inline-block';
    emailFound.style.display = 'inline-block';
    departmentFound.style.display = 'inline-block';
    locationFound.style.display = 'inline-block';

    searchbox.style.display = 'none';
    employeeFound.style.display = 'none';
    edit.style.display = 'none';

    employeeData.style.opacity = '1';
    nav.style.opacity = '1';
   
});

//when user clicks add button in create model this will fire
const created = document.getElementById('created');
created.addEventListener('click', () => {
   
   //These four vars will be what I post over to create a new employee
   const name = document.getElementById('name').value;
   const email = document.getElementById('email').value;
   const department = document.getElementById('department').value;
   const location = document.getElementById('location').value;
   
   //basic form error handling, I have another project that dives deeper, this project is aimed at rest :)
   const nameError = document.getElementById('nameError');
   const emailError = document.getElementById('emailError');
   const departmentError = document.getElementById('departmentError');
   const locationError = document.getElementById('locationError');
   if(name === '') {
    
    nameError.style.display='block';
    
   } 

   else if(!email.includes('@') && !email.includes('.')) {

     emailError.style.display = 'block';

   }

   else if(department === '') {
    
    departmentError.style.display='block';
    
   } 

   else if(location === '') {
    
    locationError.style.display='block';
    
   } else {
  
   fetch('http://localhost:3001/addEmployee', {
    method: "POST",
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(
        { name: name,
          email, email,
          department: department,   
          location: location }
    )
   }).then(res => {
    if(res.status === 201){
        refreshPage();
    }
   });
}
});


//closes the create model top right button 
closeCreateModel.addEventListener('click',  () => {
    createBox.style.display = 'none';
    employeeData.style.opacity = '1';
    nav.style.opacity = '1';
})

//when user clicks bin this will delete the employee they chosoe
deleteEmployee.forEach(element => {
    element.addEventListener('click', () => {
         
        //condition is for when either search or create model is on screen button will not fire, it fires when models have not popped up
        if(createBox.style.display !== 'block' && searchbox.style.display !== 'block'){
       
            fetch(`http://localhost:3001/deleteEmployee/${element.id}`, {
                method: "DELETE",
                headers: {
                   'Content-type': 'application/json'
                }
                }).then(res => {
                
                    if(res.status === 200){
              
                        refreshPage();
            }
                
        });
   

       } 
   
    


    })
    
})


