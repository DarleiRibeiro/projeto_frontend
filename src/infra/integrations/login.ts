import RemoteAccessClient from "../api/axios-s-managed.ts";

/****
 * post
 * /api/token/
 * */
export interface Login {
  username: string
  password: string
}
/****
 *response
* */
export interface LoginResponse {
  refresh: string
  access: string
  email: string
  permissions: [string]
  groups: [string]
}
/*
*  exemple
* {
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4NjY2MjY4NSwiaWF0IjoxNjg2NTc2Mjg1LCJqdGkiOiIwZDg3NWYyOGFjZGQ0NDA5YjliMzQxNjYyZjMwMWI3OCIsInVzZXJfaWQiOjJ9.nnKOUo264BhIKZZs0HRaqBOyvmdboySv9aFhJ0p7S_A",
    "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyNTc2MjI1LCJpYXQiOjE2ODY1NzYyODUsImp0aSI6IjI2OGJkNTk1MWJlMDQ4NGJiMDk0NDY2MTkwZTQ5MWFhIiwidXNlcl9pZCI6Mn0.dBSRbhHM0RI04tAAkLiKXsTlrNz2t4twp14T7TR5ml8",
    "email": "robsonviana@gmail.com",
    "permissions": [],
    "groups": [
        "Enfermeiros"
    ]
}
* */
export const LoginAPI  = {
  logar: async (user:Login) => {
    try {
      const api = RemoteAccessClient.getInstance(undefined);
      const userResponse: LoginResponse = await api({
        url: "token/",
        method: "POST",
        data: {username:user.username, password: user.password},
      }).then(r => r.data).catch(e=> {
        throw e
      })
      RemoteAccessClient.ReconfigureInstance(userResponse.access)
      return {
        status: 200,
        statusText: 'Sucesso ao logar.',
        data: userResponse
      };
    } catch (e) {
      return undefined
      throw new Error('Erro ao logar')
      // console.log(e)
      // return {
      //   // @ts-ignore
      //   status: e?.response?.status,
      //   statusText: 'Erro ao logar.',
      //   //todo remover body fake
      //   data: {
      //     "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY4NjY2MjY4NSwiaWF0IjoxNjg2NTc2Mjg1LCJqdGkiOiIwZDg3NWYyOGFjZGQ0NDA5YjliMzQxNjYyZjMwMWI3OCIsInVzZXJfaWQiOjJ9.nnKOUo264BhIKZZs0HRaqBOyvmdboySv9aFhJ0p7S_A",
      //     "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkyNTc2MjI1LCJpYXQiOjE2ODY1NzYyODUsImp0aSI6IjI2OGJkNTk1MWJlMDQ4NGJiMDk0NDY2MTkwZTQ5MWFhIiwidXNlcl9pZCI6Mn0.dBSRbhHM0RI04tAAkLiKXsTlrNz2t4twp14T7TR5ml8",
      //     "email": "robsonviana@gmail.com",
      //     "permissions": [],
      //     "groups": [
      //       "Enfermeiros"
      //     ]
      //   }
      // }
    }
  }
}
