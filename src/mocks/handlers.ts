import { http, HttpResponse } from 'msw'

export const handlers = [
  // Intercept "GET https://example.com/user" requests...
  http.get('http://localhost/health-db/db.csv', () => {
    // ...and respond to them using this JSON response.
    return HttpResponse.text(data);
  }),
]

const data = `id,firstName,lastName,status,jobTitle,department,checkCode_1,expiration_1,checkStatus_1,checkCode_2,expiration_2,checkStatus_2,checkCode_3,expiration_3,checkStatus_3
1,Marijn,Vedntyev,0,Padavėjas,Logistika,0000,2026-10-12,0,0001,2024-07-05,0,0002,2024-11-07,1
2,Bernie,Blowen,1,Konsultantas,Klientų aptarnavimas,0000,2026-07-22,0,0001,2026-03-27,0,0002,2024-01-08,1
3,Clerkclaude,Stallon,0,Vairuotojas,IT,0000,2024-12-05,1,0001,2024-11-14,-1,0002,2023-06-22,-1
4,Linn,Woodfin,0,Vairuotojas,Klientų aptarnavimas,0000,2026-09-19,1,0001,2023-09-24,0,0002,2023-10-06,1`;