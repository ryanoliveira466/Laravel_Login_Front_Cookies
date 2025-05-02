const apiUrl = 'http://127.0.0.1:8000/api'; // adjust if needed

document.addEventListener('DOMContentLoaded', function () {

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




      try {
        const response = await fetch(`${apiUrl}/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
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

  //

  // Profile
  if (document.getElementById('profileForm')) {

    loadProfile()

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
            document.getElementById('message').innerText = `${data.message}: ${data.error}` || 'An unknown error occurred';
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
