import "./index.less";
import Bannar from "../../../components/Recommand/bannar";
import Character from "../../../components/Recommand/Character";
import Personalized from "../../../components/Recommand/Personal";
import Mv from "../../../components/Recommand/Mv";

export default function Recommand() {
  return (
    <div className="recommand flex flex-col flex-1 px-32 overflow-x-hidden overflow-y-auto">
      <Bannar />
      <div className="mt-10">
        <Character />
        <Personalized />
        <Mv />
      </div>
    </div>
  );
}
