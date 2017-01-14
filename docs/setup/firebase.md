


# Firebase Database

## Firebase Database Rules

```json
{
  "rules": {
    "users" : {
      "$userID": {
        ".read": "auth.uid==$userID",
        ".write": "auth.uid==$userID"
      }
    },
    "myparty": {
        "$emailHash": {
          ".read": "root.child('users').child(auth.uid).child('emailHash').val() === $emailHash"
        }
    },
    "parties": {
      "$partyID": {
         // If they are a member of this source, they the can go right in.
        ".read": "data.child(root.child('users').child(auth.uid).child('emailHash').val()).exists()",
        // If they are a member they can write
        ".write": "data.child(root.child('users').child(auth.uid).child('emailHash').val()).exists()",
      }
    }
  }
}
```