
import Log from "../components/Log";

import { useSelector } from "react-redux";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
  const auth = useSelector((state) => state.auth.auth)

  return (
    <div className="profil-page">
      {auth ? (
        <UpdateProfil />
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img src="./images/log-pepolls.svg" alt="img-log" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
  
  
  