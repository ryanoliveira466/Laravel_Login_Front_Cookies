import { EditorState } from "https://esm.sh/@codemirror/state";
import { EditorView, basicSetup } from "https://esm.sh/codemirror";
import { javascript } from "https://esm.sh/@codemirror/lang-javascript";
import { css } from "https://esm.sh/@codemirror/lang-css";
import { html } from "https://esm.sh/@codemirror/lang-html";
import { markdown } from "https://esm.sh/@codemirror/lang-markdown";
import { oneDark } from "https://esm.sh/@codemirror/theme-one-dark";




const apiUrl = 'http://127.0.0.1:8000/api'; // adjust if needed
const serverStorage = 'http://127.0.0.1:8000/storage/'

document.addEventListener('DOMContentLoaded', async function () {


  //Home
  if (document.getElementById('home')) {

    //Search users
    if (document.getElementById('users')) {
      let arrayUsers = []
      let arrayProjects = []
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

      async function getAllProjects() {
        try {
          const response = await fetch(`${apiUrl}/projects/public`, {
            credentials: 'include',        // ← send the session cookie
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', }
          });

          const data = await response.json();

          if (response.ok) {
            alert('Getting all projects successfully: ' + data.message);
            document.getElementById('message').innerText = data.message;

            data.posts.forEach(element => {
              arrayProjects.push(element)
            });

          } else {
            alert('Getting all posts failed: ' + data.message);
            alert('Getting all posts failed: ' + data.error);
            document.getElementById('message').innerText = `${data.message}: ${data.error}` || 'An unknown error occurred';
          }
        } catch (error) {
          alert('Getting all posts failed: ' + error.message);
          document.getElementById('message').innerText = error.message || 'An unknown error occurred';
        }
      }

      //Input
      if (document.getElementById('searchUsersInput')) {

        document.getElementById('searchUsersInput').addEventListener('input', function () {
          let userTable = document.getElementById('users')
          let input = document.getElementById('searchUsersInput').value
          userTable.innerHTML = ''

          if (input.trim() == "") {
            userTable.innerHTML = ""
            return;
          }

          for (let i = 0; i < arrayUsers.length; i++) {
            let userName = arrayUsers[i].name;
            let userEmail = arrayUsers[i].email;
            let userSlug = arrayUsers[i].slug
            let userPhoto = arrayUsers[i].photo

            if (userName.trim().toLocaleLowerCase().includes(input.trim().toLocaleLowerCase()) || userEmail.trim().toLocaleLowerCase().includes(input.trim().toLocaleLowerCase())) {

              userTable.innerHTML += `
              <div style="
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 1rem;
                border: 1px solid #ddd;
                border-radius: 8px;
                box-shadow: 0 2px 5px rgba(0,0,0,0.1);
                margin: 0.5rem 0;
                background-color: #fff;
                transition: transform 0.2s ease, box-shadow 0.2s ease;
              " >
            
                <img src="${serverStorage}${userPhoto}" alt="${userName}" style="
                  width: 100px;
                  height: 100px;
                  border-radius: 50%;
                  object-fit: cover;
                  border: 2px solid #ccc;
                " />
            
                <div style="flex: 1;">
                  <a href="member.html?slug=${userSlug}" style="margin: 0; font-weight: bold; font-size: 1rem; color: black; text-decoration: none;">${userName}</a>
                  <p style="margin: 0.25rem 0; color: #666; font-size: 0.9rem;">${userEmail}</p>
                </div>
            
              </div>
            `;


            }

          }

        })
      }

    }

    //Search projects
    if (document.getElementById('users')) {
      let arrayProjects = []
      getAllProjects()

      async function getAllProjects() {
        try {
          const response = await fetch(`${apiUrl}/projects/public`, {
            credentials: 'include',        // ← send the session cookie
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', }
          });

          const data = await response.json();

          if (response.ok) {
            alert('Getting all projects successfully: ' + data.message);
            document.getElementById('message').innerText = data.message;

            data.posts.forEach(element => {
              arrayProjects.push(element)
            });

          } else {
            alert('Getting all posts failed: ' + data.message);
            alert('Getting all posts failed: ' + data.error);
            document.getElementById('message').innerText = `${data.message}: ${data.error}` || 'An unknown error occurred';
          }
        } catch (error) {
          alert('Getting all posts failed: ' + error.message);
          document.getElementById('message').innerText = error.message || 'An unknown error occurred';
        }
      }

      //Input
      if (document.getElementById('searchProjectsInput')) {

        document.getElementById('searchProjectsInput').addEventListener('input', function () {
          let projectsTable = document.getElementById('projects')
          let input = document.getElementById('searchProjectsInput').value
          projectsTable.innerHTML = ''

          if (input.trim() == "") {
            projectsTable.innerHTML = ""
            return;
          }

          for (let i = 0; i < arrayProjects.length; i++) {
            let projectName = arrayProjects[i].name;
            let projectDescription = arrayProjects[i].description;
            let projectSlug = arrayProjects[i].slug
            let projectPhoto = arrayProjects[i].photo

            let userName = arrayProjects[i].user.name;
            let userEmail = arrayProjects[i].user.email;
            let userSlug = arrayProjects[i].user.slug
            let userPhoto = arrayProjects[i].user.photo

            const imageId = `image-cover-${userSlug}-${projectSlug}`;
            const wrapperId = `image-wrapper-${userSlug}-${projectSlug}`;
            const wrapperFullScreenId = `image-wrapper-fullscreen${userSlug}-${projectSlug}`;


            if (userName.trim().toLocaleLowerCase().includes(input.trim().toLocaleLowerCase()) || userEmail.trim().toLocaleLowerCase().includes(input.trim().toLocaleLowerCase())) {

              projectsTable.insertAdjacentHTML("beforeend", `
            <div class="p-2 d-flex justify-content-center align-items-center text-center flex-column motherCard" style="height: auto; max-width: 600px; width: 90%; ">
            
        
              
         

           <div class="d-flex flex-column align-items-start text-start rounded w-100 h-auto m-1 bg-light p-3" style="">

             <div class="d-flex w-100 justify-content-center form-check form-switch mb-3">
              <input class="form-check-input" style="cursor: pointer;box-shadow: none;border: none;" type="checkbox" id="checkNativeSwitch-${userSlug}-${projectSlug}">
              </div>

           <div id="${wrapperId}" class="position-relative w-100 rounded" style="aspect-ratio: 16 / 9;">
                <a class="position-absolute w-100 h-100 z-2 transitionProjectLink projectLink rounded" style="cursor: pointer" href="project.html?slug=${userSlug}&projectSlug=${projectSlug}"></a>
                <img src="${serverStorage}${projectPhoto}" id="${imageId}" style="" class="w-100 h-100 object-fit-cover rounded" alt="">
              </div>


  <!-- Project Info Section -->
 
    <h3 style="white-space: pre-line; margin-left: 7px;" class="text-dark mt-4">${projectName}</h3>


<div class="bg-dark" id="markdownOverlay-${userSlug}-${projectSlug}" style="
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  color: #000;
  display: none;
  flex-direction: column;
  align-items: start;
  z-index: 9999;
  padding: 2rem;
  overflow-y: auto;
  box-sizing: border-box;
">
  <!-- Close button at top right -->
  <button id="closeDescription-${userSlug}-${projectSlug}" class="btn btn-danger mb-3" style="">
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
    </svg>
  </button>

  <!-- User Info -->
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; max-width: 1200px;" class="mt-auto ms-auto me-auto w-100">
        <img src="${serverStorage}${userPhoto}" alt="${userName}" style="
          width: 145px;
          height: 145px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ccc;
        " />
        <div>
          <a href="member.html?slug=${userSlug}" style="margin: 0; font-weight: bold; font-size: 0.95rem; color: white;text-decoration: none;">${userName}</a>
          <p style="margin: 0; color: white; font-size: 0.8rem;">${userEmail}</p>
        </div>
      </div>

  <!-- Container for content -->
  <div class="mb-auto ms-auto me-auto w-100" style="
    display: flex;
    flex-direction: row;
    gap: 2rem;
    flex-wrap: wrap;
    align-items: flex-start;
    max-width: 1200px;
  ">
  

    <!-- Iframe preview -->
    <div id="${wrapperFullScreenId}" style="
      flex: 1 1 500px;
      min-width: 300px;
      height: 500px;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
    "></div>

    <!-- Markdown content -->
    <div style="
      flex: 1 1 500px;
      min-width: 300px;
      background: transparent;
      border-radius: 10px;
      padding: 1rem;
      max-height: 500px;
      overflow-y: auto;
    " class="scrollbar-thin">
      <div id="markdown-content-${userSlug}-${projectSlug}" class="scrollbar-thin" style="font-size: 0.95rem; color: white;"></div>
    </div>

  </div>
</div>


    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
        <img src="${serverStorage}${userPhoto}" alt="${userName}" style="
          width: 65px;
          height: 65px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ccc;
        ">
        <div>
          <a href="member.html?slug=${userSlug}" style="margin: 0; font-weight: bold; font-size: 0.95rem; color: black;text-decoration: none;">${userName}</a>
          <p style="margin: 0; color: #9b9a9a; font-size: 0.8rem;">${userEmail}</p>
        </div>
      </div>

           <div class="d-flex text-center align-items-center w-100 bg-transparent mt-1 rounded">
                 <a class="btn btn-primary m-1" href="#" id="heartToggle-${userSlug}-${projectSlug}">
                    <svg id="heartIcon-${userSlug}-${projectSlug}" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                          fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                            <path
                             d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                      </svg>
                  </a>

                           <!-- Description Button -->
<button id="openDescription-${userSlug}-${projectSlug}" class="btn btn-success m-1">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
</svg>
</button>

                  <div class="d-flex me-2 ms-auto justify-content-center align-items-center flex-column">
                <button type="button" class="btn btn-secondary m-1" style="cursor: default;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
</svg>
              </button>
                    

                    <p class="text-dark m-0" id="numberOfViews-${userSlug}-${projectSlug}">0</p>
                  </div>
              </div>
 



</div>


            </div>
          `)


              const markdownEl = document.getElementById(`markdown-content-${userSlug}-${projectSlug}`);
              const rawHtml = marked.parse(projectDescription);
              const cleanHtml = DOMPurify.sanitize(rawHtml);
              markdownEl.innerHTML = cleanHtml;

              markdownEl.querySelectorAll('pre code').forEach(block => {
                hljs.highlightElement(block);
              });

              const wrapper = document.getElementById(wrapperId);
              const wrapperFullScreen = document.getElementById(wrapperFullScreenId);

              const iframe = document.createElement("iframe");
              const iframeFullscreen = document.createElement("iframe");

              iframe.className = "position-absolute top-0 start-0 w-100 h-100 border-0 rounded";
              iframe.style.display = "none"
              iframe.style.zIndex = "2";

              iframeFullscreen.className = "position-absolute top-0 start-0 w-100 h-100 border-0 rounded";
              iframeFullscreen.style.display = "none"
              iframeFullscreen.style.zIndex = "2";

              const hideScrollForWallPaper = `
    .scrollbar-none::-webkit-scrollbar {
      display: none;
    }
`
              const jsContent = arrayProjects[i].javascript;
              const cssContent = arrayProjects[i].css;
              const htmlContent = arrayProjects[i].html;

              const isModule = /\b(import|export)\b/.test(jsContent); // crude module detection,might fail if there is something like 
              // const = import, will add type module although not needed ut in most of cases will work
              const scriptTag = isModule
                ? `<script type="module">${jsContent}<\/script>`
                : `<script>${jsContent}<\/script>`;

              const fullHTML = `
            <html class="scrollbar-none">
              <head><style>${cssContent}</style><style>${hideScrollForWallPaper}</style></head>
              <body>
                ${htmlContent}
                ${scriptTag}
              </body>
            </html>
          `;


              iframe.srcdoc = fullHTML;
              iframeFullscreen.srcdoc = fullHTML;
              wrapper.appendChild(iframe);
              wrapperFullScreen.appendChild(iframeFullscreen);


              const checkbox = document.getElementById(`checkNativeSwitch-${userSlug}-${projectSlug}`);
              checkbox.addEventListener("change", function () {
                if (this.checked) {
                  this.disabled = true
                  wrapper.appendChild(iframe);
                  iframe.style.display = "flex"
                  document.getElementById(imageId).style.opacity = "0";
                  setTimeout(() => {
                    this.disabled = false
                  }, 10);
                } else {
                  this.disabled = true
                  wrapper.removeChild(iframe);
                  document.getElementById(imageId).style.opacity = "1";
                  setTimeout(() => {
                    this.disabled = false
                  }, 10);
                }
              });


              // Description overlay toggle logic
              const openDescriptionBtn = document.getElementById(`openDescription-${userSlug}-${projectSlug}`);
              const closeDescriptionBtn = document.getElementById(`closeDescription-${userSlug}-${projectSlug}`);
              const markdownOverlay = document.getElementById(`markdownOverlay-${userSlug}-${projectSlug}`);

              openDescriptionBtn.addEventListener('click', () => {
                markdownOverlay.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent background scroll
                wrapperFullScreen.appendChild(iframeFullscreen);
                iframeFullscreen.style.display = "flex"
              });

              closeDescriptionBtn.addEventListener('click', () => {
                markdownOverlay.style.display = 'none';
                document.body.style.overflow = ''; // Restore scroll
                wrapperFullScreen.removeChild(iframeFullscreen);
              });





              //Heart filled logic
              const heartToggle = document.getElementById(`heartToggle-${userSlug}-${projectSlug}`);
              const heartIcon = document.getElementById(`heartIcon-${userSlug}-${projectSlug}`);
              let isFilled = false;
              heartToggle.addEventListener('click', function (e) {
                e.preventDefault(); // Prevent navigation

                if (isFilled) {
                  heartIcon.setAttribute('class', 'bi bi-heart');
                  heartIcon.innerHTML = `
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
              `;
                } else {
                  heartIcon.setAttribute('class', 'bi bi-heart-fill');
                  heartIcon.innerHTML = `
                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
              `;
                }

                isFilled = !isFilled;
              });




            }

          }

        })
      }

    }


  }

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

      if (document.getElementById('preview').src == "") {
        alert('You must upload a photo')
        return;
      }

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim().replace(/\s+/g, "").toLowerCase();
      const photo = document.getElementById('preview').src

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
          body: JSON.stringify({ name, email, photo })
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


    //Photo
    if (document.getElementById('preview')) {
      const imageInput = document.getElementById('imageInput');
      const preview = document.getElementById('preview');
      imageInput.addEventListener('change', function () {
        const file = this.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            preview.src = e.target.result;
          };
          reader.readAsDataURL(file);
        } else {
          preview.src = '';
        }
      });
    }



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
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-XSRF-TOKEN': csrfToken }
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
                       <a href="project.html?slug=${slugUser}&projectSlug=${arrayMyProjects[i].slug}" style="color: blue; text-decoration: underline;">
                         Link para projeto ${arrayMyProjects[i].name}
                       </a>
                        <a href="edit.html?projectSlug=${arrayMyProjects[i].slug}" style="color: blue; text-decoration: underline;">
                         Link para editar projeto
                       </a>
                     </div>
                   `;
          }

        }
      }

    }


  }

  // Link to the page create inside page profile upload content
  if (document.getElementById('create')) {

    //Effects
    if (document.getElementById('create')) {

      // Update the preview iframe
      let activeIframe = 'iframeA';
      function updatePreview() {
        const jsContent = window.jsEditor.state.doc.toString();
        const cssContent = window.cssEditor.state.doc.toString();
        const htmlContent = window.htmlEditor.state.doc.toString();

        const useModule = document.getElementById('useModule')?.checked;
        const scriptTag = useModule
          ? `<script type="module">\n${jsContent}\n<\/script>`
          : `<script>\n${jsContent}\n<\/script>`;

        const fullHTML = `
           <html style="overflow: auto;">
               <head>
                   <style>${cssContent}</style>
               </head>
               <body>
                   ${htmlContent}
                   ${scriptTag}
               </body>
           </html>`;

        const nextIframe = activeIframe === 'iframeA' ? 'iframeB' : 'iframeA';
        const current = document.getElementById(activeIframe);
        const next = document.getElementById(nextIframe);


        next.srcdoc = fullHTML;


        next.onload = () => {
          current.style.display = 'none';
          next.style.display = 'block';
          activeIframe = nextIframe;
        };
      }

      //Markdown preview live
      const preview = document.getElementById('markdown-preview');

      function updatePreviewMD() {
        const markdownText = window.markdownEditor.state.doc.toString();
        const rawHtml = marked.parse(markdownText);
        preview.innerHTML = DOMPurify.sanitize(rawHtml);

        preview.querySelectorAll('pre code').forEach(block => {
          hljs.highlightElement(block);
        });
      }

      function insert(before, after) {
        const editor = window.markdownEditor;
        const { from, to } = editor.state.selection.main;
        const selectedText = editor.state.doc.sliceString(from, to);
        const newText = before + selectedText + after;

        editor.dispatch({
          changes: { from, to, insert: newText },
          selection: { anchor: from + newText.length }
        });

        editor.focus();
        updatePreviewMD();
      }

      function insertBlockCode() {
        insert('\n```\n', '\n```\n');
      }

      function insertImageTag() {
        insert('<img src="" class="img-fluid" />', '');
      }

      function insertTable() {
        const table = `\n| Column 1 | Column 2 |\n|----------|----------|\n| Row 1    | Value 1  |\n| Row 2    | Value 2  |\n`;
        insert(table, '');
      }

      window.insert = insert;
      window.insertBlockCode = insertBlockCode;
      window.insertImageTag = insertImageTag;
      window.insertTable = insertTable;

      //Markdown preview live


      document.getElementById('useModule').addEventListener('change', () => {
        updatePreview();
      });

      // JavaScript Editor
      window.jsEditor = new EditorView({
        state: EditorState.create({
          doc: `const mySplitText = new SplitText('body', {type:"chars", position: "relative" }); 
