import { transformFilenameToSeasonNameRepo } from "../../../utils/leagueUtils"
import { getCompetingEntityList, getTeamList } from "../../../utils/wikiQuery";
import { getWikipediaContestantData } from "../../../dataSources/wikiFetch";
import { getLeagueConfigurationData } from "@/app/dataSources/dbFetch";
import Team from "@/app/models/Team"
import fs from "fs";
import path from "path";

// This forces Next to only generate routes that exist in generateStaticParams, otherwise return a 404
export const dynamicParams = false


// Creates routes for scoring
export async function generateStaticParams() {
  
    // Based on availability in leagueConfiguration
    const pathToLeagueConfiguration = path.join(process.cwd(), "app", "leagueConfiguration");
    const showPropPromises = fs.readdirSync(pathToLeagueConfiguration).map(async (file: string) => {
        // Needed status for url
        const leagueConfigurationData = await import(`../../../leagueConfiguration/${file}`);
        const { leagueStatus } = leagueConfigurationData;
        // Parses filename and converts it to url format
        const { urlSlug: showNameAndSeason } = transformFilenameToSeasonNameRepo(file)
        // Exporting properties as params
        const showPropertiesObj = {
            showNameAndSeason,
            showStatus: leagueStatus
        }
        return showPropertiesObj;
    });

    const shows = await Promise.all(showPropPromises);

    return shows;
}

export default async function Contestants({ params }: {
    params: Promise<{ showStatus: string; showNameAndSeason: string }>
  }) {

    // Wait for parsing and retrieving params
    const { showNameAndSeason } = await params;
    // Formatting to file naming convention
    const showAndSeasonArr = showNameAndSeason.split("-");
    const showSeason = showAndSeasonArr.at(-1);
    showAndSeasonArr.pop();
    const showName = showAndSeasonArr.join("_");
    const friendlyShowName = showAndSeasonArr.join(" ");
    // "Dynamically" (still static site generated) retrieving modules
    const leagueConfigurationData = await getLeagueConfigurationData(`league_configuration:${showName}:${showSeason}`);
    const { wikiApiUrl, wikiPageUrl, castPhrase, competitingEntityName } = leagueConfigurationData[0];

    const wikiContestants = await getWikipediaContestantData(wikiApiUrl, castPhrase);
    let final;
    if(showName.match("amazing_race")){
        final = getTeamList(wikiContestants);
    } else {
        final = getCompetingEntityList(wikiContestants);
    }

    return (
        <div>
            <br/>
            <h1 className="text-2xl text-center">Contestants</h1>
            <br/>
            <p className="text-lg text-center">{final.length} {competitingEntityName}</p>
            <br/>
            <div className="text-center">
                {final.map((t: Team) => {
                    return (<>
                        <p key={t.teamName}>
                            {t.isParticipating ? t.teamName : <s>{t.teamName}</s>}
                        </p>
                    </>);
                })}
            </div>
            <br/>
            <div>
                <p>
                    Data provided by <a className="standard-link" href={wikiPageUrl} >Wikipedia</a> for this season of {friendlyShowName}
                </p>
            </div>
        </div>
    );
}

