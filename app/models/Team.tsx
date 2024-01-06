import { ITeam } from '../utils/wikiQuery'

export default class Team {
    teamName: string
    relationship: string
    isParticipating: boolean
    eliminationOrder: number

    constructor(inTeam: ITeam) {

        if (inTeam.eliminationOrder === 0 && !inTeam.isParticipating) {
            console.warn("Building a team whose eliminationOrder is 0 (default), but they are also have isParticipating = false. May be a bad team construction")
        }

        this.teamName = inTeam.teamName
        this.relationship = inTeam.relationship
        this.isParticipating = inTeam.isParticipating
        this.eliminationOrder = inTeam.eliminationOrder
    }

    isInPlay(roundNumber: number): boolean {

        //return x.eliminationOrder === 0 || x.eliminationOrder > i ? acc + 10 : acc
        return this.eliminationOrder === 0 || roundNumber+1 < this.eliminationOrder
    }

}

