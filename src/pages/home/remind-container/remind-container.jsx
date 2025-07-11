import { useEffect, useState } from "react";
import Remind from "./remind";

function RemindContainer() {
    const [remindList, setRemindList] = useState(["unset"])
    
    async function loadList() {
        setRemindList(["unset"])
        
        let reminders = await getReminderList()
        setRemindList(reminders)
    }

    useEffect(() => {
        loadList()
    }, [])
    
    return(
        <>
            <h2 className="title">Lista de lembretes</h2>
            <button className="refresh-btn" onClick={() => loadList()}>Recarregar</button>
            <div className="list-container">
                {remindList.length == 0 ? (
                    <div></div>
                ) : (
                    <div>
                        {remindList.map((iten, i) => (
                            <Remind itenId={iten.id} fn={loadList} key={i} title={iten.title} desc={iten.body} datetime={iten.datetime}/>
                        ))}
                    </div>
                )}
            </div>
        </>
    )
}

export default RemindContainer 