// gsap.to(mySplitText.chars, {fontWeight: 900, duration: 5})
setTimeout(() => {
  gsap.timeline({ yoyo: true, repeat: -1, repeatDelay: 0.5, delay: 1})
    .to(mySplitText.chars, { 
      duration: .2,
      fontWeight: 900, 
      color: '#146EF5', 
      scale:.7,
      y: 6,
      ease: 'power2.in',
      rotation: '360deg',
      stagger:{ 
        grid: [14,14], 
        amount: .8, 
        from: 'center',
      } 
    })
    .to(mySplitText.chars, { 
      duration: .4,
      fontWeight: 200,  
      color: '#fff',
      scale: 1,
      y: 0,
      rotation: '720deg',
      ease: 'power3.inOut',
      stagger:{ 
        grid: [14,14], 
        amount: .8, 
        from: 'center'
      } 
    }, '-=.3')
}, 500)`,
          extensions: [basicSetup, javascript(), oneDark]

        }),
        parent: document.getElementById("js-editor"),
        dispatch: (tr) => {
          jsEditor.update([tr]);
          if (tr.docChanged) updatePreview();
        }
      });

      // CSS Editor
      window.cssEditor = new EditorView({
        state: EditorState.create({
          doc: `@font-face {
  font-family: "LeagueSpartanVariable";
  src: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2101521/LeagueSpartanVariable.ttf");

  font-weight: 200 900;
}

