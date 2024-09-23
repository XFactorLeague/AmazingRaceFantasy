import { WIKI_API_URL } from '../../../leagueConfiguration/BigBrother_26'
import { CONTESTANT_LEAGUE_DATA } from '../../../leagueData/BigBrother_26'
import { getWikipediaContestantDataFetcher } from '@/app/utils/wikiFetch';
import generateListOfContestantRoundLists from '@/app/generators/contestantRoundListGenerator';
import generateContestantRoundScores from '@/app/generators/contestantRoundScoreGenerator';
import LeagueStandingTable from '../../../components/leagueStandingTable/leagueStandingTable';

export default async function LeagueStanding() {
    const dataFetcher = getWikipediaContestantDataFetcher(WIKI_API_URL, "Cast");
    const contestantScores = await generateContestantRoundScores();
    // const contestantsScores = await generateListOfContestantRoundLists(dataFetcher,  CONTESTANT_LEAGUE_DATA, getCompetingEntityList);
    // return <>
    //     <h1 className="text-3xl text-center">League Standing</h1>
    //     <br/>
    //     <LeagueStandingTable contestantsScores={contestantsScores} />
    // </>
}