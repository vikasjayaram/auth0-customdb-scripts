function getByEmail(email, callback) {
    // This script should retrieve a user profile from your existing database,
    // without authenticating the user.
    // It is used to check if a user exists before executing flows that do not
    // require authentication (signup and password reset).
    //
    // There are three ways this script can finish:
    // 1. A user was successfully found. The profile should be in the following
    // format: https://auth0.com/docs/users/normalized/auth0/normalized-user-profile-schema.
    //     callback(null, profile);
    // 2. A user was not found
    //     callback(null);
    // 3. Something went wrong while trying to reach your database:
    //     callback(new Error("my error message"));
  
    var request = require("request");

    var options = { 
        method: 'GET',
        url:  `https://${configuration.IDP_ENDPOINT}/api/v1/getAccountByEmail`,
        qs: { email: `${email}` },
        json: true 
    };
    request(options, function (error, response, body) {
        if (error) {
            return callback(new Error("Error connecting to Identify service"));
        }
        if (response.statusCode === 400) {
            console.log("Bad Request response from Identify service!");
            return callback(new Error(response.message));
        } else {
            var user = body;
            if (!user) {
                return callback(null);
            } else {
                return callback(null, user);
            }
        }   
    });
}
  