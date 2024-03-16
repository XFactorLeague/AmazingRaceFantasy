import { WIKI_API_URL } from '../leagueConfiguration/AmazingRace_36'
import { CONTESTANT_LEAGUE_DATA } from '../leagueData/AmazingRace_36'
import ContestantSelector from '../components/contestantSelector'
import { getWikipediaContestantDataFetcher } from '../utils/wikiFetch'
import generateListOfContestantRoundLists from '../generators/contestantRoundListGenerator'

export default async function Scoring() {

    const dataFetcher = getWikipediaContestantDataFetcher(WIKI_API_URL)

    const listOfContestantRoundLists = await generateListOfContestantRoundLists(dataFetcher, CONTESTANT_LEAGUE_DATA)

    return (
        <div>
            <h1 className="text-2xl text-center">Current Scoring for</h1>
            <br/>
            <ContestantSelector listOfContestantRoundLists={listOfContestantRoundLists}/>
            <p>This seaons contestant data has been persisted into <a href="https://docs.google.com/spreadsheets/d/1AhDphP_QPb8fRYJarcgl_0o4r6yabrX_WW76XCqvvXg/edit?usp=sharing">this google sheet</a> from a google form.</p>
        </div>
    )
}
