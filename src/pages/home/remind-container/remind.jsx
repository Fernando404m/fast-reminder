import "./remind.css"

function Remind ({itenId = -1, fn = "unknow function", title = "Sem titulo", desc = "Nenhuma descrição", datetime = "Horario nao marcado"}) {

    const setedTime = new Date(datetime)
    
    return(
        <div id={itenId} className="remind-block">
            <h3 className="reminder-title"><span>{title}</span></h3>
            <button className="delete-btn material-symbols-outlined" onClick={async () => {
                await rmvReminder(itenId)
                return fn()
            }}>close</button>
            <p className="reminder-desc">{desc}</p>
            <div className="iten-time-bar">
                <span className="iten-date">
                    {setedTime.toLocaleDateString("pt-BR")}
                </span>
                <span className="iten-time">
                    {setedTime.toLocaleTimeString("pt-BR", {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </span>
            </div>
        </div>
    )
}

export default Remind