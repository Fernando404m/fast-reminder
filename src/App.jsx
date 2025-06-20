import { useState, useEffect } from "react"
import Remind from "./remind-iten/remind"
import "./App.css"
import "./menuAnimation.css"

function App() {

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
          <button id='show-config-btn' className='nav-btn material-symbols-outlined' onClick={() => {showConfigs()}}>settings</button>
          <div id='ease-conf'>
            <button className='config-btn nav-btn material-symbols-outlined' onClick={() => {changeTheme()}}>{theme == "dark" ? "dark_mode" : "light_mode"}</button>
            <button id="notification" className="notification-switch material-symbols-outlined ">notifications</button>
          </div>
        </div>
      </header>
      <main>
        <section>
          <h2 className="title">Escreva um lembrete</h2>
          <div className="input-container">
            <input className="inputs" id="input-title" type="text" minLength={3} placeholder="titulo"/>
            <textarea className="inputs" id="input-desc" placeholder="descrição"/>
            <div className="date">
              <input id="" className="inputs date-inputs inp-len-2" type="number" placeholder="dia" min={1} max={31}/>/
              <input id="" className="inputs date-inputs inp-len-2" type="number" placeholder="mês" min={1} max={12}/>/
              <input id="" className="inputs date-inputs inp-len-4" type="number" placeholder="ano" min={2025}/>
              <input id="" className="inputs date-inputs inp-len-2" type="number" placeholder="hora" min={0} max={23}/>:
              <input id="" className="inputs date-inputs inp-len-2" type="number" placeholder="min" min={0} max={59}/>
            </div>

            <button className="add-btn">Adicionar</button>
          </div>
        </section>
        <section>
          <button id="testar">a</button>
          {}
        </section>
      </main>
    </>
  )
}

export default App