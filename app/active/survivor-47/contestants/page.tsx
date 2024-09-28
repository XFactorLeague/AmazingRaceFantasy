import { getCompetingEntityList, ITeam } from "../../../utils/wikiQuery"
import { getWikipediaContestantData } from "../../../utils/wikiFetch"
import { WIKI_API_URL, WIKI_PAGE_URL } from '../../../leagueConfiguration/Survivor_47'

export default async function Contestants() {

    const wikiContestants = await getWikipediaContestantData(WIKI_API_URL, "Contestants")
    const final = getCompetingEntityList(wikiContestants)

    return (
        <div>
          <br/>
          <h1 className="text-2xl text-center">Contestants</h1>
          <br/>
          <p className="text-lg text-center">{final.props.runners.length} Contestants</p>
          <br/>
          <div className="text-center">
              {final.props.runners.map((t: ITeam) => {
                return (<>
                    <p key={t.teamName}>
                        {t.isParticipating ? t.teamName : <s>{t.teamName}</s>}
                    </p>
                </>)
              })}
          </div>
          <br/>
          <div>
            <p>
              Data provided by <a className="standard-link" href={WIKI_PAGE_URL} >Wikipedia</a> for this season of Survivor
            </p>
          </div>
        </div>
    )
}