@font-face {
	font-family: 'Anybody';
	src: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/61488/ETCAnybodyPB.woff2') format('woff2-variations');
	font-display: block;
	font-weight: 200 900;
	font-stretch: 10% 400%;
}

body {
  height: 100vh;
  width: 370px;
  left: 0;
  right: 0;
  margin: auto;
  background: #111;
  color: #fff;
  line-height: 15px;
  font-size: 30px;
  font-family: 'LeagueSpartanVariable', Courier, monospace;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  
}

div {
  width: 25px;
  height: 25px;
  text-align: center;
  // font-variation-settings: "wght" var(--wt);
  font-weight: 200;
}`,
          extensions: [basicSetup, css(), oneDark]
        }),
        parent: document.getElementById("css-editor"),
        dispatch: (tr) => {
          cssEditor.update([tr]);
          if (tr.docChanged) updatePreview();
        }
      });

      // HTML Editor
      window.htmlEditor = new EditorView({
        state: EditorState.create({
          doc: `GSAP &times;SPLITTEXTGSAP&times;SPLITTEXTGSAP&times;SPLITTEXTGSAP&times;SPLITTEXTGSAP&times;SPLITTEXTGSAP&times;SPLITTEXTGSAP&times;SPLITTEXTGSAP&times;SPLITTEXTGSAP&times;SPLITTEXTGSAP&times;SPLITTEXTGSAP&times;SPLITTEXTGSAP&times;SPLITTEXTGSAP&times;SPLITTEXT
        <script src='https://unpkg.com/gsap@3/dist/gsap.min.js'></script>
        <script src='https://unpkg.com/gsap@3/dist/SplitText.min.js'></script>`,
          extensions: [basicSetup, html(), oneDark]
        }),
        parent: document.getElementById("html-editor"),
        dispatch: (tr) => {
          htmlEditor.update([tr]);
          if (tr.docChanged) updatePreview();
        }
      });

      //Markdown Editor 
      window.markdownEditor = new EditorView({
        state: EditorState.create({
          doc: "# Hello Markdown\nWrite your *project description* here...",
          extensions: [basicSetup, markdown(), oneDark],
        }),
        parent: document.getElementById("projectDescription"),
        dispatch: (tr) => {
          markdownEditor.update([tr]);
          if (tr.docChanged) updatePreviewMD();
        }
      });



      //First time call
      updatePreview()

      // Initial preview
      updatePreviewMD();

      // Optional: make content accessible via buttons
      window.getText = function (editorId) {
        let editor;
        if (editorId === "js-editor") editor = jsEditor;
        else if (editorId === "css-editor") editor = cssEditor;
        else if (editorId === "html-editor") editor = htmlEditor;

        const content = editor.state.doc.toString();

        navigator.clipboard.writeText(content)
          .then(() => {
            showCopyPopup();
          })
          .catch(err => {
          });
      };

      //Expand
      const expandBtn = document.getElementById('expand');
      const frames = [document.getElementById('iframeA'), document.getElementById('iframeB')];

      let isExpanded = false;

      const expandIcon = `
 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
   <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707"/>
 </svg>`;
      const contractIcon = `
 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-contract" viewBox="0 0 16 16">
   <path fill-rule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707M15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707"/>
 </svg>`;
      expandBtn.addEventListener('click', function () {
        frames.forEach(frame => {
          if (!isExpanded) {
            // Expand view
            frame.classList.remove('top-50', 'h-50', 'w-100');
            frame.classList.add('vw-100', 'vh-100', 'pt-60', 'top-0', 'z-0');
          } else {
            // Collapse view (return to original state)
            frame.classList.remove('vw-100', 'vh-100', 'pt-60', 'top-0', 'z-0');
            frame.classList.add('top-50', 'h-50', 'w-100');
          }
        });

        // Toggle button icon
        expandBtn.innerHTML = isExpanded ? expandIcon : contractIcon;

        isExpanded = !isExpanded;
      });
      // frames.forEach(frame => {
      //   frame.addEventListener('mouseenter', () => {
      //     frame.classList.remove('top-50', 'h-50', 'w-100');
      //     frame.classList.add('vw-100', 'vh-100', 'pt-60', 'top-0', 'z-0');
      //     expandBtn.innerHTML = contractIcon;
      //     isExpanded = true
      //   });

      //   frame.addEventListener('mouseleave', () => {
      //     frame.classList.remove('vw-100', 'vh-100', 'pt-60', 'top-0', 'z-0');
      //     frame.classList.add('top-50', 'h-50', 'w-100');
      //     expandBtn.innerHTML = expandIcon;
      //     isExpanded = false
      //   });
      // });

      // About
      document.getElementById('aboutLink').addEventListener('click', function () {
        let about = document.getElementById('about')
        about.style.pointerEvents = 'all';
        about.style.opacity = 1
      })

      document.getElementById('closeAbout').addEventListener('click', function () {
        let about = document.getElementById('about')
        about.style.pointerEvents = 'none'
        about.style.opacity = 0
      })

      // Desc
      document.getElementById('descriptionLink').addEventListener('click', function () {
        let description = document.getElementById('description')
        description.style.pointerEvents = 'all';
        description.style.opacity = 1
      })

      document.getElementById('closeDescription').addEventListener('click', function () {
        let description = document.getElementById('description')
        description.style.pointerEvents = 'none'
        description.style.opacity = 0
      })

      // Photo
      document.getElementById('photoLink').addEventListener('click', function () {
        let photo = document.getElementById('photo')
        photo.style.pointerEvents = 'all';
        photo.style.opacity = 1
      })

      document.getElementById('closePhoto').addEventListener('click', function () {
        let photo = document.getElementById('photo')
        photo.style.pointerEvents = 'none'
        photo.style.opacity = 0
      })

      document.getElementById('formatter').addEventListener('click', function () {

        const jsContent = window.jsEditor.state.doc.toString();
        const cssContent = window.cssEditor.state.doc.toString();
        const htmlContent = window.htmlEditor.state.doc.toString();

        const formattedJS = js_beautify(jsContent, {
          indent_size: 2,
          space_in_empty_paren: true
        });

        const formattedCSS = css_beautify(cssContent, {
          indent: '  ',
          openbrace: 'end-of-line',
          autosemicolon: true,
        });

        const formattedHTML = html_beautify(htmlContent, {
          indent: '  ',
          openbrace: 'end-of-line',
          autosemicolon: true,
        });


        window.jsEditor.dispatch({
          changes: { from: 0, to: jsEditor.state.doc.length, insert: formattedJS }
        });

        window.cssEditor.dispatch({
          changes: { from: 0, to: cssEditor.state.doc.length, insert: formattedCSS, }
        });

        window.htmlEditor.dispatch({
          changes: { from: 0, to: htmlEditor.state.doc.length, insert: formattedHTML }
        });

        showFormattedPopup()
      })
    }

    showLoadingPopup()
    try {
      const response = await fetch(`${apiUrl}/user/my`, {
        credentials: 'include',        // ← send the session cookie
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', }
      });

      const data = await response.json();

      if (response.ok) {
        alert('Success loading profile');
        document.getElementById('nameUserProfile').textContent = data.user.name;
        document.getElementById('imageProfile').src = `${serverStorage}${data.user.photo}`
        document.getElementById('userLinkProfile').href = `member.html?slug=${data.user.slug}`

        document.querySelectorAll('.loading-placeholder').forEach(element => element.remove());
        document.getElementById('imageProfile').classList.remove('d-none')
      } else {
        showErrorPopup()
        alert('Failed to load profile');
      }
    } catch (error) {
      showErrorPopup()
      console.error(error);
      alert('Error loading profile');
    }
    finally {
      hideLoadingPopup()
    }

    //Submit updating
    document.getElementById('save').addEventListener('click', function () {
      convertVisibleComments();
      const titleContent = document.getElementById('projectName').value
      const descriptionContent = window.markdownEditor.state.doc.toString();
      const jsContent = window.jsEditor.state.doc.toString();
      const cssContent = window.cssEditor.state.doc.toString();
      const htmlContent = window.htmlEditor.state.doc.toString();
      const photo = document.getElementById('cover').src;


      if (titleContent.trim() === "") {
        showErrorPopup("😐 Title is empty!");
        return;
      }
      if (descriptionContent.trim() === "") {
        showErrorPopup("😐 Description is empty!");
        return;
      }
      if (jsContent.trim() === "") {
        showErrorPopup("😐 Javascript is empty!");
        return;
      }
      if (cssContent.trim() === "") {
        showErrorPopup("😐 CSS is empty!");
        return;
      }
      if (htmlContent.trim() === "") {
        showErrorPopup("😐 HTML is empty!");
        return;
      }
      if (photo.trim() === "" || photo.includes('default-cover-A7fK9x.jpg')) {
        showErrorPopup("😐 Photo is empty!");
        return;
      }

      document.getElementById('projectNameForm').value = titleContent
      document.getElementById('projectDescriptionForm').value = descriptionContent
      document.getElementById('javascriptForm').value = jsContent
      document.getElementById('cssForm').value = cssContent
      document.getElementById('htmlForm').value = htmlContent
      document.getElementById('photoForm').value = photo
      document.getElementById('submitForm').click()
    })

    document.getElementById('editForm').addEventListener('submit', async function (e) {
      e.preventDefault()

      if (document.getElementById('projectNameForm').value.trim() == "") {
        alert('Name must not be blank')
        return;
      }

      if (document.getElementById('projectDescriptionForm').value.trim() == "") {
        alert('Description must not be blank')
        return;
      }

      if (document.getElementById('javascriptForm').value.trim() == "") {
        alert('Javascript must not be blank')
        return;
      }

      if (document.getElementById('cssForm').value.trim() == "") {
        alert('CSS must not be blank')
        return;
      }

      if (document.getElementById('htmlForm').value.trim() == "") {
        alert('HTML must not be blank')
        return;
      }

      if (document.getElementById('cover').src.trim() == "") {
        alert('Photo must not be blank')
        return;
      }



      const name = document.getElementById('projectName').value
      const description = window.markdownEditor.state.doc.toString();
      const javascript = window.jsEditor.state.doc.toString();
      const css = window.cssEditor.state.doc.toString();
      const html = window.htmlEditor.state.doc.toString();
      const photo = document.getElementById('cover').src

      showLoadingPopup("⏳ Saving...")
      try {
        await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
          credentials: 'include'
        });
        const csrfToken = decodeURIComponent(getCookie('XSRF-TOKEN'));
        const projectSlug = new URLSearchParams(window.location.search).get('projectSlug');

        const response = await fetch(`${apiUrl}/user/post-content`, {
          method: 'POST',
          credentials: 'include',        // ← send the session cookie
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-XSRF-TOKEN': csrfToken },
          body: JSON.stringify({ name, description, javascript, css, html, photo })
        });

        const data = await response.json();


        if (response.ok) {
          alert('Creating project went successfully: ' + data.message);
          showSuccessPopup()
        } else {
          alert('Creating project from user failed: ' + data.message);
          alert('Creating project from user failed: ' + data.error);
          showErrorPopup()
        }
      } catch (error) {
        alert('Creating project from user failed: ' + error.message);
        showErrorPopup()
      }
      finally {
        hideLoadingPopup()
      }
    })
  }

  //Edit project
  if (document.getElementById('edit')) {

    //Effects
    if (document.getElementById('edit')) {
      // Update the preview iframe
      let activeIframe = 'iframeA';
      function updatePreview() {
        const jsContent = window.jsEditor.state.doc.toString();
        const cssContent = window.cssEditor.state.doc.toString();
        const htmlContent = window.htmlEditor.state.doc.toString();

        const useModule = document.getElementById('useModule')?.checked;
        const scriptTag = useModule
          ? `<script type="module">\n${jsContent}\n<\/script>`
          : `<script>\n${jsContent}\n<\/script>`;

        const fullHTML = `
           <html style="overflow: auto;">
               <head>
                   <style>${cssContent}</style>
               </head>
               <body>
                   ${htmlContent}
                   ${scriptTag}
               </body>
           </html>`;

        const nextIframe = activeIframe === 'iframeA' ? 'iframeB' : 'iframeA';
        const current = document.getElementById(activeIframe);
        const next = document.getElementById(nextIframe);


        next.srcdoc = fullHTML;


        next.onload = () => {
          current.style.display = 'none';
          next.style.display = 'block';
          activeIframe = nextIframe;
        };
      }

      document.getElementById('useModule').addEventListener('change', () => {
        updatePreview();
      });

      // JavaScript Editor
      window.jsEditor = new EditorView({
        state: EditorState.create({
          doc: ``,
          extensions: [basicSetup, javascript(), oneDark]

        }),
        parent: document.getElementById("js-editor"),
        dispatch: (tr) => {
          jsEditor.update([tr]);
          if (tr.docChanged) updatePreview();
        }
      });

      // CSS Editor
      window.cssEditor = new EditorView({
        state: EditorState.create({
          doc: ``,
          extensions: [basicSetup, css(), oneDark]
        }),
        parent: document.getElementById("css-editor"),
        dispatch: (tr) => {
          cssEditor.update([tr]);
          if (tr.docChanged) updatePreview();
        }
      });

      // HTML Editor
      window.htmlEditor = new EditorView({
        state: EditorState.create({
          doc: ``,
          extensions: [basicSetup, html(), oneDark]
        }),
        parent: document.getElementById("html-editor"),
        dispatch: (tr) => {
          htmlEditor.update([tr]);
          if (tr.docChanged) updatePreview();
        }
      });

      // Optional: make content accessible via buttons
      window.getText = function (editorId) {
        let editor;
        if (editorId === "js-editor") editor = jsEditor;
        else if (editorId === "css-editor") editor = cssEditor;
        else if (editorId === "html-editor") editor = htmlEditor;

        const content = editor.state.doc.toString();

        navigator.clipboard.writeText(content)
          .then(() => {
            showCopyPopup();
          })
          .catch(err => {
          });
      };

      //Expand
      const expandBtn = document.getElementById('expand');
      const frames = [document.getElementById('iframeA'), document.getElementById('iframeB')];

      let isExpanded = false;

      const expandIcon = `
 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
   <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707"/>
 </svg>`;
      const contractIcon = `
 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-contract" viewBox="0 0 16 16">
   <path fill-rule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707M15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707"/>
 </svg>`;
      expandBtn.addEventListener('click', function () {
        frames.forEach(frame => {
          if (!isExpanded) {
            // Expand view
            frame.classList.remove('top-50', 'h-50', 'w-100');
            frame.classList.add('vw-100', 'vh-100', 'pt-60', 'top-0', 'z-0');
          } else {
            // Collapse view (return to original state)
            frame.classList.remove('vw-100', 'vh-100', 'pt-60', 'top-0', 'z-0');
            frame.classList.add('top-50', 'h-50', 'w-100');
          }
        });

        // Toggle button icon
        expandBtn.innerHTML = isExpanded ? expandIcon : contractIcon;

        isExpanded = !isExpanded;
      });
      // frames.forEach(frame => {
      //   frame.addEventListener('mouseenter', () => {
      //     frame.classList.remove('top-50', 'h-50', 'w-100');
      //     frame.classList.add('vw-100', 'vh-100', 'pt-60', 'top-0', 'z-0');
      //     expandBtn.innerHTML = contractIcon;
      //     isExpanded = true
      //   });

      //   frame.addEventListener('mouseleave', () => {
      //     frame.classList.remove('vw-100', 'vh-100', 'pt-60', 'top-0', 'z-0');
      //     frame.classList.add('top-50', 'h-50', 'w-100');
      //     expandBtn.innerHTML = expandIcon;
      //     isExpanded = false
      //   });
      // });

      // About
      document.getElementById('aboutLink').addEventListener('click', function () {
        let about = document.getElementById('about')
        about.style.pointerEvents = 'all';
        about.style.opacity = 1
      })

      document.getElementById('closeAbout').addEventListener('click', function () {
        let about = document.getElementById('about')
        setTimeout(function () {
          about.style.pointerEvents = 'none'
        }, 1500);
        about.style.opacity = 0
      })

      // Desc
      document.getElementById('descriptionLink').addEventListener('click', function () {
        let description = document.getElementById('description')
        description.style.pointerEvents = 'all';
        description.style.opacity = 1
      })

      document.getElementById('closeDescription').addEventListener('click', function () {
        let description = document.getElementById('description')
        setTimeout(function () {
          description.style.pointerEvents = 'none'
        }, 1500);
        description.style.opacity = 0
      })

      // Photo
      document.getElementById('photoLink').addEventListener('click', function () {
        let photo = document.getElementById('photo')
        photo.style.pointerEvents = 'all';
        photo.style.opacity = 1
      })

      document.getElementById('closePhoto').addEventListener('click', function () {
        let photo = document.getElementById('photo')
        setTimeout(function () {
          photo.style.pointerEvents = 'none'
        }, 1500);
        photo.style.opacity = 0
      })

      document.getElementById('formatter').addEventListener('click', function () {

        const jsContent = window.jsEditor.state.doc.toString();
        const cssContent = window.cssEditor.state.doc.toString();
        const htmlContent = window.htmlEditor.state.doc.toString();

        const formattedJS = js_beautify(jsContent, {
          indent_size: 2,
          space_in_empty_paren: true
        });

        const formattedCSS = css_beautify(cssContent, {
          indent: '  ',
          openbrace: 'end-of-line',
          autosemicolon: true,
        });

        const formattedHTML = html_beautify(htmlContent, {
          indent: '  ',
          openbrace: 'end-of-line',
          autosemicolon: true,
        });


        window.jsEditor.dispatch({
          changes: { from: 0, to: jsEditor.state.doc.length, insert: formattedJS }
        });

        window.cssEditor.dispatch({
          changes: { from: 0, to: cssEditor.state.doc.length, insert: formattedCSS, }
        });

        window.htmlEditor.dispatch({
          changes: { from: 0, to: htmlEditor.state.doc.length, insert: formattedHTML }
        });

        showFormattedPopup()
      })
    }


    showLoadingPopup()
    try {
      await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
        credentials: 'include'
      });
      const csrfToken = decodeURIComponent(getCookie('XSRF-TOKEN'));
      const projectSlug = new URLSearchParams(window.location.search).get('projectSlug');

      const response = await fetch(`${apiUrl}/user/myProject/${projectSlug}`, {
        credentials: 'include',        // ← send the session cookie
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-XSRF-TOKEN': csrfToken }
      });

      const data = await response.json();

      if (response.ok) {
        alert('Getting project to edit from user successfully: ' + data.message);

        document.getElementById('projectName').value = `${data.project.name}`
        document.getElementById('projectDescription').value = `${data.project.description}`
        document.getElementById('nameUserProfile').innerText = `${data.userName}`
        document.getElementById('imageProfile').src = `${serverStorage}${data.userImage}`
        document.getElementById('userLinkProfile').href = `member.html?slug=${data.userSlug}`
        document.getElementById('cover').src = `${serverStorage}${data.project.photo}`

        document.querySelectorAll('.loading-placeholder').forEach(element => element.remove());
        document.getElementById('iframeA').classList.remove('d-none')
        document.getElementById('iframeB').classList.remove('d-none')
        document.getElementById('imageProfile').classList.remove('d-none')
        document.getElementById('cover').classList.remove('d-none')
        document.getElementById('projectName').ariaPlaceholder = "Enter project name"

        //No need for js_beautify, user formatted style on db
        // const formattedJS = js_beautify(data.project.javascript, {
        //   indent_size: 2,
        //   space_in_empty_paren: true
        // });

        // const formattedCSS = css_beautify(data.project.css, {
        //   indent: '  ',
        //   openbrace: 'end-of-line',
        //   autosemicolon: true,
        // });

        // const formattedHTML = html_beautify(data.project.html, {
        //   indent: '  ',
        //   openbrace: 'end-of-line',
        //   autosemicolon: true,
        // });


        window.jsEditor.dispatch({
          changes: { from: 0, to: jsEditor.state.doc.length, insert: data.project.javascript }
        });

        window.cssEditor.dispatch({
          changes: { from: 0, to: cssEditor.state.doc.length, insert: data.project.css, }
        });

        window.htmlEditor.dispatch({
          changes: { from: 0, to: htmlEditor.state.doc.length, insert: data.project.html }
        });


      } else {
        alert('Getting project to edit from user failed: ' + data.message);
        alert('Getting project to edit from user failed: ' + data.error);
        showErrorPopup()
      }
    } catch (error) {
      alert('Getting project to edit from user failed: ' + error.message);
      showErrorPopup()
    }
    finally {
      hideLoadingPopup()
    }

    //Submit updating

    document.getElementById('save').addEventListener('click', function () {

      convertVisibleComments();
      const titleContent = document.getElementById('projectName').value
      const descriptionContent = document.getElementById('projectDescription').value
      const jsContent = window.jsEditor.state.doc.toString();
      const cssContent = window.cssEditor.state.doc.toString();
      const htmlContent = window.htmlEditor.state.doc.toString();
      const photo = document.getElementById('cover').src.replace(serverStorage, "");

      console.log(photo);


      //Formatted as it is by user
      // console.log(jsContent);

      if (titleContent.trim() === "") {
        showErrorPopup("😐 Title is empty!");
        return;
      }
      if (descriptionContent.trim() === "") {
        showErrorPopup("😐 Description is empty!");
        return;
      }
      if (jsContent.trim() === "") {
        showErrorPopup("😐 Javascript is empty!");
        return;
      }
      if (cssContent.trim() === "") {
        showErrorPopup("😐 CSS is empty!");
        return;
      }
      if (htmlContent.trim() === "") {
        showErrorPopup("😐 HTML is empty!");
        return;
      }
      if (photo.trim() === "") {
        showErrorPopup("😐 Photo is empty!");
        return;
      }

      document.getElementById('projectNameForm').value = titleContent
      document.getElementById('projectDescriptionForm').value = descriptionContent
      document.getElementById('javascriptForm').value = (jsContent);
      document.getElementById('cssForm').value = cssContent
      document.getElementById('htmlForm').value = htmlContent
      document.getElementById('photoForm').value = photo


      //Not formatted as it is by user
      // console.log(document.getElementById('javascriptForm').value);


      document.getElementById('submitForm').click()
    })

    document.getElementById('editForm').addEventListener('submit', async function (e) {
      e.preventDefault()

      if (document.getElementById('projectNameForm').value.trim() == "") {
        alert('Name must not be blank')
        return;
      }

      if (document.getElementById('projectDescriptionForm').value.trim() == "") {
        alert('Description must not be blank')
        return;
      }

      if (document.getElementById('javascriptForm').value.trim() == "") {
        alert('Javascript must not be blank')
        return;
      }

      if (document.getElementById('cssForm').value.trim() == "") {
        alert('CSS must not be blank')
        return;
      }

      if (document.getElementById('htmlForm').value.trim() == "") {
        alert('HTML must not be blank')
        return;
      }

      if (document.getElementById('photoForm').value.trim() == "") {
        alert('HTML must not be blank')
        return;
      }





      const name = document.getElementById('projectName').value
      const description = document.getElementById('projectDescription').value
      const javascript = window.jsEditor.state.doc.toString();
      const css = window.cssEditor.state.doc.toString();
      const html = window.htmlEditor.state.doc.toString();
      const photo = document.getElementById('cover').src.replace(serverStorage, "");;


      showLoadingPopup("⏳ Saving...")
      try {
        await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
          credentials: 'include'
        });
        const csrfToken = decodeURIComponent(getCookie('XSRF-TOKEN'));
        const projectSlug = new URLSearchParams(window.location.search).get('projectSlug');

        const response = await fetch(`${apiUrl}/user/update-content/${projectSlug}`, {
          method: 'POST',
          credentials: 'include',        // ← send the session cookie
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-XSRF-TOKEN': csrfToken },
          body: JSON.stringify({ name, description, javascript, css, html, photo })
        });

        const data = await response.json();


        if (response.ok) {
          alert('Updating project went successfully: ' + data.message);
          showSuccessPopup()
        } else {
          alert('Updating project from user failed: ' + data.message);
          alert('Updating project from user failed: ' + data.error);
          showErrorPopup()
        }
      } catch (error) {
        alert('Updating project from user failed: ' + error.message);
        showErrorPopup()
      }
      finally {
        hideLoadingPopup()
      }
    })


  }

  //Member public profile
  if (document.getElementById('userProfileMember')) {

    //Effects
    if (document.getElementById('userProfileMember')) {
      // Projects
      document.getElementById('projectsLink').addEventListener('click', function () {
        let projects = document.getElementById('projects')
        projects.classList.remove('vh-0')
        projects.classList.add('vh-100')
      })

      document.getElementById('closeProjects').addEventListener('click', function () {
        let projects = document.getElementById('projects')
        projects.classList.remove('vh-100')
        projects.classList.add('vh-0')
      })


      //Heart filled logic
      const heartToggle = document.getElementById('heartToggle');
      const heartIcon = document.getElementById('heartIcon');
      let isFilled = false;
      heartToggle.addEventListener('click', function (e) {
        e.preventDefault(); // Prevent navigation

        if (isFilled) {
          heartIcon.setAttribute('class', 'bi bi-heart');
          heartIcon.innerHTML = `
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
              `;
        } else {
          heartIcon.setAttribute('class', 'bi bi-heart-fill');
          heartIcon.innerHTML = `
                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
              `;
        }

        isFilled = !isFilled;
      });
    }



    showLoadingPopup()
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
        document.getElementById('name').innerText = `${data.user.name}`;
        document.getElementById('email').innerText = `${data.user.email}`;
        document.getElementById('photo').src = `${serverStorage}${data.user.photo}`
        document.getElementById('backgroundPhoto').src = `${serverStorage}${data.user.photo}`


        document.querySelectorAll('.loading-placeholder').forEach(element => element.remove());
        document.getElementById('photo').classList.remove('d-none')
      } else {
        alert('Listeninig member failed: ' + data.message);
        alert('Listeninig member failed: ' + data.error);
        showErrorPopup()
      }
    } catch (error) {
      alert('Listeninig member failed: ' + error.message);
    }
    finally {
      hideLoadingPopup()
    }


  }


  //Member public posts
  if (document.getElementById('listProjects')) {
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
          data.projects.forEach(element => {
            arrayUserProjects.push(element)
          });
          displayProjects()
        } else {
          alert('Getting all projects from user failed: ' + data.message);
          alert('Getting all projects from user failed: ' + data.error);
        }
      } catch (error) {
        alert('Getting all projects from user failed: ' + error.message);
      }
    }



    //Display projects
    function displayProjects() {
      if (document.getElementById('projects')) {
        const slugUser = new URLSearchParams(window.location.search).get('slug');
        let projectsTable = document.getElementById('listProjects')

        for (let i = 0; i < arrayUserProjects.length; i++) {
          const project = arrayUserProjects[i];
          const imageId = `image-cover-${slugUser}-${project.slug}`;
          const nameProject = project.name;
          const descriptionProject = project.description;
          const userIcon = document.getElementById('photo').src
          const userName = document.getElementById('name').textContent
          const userEmail = document.getElementById('email').textContent

          const wrapperId = `image-wrapper-${slugUser}-${project.slug}`;
          const wrapperFullScreenId = `image-wrapper-fullscreen${slugUser}-${project.slug}`;

          // Insert HTML block
          projectsTable.insertAdjacentHTML("beforeend", `
            <div class="p-2 d-flex justify-content-center align-items-center text-center flex-column motherCard" style="height: auto; max-width: 600px; width: 90%; ">
            
        
              
         

           <div class="d-flex flex-column align-items-start text-start rounded w-100 h-auto m-1 bg-dark p-3" style="">

             <div class="d-flex w-100 justify-content-center form-check form-switch mb-3">
              <input class="form-check-input" style="cursor: pointer;box-shadow: none;border: none;" type="checkbox" id="checkNativeSwitch-${slugUser}-${project.slug}">
              </div>

           <div id="${wrapperId}" class="position-relative w-100 rounded" style="aspect-ratio: 16 / 9;">
                <a class="position-absolute w-100 h-100 z-2 transitionProjectLink projectLink rounded" style="cursor: pointer" href="project.html?slug=${slugUser}&projectSlug=${project.slug}"></a>
                <img src="${serverStorage}${project.photo}" id="${imageId}" class="w-100 h-100 object-fit-cover rounded" alt="">
              </div>


  <!-- Project Info Section -->
 
    <h3 style="white-space: pre-line; margin-left: 7px;" class="text-light mt-4">${nameProject}</h3>


