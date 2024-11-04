import Roadmap from "../components/Roadmap";
import Button from "../components/Button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="common-margin pt-20 pb-36 flex flex-col gap-36">
      <Roadmap road={["home", "404 error"]} />

      <div className="flex flex-col items-center gap-20">
        <div className="flex flex-col items-center gap-10 text-center text-text2">
          <h1 className="capitalize text-8xl">404 not found</h1>
          <p>Your visited page not found. You may go home page.</p>
        </div>

        <Link to="/">
          <Button text="back to home page" />
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
