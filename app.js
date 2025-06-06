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

    //Effects
    if (document.getElementById('home')) {
      //SVG hover
      const elements = document.querySelectorAll('.hover-bg-change');
      elements.forEach(el => {
        const colorClass = el.getAttribute('color');

        el.addEventListener('mouseenter', () => {
          document.body.classList.remove('bg-body');
          document.body.classList.add('transitionAll')
          document.body.classList.add(colorClass);
        });

        el.addEventListener('mouseleave', () => {
          document.body.classList.remove(colorClass);
          document.body.classList.add('bg-body');
        });
      });


      //Expandables
      const svgIcons = document.querySelectorAll('.hover-expand svg.trigger');
      svgIcons.forEach(svg => {
        svg.addEventListener('click', (e) => {
          e.stopPropagation(); // optional: prevents bubbling if needed
          const container = svg.closest('.hover-expand');
          const color = svg.getAttribute('color');
          const isExpanded = container.classList.contains('position-fixed');
          if (!isExpanded) {
            container.classList.add(
              'position-fixed',
              'top-0',
              'start-0',
              'vw-100',
              'vh-100',
              'z-9999',
              `${color}`
            );
            document.body.classList.add('overflow-hidden');
          } else {
            container.classList.remove(
              'position-fixed',
              'top-0',
              'start-0',
              'vw-100',
              'vh-100',
              'z-9999',
              `${color}`
            );
            document.body.classList.remove('overflow-hidden');
          }
        });
      });


      //SVG drawn path
      document.querySelectorAll('.hover-trigger').forEach(trigger => {

        // Hide at first
        const svgWrapper = trigger.nextElementSibling; // this is the div with class .svg-draw
        const svgs = svgWrapper.querySelectorAll('svg');
        svgs.forEach(svg => {
          const elements = svg.querySelectorAll('path, line, rect, circle, polyline, polygon');
          elements.forEach(el => {
            const length = el.getTotalLength();
            // Apply initial hidden stroke
            el.style.transition = "none"
            el.style.strokeDasharray = length;
            el.style.strokeDashoffset = length;
          })

        });
        // Hide at first

        trigger.addEventListener('mouseenter', () => {
          const svgWrapper = trigger.nextElementSibling; // this is the div with class .svg-draw
          const svgs = svgWrapper.querySelectorAll('svg');
          const title = svgWrapper.querySelector('h1')
          title.classList.add('visible')

          svgs.forEach(svg => {
            const elements = svg.querySelectorAll('path, line, rect, circle, polyline, polygon');

            elements.forEach(el => {
              const length = el.getTotalLength?.() || 0;
              el.style.strokeDasharray = length;
              el.style.strokeDashoffset = length;
              void el.getBoundingClientRect(); // force reflow

              el.style.transition = `
                stroke-dashoffset 1s ease,
                fill-opacity 1s ease 0.5s
              `;
              el.style.opacity = 1;
              el.style.strokeDashoffset = '0';
              el.style.fillOpacity = '1';
            });
          });
        });

        trigger.addEventListener('mouseleave', () => {
          const svgWrapper = trigger.nextElementSibling;
          const svgs = svgWrapper.querySelectorAll('svg');
          const title = svgWrapper.querySelector('h1')
          title.classList.remove('visible')

          svgs.forEach(svg => {
            const elements = svg.querySelectorAll('path, line, rect, circle, polyline, polygon');

            elements.forEach(el => {
              const length = el.getTotalLength?.() || 0;
              el.style.strokeDashoffset = length;
              el.style.fillOpacity = '0';
            });
          });
        });
      });


    }

    //Search users
    if (document.getElementById('users')) {
      let arrayUsers = []

      function populate() {
        let userTable = document.getElementById('users')
        userTable.innerHTML = ''

        if (arrayUsers.length == 0) {
          userTable.innerHTML = `
    <div class="w-100 d-flex justify-content-center align-items-center flex-column text-center">
  <svg xmlns="http://www.w3.org/2000/svg" local="https://icons.getbootstrap.com/icons/question-square-fill/" width="100"
    height="100" fill="currentColor" class="bi bi-question-square-fill m-2" viewBox="0 0 16 16">
    <path
      d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.496 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927" />
  </svg>
  <h4>Not found!</h4>
</div>
          `
          return;
        }

        for (let i = 0; i < arrayUsers.length; i++) {
          let userName = arrayUsers[i].name;
          let userEmail = arrayUsers[i].email;
          let userSlug = arrayUsers[i].slug
          let userPhoto = arrayUsers[i].photo

          userTable.innerHTML += `
            <div style="" class="border bg-body-secondary d-flex align-items-center gap-3 p-3 rounded m-2 transitionAll" >
              <img src="${serverStorage}${userPhoto}" alt="${userName}" style="" width="100px" height="100px" class="border border-2 rounded-pill object-fit-cover img-user-search-layout" />
              <div class="flex-1">
                <a href="member.html?slug=${userSlug}" class="m-0 fw-bold fs-6 text-decoration-none" style="">${userName}</a>
                <p style="" class="fs-6 my-1">${userEmail}</p>
              </div>
            </div>
          `;
        }
      }

      function manageElementsAfterLoadingQuery() {
        let userTable = document.getElementById('users')
        let input = document.getElementById('searchUsersInput').value
        userTable.innerHTML = ''

        if (input.trim() == "") {
          userTable.innerHTML = ""
          populate()
          return;
        }

        for (let i = 0; i < arrayUsers.length; i++) {
          let userName = arrayUsers[i].name;
          let userEmail = arrayUsers[i].email;
          let userSlug = arrayUsers[i].slug
          let userPhoto = arrayUsers[i].photo

          if (userName.trim().toLocaleLowerCase().includes(input.trim().toLocaleLowerCase()) || userEmail.trim().toLocaleLowerCase().includes(input.trim().toLocaleLowerCase())) {

            userTable.innerHTML += `
              <div style="" class="border bg-body-secondary d-flex align-items-center gap-3 p-3 rounded m-2 transitionAll" >
                <img src="${serverStorage}${userPhoto}" alt="${userName}" style="" width="100px" height="100px" class="border border-2 rounded-pill object-fit-cover img-user-search-layout" />
                <div class="flex-1">
                  <a href="member.html?slug=${userSlug}" class="m-0 fw-bold fs-6 text-decoration-none" style="">${userName}</a>
                  <p style="" class="fs-6 my-1">${userEmail}</p>
                </div>
              </div>
            `;


          }

        }
      }

      const buttonRequest = document.getElementById('searchUsersButton')
      const inputSearch = document.getElementById('searchUsersInput')

      buttonRequest.addEventListener('click', async function (e) {
        arrayUsers = []
        const query = inputSearch.value.trim().toLocaleLowerCase()
        this.disabled = true
        e.preventDefault()
        showLoadingPopup()
        try {
          const response = await fetch(`${apiUrl}/users/public?query=${query}`, {
            credentials: 'include',        // ← send the session cookie
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', }
          });

          const data = await response.json();

          if (response.ok) {
            alert('Getting all users successfully: ' + data.message);
            document.getElementById('message').innerText = data.message;
            showSuccessPopup()

            data.users.forEach(element => {
              arrayUsers.push(element)
            });

            populate()

          } else {
            alert('Getting all users failed: ' + data.message);
            alert('Getting all users failed: ' + data.error);
            document.getElementById('message').innerText = `${data.message}: ${data.error}` || 'An unknown error occurred';
            showErrorPopup()
          }
        } catch (error) {
          alert('Getting all users failed: ' + error.message);
          document.getElementById('message').innerText = error.message || 'An unknown error occurred';
          showErrorPopup()
        }
        finally {
          hideLoadingPopup()
          this.disabled = false
        }

      })

      //Input
      if (document.getElementById('searchUsersInput')) {

        document.getElementById('searchUsersInput').addEventListener('input', function () {
          manageElementsAfterLoadingQuery()
        })
      }

    }

    //Search projects
    if (document.getElementById('users')) {
      let arrayProjects = []
      let tags = []

      function populate() {
        let projectsTable = document.getElementById('projects')
        projectsTable.innerHTML = ''

        if (arrayProjects.length == 0) {
          projectsTable.innerHTML = `
    <div class="w-100 d-flex justify-content-center align-items-center flex-column text-center">
  <svg xmlns="http://www.w3.org/2000/svg" local="https://icons.getbootstrap.com/icons/question-square-fill/" width="100"
    height="100" fill="currentColor" class="bi bi-question-square-fill m-2" viewBox="0 0 16 16">
    <path
      d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.496 6.033a.237.237 0 0 1-.24-.247C5.35 4.091 6.737 3.5 8.005 3.5c1.396 0 2.672.73 2.672 2.24 0 1.08-.635 1.594-1.244 2.057-.737.559-1.01.768-1.01 1.486v.105a.25.25 0 0 1-.25.25h-.81a.25.25 0 0 1-.25-.246l-.004-.217c-.038-.927.495-1.498 1.168-1.987.59-.444.965-.736.965-1.371 0-.825-.628-1.168-1.314-1.168-.803 0-1.253.478-1.342 1.134-.018.137-.128.25-.266.25h-.825zm2.325 6.443c-.584 0-1.009-.394-1.009-.927 0-.552.425-.94 1.01-.94.609 0 1.028.388 1.028.94 0 .533-.42.927-1.029.927" />
  </svg>
  <h4>Not found!</h4>
</div>
          `
          return;
        }

        for (let i = 0; i < arrayProjects.length; i++) {
          let projectName = arrayProjects[i].name;
          let projectDescription = arrayProjects[i].description;
          let projectSlug = arrayProjects[i].slug
          let projectPhoto = arrayProjects[i].photo
          let projectTags = arrayProjects[i].tags
          let projectLikes = arrayProjects[i].likes
          let projectView = arrayProjects[i].views
          let isLiked = arrayProjects[i].liked

          let userName = arrayProjects[i].user.name;
          let userEmail = arrayProjects[i].user.email;
          let userSlug = arrayProjects[i].user.slug
          let userPhoto = arrayProjects[i].user.photo

          const imageId = `image-cover-${userSlug}-${projectSlug}`;
          const wrapperId = `image-wrapper-${userSlug}-${projectSlug}`;
          const wrapperFullScreenId = `image-wrapper-fullscreen${userSlug}-${projectSlug}`;

          projectsTable.insertAdjacentHTML("beforeend", `
          <div id="main-div-${userSlug}-${projectSlug}" class="p-2 d-flex justify-content-center align-items-center text-center flex-column motherCard bg-body-secondary border border-1 rounded m-1 postBody">
          
      
            
       

         <div class="d-flex flex-column align-items-start text-start rounded w-100 h-auto m-1 p-3" style="">

           <div class="d-flex w-100 justify-content-center form-check form-switch mb-3">
            <input class="form-check-input cursor-pointer" style="" type="checkbox" id="checkNativeSwitch-${userSlug}-${projectSlug}">
            </div>

         <div id="${wrapperId}" class="position-relative w-100 rounded ratio-16x9" style="">
              <a class="position-absolute w-100 h-100 z-2 nav-link linkElement rounded cursor-pointer" href="project.html?slug=${userSlug}&projectSlug=${projectSlug}"></a>
              <img src="${serverStorage}${projectPhoto}" id="${imageId}" style="" class="w-100 h-100 object-fit-cover rounded" alt="">
            </div>


<!-- Project Info Section -->

<div class="w-100 flex-row mt-4 ms-2 mb-4">
  <h3 style="" class="ws-pre-line">${projectName}</h3>
  <div class="d-flex flex-wrap gap-2 ms-auto" id="tags-${userSlug}-${projectSlug}"></div>
  </div>


<div class="bg-body-secondary post" id="markdownOverlay-${userSlug}-${projectSlug}" style="">
<div class="d-flex flex-row mb-3">
<!-- Close button at top right -->
<button id="closeDescription-${userSlug}-${projectSlug}" class="btn btn-danger me-2" style="">
  <svg xmlns="http://www.w3.org/2000/svg" local="https://icons.getbootstrap.com/icons/x-lg/" width="30" height="30" fill="white" class="bi bi-x-lg" viewBox="0 0 16 16">
    <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
  </svg>
</button>

<!-- Expand project at top right -->
<button id="expandProject-${userSlug}-${projectSlug}" class="btn btn-primary me-2" style="">
  <svg xmlns="http://www.w3.org/2000/svg" local="https://icons.getbootstrap.com/icons/arrows-angle-expand/" width="30" height="30" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707"/>
</svg>
</button>
</div>

<!-- User Info -->
    <div style="" class="mt-auto ms-auto me-auto w-100 user-info-mdo">
      <img src="${serverStorage}${userPhoto}" width="145px" height="145px" class="object-fit-cover rounded-pill border img-user-project-full-layout" alt="${userName}" style="" />
      <div>
        <a href="member.html?slug=${userSlug}" class="m-0 fw-bold fs-6 text-decoration-none" style="">${userName}</a>
        <p class="m-0 fs-6" style="">${userEmail}</p>
      </div>
    </div>

<!-- Container for content -->
<div class="mb-auto ms-auto me-auto w-100 post-body-content-mdo" style="">


  <!-- Iframe preview -->
  <div id="${wrapperFullScreenId}" class="post-body-iframe-min-mdo" style="">
  <button type="button" id="minimizeProject-${userSlug}-${projectSlug}" class="btn btn-outline-light d-none position-fixed top-0 start-0 m-1 mix-dif">
              <svg xmlns="http://www.w3.org/2000/svg" local="https://icons.getbootstrap.com/icons/arrows-angle-contract/" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-contract" viewBox="0 0 16 16">
<path fill-rule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707M15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707"></path>
</svg>
            
            </button>
  </div>

  <!-- Markdown content -->
  <div style="" class="scrollbar-thin border post-body-md-mdo d-none">
    <div id="markdown-content-${userSlug}-${projectSlug}" class="scrollbar-thin fs-6"></div>
  </div>

</div>
</div>


  <div class="d-flex align-items-center gap-2 mb-3" style="">
      <img src="${serverStorage}${userPhoto}" width="65px" height="65px" class="border object-fit-cover rounded-pill img-user-project-layout" alt="${userName}" style="">
      <div>
        <a href="member.html?slug=${userSlug}" class="m-0 fw-bold fs-6 text-decoration-none" style="">${userName}</a>
        <p class="m-0 fs-6" style="">${userEmail}</p>
      </div>
    </div>

         <div class="d-flex text-center align-items-center w-100 bg-transparent mt-1 rounded">
               <a class="btn btn-primary" project-id="${projectSlug}" m-1" href="#" id="heartToggle-${userSlug}-${projectSlug}">
                  <svg id="heartIcon-${userSlug}-${projectSlug}" local="https://icons.getbootstrap.com/icons/heart/" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                        fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                          <path
                           d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                    </svg>
                </a>

                         <!-- Description Button -->
<button id="openDescription-${userSlug}-${projectSlug}" class="btn btn-success m-1">
<svg xmlns="http://www.w3.org/2000/svg" local="https://icons.getbootstrap.com/icons/book/" width="16" height="16" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
<path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
</svg>
</button>

                <div class="d-flex me-2 ms-auto justify-content-center align-items-center flex-row">
                <div class="d-flex justify-content-center align-items-center flex-column text-center p-1">
                    
     <svg xmlns="http://www.w3.org/2000/svg" local="https://icons.getbootstrap.com/icons/person-fill-up/" width="16" height="16" fill="currentColor" class="bi bi-person-fill-up" viewBox="0 0 16 16">
  <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.854 1.5 1.5a.5.5 0 0 1-.708.708L13 11.707V14.5a.5.5 0 0 1-1 0v-2.793l-.646.647a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
  <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
</svg>
            
                  <p class="m-0">${projectView}</p>
                </div>

                   <div class="d-flex justify-content-center align-items-center flex-column text-center p-1">
                    
              <svg xmlns="http://www.w3.org/2000/svg" local="https://icons.getbootstrap.com/icons/balloon-heart-fill/" width="16" height="16" fill="currentColor" class="bi bi-balloon-heart-fill" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2 2 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.14-.386"/>
</svg>
            
                  <p class="m-0" id="likesProjects-${userSlug}-${projectSlug}">${projectLikes}</p>
                </div>

                
          
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
          const expandProjectBtn = document.getElementById(`expandProject-${userSlug}-${projectSlug}`);
          const minimizeProjectBtn = document.getElementById(`minimizeProject-${userSlug}-${projectSlug}`)
          const markdownOverlay = document.getElementById(`markdownOverlay-${userSlug}-${projectSlug}`);
          const mainDiv = document.getElementById(`main-div-${userSlug}-${projectSlug}`)

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

          expandProjectBtn.addEventListener('click', function () {
            iframeFullscreen.classList.remove('position-absolute')
            iframeFullscreen.classList.add('position-fixed')
            iframeFullscreen.classList.remove('rounded')
            minimizeProjectBtn.classList.add('z-3')
            minimizeProjectBtn.classList.add('d-flex')
            minimizeProjectBtn.classList.remove('d-none')
          })

          minimizeProjectBtn.addEventListener('click', function () {
            iframeFullscreen.classList.add('position-absolute')
            iframeFullscreen.classList.remove('position-fixed')
            iframeFullscreen.classList.add('rounded')
            minimizeProjectBtn.classList.add('d-none')
            minimizeProjectBtn.classList.remove('d-flex')
            this.classList.remove('z-3')
          })


          //Heart filled logic
          const heartToggle = document.getElementById(`heartToggle-${userSlug}-${projectSlug}`);
          const heartIcon = document.getElementById(`heartIcon-${userSlug}-${projectSlug}`);
          let isFilled = isLiked;
          heartToggle.addEventListener('click', async function (e) {
            e.preventDefault(); // Prevent navigation

            if (isFilled) {
              const result = await likes()
              if (result == false) {
                alert('An error occured or Create an account to interact with users and posts')
                showErrorPopup()
              }
              else {
                heartIcon.setAttribute('class', 'bi bi-heart');
                heartIcon.setAttribute('local', 'https://icons.getbootstrap.com/icons/heart/');
                heartIcon.innerHTML = `
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
              `;

                changeLikeView(true)
              }
            } else {
              const result = await likes()

              if (result == false) {
                alert('An error occured or Create an account to interact with users and posts')
                showErrorPopup()
              }
              else {
                heartIcon.setAttribute('class', 'bi bi-heart-fill');
                heartIcon.setAttribute('local', 'https://icons.getbootstrap.com/icons/heart-fill/');
                heartIcon.innerHTML = `
                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
              `;
                changeLikeView(false)
              }
            }

            isFilled = !isFilled;
          });

          //Api to registering the like system
          async function likes() {
            let result = ""
            const heartToggle = document.getElementById(`heartToggle-${userSlug}-${projectSlug}`);
            const projectId = heartToggle.getAttribute('project-id')
            showLoadingPopup()
            try {
              await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
                credentials: 'include'
              });
              const csrfToken = decodeURIComponent(getCookie('XSRF-TOKEN'));

              const response = await fetch(`${apiUrl}/user/likeContent/${projectId}`, {
                method: 'POST',
                credentials: 'include',        // ← send the session cookie
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-XSRF-TOKEN': csrfToken },
                body: JSON.stringify({})
              });

              const data = await response.json();
              if (response.ok) {
                alert('Likeing project successfully: ' + data.message);
                document.getElementById('message').innerText = data.message;
                showSuccessPopup()
                result = true

              } else {
                alert('Likeing project failed: ' + data.message);
                document.getElementById('message').innerText = `${data.message}: ${data.error}` || 'An unknown error occurred';
                showErrorPopup()
                result = false
              }
            } catch (error) {
              alert('Likeing project failed: ' + error);
              document.getElementById('message').innerText = error.message || 'An unknown error occurred';
              showErrorPopup()
              result = false
            }
            finally {
              hideLoadingPopup()
            }
            return result;
          }



          //Check if user already liked the project
          if (isLiked) {
            heartIcon.setAttribute('class', 'bi bi-heart-fill');
            heartIcon.setAttribute('local', 'https://icons.getbootstrap.com/icons/heart-fill/');
            heartIcon.innerHTML = `
                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
            `;

          }
          else {
            heartIcon.setAttribute('class', 'bi bi-heart');
            heartIcon.setAttribute('local', 'https://icons.getbootstrap.com/icons/heart/');
            heartIcon.innerHTML = `
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
              `;
          }

          //Change the numbe when likeing or dislikeing
          function changeLikeView(boolean) {
            const likesView = document.getElementById(`likesProjects-${userSlug}-${projectSlug}`)
            let number = parseInt(likesView.textContent)
            let finalNumber = ""
            if (boolean) {
              finalNumber = number - 1
            }
            else {
              finalNumber = number + 1
            }

            likesView.textContent = finalNumber
          }


          //Fill the tags
          const tagContainer = document.getElementById(`tags-${userSlug}-${projectSlug}`)
          const tags = projectTags.split(',').map(tag => tag.trim());
          tags.forEach(element => {
            const template = `
            <div class="badge bg-secondary d-flex align-items-center gap-2 px-2 py-1">
                <span>${element}</span>
            </div>
            `
            tagContainer.innerHTML = tagContainer.innerHTML + template
          })






        }


      }

      function manageElementsAfterLoadingQuery() {
        let input = document.getElementById('searchProjectsInput').value.trim().toLocaleLowerCase()
        let inputTag = document.getElementById('tagsProjectText').textContent.trim().toLocaleLowerCase()
        let allElements = document.querySelectorAll('.motherCard')

        if (input.trim() == "" && inputTag.trim() == "") {
          allElements.forEach(element => {
            element.classList.remove('d-none')
            element.classList.add('d-flex')
          })
          return;
        }

        for (let i = 0; i < arrayProjects.length; i++) {
          let projectName = arrayProjects[i].name
          let projectTags = arrayProjects[i].tags
          let projectSlug = arrayProjects[i].slug
          let userSlug = arrayProjects[i].user.slug

          let condition = false;
          if (input && inputTag) {
            // Both filled → require both to match
            const inputTagsArray = inputTag.split(',').map(tag => tag.trim().toLowerCase());
            const projectTagsArray = projectTags.split(',').map(tag => tag.trim().toLowerCase());
            let conditionTag = inputTagsArray.some(tag => projectTagsArray.includes(tag));

            condition = projectName.trim().toLocaleLowerCase().includes(input) && conditionTag;
          } else if (input) {
            // Only name filled
            condition = projectName.trim().toLocaleLowerCase().includes(input);
          } else if (inputTag) {
            // Only tag filled
            const inputTagsArray = inputTag.split(',').map(tag => tag.trim().toLowerCase());
            const projectTagsArray = projectTags.split(',').map(tag => tag.trim().toLowerCase());
            condition = inputTagsArray.some(tag => projectTagsArray.includes(tag));
          }

          if (condition) {
            const element = document.getElementById(`main-div-${userSlug}-${projectSlug}`)
            element.classList.remove('d-none')
            element.classList.add('d-flex')
          }
          else {
            const element = document.getElementById(`main-div-${userSlug}-${projectSlug}`)
            element.classList.remove('d-flex')
            element.classList.add('d-none')
          }

        }

      }

      const buttonRequest = document.getElementById('searchProjectsButton')
      const inputSearch = document.getElementById('searchProjectsInput')
      const tagsValue = document.getElementById('tagsProjectText')


      //Tag system
      if (document.getElementById('tags')) {
        const tagInput = document.getElementById("tagInput");
        const tagsContainer = document.getElementById("tagsContainer");
        const textTags = document.getElementById('tagsProjectText')
        const addTagBtn = document.getElementById("addTagBtn");

        addTagBtn.addEventListener("click", () => {
          const newTag = tagInput.value.trim();
          if (newTag && !tags.includes(newTag)) {
            tags.push(newTag);
            addTagElement(newTag);
            tagInput.value = "";
            manageElementsAfterLoadingQuery()
          }
        });

        tagInput.addEventListener("keypress", function (e) {
          if (e.key === "Enter") {
            e.preventDefault();
            const newTag = tagInput.value.trim();
            if (newTag && !tags.includes(newTag)) {
              tags.push(newTag);
              addTagElement(newTag);
              tagInput.value = "";
            }
          }
        });

        function addTagElement(tagText) {
          const tagEl = document.createElement("div");
          tagEl.className = "badge bg-secondary d-flex align-items-center gap-2 px-2 py-1";
          tagEl.innerHTML = `
                <span>${tagText}</span>
                <button type="button" class="btn-close btn-close-white btn-sm" aria-label="Remove"></button>
            `;

          tagEl.querySelector("button").addEventListener("click", () => {
            tags = tags.filter(t => t !== tagText);
            tagEl.remove();
            textTags.innerText = tags.join(",")
            manageElementsAfterLoadingQuery()
          });

          tagsContainer.appendChild(tagEl);
          textTags.innerText = tags.join(",")

        }

      }

      buttonRequest.addEventListener('click', async function (e) {
        arrayProjects = []
        const query = inputSearch.value.trim().toLocaleLowerCase()
        const tags = tagsValue.textContent
        this.disabled = true
        e.preventDefault()
        showLoadingPopup()
        try {
          const response = await fetch(`${apiUrl}/projects/public?query=${query}&tags=${tags}`, {
            credentials: 'include',       //  ← send the session cookie
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', }
          });

          const data = await response.json();

          if (response.ok) {
            alert('Getting all projects successfully: ' + data.message);
            document.getElementById('message').innerText = data.message;
            showSuccessPopup()

            data.posts.forEach(element => {
              arrayProjects.push(element)
            });

            populate()

          } else {
            alert('Getting all posts failed: ' + data.message);
            alert('Getting all posts failed: ' + data.error);
            document.getElementById('message').innerText = `${data.message}: ${data.error}` || 'An unknown error occurred';
            showErrorPopup()
          }
        } catch (error) {
          alert('Getting all posts failed: ' + error.message);
          document.getElementById('message').innerText = error.message || 'An unknown error occurred';
          showErrorPopup()
        }
        finally {
          hideLoadingPopup()
          this.disabled = false
        }
      })

      //Input
      if (document.getElementById('searchProjectsInput')) {
        document.getElementById('searchProjectsInput').addEventListener('input', function () {
          manageElementsAfterLoadingQuery()
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

      showLoadingPopup()
      try {
        await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
          credentials: 'include'
        });
        const csrfToken = decodeURIComponent(getCookie('XSRF-TOKEN'));

        const response = await fetch(`http://127.0.0.1:8000/login`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-XSRF-TOKEN': csrfToken, },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
          alert('Logged in successfully: ' + data.message);
          // document.getElementById('message').innerText = data.message; Just empty because it redirects to the home page
          document.getElementById('message').innerText = "";
          window.location.href = 'home.html';
        } else {

          alert('Logging in failed: ' + data.message);
          alert('Logging in failed: ' + data.error);
          document.getElementById('message').innerText = `${data.message}: ${data.error}` || 'An unknown error occurred';
          showErrorPopup()
        }
      } catch (error) {

        alert('Logging in failed: ' + error.message);
        document.getElementById('message').innerText = error.message || 'An unknown error occurred';
        showErrorPopup()
      }
      finally {
        hideLoadingPopup()
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
           <html class="user-resize" style="overflow: auto;">
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


      // Resize logic
      const values = [0.25, 0.75, 1, 1.25, 1.75, 2];
      let currentIndex = 2;

      document.getElementById('cycle-btn').addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % values.length;
        const value = values[currentIndex];
        this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-zoom-in" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
  <path d="M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z"/>
  <path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5"/>
</svg> ${value}`

        // Array of iframe IDs
        const iframeIds = ['iframeA', 'iframeB'];

        iframeIds.forEach(id => {
          const iframe = document.getElementById(id);
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

          if (iframeDoc) {
            const elements = iframeDoc.querySelectorAll('.user-resize');
            elements.forEach(el => {
              el.style.transform = `scale(${value})`;
            });
          }
        });
      });


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
          extensions: [basicSetup, javascript(), oneDark, EditorView.lineWrapping]

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
          extensions: [basicSetup, css(), oneDark, EditorView.lineWrapping]
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
          extensions: [basicSetup, html(), oneDark, EditorView.lineWrapping]
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
          extensions: [basicSetup, markdown(), oneDark, EditorView.lineWrapping],
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

      //       //Expand (Now we have range bar for this)
      //       const expandBtn = document.getElementById('expand');
      //       const frames = document.getElementById('iframes-div')
      //       let isExpanded = false;
      //       const expandIcon = `
      //  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
      //    <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707"/>
      //  </svg>`;
      //       const contractIcon = `
      //  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-contract" viewBox="0 0 16 16">
      //    <path fill-rule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707M15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707"/>
      //  </svg>`;
      //       expandBtn.addEventListener('click', function () {

      //         if (!isExpanded) {
      //           // Expand view
      //           frames.classList.remove('top-50', 'h-50', 'w-100');
      //           frames.classList.add('vw-100', 'vh-100', 'pt-60', 'top-0', 'z-0');
      //         } else {
      //           // Collapse view (return to original state)
      //           frames.classList.remove('vw-100', 'vh-100', 'pt-60', 'top-0', 'z-0');
      //           frames.classList.add('top-50', 'h-50', 'w-100');
      //         }

      //         // Toggle button icon
      //         expandBtn.innerHTML = isExpanded ? expandIcon : contractIcon;
      //         isExpanded = !isExpanded;
      //       });

      //Slider change vh of iframes div
      if (document.getElementById('vh-slider-iframe')) {
        const slider = document.getElementById('vh-slider-iframe');
        const targetDiv = document.getElementById('iframes-div');
        const editorsDiv = document.getElementById('editors-preview');

        slider.addEventListener('input', () => {
          const value = slider.value;
          const upsideDownValue = (value - 45) * -1
          targetDiv.style.setProperty('height', `${value}vh`, 'important');
          editorsDiv.style.setProperty('height', `${upsideDownValue + 45}vh`, 'important');
        });
      }

      //Slider width for editor div
      document.querySelectorAll('.slider-width').forEach(slider => {
        const targetId = slider.getAttribute('for');
        const targetBgColor = slider.getAttribute('color');
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return; // Skip if no target found

        // Event listener for input change
        slider.addEventListener('input', () => {
          const value = slider.value; // e.g. 50
          // Apply flex-basis using calc with a gap adjustment
          targetEl.style.setProperty('flex-basis', `calc(${value}% - 1rem)`, 'important');
          const content = targetEl.querySelector('.content-of-editor');
          const inputWidth = targetEl.querySelector('.slider-width')
          const miniContent = targetEl.querySelector('.content-of-editor-min');

          miniContent.addEventListener('click', function () {
            targetEl.style.setProperty('flex-basis', `calc(100% - 1rem)`, 'important');
            const resizeObserver = new ResizeObserver(entries => {
              for (let entry of entries) {
                if (entry.target.offsetWidth >= 200) {
                  // content.classList.remove('visually-hidden');
                  content.classList.remove('d-none');
                  content.classList.add('d-flex');
                  inputWidth.value = 100;
                  miniContent.classList.remove('d-flex');
                  miniContent.classList.add('d-none');
                  resizeObserver.disconnect();
                  document.querySelectorAll('.editor-section').forEach(section => {
                    observerWidthEditor.observe(section);
                  });
                }
              }
            });
            resizeObserver.observe(targetEl);
          });

          if (inputWidth.value < 10) {
            targetEl.style.setProperty('flex-basis', `calc(5% - 1rem)`, 'important');
            // content.classList.add('visually-hidden')
            content.classList.add('d-none');
            content.classList.remove('d-flex');
            miniContent.classList.remove('d-none')
            miniContent.classList.add('d-flex')
            miniContent.classList.add(targetBgColor)
          } else {
            // content.classList.remove('visually-hidden')
            content.classList.remove('d-none');
            content.classList.add('d-flex');
            miniContent.classList.remove('d-flex')
            miniContent.classList.add('d-none')
          }
        });

      });


      //Section width
      const observerWidthEditor = new ResizeObserver(entries => {
        entries.forEach(entry => {
          const section = entry.target;
          const width = entry.contentRect.width;

          const content = section.querySelector('.content-of-editor');
          const miniContent = section.querySelector('.content-of-editor-min');

          // Get background color class from related slider
          const slider = document.querySelector(`.slider-width[for="${section.id}"]`);
          const targetBgColor = slider?.getAttribute('color') || '';

          if (width < 120) {
            section.style.setProperty('flex-basis', `calc(5% - 1rem)`, 'important');
            // content?.classList.add('visually-hidden');
            content?.classList.remove('d-flex');
            content?.classList.add('d-none');
            miniContent?.classList.remove('d-none');
            miniContent?.classList.add('d-flex');
            if (targetBgColor) miniContent?.classList.add(targetBgColor);
            observerWidthEditor.disconnect()
          }
        });
      });

      document.querySelectorAll('.editor-section').forEach(section => {
        observerWidthEditor.observe(section);
      });

      //Section width


      //Slider height bug
      const divSliderOptions = document.getElementById("divSliderOptions");
      const container = document.getElementById("iframes-div");
      const resizeObserverSlider = new ResizeObserver(entries => {
        for (let entry of entries) {
          const heightStr = window.getComputedStyle(entry.target).height;
          const heightPx = parseFloat(heightStr);
          const heightVh = (heightPx / window.innerHeight) * 100;

          if (heightVh <= 5) {
            divSliderOptions.classList.add("position-fixed", "bottom-0", "start-0", "w-100");
            document.getElementById('editor-row-container').style.paddingBottom = '10vh'
          } else {
            divSliderOptions.classList.remove("position-fixed", "bottom-0", "start-0", "w-100");
            document.getElementById('editor-row-container').style.paddingBottom = ''
          }
        }
      });
      resizeObserverSlider.observe(container);
      //Slider height bug



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

      // Config
      document.getElementById('configLink').addEventListener('click', function () {
        let photo = document.getElementById('config')
        photo.style.pointerEvents = 'all';
        photo.style.opacity = 1
      })

      document.getElementById('closeConfig').addEventListener('click', function () {
        let photo = document.getElementById('config')
        photo.style.pointerEvents = 'none'
        photo.style.opacity = 0
      })

      // Tags
      document.getElementById('tagsLink').addEventListener('click', function () {
        let tag = document.getElementById('tags')
        tag.style.pointerEvents = 'all';
        tag.style.opacity = 1
      })

      document.getElementById('closeTags').addEventListener('click', function () {
        let tag = document.getElementById('tags')
        tag.style.pointerEvents = 'none'
        tag.style.opacity = 0
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

      function checkForDuplicatesAndToggleButton() {
        const buttonScript = document.getElementById('buttonInsertScript');
        const allInputs = [
          ...document.querySelectorAll('#htmlInputs input'),
          ...document.querySelectorAll('#cssInputs input'),
          ...document.querySelectorAll('#jsInputs input')
        ];

        const hasDuplicate = allInputs.some(input => input.getAttribute('duplicated') === 'true');
        buttonScript.disabled = hasDuplicate;
      }
      // Config stufs
      function addInput(containerId) {
        const container = document.getElementById(containerId);
        let inputDefaultValue = ""

        // Create wrapper div
        const wrapper = document.createElement('div');
        wrapper.className = 'd-flex flex-row justify-content-center align-items-baseline';

        // Create input
        const input = document.createElement('input');
        input.type = 'text';
        input.className = `form-control mb-1 ${containerId}Values`;

        if (containerId == 'jsInputs') {
          inputDefaultValue = '<script src="https://example.com/styles.css"></script>'
        }
        else if (containerId == 'cssInputs') {
          inputDefaultValue = '<link rel="stylesheet" href="https://example.com/styles.css">'
        }
        else {
          inputDefaultValue = '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
        }

        input.value = inputDefaultValue;
        input.placeholder = 'Enter link or tag';
        input.setAttribute('duplicated', 'false');
        input.setAttribute('actual-value', '');
        input.addEventListener('input', function () {
          const arrayValues = Array.from(document.querySelectorAll(`#${containerId} input`)).map(el => el.value.trim());
          const duplicateCount = arrayValues.filter(val => val === this.value.trim()).length;

          if (this.value.trim() != "" && duplicateCount > 1) {
            this.style.border = '1px solid red'
            input.setAttribute('duplicated', 'true');
            showErrorPopup("Tag already added!")
          }

          else {
            this.style.border = ''
            input.setAttribute('duplicated', 'false');
          }

          checkForDuplicatesAndToggleButton()
        })

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-sm btn-danger m-1';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.onclick = () => {
          const searchText = input.value.trim();
          const doc = window.htmlEditor.state.doc;
          const fullText = doc.toString();
          const index = fullText.indexOf(searchText);

          if (index !== -1) {
            //from: index → Start of the deletion (position of the first character of the word).
            // to: index + deleteLength → End of the deletion (just after the last character of the word).
            // insert: "" → Replaces that range with an empty string, effectively deleting it.
            const deleteLength = searchText.length;
            window.htmlEditor.dispatch({
              changes: {
                from: index,
                to: index + deleteLength,
                insert: ""
              }
            });
          } else {
            console.warn("Text not found in editor.");
          }

          wrapper.remove();
          checkForDuplicatesAndToggleButton()
        };


        wrapper.appendChild(input);
        wrapper.appendChild(deleteBtn);
        container.appendChild(wrapper);
      }
      window.addInput = addInput

      function injectScriptsOnly() {
        const jsInputs = Array.from(document.querySelectorAll('#jsInputs input'))
          .map(input => input.value.trim())
          .filter(Boolean);

        const cssInputs = Array.from(document.querySelectorAll('#cssInputs input'))
          .map(input => input.value.trim())
          .filter(Boolean);

        const htmlInputs = Array.from(document.querySelectorAll('#htmlInputs input'))
          .map(input => input.value.trim())
          .filter(Boolean);

        const allInputs = [
          ...document.querySelectorAll('#htmlInputs input'),
          ...document.querySelectorAll('#cssInputs input'),
          ...document.querySelectorAll('#jsInputs input')
        ];

        allInputs.forEach(element => {
          const searchText = element.getAttribute('actual-value')
          const doc = window.htmlEditor.state.doc;
          const fullText = doc.toString();
          const index = fullText.indexOf(searchText);

          if (index !== -1) {
            const deleteLength = searchText.length;
            window.htmlEditor.dispatch({
              changes: {
                from: index,
                to: index + deleteLength,
                insert: ""
              }
            });
          }

          element.setAttribute('actual-value', element.value)
        })

        // Your additional content to add at the top
        const content = window.htmlEditor.state.doc.toString();
        let final = ""
        const newJS = jsInputs.join(`\n`)
        const newCSS = cssInputs.join(`\n`)
        const newHTML = htmlInputs.join(`\n`)

        if ((content.indexOf(newJS) != -1) == false && newJS != "") {
          final = final + newJS
        }

        if ((content.indexOf(newCSS) != -1) == false && newCSS != "") {
          final = final + newCSS
        }

        if ((content.indexOf(newHTML) != -1) == false && newHTML != "") {
          final = final + newHTML
        }

        // Create the updated content
        const updatedContent = final + window.htmlEditor.state.doc.toString();

        // Replace the entire content in the editor
        window.htmlEditor.dispatch({
          changes: {
            from: 0,
            to: window.htmlEditor.state.doc.length,
            insert: updatedContent
          }
        });


      }
      window.injectScriptsOnly = injectScriptsOnly;

      document.getElementById('closeConfig').addEventListener('click', () => {
        const config = document.getElementById('config');
        config.style.pointerEvents = 'all'
        config.style.opacity = '0';
        config.style.pointerEvents = 'none';
      });

      //Type module
      document.getElementById("jsTypeModule").addEventListener("click", function () {
        const checkbox = document.getElementById("useModule");
        checkbox.checked = !checkbox.checked;
        updatePreview()

        if (checkbox.checked) {
          document.getElementById('svgTypeModule').style.fill = 'lime'
          document.getElementById('svgTypeModule').setAttribute('fill', 'lime')
        } else {
          document.getElementById('svgTypeModule').style.fill = 'red'
          document.getElementById('svgTypeModule').setAttribute('fill', 'red')
        }
      });

      //Add padding bottom when div projects scroll is in end
      document.getElementById('editors-preview').addEventListener('scroll', function () {
        const isAtBottom = this.scrollHeight - this.scrollTop === this.clientHeight;
        if (isAtBottom) {
          this.style.marginTop = '0px'
        }
        else {
          this.style.marginTop = '60px'
        }
      })

      //Hover svg
      const svgElement = document.getElementById('svgTypeModule');
      svgElement.addEventListener('mouseenter', () => {
        if (document.getElementById('svgTypeModule').getAttribute('fill') === 'lime') {
          showSuccessPopup("Type module activated!");
        }
        else {
          showErrorPopup("Type module deactivated!");
        }
      });



      //Tag system
      if (document.getElementById('tags')) {
        const tagInput = document.getElementById("tagInput");
        const tagsContainer = document.getElementById("tagsContainer");
        const textTags = document.getElementById('tagsProjectText')

        let tags = [];

        const addTagBtn = document.getElementById("addTagBtn");

        addTagBtn.addEventListener("click", () => {
          const newTag = tagInput.value.trim();
          if (newTag && !tags.includes(newTag)) {
            tags.push(newTag);
            addTagElement(newTag);
            tagInput.value = "";
          }
        });

        tagInput.addEventListener("keypress", function (e) {
          if (e.key === "Enter") {
            e.preventDefault();
            const newTag = tagInput.value.trim();
            if (newTag && !tags.includes(newTag)) {
              tags.push(newTag);
              addTagElement(newTag);
              tagInput.value = "";
            }
          }
        });

        function addTagElement(tagText) {
          const tagEl = document.createElement("div");
          tagEl.className = "badge bg-secondary d-flex align-items-center gap-2 px-2 py-1";
          tagEl.innerHTML = `
                <span>${tagText}</span>
                <button type="button" class="btn-close btn-close-white btn-sm" aria-label="Remove"></button>
            `;

          tagEl.querySelector("button").addEventListener("click", () => {
            tags = tags.filter(t => t !== tagText);
            tagEl.remove();
            textTags.innerText = tags.join(",")
          });

          tagsContainer.appendChild(tagEl);
          textTags.innerText = tags.join(",")

        }

      }

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
        document.getElementById('imageProfile').classList.remove('d-none')
      } else {
        alert('Failed to load profile');
        showErrorPopup()
      }
    } catch (error) {
      console.error(error);
      alert('Error loading profile');
      showErrorPopup()
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
      const tags = document.getElementById('tagsProjectText').textContent


      if (titleContent.trim() === "") {
        showErrorPopup("Title is empty!");
        return;
      }
      if (descriptionContent.trim() === "") {
        showErrorPopup("Description is empty!");
        return;
      }
      if (jsContent.trim() === "") {
        showErrorPopup("Javascript is empty!");
        return;
      }
      if (cssContent.trim() === "") {
        showErrorPopup("CSS is empty!");
        return;
      }
      if (htmlContent.trim() === "") {
        showErrorPopup("HTML is empty!");
        return;
      }
      if (photo.trim() === "" || photo.includes('default-cover-A7fK9x.jpg')) {
        showErrorPopup("Photo is empty!");
        return;
      }

      if (tags.trim() === "") {
        showErrorPopup("Tag is empty!");
        return;
      }

      document.getElementById('projectNameForm').value = titleContent
      document.getElementById('projectDescriptionForm').value = descriptionContent
      document.getElementById('javascriptForm').value = jsContent
      document.getElementById('cssForm').value = cssContent
      document.getElementById('htmlForm').value = htmlContent
      document.getElementById('photoForm').value = photo
      document.getElementById('tagsForm').value = tags
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

      if (document.getElementById('tagsProjectText').textContent.trim() == "") {
        alert('Tag must not be blank')
        return;
      }



      const name = document.getElementById('projectName').value
      const description = window.markdownEditor.state.doc.toString();
      const javascript = window.jsEditor.state.doc.toString();
      const css = window.cssEditor.state.doc.toString();
      const html = window.htmlEditor.state.doc.toString();
      const photo = document.getElementById('cover').src
      const tags = document.getElementById('tagsProjectText').textContent

      showLoadingPopup()
      try {
        await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
          credentials: 'include'
        });
        const csrfToken = decodeURIComponent(getCookie('XSRF-TOKEN'));

        const response = await fetch(`${apiUrl}/user/post-content`, {
          method: 'POST',
          credentials: 'include',        // ← send the session cookie
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-XSRF-TOKEN': csrfToken },
          body: JSON.stringify({ name, description, javascript, css, html, photo, tags })
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
           <html class="user-resize" style="overflow: auto;">
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


      // Resize logic
      const values = [0.25, 0.75, 1, 1.25, 1.75, 2];
      let currentIndex = 2;

      document.getElementById('cycle-btn').addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % values.length;
        const value = values[currentIndex];
        this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-zoom-in" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
  <path d="M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z"/>
  <path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5"/>
</svg> ${value}`

        // Array of iframe IDs
        const iframeIds = ['iframeA', 'iframeB'];

        iframeIds.forEach(id => {
          const iframe = document.getElementById(id);
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

          if (iframeDoc) {
            const elements = iframeDoc.querySelectorAll('.user-resize');
            elements.forEach(el => {
              el.style.transform = `scale(${value})`;
            });
          }
        });
      });


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
          doc: ``,
          extensions: [basicSetup, javascript(), oneDark, EditorView.lineWrapping]

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
          extensions: [basicSetup, css(), oneDark, EditorView.lineWrapping]
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
          extensions: [basicSetup, html(), oneDark, EditorView.lineWrapping]
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
          extensions: [basicSetup, markdown(), oneDark, EditorView.lineWrapping],
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

      //       //Expand (Now we have range bar for this)
      //       const expandBtn = document.getElementById('expand');
      //       const frames = document.getElementById('iframes-div')
      //       let isExpanded = false;
      //       const expandIcon = `
      //  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
      //    <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707"/>
      //  </svg>`;
      //       const contractIcon = `
      //  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-contract" viewBox="0 0 16 16">
      //    <path fill-rule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707M15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707"/>
      //  </svg>`;
      //       expandBtn.addEventListener('click', function () {

      //         if (!isExpanded) {
      //           // Expand view
      //           frames.classList.remove('top-50', 'h-50', 'w-100');
      //           frames.classList.add('vw-100', 'vh-100', 'pt-60', 'top-0', 'z-0');
      //         } else {
      //           // Collapse view (return to original state)
      //           frames.classList.remove('vw-100', 'vh-100', 'pt-60', 'top-0', 'z-0');
      //           frames.classList.add('top-50', 'h-50', 'w-100');
      //         }

      //         // Toggle button icon
      //         expandBtn.innerHTML = isExpanded ? expandIcon : contractIcon;
      //         isExpanded = !isExpanded;
      //       });

      //Slider change vh of iframes div
      if (document.getElementById('vh-slider-iframe')) {
        const slider = document.getElementById('vh-slider-iframe');
        const targetDiv = document.getElementById('iframes-div');
        const editorsDiv = document.getElementById('editors-preview');

        slider.addEventListener('input', () => {
          const value = slider.value;
          const upsideDownValue = (value - 45) * -1
          targetDiv.style.setProperty('height', `${value}vh`, 'important');
          editorsDiv.style.setProperty('height', `${upsideDownValue + 45}vh`, 'important');
        });
      }

      //Slider width for editor div
      document.querySelectorAll('.slider-width').forEach(slider => {
        const targetId = slider.getAttribute('for');
        const targetBgColor = slider.getAttribute('color');
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return; // Skip if no target found

        // Event listener for input change
        slider.addEventListener('input', () => {
          const value = slider.value; // e.g. 50
          // Apply flex-basis using calc with a gap adjustment
          targetEl.style.setProperty('flex-basis', `calc(${value}% - 1rem)`, 'important');
          const content = targetEl.querySelector('.content-of-editor');
          const inputWidth = targetEl.querySelector('.slider-width')
          const miniContent = targetEl.querySelector('.content-of-editor-min');

          miniContent.addEventListener('click', function () {
            targetEl.style.setProperty('flex-basis', `calc(100% - 1rem)`, 'important');
            const resizeObserver = new ResizeObserver(entries => {
              for (let entry of entries) {
                if (entry.target.offsetWidth >= 200) {
                  // content.classList.remove('visually-hidden');
                  content.classList.remove('d-none');
                  content.classList.add('d-flex');
                  inputWidth.value = 100;
                  miniContent.classList.remove('d-flex');
                  miniContent.classList.add('d-none');
                  resizeObserver.disconnect();
                  document.querySelectorAll('.editor-section').forEach(section => {
                    observerWidthEditor.observe(section);
                  });
                }
              }
            });
            resizeObserver.observe(targetEl);
          });

          if (inputWidth.value < 10) {
            targetEl.style.setProperty('flex-basis', `calc(5% - 1rem)`, 'important');
            // content.classList.add('visually-hidden')
            content.classList.add('d-none');
            content.classList.remove('d-flex');
            miniContent.classList.remove('d-none')
            miniContent.classList.add('d-flex')
            miniContent.classList.add(targetBgColor)
          } else {
            // content.classList.remove('visually-hidden')
            content.classList.remove('d-none');
            content.classList.add('d-flex');
            miniContent.classList.remove('d-flex')
            miniContent.classList.add('d-none')
          }
        });

      });


      //Section width
      const observerWidthEditor = new ResizeObserver(entries => {
        entries.forEach(entry => {
          const section = entry.target;
          const width = entry.contentRect.width;

          const content = section.querySelector('.content-of-editor');
          const miniContent = section.querySelector('.content-of-editor-min');

          // Get background color class from related slider
          const slider = document.querySelector(`.slider-width[for="${section.id}"]`);
          const targetBgColor = slider?.getAttribute('color') || '';

          if (width < 120) {
            section.style.setProperty('flex-basis', `calc(5% - 1rem)`, 'important');
            // content?.classList.add('visually-hidden');
            content?.classList.remove('d-flex');
            content?.classList.add('d-none');
            miniContent?.classList.remove('d-none');
            miniContent?.classList.add('d-flex');
            if (targetBgColor) miniContent?.classList.add(targetBgColor);
            observerWidthEditor.disconnect()
          }
        });
      });

      document.querySelectorAll('.editor-section').forEach(section => {
        observerWidthEditor.observe(section);
      });

      //Section width


      //Slider height bug
      const divSliderOptions = document.getElementById("divSliderOptions");
      const container = document.getElementById("iframes-div");
      const resizeObserverSlider = new ResizeObserver(entries => {
        for (let entry of entries) {
          const heightStr = window.getComputedStyle(entry.target).height;
          const heightPx = parseFloat(heightStr);
          const heightVh = (heightPx / window.innerHeight) * 100;

          if (heightVh <= 5) {
            divSliderOptions.classList.add("position-fixed", "bottom-0", "start-0", "w-100");
            document.getElementById('editor-row-container').style.paddingBottom = '10vh'
          } else {
            divSliderOptions.classList.remove("position-fixed", "bottom-0", "start-0", "w-100");
            document.getElementById('editor-row-container').style.paddingBottom = ''
          }
        }
      });
      resizeObserverSlider.observe(container);
      //Slider height bug



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

      // Config
      document.getElementById('configLink').addEventListener('click', function () {
        let photo = document.getElementById('config')
        photo.style.pointerEvents = 'all';
        photo.style.opacity = 1
      })

      document.getElementById('closeConfig').addEventListener('click', function () {
        let photo = document.getElementById('config')
        photo.style.pointerEvents = 'none'
        photo.style.opacity = 0
      })

      // Tags
      document.getElementById('tagsLink').addEventListener('click', function () {
        let tag = document.getElementById('tags')
        tag.style.pointerEvents = 'all';
        tag.style.opacity = 1
      })

      document.getElementById('closeTags').addEventListener('click', function () {
        let tag = document.getElementById('tags')
        tag.style.pointerEvents = 'none'
        tag.style.opacity = 0
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

      function checkForDuplicatesAndToggleButton() {
        const buttonScript = document.getElementById('buttonInsertScript');
        const allInputs = [
          ...document.querySelectorAll('#htmlInputs input'),
          ...document.querySelectorAll('#cssInputs input'),
          ...document.querySelectorAll('#jsInputs input')
        ];

        const hasDuplicate = allInputs.some(input => input.getAttribute('duplicated') === 'true');
        buttonScript.disabled = hasDuplicate;
      }
      // Config stufs
      function addInput(containerId) {
        const container = document.getElementById(containerId);
        let inputDefaultValue = ""

        // Create wrapper div
        const wrapper = document.createElement('div');
        wrapper.className = 'd-flex flex-row justify-content-center align-items-baseline';

        // Create input
        const input = document.createElement('input');
        input.type = 'text';
        input.className = `form-control mb-1 ${containerId}Values`;

        if (containerId == 'jsInputs') {
          inputDefaultValue = '<script src="https://example.com/styles.css"></script>'
        }
        else if (containerId == 'cssInputs') {
          inputDefaultValue = '<link rel="stylesheet" href="https://example.com/styles.css">'
        }
        else {
          inputDefaultValue = '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
        }

        input.value = inputDefaultValue;
        input.placeholder = 'Enter link or tag';
        input.setAttribute('duplicated', 'false');
        input.setAttribute('actual-value', '');
        input.addEventListener('input', function () {
          const arrayValues = Array.from(document.querySelectorAll(`#${containerId} input`)).map(el => el.value.trim());
          const duplicateCount = arrayValues.filter(val => val === this.value.trim()).length;

          if (this.value.trim() != "" && duplicateCount > 1) {
            this.style.border = '1px solid red'
            input.setAttribute('duplicated', 'true');
            showErrorPopup("Tag already added!")
          }

          else {
            this.style.border = ''
            input.setAttribute('duplicated', 'false');
          }

          checkForDuplicatesAndToggleButton()
        })

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-sm btn-danger m-1';
        deleteBtn.innerHTML = '&times;';
        deleteBtn.onclick = () => {
          const searchText = input.value.trim();
          const doc = window.htmlEditor.state.doc;
          const fullText = doc.toString();
          const index = fullText.indexOf(searchText);

          if (index !== -1) {
            //from: index → Start of the deletion (position of the first character of the word).
            // to: index + deleteLength → End of the deletion (just after the last character of the word).
            // insert: "" → Replaces that range with an empty string, effectively deleting it.
            const deleteLength = searchText.length;
            window.htmlEditor.dispatch({
              changes: {
                from: index,
                to: index + deleteLength,
                insert: ""
              }
            });
          } else {
            console.warn("Text not found in editor.");
          }

          wrapper.remove();
          checkForDuplicatesAndToggleButton()
        };


        wrapper.appendChild(input);
        wrapper.appendChild(deleteBtn);
        container.appendChild(wrapper);
      }
      window.addInput = addInput

      function injectScriptsOnly() {
        const jsInputs = Array.from(document.querySelectorAll('#jsInputs input'))
          .map(input => input.value.trim())
          .filter(Boolean);

        const cssInputs = Array.from(document.querySelectorAll('#cssInputs input'))
          .map(input => input.value.trim())
          .filter(Boolean);

        const htmlInputs = Array.from(document.querySelectorAll('#htmlInputs input'))
          .map(input => input.value.trim())
          .filter(Boolean);

        const allInputs = [
          ...document.querySelectorAll('#htmlInputs input'),
          ...document.querySelectorAll('#cssInputs input'),
          ...document.querySelectorAll('#jsInputs input')
        ];

        allInputs.forEach(element => {
          const searchText = element.getAttribute('actual-value')
          const doc = window.htmlEditor.state.doc;
          const fullText = doc.toString();
          const index = fullText.indexOf(searchText);

          if (index !== -1) {
            const deleteLength = searchText.length;
            window.htmlEditor.dispatch({
              changes: {
                from: index,
                to: index + deleteLength,
                insert: ""
              }
            });
          }

          element.setAttribute('actual-value', element.value)
        })

        // Your additional content to add at the top
        const content = window.htmlEditor.state.doc.toString();
        let final = ""
        const newJS = jsInputs.join(`\n`)
        const newCSS = cssInputs.join(`\n`)
        const newHTML = htmlInputs.join(`\n`)

        if ((content.indexOf(newJS) != -1) == false && newJS != "") {
          final = final + newJS
        }

        if ((content.indexOf(newCSS) != -1) == false && newCSS != "") {
          final = final + newCSS
        }

        if ((content.indexOf(newHTML) != -1) == false && newHTML != "") {
          final = final + newHTML
        }

        // Create the updated content
        const updatedContent = final + window.htmlEditor.state.doc.toString();

        // Replace the entire content in the editor
        window.htmlEditor.dispatch({
          changes: {
            from: 0,
            to: window.htmlEditor.state.doc.length,
            insert: updatedContent
          }
        });


      }
      window.injectScriptsOnly = injectScriptsOnly;

      document.getElementById('closeConfig').addEventListener('click', () => {
        const config = document.getElementById('config');
        config.style.pointerEvents = 'all'
        config.style.opacity = '0';
        config.style.pointerEvents = 'none';
      });

      //Type module
      document.getElementById("jsTypeModule").addEventListener("click", function () {
        const checkbox = document.getElementById("useModule");
        const svg = document.getElementById("jsTypeModule");
        checkbox.checked = !checkbox.checked;
        updatePreview()

        if (checkbox.checked) {
          document.getElementById('svgTypeModule').style.fill = 'lime'
          document.getElementById('svgTypeModule').setAttribute('fill', 'lime')
        } else {
          document.getElementById('svgTypeModule').style.fill = 'red'
          document.getElementById('svgTypeModule').setAttribute('fill', 'red')
        }
      });

      //Add padding bottom when div projects scroll is in end
      document.getElementById('editors-preview').addEventListener('scroll', function () {
        const isAtBottom = this.scrollHeight - this.scrollTop === this.clientHeight;
        if (isAtBottom) {
          this.style.marginTop = '0px'
        }
        else {
          this.style.marginTop = '60px'
        }
      })

      //Hover svg
      const svgElement = document.getElementById('svgTypeModule');
      svgElement.addEventListener('mouseenter', () => {
        if (document.getElementById('svgTypeModule').getAttribute('fill') === 'lime') {
          showSuccessPopup("Type module activated!");
        }
        else {
          showErrorPopup("Type module deactivated!");
        }
      });

      //Tag system
      if (document.getElementById('tags')) {
        const tagInput = document.getElementById("tagInput");
        const tagsContainer = document.getElementById("tagsContainer");
        const textTags = document.getElementById('tagsProjectText')

        let tags = [];

        const addTagBtn = document.getElementById("addTagBtn");

        addTagBtn.addEventListener("click", () => {
          const newTag = tagInput.value.trim();
          if (newTag && !tags.includes(newTag)) {
            tags.push(newTag);
            addTagElement(newTag);
            tagInput.value = "";
          }
        });

        tagInput.addEventListener("keypress", function (e) {
          if (e.key === "Enter") {
            e.preventDefault();
            const newTag = tagInput.value.trim();
            if (newTag && !tags.includes(newTag)) {
              tags.push(newTag);
              addTagElement(newTag);
              tagInput.value = "";
            }
          }
        });

        function addTagElement(tagText) {
          const tagEl = document.createElement("div");
          tagEl.className = "badge bg-secondary d-flex align-items-center gap-2 px-2 py-1";
          tagEl.innerHTML = `
              <span>${tagText}</span>
              <button type="button" class="btn-close btn-close-white btn-sm" aria-label="Remove"></button>
          `;

          tagEl.querySelector("button").addEventListener("click", () => {
            tags = tags.filter(t => t !== tagText);
            tagEl.remove();
            textTags.innerText = tags.join(",")
          });

          tagsContainer.appendChild(tagEl);
          textTags.innerText = tags.join(",")

        }

      }


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

        window.markdownEditor.dispatch({
          changes: { from: 0, to: markdownEditor.state.doc.length, insert: `${data.project.description}` }
        });
        const preview = document.getElementById('markdown-preview');
        const markdownText = `${data.project.description}`;
        const rawHtml = marked.parse(markdownText);
        const cleanHtml = DOMPurify.sanitize(rawHtml);
        preview.innerHTML = cleanHtml

        preview.querySelectorAll('pre code').forEach(block => {
          hljs.highlightElement(block);
        });

        document.getElementById('projectName').value = `${data.project.name}`
        document.getElementById('nameUserProfile').innerText = `${data.userName}`
        document.getElementById('imageProfile').src = `${serverStorage}${data.userImage}`
        document.getElementById('userLinkProfile').href = `member.html?slug=${data.userSlug}`
        document.getElementById('cover').src = `${serverStorage}${data.project.photo}`

        //Fill the tags
        const tagInput = document.getElementById('tagInput')
        const addTagBtn = document.getElementById('addTagBtn')
        const tags = data.project.tags.split(',').map(tag => tag.trim());
        tags.forEach(element => {
          tagInput.value = element
          addTagBtn.click()
          tagInput.value = ""
        })

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
      const descriptionContent = window.markdownEditor.state.doc.toString();
      const jsContent = window.jsEditor.state.doc.toString();
      const cssContent = window.cssEditor.state.doc.toString();
      const htmlContent = window.htmlEditor.state.doc.toString();
      const photo = document.getElementById('cover').src.replace(serverStorage, "");
      const tags = document.getElementById('tagsProjectText').textContent

      //Formatted as it is by user
      // console.log(jsContent);

      if (titleContent.trim() === "") {
        showErrorPopup("Title is empty!");
        return;
      }
      if (descriptionContent.trim() === "") {
        showErrorPopup("Description is empty!");
        return;
      }
      if (jsContent.trim() === "") {
        showErrorPopup("Javascript is empty!");
        return;
      }
      if (cssContent.trim() === "") {
        showErrorPopup("CSS is empty!");
        return;
      }
      if (htmlContent.trim() === "") {
        showErrorPopup("HTML is empty!");
        return;
      }
      if (photo.trim() === "") {
        showErrorPopup("Photo is empty!");
        return;
      }

      if (tags.trim() === "") {
        showErrorPopup("Tag is empty!");
        return;
      }

      document.getElementById('projectNameForm').value = titleContent
      document.getElementById('projectDescriptionForm').value = descriptionContent
      document.getElementById('javascriptForm').value = (jsContent);
      document.getElementById('cssForm').value = cssContent
      document.getElementById('htmlForm').value = htmlContent
      document.getElementById('photoForm').value = photo
      document.getElementById('tagsForm').value = tags


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

      if (document.getElementById('tagsProjectText').textContent.trim() == "") {
        alert('Tag must not be blank')
        return;
      }





      const name = document.getElementById('projectName').value
      const description = window.markdownEditor.state.doc.toString();
      const javascript = window.jsEditor.state.doc.toString();
      const css = window.cssEditor.state.doc.toString();
      const html = window.htmlEditor.state.doc.toString();
      const photo = document.getElementById('cover').src.replace(serverStorage, "");
      const tags = document.getElementById('tagsProjectText').textContent


      showLoadingPopup()
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
          body: JSON.stringify({ name, description, javascript, css, html, photo, tags })
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

    }

    let userAssets = ""
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
        showSuccessPopup()
        document.getElementById('name').innerText = `${data.user.name}`;
        document.getElementById('email').innerText = `${data.user.email}`;
        document.getElementById('photo').src = `${serverStorage}${data.user.photo}`
        userAssets = data

        // document.getElementById('backgroundPhoto').src = `${serverStorage}${data.user.photo}`


        document.getElementById('photo').classList.remove('d-none')
      } else {
        alert('Listeninig member failed: ' + data.message);
        alert('Listeninig member failed: ' + data.error);
        showErrorPopup()
      }
    } catch (error) {
      alert('Listeninig member failed: ' + error.message);
      showErrorPopup()
    }
    finally {
      hideLoadingPopup()
    }


    //Heart filled logic
    const heartToggle = document.getElementById('heartToggle');
    const heartIcon = document.getElementById('heartIcon');
    let isFollowing = userAssets.user.followed


    let isFilled = isFollowing
    heartToggle.addEventListener('click', async function (e) {
      e.preventDefault(); // Prevent navigation

      if (isFilled) {
        const result = await follow()
        if (result == false) {
          alert('An error occured or Create an account to interact with users and posts')
          showErrorPopup()
        }
        else {
          heartIcon.setAttribute('class', 'bi bi-heart');
          heartIcon.setAttribute('local', 'https://icons.getbootstrap.com/icons/heart/');
          heartIcon.innerHTML = `
                 <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
             `;
        }
      } else {
        const result = await follow()
        if (result == false) {
          alert('An error occured or Create an account to interact with users and posts')
          showErrorPopup()
        }
        else {
          heartIcon.setAttribute('class', 'bi bi-heart-fill');
          heartIcon.setAttribute('local', 'https://icons.getbootstrap.com/icons/heart-fill/');
          heartIcon.innerHTML = `
                   <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
               `;
        }
      }

      isFilled = !isFilled;
    });

    //Api to registering the follow system
    async function follow() {
      let result = ""
      const userSlug = new URLSearchParams(window.location.search).get('slug');
      showLoadingPopup()
      try {
        await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
          credentials: 'include'
        });
        const csrfToken = decodeURIComponent(getCookie('XSRF-TOKEN'));

        const response = await fetch(`${apiUrl}/user/followUser/${userSlug}`, {
          method: 'POST',
          credentials: 'include',        // ← send the session cookie
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-XSRF-TOKEN': csrfToken },
          body: JSON.stringify({})
        });

        const data = await response.json();
        if (response.ok) {
          alert('Following user went successfully: ' + data.message);
          document.getElementById('message').innerText = data.message;
          showSuccessPopup()
          result = true

        } else {
          alert('Following user failed: ' + data.message);
          alert('Following user failed: ' + data.error);
          document.getElementById('message').innerText = `${data.message}: ${data.error}` || 'An unknown error occurred';
          showErrorPopup()
          result = false
        }
      } catch (error) {
        alert('Following user failed: ' + error);
        document.getElementById('message').innerText = error.message || 'An unknown error occurred';
        showErrorPopup()
        result = false
      }
      finally {
        hideLoadingPopup()
      }
      return result;
    }

    //Check if user is already following the current user
    if (isFollowing) {
      heartIcon.setAttribute('class', 'bi bi-heart-fill');
      heartIcon.setAttribute('local', 'https://icons.getbootstrap.com/icons/heart-fill/');
      heartIcon.innerHTML = `
          <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
      `;

    }
    else {
      heartIcon.setAttribute('class', 'bi bi-heart');
      heartIcon.setAttribute('local', 'https://icons.getbootstrap.com/icons/heart/');
      heartIcon.innerHTML = `
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
        `;
    }

  }


  //Member public posts
  if (document.getElementById('listProjects')) {
    let arrayUserProjects = []
    let tags = []

    getAllUserProjects()
    async function getAllUserProjects() {
      showLoadingPopup()
      try {
        const slug = new URLSearchParams(window.location.search).get('slug');
        const response = await fetch(`${apiUrl}/projects/user?slug=${slug}`, {
          credentials: 'include',        // ← send the session cookie
          headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', }
        });

        const data = await response.json();
        console.log(`${apiUrl}/projects/user?slug=${slug}`);


        if (response.ok) {
          alert('Getting all projects from user successfully: ' + data.message);
          showSuccessPopup()
          data.projects.forEach(element => {
            arrayUserProjects.push(element)
          });
          displayProjects()
        } else {
          alert('Getting all projects from user failed: ' + data.message);
          alert('Getting all projects from user failed: ' + data.error);
          showErrorPopup()
        }
      } catch (error) {
        alert('Getting all projects from user failed: ' + error.message);
        showErrorPopup()
      }
      finally {
        hideLoadingPopup()
      }
    }

    //Display projects
    function displayProjects() {
      if (document.getElementById('projects')) {
        let projectsTable = document.getElementById('listProjects')

        for (let i = 0; i < arrayUserProjects.length; i++) {
          let projectName = arrayUserProjects[i].name;
          let projectDescription = arrayUserProjects[i].description;
          let projectSlug = arrayUserProjects[i].slug
          let projectPhoto = arrayUserProjects[i].photo
          let projectTags = arrayUserProjects[i].tags
          let projectLikes = arrayUserProjects[i].likes
          let projectViews = arrayUserProjects[i].views
          let isLiked = arrayUserProjects[i].liked

          let userName = document.getElementById('name').textContent
          let userEmail = document.getElementById('email').textContent
          let userSlug = new URLSearchParams(window.location.search).get('slug');
          let userPhoto = document.getElementById('photo').src.replace(serverStorage, "");

          const imageId = `image-cover-${userSlug}-${projectSlug}`;
          const wrapperId = `image-wrapper-${userSlug}-${projectSlug}`;
          const wrapperFullScreenId = `image-wrapper-fullscreen-${userSlug}-${projectSlug}`;

          projectsTable.insertAdjacentHTML("beforeend", `
            <div id="main-div-${userSlug}-${projectSlug}" class="p-2 d-flex justify-content-center align-items-center text-center flex-column motherCard bg-body-secondary border border-1 rounded m-1 postBody">
            
        
              
         
  
           <div class="d-flex flex-column align-items-start text-start rounded w-100 h-auto m-1 p-3" style="">
  
             <div class="d-flex w-100 justify-content-center form-check form-switch mb-3">
              <input class="form-check-input cursor-pointer" style="" type="checkbox" id="checkNativeSwitch-${userSlug}-${projectSlug}">
              </div>
  
           <div id="${wrapperId}" class="position-relative w-100 rounded ratio-16x9" style="">
                <a class="position-absolute w-100 h-100 z-2 nav-link linkElement rounded cursor-pointer" href="project.html?slug=${userSlug}&projectSlug=${projectSlug}"></a>
                <img src="${serverStorage}${projectPhoto}" id="${imageId}" style="" class="w-100 h-100 object-fit-cover rounded" alt="">
              </div>
  
  
  <!-- Project Info Section -->
  
  <div class="w-100 flex-row mt-4 ms-2 mb-4">
    <h3 style="" class="ws-pre-line">${projectName}</h3>
    <div class="d-flex flex-wrap gap-2 ms-auto" id="tags-${userSlug}-${projectSlug}"></div>
    </div>
  
  
  <div class="bg-body-secondary post" id="markdownOverlay-${userSlug}-${projectSlug}" style="">
  <div class="d-flex flex-row mb-3">
  <!-- Close button at top right -->
  <button id="closeDescription-${userSlug}-${projectSlug}" class="btn btn-danger me-2" style="">
    <svg xmlns="http://www.w3.org/2000/svg" local="https://icons.getbootstrap.com/icons/x-lg/" width="30" height="30" fill="white" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
    </svg>
  </button>
  
  <!-- Expand project at top right -->
  <button id="expandProject-${userSlug}-${projectSlug}" class="btn btn-primary me-2" style="">
    <svg xmlns="http://www.w3.org/2000/svg" local="https://icons.getbootstrap.com/icons/arrows-angle-expand/" width="30" height="30" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707"/>
  </svg>
  </button>
  </div>
  
  <!-- User Info -->
      <div style="" class="mt-auto ms-auto me-auto w-100 user-info-mdo">
        <img src="${serverStorage}${userPhoto}" width="145px" height="145px" class="object-fit-cover rounded-pill border img-user-project-full-layout" alt="${userName}" style="" />
        <div>
          <a href="member.html?slug=${userSlug}" class="m-0 fw-bold fs-6 text-decoration-none" style="">${userName}</a>
          <p class="m-0 fs-6" style="">${userEmail}</p>
        </div>
      </div>
  
  <!-- Container for content -->
  <div class="mb-auto ms-auto me-auto w-100 post-body-content-mdo" style="">
  
  
    <!-- Iframe preview -->
    <div id="${wrapperFullScreenId}" class="post-body-iframe-min-mdo" style="">
    <button type="button" id="minimizeProject-${userSlug}-${projectSlug}" class="btn btn-outline-light d-none position-fixed top-0 start-0 m-1 mix-dif">
                <svg xmlns="http://www.w3.org/2000/svg" local="https://icons.getbootstrap.com/icons/arrows-angle-contract/" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-contract" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707M15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707"></path>
  </svg>
              
              </button>
    </div>
  
    <!-- Markdown content -->
    <div style="" class="scrollbar-thin border post-body-md-mdo d-none">
      <div id="markdown-content-${userSlug}-${projectSlug}" class="scrollbar-thin fs-6"></div>
    </div>
  
  </div>
  </div>
  
  
    <div class="d-flex align-items-center gap-2 mb-3" style="">
        <img src="${serverStorage}${userPhoto}" width="65px" height="65px" class="border object-fit-cover rounded-pill img-user-project-layout" alt="${userName}" style="">
        <div>
          <a href="member.html?slug=${userSlug}" class="m-0 fw-bold fs-6 text-decoration-none" style="">${userName}</a>
          <p class="m-0 fs-6" style="">${userEmail}</p>
        </div>
      </div>
  
           <div class="d-flex text-center align-items-center w-100 bg-transparent mt-1 rounded">
                 <a class="btn btn-primary" project-id="${projectSlug}" m-1" href="#" id="heartToggle-${userSlug}-${projectSlug}">
                    <svg id="heartIcon-${userSlug}-${projectSlug}" local="https://icons.getbootstrap.com/icons/heart/" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                          fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                            <path
                             d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                      </svg>
                  </a>
  
                           <!-- Description Button -->
  <button id="openDescription-${userSlug}-${projectSlug}" class="btn btn-success m-1">
  <svg xmlns="http://www.w3.org/2000/svg" local="https://icons.getbootstrap.com/icons/book/" width="16" height="16" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
  <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783"/>
  </svg>
  </button>
  
                  <div class="d-flex me-2 ms-auto justify-content-center align-items-center flex-row">
                  <div class="d-flex justify-content-center align-items-center flex-column text-center p-1">
                      
       <svg xmlns="http://www.w3.org/2000/svg" local="https://icons.getbootstrap.com/icons/person-fill-up/" width="16" height="16" fill="currentColor" class="bi bi-person-fill-up" viewBox="0 0 16 16">
    <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7m.354-5.854 1.5 1.5a.5.5 0 0 1-.708.708L13 11.707V14.5a.5.5 0 0 1-1 0v-2.793l-.646.647a.5.5 0 0 1-.708-.708l1.5-1.5a.5.5 0 0 1 .708 0M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
    <path d="M2 13c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4"/>
  </svg>
              
                    <p class="m-0">${projectViews}</p>
                  </div>
  
                     <div class="d-flex justify-content-center align-items-center flex-column text-center p-1">
                      
                <svg xmlns="http://www.w3.org/2000/svg" local="https://icons.getbootstrap.com/icons/balloon-heart-fill/" width="16" height="16" fill="currentColor" class="bi bi-balloon-heart-fill" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2 2 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.14-.386"/>
  </svg>
              
                    <p class="m-0" id="likesProjects-${userSlug}-${projectSlug}">${projectLikes}</p>
                  </div>
  
                  
            
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
          const jsContent = arrayUserProjects[i].javascript;
          const cssContent = arrayUserProjects[i].css;
          const htmlContent = arrayUserProjects[i].html;

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
          const expandProjectBtn = document.getElementById(`expandProject-${userSlug}-${projectSlug}`);
          const minimizeProjectBtn = document.getElementById(`minimizeProject-${userSlug}-${projectSlug}`)
          const markdownOverlay = document.getElementById(`markdownOverlay-${userSlug}-${projectSlug}`);
          const mainDiv = document.getElementById(`main-div-${userSlug}-${projectSlug}`)

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

          expandProjectBtn.addEventListener('click', function () {
            iframeFullscreen.classList.remove('position-absolute')
            iframeFullscreen.classList.add('position-fixed')
            iframeFullscreen.classList.remove('rounded')
            minimizeProjectBtn.classList.add('z-3')
            minimizeProjectBtn.classList.add('d-flex')
            minimizeProjectBtn.classList.remove('d-none')
          })

          minimizeProjectBtn.addEventListener('click', function () {
            iframeFullscreen.classList.add('position-absolute')
            iframeFullscreen.classList.remove('position-fixed')
            iframeFullscreen.classList.add('rounded')
            minimizeProjectBtn.classList.add('d-none')
            minimizeProjectBtn.classList.remove('d-flex')
            this.classList.remove('z-3')
          })


          //Heart filled logic
          const heartToggle = document.getElementById(`heartToggle-${userSlug}-${projectSlug}`);
          const heartIcon = document.getElementById(`heartIcon-${userSlug}-${projectSlug}`);
          let isFilled = isLiked;
          heartToggle.addEventListener('click', async function (e) {
            e.preventDefault(); // Prevent navigation

            if (isFilled) {
              const result = await likes()
              if (result == false) {
                alert('An error occured or Create an account to interact with users and posts')
                showErrorPopup()
              }
              else {
                heartIcon.setAttribute('class', 'bi bi-heart');
                heartIcon.setAttribute('local', 'https://icons.getbootstrap.com/icons/heart/');
                heartIcon.innerHTML = `
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
              `;
                changeLikeView(true)
              }

            } else {
              const result = await likes()
              if (result == false) {
                alert('An error occured or Create an account to interact with users and posts')
                showErrorPopup()
              }
              else {
                heartIcon.setAttribute('class', 'bi bi-heart-fill');
                heartIcon.setAttribute('local', 'https://icons.getbootstrap.com/icons/heart-fill/');
                heartIcon.innerHTML = `
                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
              `;
                changeLikeView(false)
              }
            }

            isFilled = !isFilled;
          });

          //Api to registering the like system
          async function likes() {
            const heartToggle = document.getElementById(`heartToggle-${userSlug}-${projectSlug}`);
            const projectId = heartToggle.getAttribute('project-id')
            let result = ""
            showLoadingPopup()
            try {
              await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
                credentials: 'include'
              });
              const csrfToken = decodeURIComponent(getCookie('XSRF-TOKEN'));

              const response = await fetch(`${apiUrl}/user/likeContent/${projectId}`, {
                method: 'POST',
                credentials: 'include',        // ← send the session cookie
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'X-XSRF-TOKEN': csrfToken },
                body: JSON.stringify({})
              });

              const data = await response.json();
              if (response.ok) {
                alert('Likeing project successfully: ' + data.message);
                document.getElementById('message').innerText = data.message;
                showSuccessPopup()
                result = true

              } else {
                alert('Likeing project failed: ' + data.message);
                document.getElementById('message').innerText = `${data.message}: ${data.error}` || 'An unknown error occurred';
                showErrorPopup()
                result = false
              }
            } catch (error) {
              alert('Likeing project failed: ' + error);
              document.getElementById('message').innerText = error || 'An unknown error occurred';
              showErrorPopup()
              result = false
            }
            finally {
              hideLoadingPopup()
            }
            return result
          }



          //Check if user already liked the project
          if (isLiked) {
            heartIcon.setAttribute('class', 'bi bi-heart-fill');
            heartIcon.setAttribute('local', 'https://icons.getbootstrap.com/icons/heart-fill/');
            heartIcon.innerHTML = `
                  <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
              `;

          }
          else {
            heartIcon.setAttribute('class', 'bi bi-heart');
            heartIcon.setAttribute('local', 'https://icons.getbootstrap.com/icons/heart/');
            heartIcon.innerHTML = `
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                `;
          }

          //Change the numbe when likeing or dislikeing
          function changeLikeView(boolean) {
            const likesView = document.getElementById(`likesProjects-${userSlug}-${projectSlug}`)
            let number = parseInt(likesView.textContent)
            let finalNumber = ""
            if (boolean) {
              finalNumber = number - 1
            }
            else {
              finalNumber = number + 1
            }

            likesView.textContent = finalNumber
          }


          //Fill the tags
          const tagContainer = document.getElementById(`tags-${userSlug}-${projectSlug}`)
          const tags = projectTags.split(',').map(tag => tag.trim());
          tags.forEach(element => {
            const template = `
              <div class="badge bg-secondary d-flex align-items-center gap-2 px-2 py-1">
                  <span>${element}</span>
              </div>
              `
            tagContainer.innerHTML = tagContainer.innerHTML + template
          })





        }




      }




    }

    function manageElementsAfterLoadingQuery() {
      let input = document.getElementById('searchProjectsInput').value.trim().toLocaleLowerCase()
      let inputTag = document.getElementById('tagsProjectText').textContent.trim().toLocaleLowerCase()
      let allElements = document.querySelectorAll('.motherCard')

      if (input.trim() == "" && inputTag.trim() == "") {
        allElements.forEach(element => {
          element.classList.remove('d-none')
          element.classList.add('d-flex')
        })
        return;
      }

      for (let i = 0; i < arrayUserProjects.length; i++) {
        let projectName = arrayUserProjects[i].name
        let projectTags = arrayUserProjects[i].tags
        let projectSlug = arrayUserProjects[i].slug
        let userSlug = new URLSearchParams(window.location.search).get('slug');


        let condition = false;
        if (input && inputTag) {
          // Both filled → require both to match
          const inputTagsArray = inputTag.split(',').map(tag => tag.trim().toLowerCase());
          const projectTagsArray = projectTags.split(',').map(tag => tag.trim().toLowerCase());
          let conditionTag = inputTagsArray.some(tag => projectTagsArray.includes(tag));

          condition = projectName.trim().toLocaleLowerCase().includes(input) && conditionTag;
        } else if (input) {
          // Only name filled
          condition = projectName.trim().toLocaleLowerCase().includes(input);
        } else if (inputTag) {
          // Only tag filled
          const inputTagsArray = inputTag.split(',').map(tag => tag.trim().toLowerCase());
          const projectTagsArray = projectTags.split(',').map(tag => tag.trim().toLowerCase());
          condition = inputTagsArray.some(tag => projectTagsArray.includes(tag));
        }

        if (condition) {
          const element = document.getElementById(`main-div-${userSlug}-${projectSlug}`)
          element.classList.remove('d-none')
          element.classList.add('d-flex')
        }
        else {
          const element = document.getElementById(`main-div-${userSlug}-${projectSlug}`)
          element.classList.remove('d-flex')
          element.classList.add('d-none')
        }




      }

    }


    //Tag system
    if (document.getElementById('tags')) {
      const tagInput = document.getElementById("tagInput");
      const tagsContainer = document.getElementById("tagsContainer");
      const textTags = document.getElementById('tagsProjectText')
      const addTagBtn = document.getElementById("addTagBtn");

      addTagBtn.addEventListener("click", () => {
        const newTag = tagInput.value.trim();
        if (newTag && !tags.includes(newTag)) {
          tags.push(newTag);
          addTagElement(newTag);
          tagInput.value = "";
          manageElementsAfterLoadingQuery()
        }
      });

      tagInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          const newTag = tagInput.value.trim();
          if (newTag && !tags.includes(newTag)) {
            tags.push(newTag);
            addTagElement(newTag);
            tagInput.value = "";
          }
        }
      });

      function addTagElement(tagText) {
        const tagEl = document.createElement("div");
        tagEl.className = "badge bg-secondary d-flex align-items-center gap-2 px-2 py-1";
        tagEl.innerHTML = `
              <span>${tagText}</span>
              <button type="button" class="btn-close btn-close-white btn-sm" aria-label="Remove"></button>
          `;

        tagEl.querySelector("button").addEventListener("click", () => {
          tags = tags.filter(t => t !== tagText);
          tagEl.remove();
          textTags.innerText = tags.join(",")
          manageElementsAfterLoadingQuery()
        });

        tagsContainer.appendChild(tagEl);
        textTags.innerText = tags.join(",")

      }

    }

    //Input
    document.getElementById('searchProjectsInput').addEventListener('input', function () {
      manageElementsAfterLoadingQuery()
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
            <html class="user-resize" style="overflow: auto;">
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

      // Resize logic
      const values = [0.25, 0.75, 1, 1.25, 1.75, 2];
      let currentIndex = 2;

      document.getElementById('cycle-btn').addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % values.length;
        const value = values[currentIndex];
        this.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-zoom-in" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11M13 6.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0"/>
  <path d="M10.344 11.742q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1 6.5 6.5 0 0 1-1.398 1.4z"/>
  <path fill-rule="evenodd" d="M6.5 3a.5.5 0 0 1 .5.5V6h2.5a.5.5 0 0 1 0 1H7v2.5a.5.5 0 0 1-1 0V7H3.5a.5.5 0 0 1 0-1H6V3.5a.5.5 0 0 1 .5-.5"/>
</svg> ${value}`

        // Array of iframe IDs
        const iframeIds = ['iframeA', 'iframeB'];

        iframeIds.forEach(id => {
          const iframe = document.getElementById(id);
          const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

          if (iframeDoc) {
            const elements = iframeDoc.querySelectorAll('.user-resize');
            elements.forEach(el => {
              el.style.transform = `scale(${value})`;
            });
          }
        });
      });

      document.getElementById('useModule').addEventListener('change', () => {
        updatePreview();
      });

      // JavaScript Editor
      window.jsEditor = new EditorView({
        state: EditorState.create({
          doc: ``,
          extensions: [basicSetup, javascript(), oneDark, EditorView.lineWrapping]

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
          extensions: [basicSetup, css(), oneDark, EditorView.lineWrapping]
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
          extensions: [basicSetup, html(), oneDark, EditorView.lineWrapping]
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

      //     //Expand (Now we have range bar for this)
      //     const expandBtn = document.getElementById('expand');
      //     const frames = [document.getElementById('iframeA'), document.getElementById('iframeB')];

      //     let isExpanded = false;

      //     const expandIcon = `
      // <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-expand" viewBox="0 0 16 16">
      //   <path fill-rule="evenodd" d="M5.828 10.172a.5.5 0 0 0-.707 0l-4.096 4.096V11.5a.5.5 0 0 0-1 0v3.975a.5.5 0 0 0 .5.5H4.5a.5.5 0 0 0 0-1H1.732l4.096-4.096a.5.5 0 0 0 0-.707m4.344-4.344a.5.5 0 0 0 .707 0l4.096-4.096V4.5a.5.5 0 1 0 1 0V.525a.5.5 0 0 0-.5-.5H11.5a.5.5 0 0 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 0 .707"/>
      // </svg>`;
      //     const contractIcon = `
      // <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-angle-contract" viewBox="0 0 16 16">
      //   <path fill-rule="evenodd" d="M.172 15.828a.5.5 0 0 0 .707 0l4.096-4.096V14.5a.5.5 0 1 0 1 0v-3.975a.5.5 0 0 0-.5-.5H1.5a.5.5 0 0 0 0 1h2.768L.172 15.121a.5.5 0 0 0 0 .707M15.828.172a.5.5 0 0 0-.707 0l-4.096 4.096V1.5a.5.5 0 1 0-1 0v3.975a.5.5 0 0 0 .5.5H14.5a.5.5 0 0 0 0-1h-2.768L15.828.879a.5.5 0 0 0 0-.707"/>
      // </svg>`;
      //     expandBtn.addEventListener('click', function () {
      //       frames.forEach(frame => {
      //         if (!isExpanded) {
      //           // Expand view
      //           frame.classList.remove('top-50', 'h-50', 'w-100');
      //           frame.classList.add('vw-100', 'vh-100', 'pt-60', 'top-0', 'z-0');
      //         } else {
      //           // Collapse view (return to original state)
      //           frame.classList.remove('vw-100', 'vh-100', 'pt-60', 'top-0', 'z-0');
      //           frame.classList.add('top-50', 'h-50', 'w-100');
      //         }
      //       });

      //       // Toggle button icon
      //       expandBtn.innerHTML = isExpanded ? expandIcon : contractIcon;

      //       isExpanded = !isExpanded;
      //     });
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

      //Slider change vh of iframes div
      if (document.getElementById('vh-slider-iframe')) {
        const slider = document.getElementById('vh-slider-iframe');
        const targetDiv = document.getElementById('iframes-div');
        const editorsDiv = document.getElementById('editors-preview');

        slider.addEventListener('input', () => {
          const value = slider.value;
          const upsideDownValue = (value - 45) * -1
          targetDiv.style.setProperty('height', `${value}vh`, 'important');
          editorsDiv.style.setProperty('height', `${upsideDownValue + 45}vh`, 'important');
        });
      }

      //Slider width for editor div
      document.querySelectorAll('.slider-width').forEach(slider => {
        const targetId = slider.getAttribute('for');
        const targetBgColor = slider.getAttribute('color');
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return; // Skip if no target found

        // Event listener for input change
        slider.addEventListener('input', () => {
          const value = slider.value; // e.g. 50
          // Apply flex-basis using calc with a gap adjustment
          targetEl.style.setProperty('flex-basis', `calc(${value}% - 1rem)`, 'important');
          const content = targetEl.querySelector('.content-of-editor');
          const inputWidth = targetEl.querySelector('.slider-width')
          const miniContent = targetEl.querySelector('.content-of-editor-min');

          miniContent.addEventListener('click', function () {
            targetEl.style.setProperty('flex-basis', `calc(100% - 1rem)`, 'important');
            const resizeObserver = new ResizeObserver(entries => {
              for (let entry of entries) {
                if (entry.target.offsetWidth >= 200) {
                  // content.classList.remove('visually-hidden');
                  content.classList.remove('d-none');
                  content.classList.add('d-flex');
                  inputWidth.value = 100;
                  miniContent.classList.remove('d-flex');
                  miniContent.classList.add('d-none');
                  resizeObserver.disconnect();
                  document.querySelectorAll('.editor-section').forEach(section => {
                    observerWidthEditor.observe(section);
                  });
                }
              }
            });
            resizeObserver.observe(targetEl);
          });

          if (inputWidth.value < 10) {
            targetEl.style.setProperty('flex-basis', `calc(5% - 1rem)`, 'important');
            // content.classList.add('visually-hidden')
            content.classList.add('d-none');
            content.classList.remove('d-flex');
            miniContent.classList.remove('d-none')
            miniContent.classList.add('d-flex')
            miniContent.classList.add(targetBgColor)
          } else {
            // content.classList.remove('visually-hidden')
            content.classList.remove('d-none');
            content.classList.add('d-flex');
            miniContent.classList.remove('d-flex')
            miniContent.classList.add('d-none')
          }
        });

      });

      //Section width
      const observerWidthEditor = new ResizeObserver(entries => {
        entries.forEach(entry => {
          const section = entry.target;
          const width = entry.contentRect.width;

          const content = section.querySelector('.content-of-editor');
          const miniContent = section.querySelector('.content-of-editor-min');

          // Get background color class from related slider
          const slider = document.querySelector(`.slider-width[for="${section.id}"]`);
          const targetBgColor = slider?.getAttribute('color') || '';

          if (width < 120) {
            section.style.setProperty('flex-basis', `calc(5% - 1rem)`, 'important');
            // content?.classList.add('visually-hidden');
            content?.classList.remove('d-flex');
            content?.classList.add('d-none');
            miniContent?.classList.remove('d-none');
            miniContent?.classList.add('d-flex');
            if (targetBgColor) miniContent?.classList.add(targetBgColor);
            observerWidthEditor.disconnect()
          }
        });
      });

      document.querySelectorAll('.editor-section').forEach(section => {
        observerWidthEditor.observe(section);
      });
      //Section width

      //Slider height bug
      const divSliderOptions = document.getElementById("divSliderOptions");
      const container = document.getElementById("iframes-div");
      const resizeObserverSlider = new ResizeObserver(entries => {
        for (let entry of entries) {
          const heightStr = window.getComputedStyle(entry.target).height;
          const heightPx = parseFloat(heightStr);
          const heightVh = (heightPx / window.innerHeight) * 100;

          if (heightVh <= 5) {
            divSliderOptions.classList.add("position-fixed", "bottom-0", "start-0", "w-100");
            document.getElementById('editor-row-container').style.paddingBottom = '10vh'
          } else {
            divSliderOptions.classList.remove("position-fixed", "bottom-0", "start-0", "w-100");
            document.getElementById('editor-row-container').style.paddingBottom = ''
          }
        }
      });
      resizeObserverSlider.observe(container);
      //Slider height bug


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

      //Type module
      document.getElementById("jsTypeModule").addEventListener("click", function () {
        const checkbox = document.getElementById("useModule");
        const svg = document.getElementById("jsTypeModule");
        checkbox.checked = !checkbox.checked;
        updatePreview()

        if (checkbox.checked) {
          document.getElementById('svgTypeModule').style.fill = 'lime'
          document.getElementById('svgTypeModule').setAttribute('fill', 'lime')
        } else {
          document.getElementById('svgTypeModule').style.fill = 'red'
          document.getElementById('svgTypeModule').setAttribute('fill', 'red')
        }
      });

      //Add padding bottom when div projects scroll is in end
      document.getElementById('editors-preview').addEventListener('scroll', function () {
        const isAtBottom = this.scrollHeight - this.scrollTop === this.clientHeight;
        if (isAtBottom) {
          this.style.marginTop = '0px'
        }
        else {
          this.style.marginTop = '60px'
        }
      })

      //Hover svg
      const svgElement = document.getElementById('svgTypeModule');
      svgElement.addEventListener('mouseenter', () => {
        if (document.getElementById('svgTypeModule').getAttribute('fill') === 'lime') {
          showSuccessPopup("Type module activated!");
        }
        else {
          showErrorPopup("Type module deactivated!");
        }
      });


    }

    //Beginning request
    showLoadingPopup();
    try {
      const userSlug = new URLSearchParams(window.location.search).get('slug');
      const projectSlug = new URLSearchParams(window.location.search).get('projectSlug');
      const response = await fetch(`${apiUrl}/project/slug/${userSlug}/${projectSlug}`, {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        alert('Post main listed successfully: ' + data.message);

        const preview = document.getElementById('markdown-preview');
        const markdownText = `${data.project.description}`;
        const rawHtml = marked.parse(markdownText);
        const cleanHtml = DOMPurify.sanitize(rawHtml);
        preview.innerHTML = cleanHtml

        preview.querySelectorAll('pre code').forEach(block => {
          hljs.highlightElement(block);
        });

        document.getElementById('projectName').value = `${data.project.name}`
        document.getElementById('nameUserProfile').innerText = `${data.userName}`
        document.getElementById('imageProfile').src = `${serverStorage}${data.userImage}`
        document.getElementById('cover').src = `${serverStorage}${data.project.photo}`

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



    //View
    showLoadingPopup();
    try {
      await fetch('http://127.0.0.1:8000/sanctum/csrf-cookie', {
        credentials: 'include'
      });
      const csrfToken = decodeURIComponent(getCookie('XSRF-TOKEN'));

      const projectSlug = new URLSearchParams(window.location.search).get('projectSlug');
      const response = await fetch(`${apiUrl}/user/viewProject/${projectSlug}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'X-XSRF-TOKEN': csrfToken },
        body: JSON.stringify({})
      });

      const data = await response.json();

      if (response.ok) {
        alert('View system went successfully: ' + data.message);
      } else {
        alert('View system failed: ' + data.message);
        alert('View system failed: ' + data.error);
        showErrorPopup()
      }
    } catch (error) {
      alert('View system failed: ' + error.message);
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
function showErrorPopup(message = `<div class="spinner-grow text-light" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`) {
  const popup = document.createElement("div");
  popup.innerHTML = message;
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
function showSuccessPopup(message = `<div class="spinner-grow text-light" role="status">
  <span class="visually-hidden">Loading...</span>
</div>`) {
  const popup = document.createElement("div");
  popup.innerHTML = message;
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
  popup.innerHTML = `<img src="img/icons8-caneta.gif" local="https://icons8.com.br/icons/set/pen--animated" class="img-fluid" width="30px" height="30px" alt="" srcset="">`;
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
  popup.innerHTML = `<img src="img/icons8-área-de-transferência.gif" local="https://icons8.com.br/icons/set/copied--animated" class="img-fluid" width="30px" height="30px" alt="" srcset="">`
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

if (document.getElementById('downloadZip')) {
  document.getElementById('downloadZip').addEventListener('click', function () {
    const zip = new JSZip();

    const jsContent = window.jsEditor.state.doc.toString();
    const cssContent = window.cssEditor.state.doc.toString();
    const htmlContent = window.htmlEditor.state.doc.toString();

    zip.file("index.html", htmlContent.trim());
    zip.file("style.css", cssContent.trim());
    zip.file("script.js", jsContent.trim());

    zip.generateAsync({ type: "blob" }).then(function (content) {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(content);
      a.download = `${document.getElementById('projectName').value.trim() || 'project-web'}.zip`;

      a.click();
    });
  });
}

document.getElementById('darkLightMode').addEventListener('click', function (e) {
  e.preventDefault();

  const modeLink = e.currentTarget;
  const currentMode = modeLink.getAttribute('mode');

  const moon = `
  <svg xmlns="http://www.w3.org/2000/svg" local="https://icons.getbootstrap.com/icons/moon-stars-fill/" width="16" height="16" fill="currentColor" class="bi bi-moon-stars-fill" viewBox="0 0 16 16">
  <path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/>
  <path d="M10.794 3.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387a1.73 1.73 0 0 0-1.097 1.097l-.387 1.162a.217.217 0 0 1-.412 0l-.387-1.162A1.73 1.73 0 0 0 9.31 6.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387a1.73 1.73 0 0 0 1.097-1.097zM13.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732l-.774-.258a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z"/>
</svg>`;

  const sun = `
    <svg xmlns="http://www.w3.org/2000/svg" local="https://icons.getbootstrap.com/icons/brightness-high-fill/" width="16" height="16" fill="currentColor" class="bi bi-sun-fill" viewBox="0 0 16 16">
  <path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
</svg>`;

  if (currentMode === 'light') {
    document.body.classList.remove('transitionAll')
    modeLink.setAttribute('mode', 'dark');
    modeLink.innerHTML = moon;
    document.documentElement.setAttribute('data-bs-theme', 'dark');
  } else {
    document.body.classList.remove('transitionAll')
    modeLink.setAttribute('mode', 'light');
    modeLink.innerHTML = sun;
    document.documentElement.setAttribute('data-bs-theme', 'light');
  }
});














