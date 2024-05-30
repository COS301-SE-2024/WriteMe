
// import WriteMeLogo from "../assets/WriteMe.png";

import LoginForm from './LoginForm';

export default function Login(){
  return (
    <div>
      <nav className="p-12 flex justify-between items-center">
        {/* WriteMe logo */}
        <div className="flex items-center">
          <div style={{ width: "10rem" }}>
            {/* <img src={WriteMeLogo.src} alt="WriteMe Logo" /> */}
          </div>
        </div>
      </nav>

      <LoginForm></LoginForm>
    </div>
  )
}