<div class="bg-dark" id="markdownOverlay-${slugUser}-${project.slug}" style="
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  color: #000;
  display: none;
  flex-direction: column;
  align-items: start;
  z-index: 9999;
  padding: 2rem;
  overflow-y: auto;
  box-sizing: border-box;
">
  <!-- Close button at top right -->
  <button id="closeDescription-${slugUser}-${project.slug}" class="btn btn-danger mb-3" style="">
    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
    </svg>
  </button>

  <!-- User Info -->
      <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem; max-width: 1200px;" class="mt-auto ms-auto me-auto w-100">
        <img src="${userIcon}" alt="${userName}" style="
          width: 145px;
          height: 145px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ccc;
        " />
        <div>
          <a href="member.html?slug=${slugUser}" style="margin: 0; font-weight: bold; font-size: 0.95rem; color: white;text-decoration: none;">${userName}</a>
          <p style="margin: 0; color: white; font-size: 0.8rem;">${userEmail}</p>
        </div>
      </div>

  <!-- Container for content -->
  <div class="mb-auto ms-auto me-auto w-100" style="
    display: flex;
    flex-direction: row;
    gap: 2rem;
    flex-wrap: wrap;
    align-items: flex-start;
    max-width: 1200px;
  ">
  

    <!-- Iframe preview -->
    <div id="${wrapperFullScreenId}" style="
      flex: 1 1 500px;
      min-width: 300px;
      height: 500px;
      border-radius: 10px;
      overflow: hidden;
      position: relative;
    "></div>

    <!-- Markdown content -->
    <div style="
      flex: 1 1 500px;
      min-width: 300px;
      background: transparent;
      border-radius: 10px;
      padding: 1rem;
      max-height: 500px;
      overflow-y: auto;
    " class="scrollbar-thin">
      <div id="markdown-content-${slugUser}-${project.slug}" class="scrollbar-thin" style="font-size: 0.95rem; color: white;"></div>
    </div>

  </div>
