import { useEffect, useState } from "react";
import Remind from "./remind";

function RemindContainer() {
    const [remindList, setRemindList] = useState([])

    useEffect(() => {
        setRemindList(refreshReminderList)
    }, [])
    
    return(
        <>
            <h2 className="title">Lista de lembretes</h2>
            <div className="list-container">
                {remindList}
            </div>
        </>
    )
}

export default RemindContainer 