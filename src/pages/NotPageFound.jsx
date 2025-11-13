import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotPageFound = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('../home')
  }, []);

  return (
    <>
      <h1>404 - Page Not Found</h1>
    </>
  );
};

export default NotPageFound;