</div>


    <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
        <img src="${userIcon}" alt="${userName}" style="
          width: 65px;
          height: 65px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ccc;
        ">
        <div>
          <a href="member.html?slug=${slugUser}" style="margin: 0; font-weight: bold; font-size: 0.95rem; color: white;text-decoration: none;">${userName}</a>
          <p style="margin: 0; color: #9b9a9a; font-size: 0.8rem;">${userEmail}</p>
        </div>
      </div>

           <div class="d-flex text-center align-items-center w-100 bg-transparent mt-1 rounded">
                 <a class="btn btn-primary m-1" href="#" id="heartToggle-${slugUser}-${project.slug}">
                    <svg id="heartIcon-${slugUser}-${project.slug}" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                          fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                            <path
                             d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                      </svg>
                  </a>

                           <!-- Description Button -->
<button id="openDescription-${slugUser}-${project.slug}" class="btn btn-success m-1">
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
</svg>
</button>

                  <div class="d-flex me-2 ms-auto justify-content-center align-items-center flex-column">
                <button type="button" class="btn btn-secondary m-1" style="cursor: default;">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"></path>
  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"></path>
</svg>
              </button>
                    

                    <p class="text-light m-0" id="numberOfViews-${slugUser}-${project.slug}">0</p>
                  </div>
              </div>
 



