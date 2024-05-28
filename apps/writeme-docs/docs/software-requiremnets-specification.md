# Software Requirements Specification

### Authentication

<ol className="srs-bullets">
  <li>The users must be able to sign up  
    <ol className="srs-bullets">
      <li>Using a sign up form. The form should gather the following:
        <ol className="srs-bullets">
          <li>Email address. Does not require email authentication.</li>
          <li>Birthday</li>
          <li>Password</li>
        </ol>
       </li>
      <li>Using existing platforms:
        <ol className="srs-bullets">
          <li>Google</li>
          <li>Facebook</li>
        </ol>
      </li>
      <li> After signing up, the system must obtain the following from the user:
        <ol className="srs-bullets">
          <li>Gender</li>
          <li>Language</li>
          <li>Location</li>
          <li>Interests based in predefined categories</li>
        </ol>
      </li>
    </ol>
  </li>
  <li>The user must be able to sign in
    <ol className="srs-bullets">
      <li>Using their email and password
        <ol className="srs-bullets">
          <li>The user credentials must be validated</li>
          <li>Must allow user to recover their password using their email or username
            <ol className="srs-bullets">
              <li>The account must be verified (i.e. ensure it exists)</li>
              <li>If the account is found, the system must allow the user to send a recovery email to the email address associated with the account</li>
            </ol>
          </li>
        </ol>
      </li>
      <li>Using existing platforms
        <ol className="srs-bullets">
          <li>Using Google</li>
          <li>Using Facebook</li>
        </ol>
      </li>
      <li>The user must be able to select “forgot password’
        <ol className="srs-bullets">
          <li>The system must identify their account using their email address or username.</li>
          <li>If an account is found, a button appears that lets the user send a password reset email to the email address linked to their account</li>
        </ol>
      </li>
    </ol>
  </li>
</ol>

### Authorization

<ol className="srs-bullets">
  <li>The system must provide an "Explore page" for users that are not signed up. The page allows the user to view posts</li>
  <li>The system must provide functionality that is specific to users that are singed up:
    <ol className="srs-bullets">
      <li>Access to the board system</li>
      <li>Access to the recommendation system. The access is implicit (i.e. the user doesn't directly interact with the system)</li>
      <li>Access to account management</li>
      <li>Access to the social interaction system</li>
    </ol>
  </li>
</ol>
