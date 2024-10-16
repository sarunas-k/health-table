# Smart Table Application
 This smart table application was built using Laravel and Vue.js. It has intuitive and organized user interface which is populated with data from CSRF protected Laravel application, which ensures security. This document describes application's features.

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

## Tests unit/component
Application has automated tests built with Vitest. Run all tests:
```
npm run test:unit
```
Initial input data (CSV)
---
```
id,firstName,lastName,status,jobTitle,department,checkCode_1,expiration_1,checkStatus_1,checkCode_2,expiration_2,checkStatus_2,checkCode_3,expiration_3,checkStatus_3
1,Marijn,Vedntyev,0,Padavėjas,Logistika,0000,2026-10-12,0,0001,2024-07-05,0,0002,2024-11-07,1
2,Bernie,Blowen,1,Konsultantas,Klientų aptarnavimas,0000,2026-07-22,0,0001,2026-03-27,0,0002,2024-01-08,1
3,Clerkclaude,Stallon,0,Vairuotojas,IT,0000,2024-12-05,1,0001,2024-11-14,-1,0002,2023-06-22,-1
4,Linn,Woodfin,0,Vairuotojas,Klientų aptarnavimas,0000,2026-09-19,1,0001,2023-09-24,0,0002,2023-10-06,1
5,Lizzie,Royan,1,Direktorius,Gamyba,0000,2025-05-23,-1,0001,2023-10-27,1,0002,2023-11-30,0
```
Design image UI is based on
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
