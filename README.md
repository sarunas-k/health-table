# Smart Table Application
 This smart table application was built using Laravel and Vue.js. It has intuitive and organized user interface which is populated with data from CSRF protected Laravel application, which ensures security. This document describes features of this application. The application is hosted live: ([github.com/sarunas-k/health-table-restapi](https://github.com/sarunas-k/health-table-restapi))

## REST API endpoints of the application
<table class="table table-bordered">
  <tbody>
   <tr>
    <td><pre>GET /sanctum/csrf-cookie</pre></td>
    <td><pre>HTTP/1.1 204 No Content  
Set-Cookie: XSRF-TOKEN=eyJpdiI6IjMyS;
Set-Cookie: laravel_session=eyJpdiI6IjMyS</pre></td>
   </tr>
   <tr>
    <td><pre>POST /login  
X-XSRF-TOKEN: eyJpdiI6IjMyS   
{"email": [email],"password": [password]}</pre></td>
    <td><pre>HTTP/1.1 200 OK  
Set-Cookie: XSRF-TOKEN=eyJpdiI6IjMyS;
Set-Cookie: laravel_session=eyJpdiI6IjMyS</pre></td>
   </tr>
   <tr>
    <td><pre>GET /rows  
X-XSRF-TOKEN: eyJpdiI6IjMyS</pre></td>
    <td><pre>HTTP/1.1 200 OK  
Set-Cookie: XSRF-TOKEN=eyJpdiI6IjMyS;
Set-Cookie: laravel_session=eyJpdiI6IjMyS  
{  
     "rows": "1,Marijn,Vedntyev,0,Padavėjas,...\r\n  
              2,Bernie,Blowen,1,Konsultantas,..."  
}</pre></td>
   </tr>
   <tr>
    <td><pre>GET /rows/[offset]/[length]  
X-XSRF-TOKEN: eyJpdiI6IjMyS</pre></td>
    <td><pre>HTTP/1.1 200 OK  
Set-Cookie: XSRF-TOKEN=eyJpdiI6IjMyS;
Set-Cookie: laravel_session=eyJpdiI6IjMyS  
{  
     "rows": "1,Marijn,Vedntyev,0,Padavėjas,...\r\n  
              2,Bernie,Blowen,1,Konsultantas,..."  
}</pre></td>
   </tr>
  </tbody>
</table>

### In the beginning there was this image. It was the reference:
![Reference](https://batai.w5.lt/health-table/Healthchecksummary.png)
Wrote these requirements for the task:
---------
General requirements
--------------------
User interface component which makes authorized request to get protected 
data from REST stateless Api, then parses and displays it in a table. 

### User description

Managers, administrative staff responsible for employees'
health check records.

### Operating environment

PCs, mobile devices with various screen sizes that has
web browsers which support JavaScript.

Special requirements
--------------------

```
1. Collapse rows
2. Change columns' width
3. Accessible HTML
4. (Un)check checkbox groups
5. Flat data in row as input
6. Responds to screen size
7. Show popup when "more" is clicked
8. Outer columns stick to sides
9. Support small screens
10. Display in pages of 25, 50, 100

```


