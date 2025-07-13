import { useState, useEffect } from "react"
import RemindContainer from "./remind-container/remind-container"
import Calendar from "./calendar/calendar"
import Daily from "./remind-container/daily"
import "./Home.css"
import "./menuAnimation.css"


function Home() {
  
  const [dateTimeNow, setDateTimeNow] = useState(new Date())
  const [theme, setTheme] = useState(document.documentElement.getAttribute("data-theme"))

  // time
  useEffect(() => {
    const interval = setInterval(() => {
      setDateTimeNow(new Date())
    }, 1000);
    return () => clearInterval(interval)
  }, [])

  // theme
  function changeTheme() {
    let currentTheme = document.documentElement.getAttribute("data-theme")
    let newTheme = currentTheme == "light" ? "dark" : "light"
    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem("tema", newTheme)
    setTheme(newTheme)
  }
  const savedTheme = localStorage.getItem("tema")
  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme)
  }

  function showConfigs() {
    let btn = document.getElementById("show-config-btn")
    btn.disabled = true
    setTimeout(() => btn.disabled = false, 700)
    btn.classList.add("conf-anim-rot")
    setTimeout(() => {btn.classList.remove("conf-anim-rot")}, 1000);

    let confBtns = document.querySelectorAll(".config-btn") 

    let confMenu = document.getElementById("ease-conf")
    if (confMenu.style.display == "flex") {
      confBtns.forEach(iten => iten.disabled = true)
      confMenu.classList.remove("conf-anim-sli")
      confMenu.classList.add("conf-anim-sli-rev")
      setTimeout(() => {confMenu.style.display = "none"}, 700);
    } else {
      setTimeout(() => confBtns.forEach(iten => iten.disabled = false), 600)
      confMenu.style.display = "flex"
      confMenu.classList.add("conf-anim-sli")
      confMenu.classList.remove("conf-anim-sli-rev")
    }
  }

  return(
    <>
      <header className="header">
        <h1 className="main-title">Fast Reminder</h1>
        <span className="time">{dateTimeNow.toLocaleTimeString()}</span>

        <div className='config-container'>
          <button id='show-config-btn' className='material-symbols-outlined' onClick={() => {showConfigs()}}>settings</button>
          <div id='ease-conf'>
            <button id="logout" onClick={() => logout()} className="logout material-symbols-outlined ">logout</button>
            <button id="notification" className="notification-switch material-symbols-outlined ">notifications</button>
            <button className='config-btn material-symbols-outlined' onClick={() => {changeTheme()}}>{theme == "dark" ? "dark_mode" : "light_mode"}</button>
          </div>
        </div>
      </header>
      <main>
        <section className="inserting-area section">
          <h2 className="title">Escreva um lembrete</h2>
          <form className="input-container" onSubmit={(e) => sendReminder(e)}>
            <input className="inputs" id="input-title" required type="text" minLength={3} placeholder="titulo"/>
            <textarea className="inputs" id="input-desc" required placeholder="descrição"/>

            <fieldset className="date">
              <input id="date-d" className="inputs date-inputs inp-len-2" type="number" placeholder="dia" min={1} max={31}/>/
              <input id="date-m" className="inputs date-inputs inp-len-2" type="number" placeholder="mês" min={1} max={12}/>/
              <input id="date-y" className="inputs date-inputs inp-len-4" type="number" placeholder="ano" min={2025}/>
              <input id="date-h" className="inputs date-inputs inp-len-2" required type="number" placeholder="hora" min={0} max={23}/>:
              <input id="date-min" className="inputs date-inputs inp-len-2" required type="number" placeholder="min" min={0} max={59}/>
            </fieldset>

            <fieldset className="week">
              <label className="week-lab">Dom<input className="week-check" type="checkbox" name="week-check" value={0} /></label>
              <label className="week-lab">Seg<input className="week-check" type="checkbox" name="week-check" value={1} /></label>
              <label className="week-lab">Ter<input className="week-check" type="checkbox" name="week-check" value={2} /></label>
              <label className="week-lab">Qua<input className="week-check" type="checkbox" name="week-check" value={3} /></label>
              <label className="week-lab">Qui<input className="week-check" type="checkbox" name="week-check" value={4} /></label>
              <label className="week-lab">Sex<input className="week-check" type="checkbox" name="week-check" value={5} /></label>
              <label className="week-lab">Sab<input className="week-check" type="checkbox" name="week-check" value={6} /></label>
            </fieldset>

            <button type="submit" className="add-btn">Adicionar</button>
          </form>
        </section>
        <section className="daily-reminder section">
          <Daily />
        </section>
        <section className="calendar section">
          <Calendar />
        </section>
        <section className="reminder-list section">
          <RemindContainer />
        </section>
      </main>
    </>
  )
}

export default Home