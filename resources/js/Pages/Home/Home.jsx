import ListReport from "./Partials/ListReports";
import Navbar from "./Partials/Navbar";
import Footer from "./Partials/Footer";

export default function Home({reports}){
    return(
        <div className="container-fluid">
            <Navbar />
            <ListReport  reports={reports}/>        
            <Footer />
        </div>
    );

};