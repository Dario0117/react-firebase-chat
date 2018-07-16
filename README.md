# React Firebase Chat

> Ejercicio de práctica en ReactJs y Firebase

## Video del proyecto en funcionamiento (tag v2.0.0)

[![IMAGE ALT TEXT HERE](http://img.youtube.com/vi/Sv8vzNZxOKM/0.jpg)](http://www.youtube.com/watch?v=Sv8vzNZxOKM)

## Funcionalidades:

- [x] Comunicación entre usuarios
    - [x] Conectados
    - [x] Se crea una sala de chat o se usa una existente
- [x] Listar usuarios conectados en la sala de chat
    - Para que un usuario cuente como conectado debe:
        - [x] Conectarse
        - [x] Enviar mensajes
        - [x] Mover el mouse en el chat
    - Para que los usuarios en el chat se enteren que un usuario está conectado debe:
        - [x] Revisar en la db si el tiempo en el que actualizó su sesión es menor a 2 segundos
- [x] Enviar enlaces y mostrar un card
    - [x] Se obtienen los metadatos al poner el enlace
    - [x] Se muestran la card con los metadatos cuando se listan todos los mensajes
- [x] Enviar imágenes
    - [x] Se pueden pegar desde el porta papeles
    - [x] Se pueden mandar desde el selector de archivos
- [x] Enviar videos
    - [x] Se pueden mandar desde el selector de archivos

> NOTA: No se necesita confirmación de correo para el registro, sólo que el correo tenga el formato correcto

### **Realtime database rules**
```json
{
    "rules": {
        "chatrooms": {
            "$room": {
                ".read": "auth != null",
                "messages": {
                    "$messageID": {
                        ".write": "!data.exists()",
                        ".validate": "root.child('/chatrooms/'+$room+'/users/'+auth.uid).exists() &&  newData.hasChildren(['username', 'message']) && newData.child('username').isString() && newData.child('message').isString()"
                    }
                },
                "users": {
                    "$userID": {
                        ".write": "(!data.exists() && $userID === auth.uid) || ($userID === auth.uid)",
                        ".validate": "newData.hasChildren(['username', 'time']) && newData.child('username').isString() && newData.child('time').isNumber()"
                    }
                }
            }
        }
    }
}
```

### **Storage rules**

```
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
    match /chatrooms/{room}/img/{imgName} {
    	allow write: if request.resource.contentType.matches('image/.*') && request.resource.contentType == resource.contentType;
    }
    match /chatrooms/{room}/vid/{vidName} {
    	allow write: if request.resource.contentType.matches('video/mp4') && request.resource.contentType == resource.contentType;
    }
  }
}
```