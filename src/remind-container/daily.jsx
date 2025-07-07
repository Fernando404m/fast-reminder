import { useEffect, useState } from "react";
import Remind from "./remind";

function Daily() {

    const [remindList, setRemindList] = useState(["unset"])
        
    async function loadList() {
        setRemindList(["unset"])

        const currDate = new Date()
        let reminders = await getReminderList()

        let daily = reminders.filter(rem => {
            let iTime = new Date(rem.datetime)
            return `${iTime.getDate()}${iTime.getMonth()}${iTime.getFullYear()}` == `${currDate.getDate()}${currDate.getMonth()}${currDate.getFullYear()}` ? true : false
        })
        
        setRemindList(daily)
    }

    useEffect(() => {
        loadList()
    }, [])

    return(
        <>
            <h2 className="title">Lembretes do Dia</h2>
            <button className="refresh-btn" onClick={() => loadList()}>Recarregar</button>
            <div className="list-container">
                {remindList.length == 0 ? (
                    <div className="congrats">
                        <h3>Parabens</h3>
                        <p>Você completou todas as tarefas de hoje</p>
                    </div>
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

export default Daily