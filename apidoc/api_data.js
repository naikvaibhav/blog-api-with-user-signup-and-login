define({ "api": [
  {
    "type": "post",
    "url": "/api/v1/users/signup",
    "title": "Register a User",
    "version": "0.0.1",
    "name": "User_Signup",
    "group": "user",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User. (body params) (required)</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User. (body params) (required)</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "object",
            "optional": false,
            "field": "data",
            "description": "<p>shows error status, message, http status code, result.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     \"error\": false,\n     \"message\": \"User registered successfully\",\n     \"status\": 201,\n     \"data\": {\n               \"email\": \"someone@mail.com\",\n             }\n   }",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "UserNotFound",
            "description": "<p>The id of the User was not found.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found\n{\n     \"error\": true,\n     \"message\": \"AP error\",\n     \"status\": 500,\n     \"data\": null\n   }",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "user"
  }
] });
