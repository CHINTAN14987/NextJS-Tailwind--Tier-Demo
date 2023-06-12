import Perks from "../components/perks/Perks";
import SideNav from "../components/SideNav/SideNav";
import AdvanceForm from "../components/Forms/AdvanceForm";
import InitialForm from "../components/Forms/InitialForm";
import Academy from "../components/Academy/Academy";

const HomePage = () => {
  return (
    <div className="flex flex-col p-2 justify-around sm:flex-row">
      <SideNav />
      <div>
        <h3 className="text-xl text-center font-bold  text-custom-gray h-40 mt-16">
          Editing tier
        </h3>
        <div className="flex flex-col flex-[0.3] sm:flex:1">
          <InitialForm />
          <Perks />
          <AdvanceForm />
        </div>
      </div>
      <Academy />
    </div>
  );
};

export default HomePage;
