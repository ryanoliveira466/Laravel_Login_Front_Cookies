const apiUrl = 'http://127.0.0.1:8000/api'; // adjust if needed

document.addEventListener('DOMContentLoaded', async function () {

  // Login
  if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async function (e) {
      e.preventDefault();


      if (document.getElementById('email').value !== document.getElementById('email').value.trim().replace(/\s+/g, "")) {
        alert('Email must not contain spaces')
        return;
      }

      if (document.getElementById('password').value !== document.getElementById('password').value.trim().replace(/\s+/g, "")) {
        alert('Password must not contain spaces')
        return;
      }

      const email = document.getElementById('email').value.trim().replace(/\s+/g, "").toLowerCase();
      const password = document.getElementById('password').value.trim().replace(/\s+/g, "");

      await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
        credentials: 'include'
      });
      const csrfToken = decodeURIComponent(getCookie('XSRF-TOKEN'));



      try {
        const response = await fetch(`http://127.0.0.1:8000/login`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-XSRF-TOKEN': csrfToken, },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
          alert('Logged in successfully: ' + data.message);
          document.getElementById('message').innerText = data.message;
          window.location.href = 'home.html';
        } else {
          alert('Logging in failed: ' + data.message);
          alert('Logging in failed: ' + data.error);
          document.getElementById('message').innerText = `${data.message}: ${data.error}` || 'An unknown error occurred';
        }
      } catch (error) {
        alert('Logging in failed: ' + error.message);
        document.getElementById('message').innerText = error.message || 'An unknown error occurred';
      }


    });
  }

  // Logout
  if (document.getElementById('logoutButton')) {
    document.getElementById('logoutButton').addEventListener('click', async function (e) {
      if (confirm('Are you sure?')) {

        await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
          credentials: 'include'
        });
        const xsrf = decodeURIComponent(getCookie('XSRF-TOKEN'));

        try {
          const response = await fetch('http://127.0.0.1:8000/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'X-XSRF-TOKEN': xsrf,
              'Accept': 'application/json'
            }
          });

          const data = await response.json();

          if (response.ok) {
            alert('Logging out successfully: ' + data.message);
            document.getElementById('message').innerText = `${data.message}` || 'An unknown error occurred';
            location.reload();
          } else {
            alert('Logging out failed: ' + data.message);
            alert('Logging out failed: ' + data.error);
            document.getElementById('message').innerText = `${data.message}: ${data.error}` || 'An unknown error occurred';
          }
        } catch (error) {
          alert('Logging out failed: ' + error.message);
          document.getElementById('message').innerText = error.message || 'An unknown error occurred';
        }
      }
    });
  }

  // Register
  if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', async function (e) {
      e.preventDefault();


      if (document.getElementById('name').value !== document.getElementById('name').value.trim()) {
        alert('Name must not contain leading or trailing spaces')
        return;
      }

      if (document.getElementById('email').value !== document.getElementById('email').value.trim().replace(/\s+/g, "")) {
        alert('Email must not contain spaces')
        return;
      }

      if (document.getElementById('password').value !== document.getElementById('password').value.trim().replace(/\s+/g, "")) {
        alert('Password must not contain spaces')
        return;
      }

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim().replace(/\s+/g, "").toLowerCase();
      const password = document.getElementById('password').value.trim().replace(/\s+/g, "");


      await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
        credentials: 'include'
      });
      const csrfToken = decodeURIComponent(getCookie('XSRF-TOKEN'));


      try {
        const response = await fetch(`${apiUrl}/register`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-XSRF-TOKEN': csrfToken, },
          body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
          alert('Registration successful: ' + data.message);
          alert('Please check your email and verify your account');
          window.location.href = 'home.html';
        } else {
          alert('Registering failed: ' + data.message);
          alert('Registering failed: ' + data.error);
          document.getElementById('message').innerText = `${data.message}: ${data.error}` || 'An unknown error occurred';
        }
      } catch (error) {
        alert('Registering failed: ' + error.message);
        document.getElementById('message').innerText = error.message || 'An unknown error occurred';
      }


    });
  }

  //Search users
  if (document.getElementById('users')) {
    let arrayUsers = []
    getAllUsers()


    async function getAllUsers() {
      try {
        const response = await fetch(`${apiUrl}/users/public`, {
          credentials: 'include',        // ← send the session cookie
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', }
        });

        const data = await response.json();

        if (response.ok) {
          alert('Getting all users successfully: ' + data.message);
          document.getElementById('message').innerText = data.message;

          data.users.forEach(element => {
            arrayUsers.push(element)
          });

        } else {
          alert('Getting all users failed: ' + data.message);
          alert('Getting all users failed: ' + data.error);
          document.getElementById('message').innerText = `${data.message}: ${data.error}` || 'An unknown error occurred';
        }
      } catch (error) {
        alert('Getting all users failed: ' + error.message);
        document.getElementById('message').innerText = error.message || 'An unknown error occurred';
      }
    }



    //Input
    if (document.getElementById('searchUsersInput')) {

      document.getElementById('searchUsersInput').addEventListener('input', function () {
        let userTable = document.getElementById('users')
        userTable.innerHTML = ''
        let input = document.getElementById('searchUsersInput').value

        for (let i = 0; i < arrayUsers.length; i++) {
          let userName = arrayUsers[i].name;
          let userEmail = arrayUsers[i].email;
          let userSlug = arrayUsers[i].slug

          if (userName.trim().toLocaleLowerCase().includes(input.trim().toLocaleLowerCase()) || userEmail.trim().toLocaleLowerCase().includes(input.trim().toLocaleLowerCase())) {

            userTable.innerHTML += `
            <div style="margin: 0.5rem; display: flex; flex-direction: column;border: 1px solid black;">
              <p>${userName}</p>
              <p>${userEmail}</p>
              <a href="member.html?slug=${userSlug}" target="_blank" style="color: blue; text-decoration: underline;">
                Link para ${userName}
              </a>
            </div>
          `;

          }

        }
      })
    }
  }

  // Profile
  if (document.getElementById('profileForm')) {

    loadProfile()

    //Load and update profile
    document.getElementById('profileForm').addEventListener('submit', async function (e) {
      e.preventDefault();


      if (document.getElementById('name').value !== document.getElementById('name').value.trim()) {
        alert('Name must not contain leading or trailing spaces')
        return;
      }

      if (document.getElementById('email').value !== document.getElementById('email').value.trim().replace(/\s+/g, "")) {
        alert('Email must not contain spaces')
        return;
      }

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim().replace(/\s+/g, "").toLowerCase();

      await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
        credentials: 'include'
      });
      const csrfToken = decodeURIComponent(getCookie('XSRF-TOKEN'));

      try {
        const response = await fetch(`${apiUrl}/user/update`, {
          method: 'POST',
          credentials: 'include',        // ← send the session cookie
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-XSRF-TOKEN': csrfToken
          },
          body: JSON.stringify({ name, email })
        });

        const data = await response.json();

        if (response.ok) {
          alert('Updating successfully: ' + data.message);
          alert('If you changed your email, please consider validating the new email!');
        } else {
          alert('Updating failed: ' + data.message);
          alert('Updating failed: ' + data.error);
          document.getElementById('message').innerText = `${data.message}: ${data.error}` || 'An unknown error occurred';
        }
      } catch (error) {
        alert('Updating failed: ' + error.message);
        document.getElementById('message').innerText = error.message || 'An unknown error occurred';
      }


    });




    //Password
    document.getElementById('changePasswordForm').addEventListener('submit', async function (e) {
      e.preventDefault();


      if (document.getElementById('current_password').value !== document.getElementById('current_password').value.trim().replace(/\s+/g, "")) {
        alert('Password must not contain spaces')
        return;
      }

      if (document.getElementById('new_password').value !== document.getElementById('new_password').value.trim().replace(/\s+/g, "")) {
        alert('Password must not contain spaces')
        return;
      }

      if (document.getElementById('new_password_confirmation').value !== document.getElementById('new_password_confirmation').value.trim().replace(/\s+/g, "")) {
        alert('Password must not contain spaces')
        return;
      }


      const current_password = document.getElementById('current_password').value.trim().replace(/\s+/g, "");
      const new_password = document.getElementById('new_password').value.trim().replace(/\s+/g, "");
      const new_password_confirmation = document.getElementById('new_password_confirmation').value.trim().replace(/\s+/g, "");


      await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
        credentials: 'include'
      });
      const csrfToken = decodeURIComponent(getCookie('XSRF-TOKEN'));

      try {
        const response = await fetch(`${apiUrl}/user/change-password`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-XSRF-TOKEN': csrfToken
          },
          body: JSON.stringify({ current_password, new_password, new_password_confirmation })
        });

        const data = await response.json();

        if (response.ok) {
          alert('Password changed successfully: ' + data.message);
          document.getElementById('message').innerText = data.message || 'Something went wrong';
        }
        else {
          alert('Changing password failed: ' + data.message);
          alert('Changing password failed: ' + data.error);
          document.getElementById('message').innerText = `${data.message}: ${data.error}` || 'An unknown error occurred';
        }
      } catch (error) {
        alert('Resetting password failed: ' + error.message);
        document.getElementById('message').innerText = error.message || 'An unknown error occurred';
      }


    });




    //Upload Content
    document.getElementById('uploadContent').addEventListener('submit', async function (e) {
      e.preventDefault()


      if (document.getElementById('nameProject').value.trim() == "") {
        alert('Name must not be blank')
        return;
      }

      if (document.getElementById('description').value.trim() == "") {
        alert('Description must not be blank')
        return;
      }

      if (document.getElementById('javascript').value.trim() == "") {
        alert('Javascript must not be blank')
        return;
      }

      if (document.getElementById('css').value.trim() == "") {
        alert('CSS must not be blank')
        return;
      }

      if (document.getElementById('html').value.trim() == "") {
        alert('HTML must not be blank')
        return;
      }

      const name = document.getElementById('nameProject').value
      const description = document.getElementById('description').value
      const javascript = document.getElementById('javascript').value
      const css = document.getElementById('css').value
      const html = document.getElementById('html').value


      await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
        credentials: 'include'
      });
      const csrfToken = decodeURIComponent(getCookie('XSRF-TOKEN'));

      try {
        const response = await fetch(`${apiUrl}/user/post-content`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-XSRF-TOKEN': csrfToken
          },
          body: JSON.stringify({ name, description, javascript, css, html })
        });

        const data = await response.json();

        if (response.ok) {
          alert('Post created successfully ' + data.message);
          document.getElementById('message').innerText = data.message || 'Something went wrong';
        }
        else {
          alert('Posting failed: ' + data.message);
          alert('Posting failed: ' + data.error);
          document.getElementById('message').innerText = `${data.message}: ${data.error}` || 'An unknown error occurred';
        }
      } catch (error) {
        alert('Posting failed: ' + error.message);
        document.getElementById('message').innerText = error.message || 'An unknown error occurred';
      }


    })




    //Load projects profile
    if (document.getElementById('projectsProfile')) {
      let arrayMyProjects = []
      let slugUser = ""
      getAllUserProjects()
  
  
      async function getAllUserProjects() {
        await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
          credentials: 'include'
        });
        const csrfToken = decodeURIComponent(getCookie('XSRF-TOKEN'));

        try {
          
          const response = await fetch(`${apiUrl}/user/myProjects`, {
            credentials: 'include',        // ← send the session cookie
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json','X-XSRF-TOKEN': csrfToken }
          });
  
          const data = await response.json();
  
          if (response.ok) {
            alert('Getting all projects from user successfully: ' + data.message);
            document.getElementById('message').innerText = data.message;
            data.projects.forEach(element => {
              arrayMyProjects.push(element)
            });
            slugUser = data.userSlug
            displayProjects()  
          } else {
            alert('Getting all projects from user failed: ' + data.message);
            alert('Getting all projects from user failed: ' + data.error);
            document.getElementById('message').innerText = `${data.message}: ${data.error}` || 'An unknown error occurred';
          }
        } catch (error) {
          alert('Getting all projects from user failed: ' + error.message);
          document.getElementById('message').innerText = error.message || 'An unknown error occurred';
        }
      }
  
  
  
      // //Display projects profile
       function displayProjects() {
         if (document.getElementById('projectsProfile')) {
           let projectsTable = document.getElementById('projectsProfile')
        
           for (let i = 0; i < arrayMyProjects.length; i++) {
             projectsTable.innerHTML += `
                     <div style="margin: 0.5rem; display: flex; flex-direction: column;border: 1px solid black;">
                       <p>${arrayMyProjects[i].name}</p>
                       <p>${arrayMyProjects[i].description}</p>
                       <p>${arrayMyProjects[i].javascript}</p>
                       <p>${arrayMyProjects[i].css}</p>
                       <p>${arrayMyProjects[i].html}</p>
                       <a href="project.html?slug=${slugUser}&projectSlug=${arrayMyProjects[i].slug}" target="_blank" style="color: blue; text-decoration: underline;">
                         Link para projeto ${arrayMyProjects[i].name}
                       </a>
                     </div>
                   `;
           }
    
         }
       }
   
    }





  }


















  //Member public profile
  if (document.getElementById('userProfileMember')) {
    try {
      const slug = new URLSearchParams(window.location.search).get('slug');
      const response = await fetch(`http://127.0.0.1:8000/api/user/slug/${slug}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        alert('Member listed successfully: ' + data.message);
        document.getElementById('message').innerText = `${data.message}` || 'An unknown error occurred';
        document.getElementById('name').innerText = `${data.user.name}`;
        document.getElementById('email').innerText = `${data.user.email}`;
      } else {
        alert('Listeninig member failed: ' + data.message);
        alert('Listeninig member failed: ' + data.error);
        document.getElementById('message').innerText = `${data.message}: ${data.error}` || 'An unknown error occurred';
      }
    } catch (error) {
      alert('Listeninig member failed: ' + error.message);
      document.getElementById('message').innerText = error.message || 'An unknown error occurred';
    }


  }


  //Member public posts
  if (document.getElementById('projects')) {
    let arrayUserProjects = []
    getAllUserProjects()


    async function getAllUserProjects() {
      try {
        const slug = new URLSearchParams(window.location.search).get('slug');
        const response = await fetch(`${apiUrl}/projects/user/${slug}`, {
          credentials: 'include',        // ← send the session cookie
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', }
        });

        const data = await response.json();

        if (response.ok) {
          alert('Getting all projects from user successfully: ' + data.message);
          document.getElementById('message').innerText = data.message;
          data.projects.forEach(element => {
            arrayUserProjects.push(element)
          });
          displayProjects()
        } else {
          alert('Getting all projects from user failed: ' + data.message);
          alert('Getting all projects from user failed: ' + data.error);
          document.getElementById('message').innerText = `${data.message}: ${data.error}` || 'An unknown error occurred';
        }
      } catch (error) {
        alert('Getting all projects from user failed: ' + error.message);
        document.getElementById('message').innerText = error.message || 'An unknown error occurred';
      }
    }



    //Display projects
    function displayProjects() {
      if (document.getElementById('projects')) {
        const slugUser = new URLSearchParams(window.location.search).get('slug');
        let projectsTable = document.getElementById('projects')
      
        for (let i = 0; i < arrayUserProjects.length; i++) {
          projectsTable.innerHTML += `
                  <div style="margin: 0.5rem; display: flex; flex-direction: column;border: 1px solid black;">
                    <p>${arrayUserProjects[i].name}</p>
                    <p>${arrayUserProjects[i].description}</p>
                    <p>${arrayUserProjects[i].javascript}</p>
                    <p>${arrayUserProjects[i].css}</p>
                    <p>${arrayUserProjects[i].html}</p>
                    <a href="project.html?slug=${slugUser}&projectSlug=${arrayUserProjects[i].slug}" target="_blank" style="color: blue; text-decoration: underline;">
                      Link para projeto ${arrayUserProjects[i].name}
                    </a>
                  </div>
                `;
        }
  
      }
    }
 
  }


  //Main page for project public
  if (document.getElementById('projectMain')) {
    
    
    try {
      const userSlug = new URLSearchParams(window.location.search).get('slug');
      const projectSlug = new URLSearchParams(window.location.search).get('projectSlug');
      const response = await fetch(`http://127.0.0.1:8000/api/project/slug/${userSlug}/${projectSlug}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        alert('Post main listed successfully: ' + data.message);
        document.getElementById('message').innerText = `${data.message}` || 'An unknown error occurred';
        document.getElementById('name').innerText = `${data.project.name}`;
        document.getElementById('description').innerText = `${data.project.description}`;
        document.getElementById('javascript').innerText = `${data.project.javascript}`;
        document.getElementById('css').innerText = `${data.project.css}`;
        document.getElementById('html').innerText = `${data.project.html}`;
      } else {
        alert('Listening post main failed: ' + data.message);
        alert('Listening post main failed: ' + data.error);
        document.getElementById('message').innerText = `${data.message}: ${data.error}` || 'An unknown error occurred';
      }
    } catch (error) {
      alert('Listening post main failed: ' + error.message);
      document.getElementById('message').innerText = error.message || 'An unknown error occurred';
    }
  }




});


















//Utilites
// Load profile info
async function loadProfile() {

  try {
    const response = await fetch(`${apiUrl}/user/my`, {
      credentials: 'include',        // ← send the session cookie
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', }
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById('name').value = data.user.name;
      document.getElementById('email').value = data.user.email;
    } else {
      alert('Failed to load profile');
    }
  } catch (error) {
    console.error(error);
    alert('Error loading profile');
  }
}

//getCookie
function getCookie(name) {
  const match = document.cookie.match(
    new RegExp('(^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)')
  );
  return match ? match[2] : '';
}
