# Laravel_Login_Front_Cookies<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

28/04/2025

* Learned about tokens and Laravel sanctum middleware. [Commands Sanctum][https://github.com/ryanoliveira466/Laravel_Login_Front_Git/blob/main/Notes_Att/28-04-2025-login-basico.txt]
* Simple login register site using Laravel API, tokens and static Front-End HTML, CSS, JS.
* Tokens being saved on sessionStorage for user to manage functions in the Site.
* Postman token authorization Bearer Token.

* Little issue with API routes where /user and /user/my were conflicting because Laravel was understanding ---my--- as an ID but it is actually other function.
  Reorganized the APIS putting user/my after user/ and worked.

29/04/2025

* Email verification using Mailtrap, using Laravel built-in email sender, created routes[https://github.com/ryanoliveira466/Laravel_Login_Front_Git/blob/main/Notes_Att/29-04-2025-emailVer-changePas.txt]

30/04/2025

* Email for 'Forgot Password' using Laravel built-in Password changer [https://github.com/ryanoliveira466/Laravel_Login_Front_Git/blob/main/Notes_Att/30-04-2025-forgotPassword.txt]

01/05/2025

* Implemention of Cookies for security [https://github.com/ryanoliveira466/Laravel_Login_Front_Cookies/blob/main/Notes_Att/01-05-2025-Cookies.txt]

02/05/2025

* Added 'Search users by input' and 'Public pages of the users'.
* Created personalized url for profiles using 'URL Slug'.
* Created API routes for getting all users and user public page trought slug parameter on URL.
[https://github.com/ryanoliveira466/Laravel_Login_Front_Cookies/blob/publicPerfilsFront/Notes_Att/02-05-2025-publicProfiels.txt]

03/05/2025
* Created table 'components_user' where users can post their content/related foreign key.
* Users can create content from their profile page.
* Users can see others users posts if they visit their member page.
* Created main page for a project.
* Foreing key and using query parameters for these.
* Created api routes for these.
* Created seeders for auto table fill when testing users an functions. [https://github.com/ryanoliveira466/Laravel_Login_Front_Cookies/blob/main/Notes_Att/03-05-2025-tableComponents-posts.txt]


04/05/2025 & 05/05/2025
* Creating playground for front[https://github.com/ryanoliveira466/Laravel_Login_Front_Cookies/blob/main/Notes_Att/04%2605-05-2025-playground.txt]

06/05/2025
*Front end improvements project.html and edit.html
*Instead of storing a 64Archive with very long characters,Use Laravel Storage, create a photo and request this photo from the server
[https://github.com/ryanoliveira466/Laravel_Login_Front_Cookies/blob/main/Notes_Att/06-05-2025-imageStorage.txt]


07/05/2025
*Front end improvements
*Project, create, and edit
[https://github.com/ryanoliveira466/Laravel_Login_Front_Cookies/blob/main/Notes_Att/07-05-2025-js-beautifyBug.txt]

10/05/2025 & 11/05/2025
*Member page is being stylized

17/05/25
Fixed some bugs, Member page is being stylized,projects search

21/05/25
Home creation

22/05/25
Home...

23/05/25
Home...

24/05/25
Home...

25/05/25
Create...

26/05/25
Create...

27/05/25 
Create...

28/05/25 
Create Final Functions...

29/05/25 Home


<br>
<br>
⬇️
⬇️
<br>
<br>


# Tutorial do projeto
---
### 1 - Download e pastas:
Crie duas pastas no seu computador após baixar os arquivos:

* Uma para os arquivos do Front(HTML, CSS JS)
* E outra para o Back(Laravel)

Obs: As pastas tem que estar **SEPARADAS**, não podemos misturar as duas.
---
### 2 - Configurando Laravel:
* Mude a porta do servidor do LivePreview do VScode para 5501(era pra ser a padrão 5500 mas por algum motivo no meu PC ele mudou), mais fácil em vez de mudar o JS em cada linha.
https://www.youtube.com/watch?v=yXNh70VH47Y.

* Criar uma pasta chamada ```photos``` em ```'storage/app/public/'``` e colocar o arquivo default-user.jpg
* 
* No arquivo ```AuthController```
```php
if ($request->user()->photo && Storage::disk('public')->exists($request->user()->photo) && $request->user()->photo <p style="color: red">!= 'photos/default-user.jpg'</p>") {
Storage::disk('public')->delete($request->user()->photo);
}
```


```
composer install
```

Depois do *composer install* você vai ter que criar o arquivo .env com os seguintes dados(Veja a **.env.example** no arquivo e copie).

```
php artisan migrate
```
Após as migrates faça mais dois comandos:

```
php artisan key:generate
php artisan storage:link
```
E por fim...
```
php artisan config:clear      
php artisan route:clear
php artisan cache:clear
php artisan view:clear
```
Depois de todas as configurações faça esses comandos(Acredito que não seja necessário, só fechar e abrir o VSCode ou o servidor para as configurações pegarem)

---
### 3 - Comandos úteis

```
php artisan migrate:fresh --seed   
```
Reseta as tabelas e popula os Users/Senha padrão *password*.

```
php artisan serve
```

Inicia o server.

```
CTRL + C
```
Fecha o server.