</div>


            </div>
          `);


          const markdownEl = document.getElementById(`markdown-content-${slugUser}-${project.slug}`);
          const rawHtml = marked.parse(descriptionProject);
          const cleanHtml = DOMPurify.sanitize(rawHtml);
          markdownEl.innerHTML = cleanHtml;

          markdownEl.querySelectorAll('pre code').forEach(block => {
            hljs.highlightElement(block);
          });

          const wrapper = document.getElementById(wrapperId);
          const wrapperFullScreen = document.getElementById(wrapperFullScreenId);

          const iframe = document.createElement("iframe");
          const iframeFullscreen = document.createElement("iframe");

          iframe.className = "position-absolute top-0 start-0 w-100 h-100 border-0 rounded";
          iframe.style.display = "none"
          iframe.style.zIndex = "2";

          iframeFullscreen.className = "position-absolute top-0 start-0 w-100 h-100 border-0 rounded";
          iframeFullscreen.style.display = "none"
          iframeFullscreen.style.zIndex = "2";

          const hideScrollForWallPaper = `
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
      `

          const jsContent = project.javascript;
          const cssContent = project.css;
          const htmlContent = project.html;

          const isModule = /\b(import|export)\b/.test(jsContent); // crude module detection,might fail if there is something like 
          // const = import, will add type module although not needed ut in most of cases will work
          const scriptTag = isModule
            ? `<script type="module">${jsContent}<\/script>`
            : `<script>${jsContent}<\/script>`;

          const fullHTML = `
            <html class="scrollbar-none">
              <head><style>${cssContent}</style><style>${hideScrollForWallPaper}</style></head>
              <body>
                ${htmlContent}
                ${scriptTag}
              </body>
            </html>
          `;


          iframe.srcdoc = fullHTML;
          iframeFullscreen.srcdoc = fullHTML;
          wrapper.appendChild(iframe);
          wrapperFullScreen.appendChild(iframeFullscreen);


          const checkbox = document.getElementById(`checkNativeSwitch-${slugUser}-${project.slug}`);
          checkbox.addEventListener("change", function () {
            if (this.checked) {
              this.disabled = true
              wrapper.appendChild(iframe);
              iframe.style.display = "flex";
              document.getElementById(imageId).style.opacity = "0";
              setTimeout(() => {
                this.disabled = false
              }, 10);
            } else {
              this.disabled = true
              wrapper.removeChild(iframe);
              document.getElementById(imageId).style.opacity = "1";
              setTimeout(() => {
                this.disabled = false
              }, 10);
            }
          });





          // Description overlay toggle logic
          const openDescriptionBtn = document.getElementById(`openDescription-${slugUser}-${project.slug}`);
          const closeDescriptionBtn = document.getElementById(`closeDescription-${slugUser}-${project.slug}`);
          const markdownOverlay = document.getElementById(`markdownOverlay-${slugUser}-${project.slug}`);

          openDescriptionBtn.addEventListener('click', () => {
            markdownOverlay.style.display = 'flex';
            document.body.style.overflow = 'hidden'; // Prevent background scroll
            document.getElementById('projects').classList.remove('overflow-y-scroll')
            wrapperFullScreen.appendChild(iframeFullscreen);
            iframeFullscreen.style.display = "flex"
          });

          closeDescriptionBtn.addEventListener('click', () => {
            markdownOverlay.style.display = 'none';
            document.body.style.overflow = ''; // Restore scroll
            document.getElementById('projects').classList.add('overflow-y-scroll')
            wrapperFullScreen.removeChild(iframeFullscreen);
          });




          //Heart filled logic
          const heartToggle = document.getElementById(`heartToggle-${slugUser}-${project.slug}`);
          const heartIcon = document.getElementById(`heartIcon-${slugUser}-${project.slug}`);
          let isFilled = false;
          heartToggle.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent navigation

            if (isFilled) {
              heartIcon.setAttribute('class', 'bi bi-heart');
              heartIcon.innerHTML = `
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
              `;
            } else {
              heartIcon.setAttribute('class', 'bi bi-heart-fill');
              heartIcon.innerHTML = `
                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
              `;
            }

            isFilled = !isFilled;
          });


        }




      }
    }


    //Input
    document.getElementById('inputSearchProjectsUser').addEventListener('input', function () {
      const searchText = this.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.motherCard');

      cards.forEach(card => {
        const projectName = card.querySelector('h3')?.textContent.toLowerCase().trim();
        if (searchText.trim() == "") {
          card.classList.add('d-flex')
          card.classList.remove('d-none')
        } if (projectName.includes(searchText)) {
          card.classList.add('d-flex')
          card.classList.remove('d-none')
        } else {
          card.classList.remove('d-flex')
          card.classList.add('d-none')
        }
      });
    });


  }


  //Main page for project public
  if (document.getElementById('projectMain')) {

    //Effects
    if (document.getElementById('projectMain')) {
      // Update the preview iframe
      let activeIframe = 'iframeA';
      function updatePreview() {
        const jsContent = window.jsEditor.state.doc.toString();
        const cssContent = window.cssEditor.state.doc.toString();
        const htmlContent = window.htmlEditor.state.doc.toString();

        const useModule = document.getElementById('useModule')?.checked;
        const scriptTag = useModule
          ? `<script type="module">\n${jsContent}\n<\/script>`
          : `<script>\n${jsContent}\n<\/script>`;

        const fullHTML = `
            <html style="overflow: auto;">
                <head>
                    <style>${cssContent}</style>
                </head>
                <body>
                    ${htmlContent}
                    ${scriptTag}
                </body>
            </html>`;

        const nextIframe = activeIframe === 'iframeA' ? 'iframeB' : 'iframeA';
        const current = document.getElementById(activeIframe);
        const next = document.getElementById(nextIframe);


        next.srcdoc = fullHTML;


        next.onload = () => {
          current.style.display = 'none';
          next.style.display = 'block';
          activeIframe = nextIframe;
        };
      }

      document.getElementById('useModule').addEventListener('change', () => {
        updatePreview();
      });

      // JavaScript Editor
      window.jsEditor = new EditorView({
        state: EditorState.create({
          doc: ``,
          extensions: [basicSetup, javascript(), oneDark]

        }),
        parent: document.getElementById("js-editor"),
        dispatch: (tr) => {
          jsEditor.update([tr]);
          if (tr.docChanged) updatePreview();
        }
      });

      // CSS Editor
      window.cssEditor = new EditorView({
        state: EditorState.create({
          doc: ``,
          extensions: [basicSetup, css(), oneDark]
        }),
        parent: document.getElementById("css-editor"),
        dispatch: (tr) => {
          cssEditor.update([tr]);
          if (tr.docChanged) updatePreview();
        }
      });

      // HTML Editor
      window.htmlEditor = new EditorView({
        state: EditorState.create({
          doc: ``,
          extensions: [basicSetup, html(), oneDark]
        }),
        parent: document.getElementById("html-editor"),
        dispatch: (tr) => {
          htmlEditor.update([tr]);
          if (tr.docChanged) updatePreview();
        }
      });

      // Optional: make content accessible via buttons
      window.getText = function (editorId) {
        let editor;
        if (editorId === "js-editor") editor = jsEditor;
        else if (editorId === "css-editor") editor = cssEditor;
        else if (editorId === "html-editor") editor = htmlEditor;

        const content = editor.state.doc.toString();

        navigator.clipboard.writeText(content)
          .then(() => {
            showCopyPopup();
          })
          .catch(err => {
          });
      };

      //Expand
      const expandBtn = document.getElementById('expand');
      const frames = [document.getElementById('iframeA'), document.getElementById('iframeB')];

      let isExpanded = false;

      const expandIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707"/>
  </svg>`;
      const contractIcon = `
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-contract" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707M15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707"/>
  </svg>`;
      expandBtn.addEventListener('click', function () {
        frames.forEach(frame => {
          if (!isExpanded) {
            // Expand view
            frame.classList.remove('top-50', 'h-50', 'w-100');
            frame.classList.add('vw-100', 'vh-100', 'pt-60', 'top-0', 'z-0');
          } else {
            // Collapse view (return to original state)
            frame.classList.remove('vw-100', 'vh-100', 'pt-60', 'top-0', 'z-0');
            frame.classList.add('top-50', 'h-50', 'w-100');
          }
        });

        // Toggle button icon
        expandBtn.innerHTML = isExpanded ? expandIcon : contractIcon;

        isExpanded = !isExpanded;
      });
      // frames.forEach(frame => {
      //   frame.addEventListener('mouseenter', () => {
      //     frame.classList.remove('top-50', 'h-50', 'w-100');
      //     frame.classList.add('vw-100', 'vh-100', 'pt-60', 'top-0', 'z-0');
      //     expandBtn.innerHTML = contractIcon;
      //     isExpanded = true
      //   });

      //   frame.addEventListener('mouseleave', () => {
      //     frame.classList.remove('vw-100', 'vh-100', 'pt-60', 'top-0', 'z-0');
      //     frame.classList.add('top-50', 'h-50', 'w-100');
      //     expandBtn.innerHTML = expandIcon;
      //     isExpanded = false
      //   });
      // });

      // About
      document.getElementById('aboutLink').addEventListener('click', function () {
        let about = document.getElementById('about')
        about.style.pointerEvents = 'all';
        about.style.opacity = 1
      })

      document.getElementById('closeAbout').addEventListener('click', function () {
        let about = document.getElementById('about')
        setTimeout(function () {
          about.style.pointerEvents = 'none'
        }, 1500);
        about.style.opacity = 0
      })

      // Desc
      document.getElementById('descriptionLink').addEventListener('click', function () {
        let description = document.getElementById('description')
        description.style.pointerEvents = 'all';
        description.style.opacity = 1
      })

      document.getElementById('closeDescription').addEventListener('click', function () {
        let description = document.getElementById('description')
        setTimeout(function () {
          description.style.pointerEvents = 'none'
        }, 1500);
        description.style.opacity = 0
      })

      // Photo
      document.getElementById('photoLink').addEventListener('click', function () {
        let photo = document.getElementById('photo')
        photo.style.pointerEvents = 'all';
        photo.style.opacity = 1
      })

      document.getElementById('closePhoto').addEventListener('click', function () {
        let photo = document.getElementById('photo')
        setTimeout(function () {
          photo.style.pointerEvents = 'none'
        }, 1500);
        photo.style.opacity = 0
      })

      document.getElementById('formatter').addEventListener('click', function () {

        const jsContent = window.jsEditor.state.doc.toString();
        const cssContent = window.cssEditor.state.doc.toString();
        const htmlContent = window.htmlEditor.state.doc.toString();

        const formattedJS = js_beautify(jsContent, {
          indent_size: 2,
          space_in_empty_paren: true
        });

        const formattedCSS = css_beautify(cssContent, {
          indent: '  ',
          openbrace: 'end-of-line',
          autosemicolon: true,
        });

        const formattedHTML = html_beautify(htmlContent, {
          indent: '  ',
          openbrace: 'end-of-line',
          autosemicolon: true,
        });


        window.jsEditor.dispatch({
          changes: { from: 0, to: jsEditor.state.doc.length, insert: formattedJS }
        });

        window.cssEditor.dispatch({
          changes: { from: 0, to: cssEditor.state.doc.length, insert: formattedCSS, }
        });

        window.htmlEditor.dispatch({
          changes: { from: 0, to: htmlEditor.state.doc.length, insert: formattedHTML }
        });

        showFormattedPopup()
      })
    }

    //Beginning request

    showLoadingPopup();
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
        document.getElementById('projectName').value = `${data.project.name}`
        document.getElementById('projectDescription').value = `${data.project.description}`
        document.getElementById('nameUserProfile').innerText = `${data.userName}`
        document.getElementById('imageProfile').src = `${serverStorage}${data.userImage}`
        document.getElementById('cover').src = `${serverStorage}${data.project.photo}`

        document.querySelectorAll('.loading-placeholder').forEach(element => element.remove());
        document.getElementById('iframeA').classList.remove('d-none')
        document.getElementById('iframeB').classList.remove('d-none')
        document.getElementById('imageProfile').classList.remove('d-none')
        document.getElementById('cover').classList.remove('d-none')


        // const formattedJS = js_beautify(data.project.javascript, {
        //   indent_size: 2,
        //   space_in_empty_paren: true
        // });

        // const formattedCSS = css_beautify(data.project.css, {
        //   indent: '  ',
        //   openbrace: 'end-of-line',
        //   autosemicolon: true,
        // });

        // const formattedHTML = html_beautify(data.project.html, {
        //   indent: '  ',
        //   openbrace: 'end-of-line',
        //   autosemicolon: true,
        // });


        window.jsEditor.dispatch({
          changes: { from: 0, to: jsEditor.state.doc.length, insert: data.project.javascript }
        });

        window.cssEditor.dispatch({
          changes: { from: 0, to: cssEditor.state.doc.length, insert: data.project.css, }
        });

        window.htmlEditor.dispatch({
          changes: { from: 0, to: htmlEditor.state.doc.length, insert: data.project.html }
        });
      } else {
        alert('Listening post main failed: ' + data.message);
        alert('Listening post main failed: ' + data.error);
        showErrorPopup()
      }
    } catch (error) {
      alert('Listening post main failed: ' + error.message);
      showErrorPopup()
    }
    finally {
      hideLoadingPopup();
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
      document.getElementById('preview').src = `${serverStorage}${data.user.photo}`
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

//Beginning request
function showLoadingPopup(message = `<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`) {
  const popup = document.createElement("div");
  popup.innerHTML = message;
  popup.id = "loading-popup";
  popup.style.position = "fixed";
  popup.style.top = "20px";
  popup.style.right = "20px";
  popup.style.background = "#333";
  popup.style.color = "#fff";
  popup.style.padding = "10px 15px";
  popup.style.borderRadius = "5px";
  popup.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
  popup.style.fontSize = "16px";
  popup.style.zIndex = "9999";
  popup.style.opacity = "1";
  popup.style.transition = "opacity 0.3s ease-out";
  popup.style.pointerEvents = "none";
  popup.className = 'popup'

  document.querySelectorAll('.popup').forEach(el => el.remove());
  if (!document.getElementById("loading-popup")) {
    document.body.appendChild(popup);
  }
}
function hideLoadingPopup() {
  const popup = document.getElementById("loading-popup");
  if (popup) {
    popup.style.opacity = "0";
    setTimeout(() => {
      if (popup.parentNode) {
        popup.parentNode.removeChild(popup);
      }
    }, 300);
  }
}
function showErrorPopup(message = "💣 Error occurred!") {
  const popup = document.createElement("div");
  popup.innerText = message;
  popup.style.position = "fixed";
  popup.style.top = "20px";
  popup.style.right = "20px";
  popup.style.background = "#f44336"; // red background
  popup.style.color = "#fff";
  popup.style.padding = "10px 15px";
  popup.style.borderRadius = "5px";
  popup.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
  popup.style.fontSize = "16px";
  popup.style.zIndex = "9999";
  popup.style.opacity = "1";
  popup.style.transition = "opacity 1s ease-out";
  popup.style.pointerEvents = "none";
  popup.className = 'popup'

  document.querySelectorAll('.popup').forEach(el => el.remove());
  document.body.appendChild(popup);

  // Fade out after 1.5 seconds
  setTimeout(() => {
    popup.style.opacity = "0";
    setTimeout(() => {
      if (popup.parentNode) {
        popup.parentNode.removeChild(popup);
      }
    }, 1000);
  }, 1500);
}
function showSuccessPopup(message = "✅ Success!") {
  const popup = document.createElement("div");
  popup.innerText = message;
  popup.style.position = "fixed";
  popup.style.top = "20px";
  popup.style.right = "20px";
  popup.style.background = "#4caf50"; // green background
  popup.style.color = "#fff";
  popup.style.padding = "10px 15px";
  popup.style.borderRadius = "5px";
  popup.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
  popup.style.fontSize = "16px";
  popup.style.zIndex = "9999";
  popup.style.opacity = "1";
  popup.style.transition = "opacity 1s ease-out";
  popup.style.pointerEvents = "none";
  popup.className = 'popup'


  document.querySelectorAll('.popup').forEach(el => el.remove());
  document.body.appendChild(popup);

  // Fade out after 1.5 seconds
  setTimeout(() => {
    popup.style.opacity = "0";
    setTimeout(() => {
      if (popup.parentNode) {
        popup.parentNode.removeChild(popup);
      }
    }, 1000);
  }, 1500);
}

function showFormattedPopup() {
  const popup = document.createElement("div");
  popup.innerText = "🖊 Formatted!";
  popup.style.position = "fixed";
  popup.style.top = "20px";
  popup.style.right = "20px";
  popup.style.background = "#4caf50";
  popup.style.color = "#fff";
  popup.style.padding = "10px 15px";
  popup.style.borderRadius = "5px";
  popup.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
  popup.style.fontSize = "16px";
  popup.style.zIndex = "9999";
  popup.style.opacity = "1";
  popup.style.transition = "opacity 1s ease-out";
  popup.style.pointerEvents = "none";
  popup.className = 'popup'

  document.querySelectorAll('.popup').forEach(el => el.remove());

  document.body.appendChild(popup);

  // Fade out after 1.5 seconds
  setTimeout(() => {
    popup.style.opacity = "0";
    setTimeout(() => document.body.removeChild(popup), 1000);
  }, 1500);
}

function showCopyPopup() {
  const popup = document.createElement("div");
  popup.innerText = "📋 Copied!";
  popup.style.position = "fixed";
  popup.style.top = "20px";
  popup.style.right = "20px";
  popup.style.background = "#4caf50";
  popup.style.color = "#fff";
  popup.style.padding = "10px 15px";
  popup.style.borderRadius = "5px";
  popup.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
  popup.style.fontSize = "16px";
  popup.style.zIndex = "9999";
  popup.style.opacity = "1";
  popup.style.transition = "opacity 1s ease-out";
  popup.style.pointerEvents = "none";
  popup.className = 'popup'

  document.querySelectorAll('.popup').forEach(el => el.remove());
  document.body.appendChild(popup);

  // Fade out after 1.5 seconds
  setTimeout(() => {
    popup.style.opacity = "0";
    setTimeout(() => document.body.removeChild(popup), 1000);
  }, 1500);
}

function convertVisibleComments() {
  const editor = window.jsEditor;
  const code = editor.state.doc.toString();

  //\n Separate considering TAB/lines
  const updatedCode = code.split('\n').map(line => {

    const trimmedLine = line.trimStart();

    // Skip line if it already has a block comment
    if (trimmedLine.includes('/*') && trimmedLine.includes('*/')) {
      return line;
    }

    // Convert // comments at the end of a line
    const commentIndex = line.indexOf('//');
    if (commentIndex !== -1 &&
      !line.slice(0, commentIndex).trimEnd().endsWith(':') &&
      line.slice(0, commentIndex).trim().length > 0) {
      const codePart = line.slice(0, commentIndex).trimEnd();
      const commentPart = line.slice(commentIndex).trim();
      return `${codePart} /*${commentPart}*/`;
    }

    return line;
  }).join('\n');

  editor.dispatch({
    changes: {
      from: 0,
      to: editor.state.doc.length,
      insert: updatedCode
    }
  });
}










