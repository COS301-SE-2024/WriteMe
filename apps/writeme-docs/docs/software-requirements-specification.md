# Software Requirements Specification

## Functional Requirements

### Authentication

<ol className="srs-bullets">
  <li>The users must be able to sign up  
    <ol className="srs-bullets">
      <li>Using a sign up form. The form should gather the following:
        <ol className="srs-bullets">
          <li>Email address. Does not require email authentication.</li>
          <li>Date of birth</li>
          <li>Password</li>
          <li>Username</li>
        </ol>
       </li>
      <li>Using existing platforms:
        <ol className="srs-bullets">
          <li>Google</li>
          <li>Github</li>
        </ol>
      </li>
      <li> After signing up, the system must obtain the following from the user:
        <ol className="srs-bullets">
          <li>Gender</li>
          <li>Name and Surname</li>
          <li>Language</li>
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
          <li>Using Github</li>
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
  <li>The system must provide functionality that is specific to users that are singed up:
    <ol className="srs-bullets">
      <li>Access to account management</li>
      <li>Access to reading other stories</li>
      <li>Access to writing stories</li>
      <li>Access to the recommendation system. The access is implicit (i.e. the user doesn't directly interact with the system)</li>
      <li>Access to the social interaction system*</li>
    </ol>
  </li>
</ol>

### Story Creation

<ol className="srs-bullets">
  <li>Users must be able to create their own stories:
    <ol className='srs-bullets'>
      <li>Users must be able to publish their story</li>
      <li>Users must be able to save their story to a draft</li>
      <li>Users must be able to edit their stories</li>
      <li>Genre selection</li>
    </ol>
  </li>
  <li>Metadata:
    <ol className='srs-bullets'>
      <li>Users must be able to add a title to their story</li>
      <li>Editor for users to write the main content of their story</li>
      <li>Able to select a cover image</li>
    </ol>
  </li>
</ol>

### Viewing stories

<ol className="srs-bullets">
  <li>Users must be able to view a single story
    <ol className='srs-bullets'>
      <li>Able to view a story on click</li>
      <li>Able to like a story</li>
      <li>Able to share a story</li>
      <li>Able to comment on a story</li>
    </ol>
  </li>
</ol>

### Explore Page\*

<ol className="srs-bullets">
  <li>Users must be able to view other stories:
    <ol className='srs-bullets'>
      <li>Stories can be displayed as thumbnails with the cover image, title and author</li>
      <li>Stories can be displayed as lists with more detailed information such as a short description, genre or publication date</li>
    </ol>
  </li>
  <li>Story filters
    <ol className='srs-bullets'>
      <li>Allow users to filter stories by genre</li>
      <li>Allow users to filter stories by popularity</li>
      <li>Allow users to filter stories by most recently published</li>
    </ol>
  </li>
  <li>Search functionality
    <ol className='srs-bullets'>
      <li>Allow users to search stories by title</li>
      <li>Allow users to search stories by author</li>
      <li>Allow users to search stories with keywords</li>
    </ol>
  </li>
</ol>

## Architectural Requirements

### Quality Requirements

<ol className="srs-bullets">
  <li>Security
    <ol className='srs-bullets'>
      <li>Users can only access an account by entering the correct email and password</li>
      <li>Passwords will be stored, salt added and hashed</li>
      <li>Users cannot create an account until they have given a strong password</li>
    </ol>
  </li>
  <li>Compatibility
    <ol className='srs-bullets'>
      <li>The app will be able to function across a variety of devices, web browsers and operating systems</li>
    </ol>
  </li>
  <li>Reliability
    <ol className='srs-bullets'>
      <li>Testing and Performance
        <ol className='src-bullets'>
          <li>Thorough testing procedures using unit tests, integration tests and system tests to identify bugs before deployment using Playwright and vTest with atleast 90% coverage</li>
          <li>Use of automated testing tools such as Google Lighthouse to test the systems performance and functionality.</li>
          <li>The app must peform consistenly at all times.</li>
          <li>The app must implement robust error handling mechanisms.</li>
        </ol>
      </li>
      <li>Data Accuracy and Consistency
        <ol className='src-bullets'>
          <li>Implement data validation mechanisms to ensure that user input is accurate and consistent.</li>
          <li>Enforce data validation rules and constraints at the application level to prevent invalid or incomplete data from entering the system.</li>
          <li>Use transaction management techniques to maintain data integrity and consistency, such as atomicity, consistency, isolation, and durability (ACID) properties in database operations.</li>
        </ol>
      </li>
    </ol>
  </li>
  <li>Efficiency
    <ol className='srs-bullets'>
      <li>The app will need to be fast and responsive</li>
      <li>The app will not have unneccesary overhead that can cause delays</li>
      <li>The app will need to have minimal load times and retrieval processes</li>
    </ol>
  </li>
  <li>Usability
    <ol className='srs-bullets'>
      <li>Clear and Intuitive Interface
        <ol className='srs-bullets'>
          <li>Simplify the interface by removing unnecessary clutter and organising information logically and intuitively.</li>
          <li>Use consistent design patterns and terminology throughout the platform to reduce cognitive load and improve user comprehension.</li>
          <li>Provide clear visual cues, such as buttons, icons, and labels, to guide users through the interface and indicate interactive elements.</li>
        </ol>
      </li>
      <li>User-Friendly Navigation
        <ol className='srs-bullets'>
          <li>Design an intuitive navigation structure that allows users to easily find and access the platform's features and functionalities.</li>
          <li>Use hierarchical menu structures, breadcrumbs, and navigation bars to provide clear pathways for users to navigate between different sections of the platform.</li>
        </ol>
      </li>
    </ol>
  </li>
</ol>

### Architectural Pattern

### Client-Server Pattern

The Client-Server architecture for our project splits the application into two main components being the client and the server. The client is a Progressive Web App built with React and provides an interactive and responsive user interface that can be accessed and used across multiple devices. Users actions such as creating and writing stories are sent as HTTP requests to the server. The server, developed using NestJS, handles these requests by processing the data, applying NLP techniques, and managing the business logic. All of our data is stored in a database therefore ensuring persistence and reliability.CI/CD using GitHub actions make updates and maintenance fast and efficient. This architecture ensures a robust, scalable, and secure platform, therefore creating a simple yet effective writing experience for users

## Use Case Diagrams

### Authentication System

![Authentication System](./images/AuthenticationUseCase.jpg)

### Story Creation System

![Story Creation System](./images/StoryCreationUseCase.jpg)

### View Story System

![View Story System](./images/ViewStoryUseCase.jpg)

## Technology Requirements

### Tech Stack

- Mono Repository Management ([nx](https://nx.dev/))![Nx](https://img.shields.io/badge/nx-143055?style=for-the-badge&logo=nx&logoColor=white)
- Framework ([nextjs](https://nextjs.org/)) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)
- Unit / Integration Testing ([jest](https://jestjs.io/)) ![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
- End-to-End / Integration Testing ([playwright](https://www.playwrite.dev/)) ![playwright](https://img.shields.io/badge/Playwright-45ba4b?style=for-the-badge&logo=Playwright&logoColor=white)
- Linting ([eslint](https://eslint.org/))![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
- Documentation: Inline ([jsdoc](https://jsdoc.app/))
- Documentation: Wiki ([markdown](https://www.markdownguide.org/))
- Documentation: Design and Wireframes ([figma](https://www.figma.com/))![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
- Documentation: Components ([Storybook](https://storybook.js.org/))
- Deployment: AWS ![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white) & Cloudflare Pages ![Cloudflare](https://img.shields.io/badge/Cloudflare-F38020?style=for-the-badge&logo=Cloudflare&logoColor=white)
- Misc: Package Manager ([pnpm](https://pnpm.io/))
- Misc: Local Development WSL
- Misc: Local Development Docker ([docker](https://www.docker.com/))![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
- Misc: Commit Standards ([Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/))

## Project Structure

```shell
.
├── apps
│   ├── writeme #Nextjs app
│   │   ├── app
│   │   │   └── api # additional api routes
│   │   ├── public
│   │   └── specs
│   ├── writeme-docs # documentation website
│   │   ├── docs
│   │   ├── guides
│   │   ├── src
│   │   │   ├── components
│   │   │   ├── css
│   │   │   └── pages
│   │   └── static
│   │       └── img
│   └── writeme-e2e # end-to-end tests for writeme app
│       └── src
├── wmc  # components library
│   └── src
└── wmc-utils # utilities for components library
    └── src
```

## User Stories

#### As a New User I would like to:

<ul className='newUserStories'>
  <li>Sign up with Google so it is faster and easier to sign up</li>
  <li>Sign up with GitHub so it is faster and easier to sign up</li>
  <li>Sign up with an email and password so I can use all of WriteMe's features</li>
</ul>

#### As an Existing User I would like to:

<ul className='existingUserStories'>
  <li>Sign in with Google so it is faster and easier to sign in</li>
  <li>Sign in with GitHub so it is faster and easier to sign in</li>
  <li>Sign in with an email and password so I can use all of WriteMe's features</li>
  <li>Select a story genre so I can create a story with this genre</li>
  <li>Publish my story so others can view and interact with it</li>
  <li>Save my story as a draft so I can carry on with it at another time without losing any of my story</li>
  <li>Edit my story so I can make any changes I think of at a later stage</li>
  <li>Add a title to my story so it is clear what the story is about</li>
  <li>Write my story in a helpful and easy to use editor so that my experience is fast, simple and enjoyable</li>
  <li>Add a cover image for my story so I can identify my different stories and associate them with cover images</li>
  <li>View a story so I can read other peoples stories and get inspiration for some of my own stories</li>
  <li>Like a story so I can show my appreciation for a good story</li>
  <li>Comment on a story so I can share my thoughts and receive feedback from others</li>
  <li>Share a story so I can show others the story</li>
</ul>
