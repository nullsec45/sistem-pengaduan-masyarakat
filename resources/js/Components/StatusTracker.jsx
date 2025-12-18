import { Card } from "@/components/ui/card";
import { Fragment } from "react";


const StatusStep = ({ status, isActive, isCompleted }) => {
    const getStatusClass = () => {
        if (isCompleted) return "bg-primary text-primary-foreground";
        if (isActive) return "bg-accent text-accent-foreground";
        return "bg-muted text-muted-foreground";
    }

    return (
        <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${getStatusClass()}`}>
                {isCompleted ? '✓' : '●'}
            </div>
            <p className="text-xs mt-1 text-center">{status}</p>
        </div>
    )
}


const StatusTracker = ({ currentStatus }) => {
    const statusOrder = ["Pending", "Proses Administratif", "Proses Penanganan", "Selesai Ditangani"];
    const rejectedStatus = "Laporan Ditolak";
    const currentIndex = statusOrder.indexOf(currentStatus);
    const isRejected = currentStatus === rejectedStatus;

    if (isRejected) {
        return (
             <div className="flex items-center justify-center p-4 bg-destructive/10 rounded-lg">
                <p className="text-destructive font-medium">Laporan Ditolak</p>
             </div>
        )
    }

    return (
        <div className="flex justify-between items-start pt-2">
            {statusOrder.map((status, index) => (
                <Fragment key={index}>
                    <StatusStep
                        key={index}
                        status={status}
                        isActive={index === currentIndex}
                        isCompleted={index < currentIndex}
                    />
                    {index < statusOrder.length - 1 && (
                        <div className={`flex-1 h-1 mt-4 ${index < currentIndex ? 'bg-primary' : 'bg-muted'}`} />
                    )}
                </Fragment>
            ))}
        </div>
    )
}

export default StatusTracker;