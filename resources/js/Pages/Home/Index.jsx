import ListReport from "../../Components/ListReports";
import HomeLayout from "@/Layouts/HomeLayout";

export default function Index({reports}){
    return(
        <HomeLayout title="Daftar Aspirasi Masyarakat" 
                    description="Kelola dan pantau aspirasi yang masuk dari masyarakat."
        >
            <ListReport  reports={reports}/>        
        </HomeLayout>
    );

};