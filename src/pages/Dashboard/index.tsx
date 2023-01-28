import { useNavigate } from "react-router-dom";
import { IcLogo } from "../../assets/png";
import { Header } from "../../components";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <section className="flex flex-1 flex-col mx-auto max-w-7xl w-full">
      <Header onPress={() => navigate("login")} />
      <div className="h-[80vh] px-10 mx-auto">
        <img alt="logo" src={IcLogo} width={1000} height={1000} />
      </div>
    </section>
  );
}

export default Dashboard;
