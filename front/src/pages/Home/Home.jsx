import { Feet } from "../../components/feet/Feet";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import './home.css'
export default function Home() {
  return (
    <>
   <Topbar/>
   <div className="container">
    <Sidebar/>
    <Feet/>
    <Rightbar/>
   </div>
   </>
  );
}
