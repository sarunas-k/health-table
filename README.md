# Smart Table Application
 This smart table application was built using Laravel and Vue.js. It has intuitive and organized user interface which is populated with data from CSRF protected Laravel application, which ensures security. This document describes application's features.
 
![Table](https://applications.w5.lt/health-table/assets/images/Screenshot.png)
## REST API endpoints
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

This was the reference:
---

![Reference](https://batai.w5.lt/health-table/Healthchecksummary.png)
Requirements documentation
---
### General requirements
Application should display a table of employees' health check information. It should send a request to separate back-end application to receive data page by page when required, parse and format it correctly on the front-end. Connection to REST API should be secure and authenticated.

**User description**

Administrative staff responsible for employees' health check records with no mentionable computer knowledge.

**Operating environment**

Web browsers on PCs, phones and other screen devices.

### Special requirements

1. 	Groups of table rows (subrows)
   
2. 	Control table columns' width
   
3. 	Accessible HTML
   
4. 	Table rows' checkboxes works in groups

5. 	Receives raw flat data for input
 	
6. 	Table adjusts to screen size
 	
7. 	Outer table columns stick to sides when table width changes
 	
8. 	Request only data that has to be displayed
 	
9. 	Show 25, 50 or 100 rows per page

User interface documentation
---

Loading data

![Table subrows](https://applications.w5.lt/health-table/assets/images/Screenshot-loading.png)

Subrows visible after clicking on a row

![Table subrows](https://applications.w5.lt/health-table/assets/images/Screenshot-opened.png)

Side columns fixed to sides

<img src="https://applications.w5.lt/health-table/assets/images/Screenshot-resized.png" alt="Table subrows" style="width: 700px" />
