function login(email, password, callback) {
    var request = require('request');
    var options = {
        method: "post",
        url:  `https://${configuration.IDP_ENDPOINT}/api/v1/loginByEmail`,
        body: {
            email: email,
            password: password
        },
        json: true
    }
    request(options, function (err, response, body) {
      if (err) {
        console.log(err);
        return callback(new Error("Error connecting to Identify service"));
      }
      if (response.statusCode === 400) {
        console.log("Bad Request response from Identify service!");
        return callback(new Error(response.message));
      }
      if (response.statusCode === 401) {
        console.log("Unauthorized!!");
        return callback(new WrongUsernameOrPasswordError(email, 'Invalid username and/or password.'));
      }
      console.log('Body response:' + body);
      var user = body;
      callback(null, user);  
    });
  }
  