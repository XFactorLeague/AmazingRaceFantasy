import { JSDOM } from 'jsdom'

const wikiUrl = "https://en.wikipedia.org/wiki/The_Amazing_Race_35"

async function getData() {

    const response = await fetch(wikiUrl, {next: { revalidate: 3600 }})
    const responseText = await response.text()
    const doc = new JSDOM(responseText)
    var domQuery = doc.window.document.querySelectorAll(".vcard .fn")

    // Build data model
    const final = []
    var team = ""
    for (var i = 0; i < domQuery.length; i++) {
        var contestantFullName = domQuery[i].textContent
        var contestantNames = null
        if (contestantFullName == null) {
            console.warn("Found a null contestant Name...")
            continue
        } else {
            contestantNames = contestantFullName.split(" ")
        }
        team += contestantNames[0]
        if (i % 2 == 0) {
            team += " & "

            var row = domQuery[i].parentElement.parentElement.parentElement.parentElement
            var teamStatusFull = row.lastElementChild.textContent
            var teamStatusSimple = teamStatusFull.trim().split(" ")[0]
            var isParticipating = teamStatusSimple === "Eliminated" ? false : true
        } else {
            final.push({teamName: team, isParticipating: isParticipating })
            team = ""
        }
    }

    return { props: { runners: final } }
}

export default async function Contestants() {

    const final = await getData()

    return (
        <div>
          <h1 className="text-2xl text-center">Contestants This Season</h1>
          <br/>
          <p className="text-lg text-center">{final.props.runners.length} teams</p>
          <br/>
          <div className="text-center">
              {final.props.runners.map(t => <p key={t.teamName}>{t.teamName}</p> )}
          </div>
          <div>
            <p>
              Data provided by <a className="standard-link" href={wikiUrl} >Wikipedia</a> for this season of the race
            </p>
          </div>
        </div>
    )
}
