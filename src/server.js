const express = require("express");
const passport = require("passport");

const app = express();
app.use(passport.initialize());
app.use(passport.session());

const GoogleStrategy = require("passport-google-oauth20").Strategy;

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "584851472256-qe4tnls4hsrvtvqd10pv4ml6lrimglah.apps.googleusercontent.com",
      clientSecret: "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",
      callbackURL: "http://localhost:3000",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
    }
  )
);

//button login google
app.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  function (req, res, info) {
    // Successful authentication, redirect home.
    res.redirect("/dashboard");
  }
);

let port = process.env.PORT || 8080;
app.listen(port, (req, res) => {
  console.log("Running http://localhost:" + port);
});
