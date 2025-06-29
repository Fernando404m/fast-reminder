import { useState, useEffect } from "react"

function Calendar() {
    const [month, setMonth] = useState(new Date().toLocaleString('pt-BR', { month: 'long' }))
    const [day, setDay] = useState([[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]])

    async function loadCalendar() {
        let reminders = await getReminderList()

        reminders.forEach(rem => {
            let dateRem = new Date(rem.datetime)
            let remDay = dateRem.getDate()
            let remMonth = dateRem.getMonth()

            if (remMonth == new Date().getMonth()) {
                setDay(itens => {
                    const temp = [...itens]
                    temp[remDay-1] = [rem.title, rem.body, rem.datetime]
                    return temp
                })
            }
        })

        const weekday = new Date(`${new Date().getFullYear()}-${new Date().getMonth()}-01T01:01:01.000-03:00`).getDay()
        const corrective = document.getElementById("corrective")
        
        if (weekday > 0) {
            corrective.style.display = "block"
            corrective.style.gridColumn = `1 / ${weekday + 1}`
        } else {
            corrective.style.display = "none"
        }
    }

    useEffect(() => {
        loadCalendar()
    }, [])
    
    return (
        <>
            <button className="refresh-btn" onClick={() => {loadCalendar()}}>Recarregar</button>
            <div className="calendar-container">
                <div className="month">{month}</div>

                <div className="weekday">Dom</div>
                <div className="weekday">Seg</div>
                <div className="weekday">Ter</div>
                <div className="weekday">Qua</div>
                <div className="weekday">Qui</div>
                <div className="weekday">Sex</div>
                <div className="weekday">Sab</div>

                <div id="corrective"></div>

                <div className="calendar-day">
                    <span className="day">1</span>
                    <span className="calendar-remind">{day[0][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">2</span>
                    <span className="calendar-remind">{day[1][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">3</span>
                    <span className="calendar-remind">{day[2][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">4</span>
                    <span className="calendar-remind">{day[3][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">5</span>
                    <span className="calendar-remind">{day[4][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">6</span>
                    <span className="calendar-remind">{day[5][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">7</span>
                    <span className="calendar-remind">{day[6][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">8</span>
                    <span className="calendar-remind">{day[7][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">9</span>
                    <span className="calendar-remind">{day[8][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">10</span>
                    <span className="calendar-remind">{day[9][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">11</span>
                    <span className="calendar-remind">{day[10][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">12</span>
                    <span className="calendar-remind">{day[11][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">13</span>
                    <span className="calendar-remind">{day[12][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">14</span>
                    <span className="calendar-remind">{day[13][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">15</span>
                    <span className="calendar-remind">{day[14][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">16</span>
                    <span className="calendar-remind">{day[15][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">17</span>
                    <span className="calendar-remind">{day[16][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">18</span>
                    <span className="calendar-remind">{day[17][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">19</span>
                    <span className="calendar-remind">{day[18][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">20</span>
                    <span className="calendar-remind">{day[19][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">21</span>
                    <span className="calendar-remind">{day[20][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">22</span>
                    <span className="calendar-remind">{day[21][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">23</span>
                    <span className="calendar-remind">{day[22][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">24</span>
                    <span className="calendar-remind">{day[23][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">25</span>
                    <span className="calendar-remind">{day[24][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">26</span>
                    <span className="calendar-remind">{day[25][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">27</span>
                    <span className="calendar-remind">{day[26][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">28</span>
                    <span className="calendar-remind">{day[27][0] ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">29</span>
                    <span className="calendar-remind">{day[28][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">30</span>
                    <span className="calendar-remind">{day[29][0]  ? "📌" : ""}</span>
                </div>
                <div className="calendar-day">
                    <span className="day">31</span>
                    <span className="calendar-remind">{day[30][0]  ? "📌" : ""}</span>
                </div>
            </div>
        </>
    )
}

export default Calendar