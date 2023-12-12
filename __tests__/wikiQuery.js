import { getTeamList } from '../app/utils/wikiQuery'

describe('getData', () => {
    it('should run', () => {
        // Arrange
        const firstContestantsFirstName = "Some"
        const secondContestantsFirstName = "SomeGuys"

        const listOfContestants = [
            {
                name: firstContestantsFirstName + " Guy",
                status: "Participating"
            },
            {
                name: secondContestantsFirstName + " Brother",
                status: "Participating"
            }]

        // Act
        var result = getTeamList(listOfContestants)

        // Assert
        expect(result).not.toBeNull()
    })

    it('should throw an error for a contestantData w/ a missing status for second on a team', () => {
        // Arrange
        const firstContestantsFirstName = "Some"
        const secondContestantsFirstName = "SomeGuys"

        const listOfContestants = [
            {
                name: firstContestantsFirstName + " Guy",
                status: "Participating"
            },
            {name: secondContestantsFirstName + " Brother"}
        ]

        // Act
        var act = () => getTeamList(listOfContestants)

        // Assert
        expect(act).toThrow(new ReferenceError("Status is either null or undefined and it shouldn not be"))
    })

    it('Should parse out elimination order a populate it when the team is not participating', () => {
        const firstContestantsFirstName = "Some"
        const secondContestantsFirstName = "SomeGuys"
        const expectedEliminationOrder = 2

        const listOfContestants = [
            {},
            {
                name: firstContestantsFirstName + " Guy",
                status: "Eliminated " + expectedEliminationOrder + "nd"
            },
            {
                name: secondContestantsFirstName + " Brother",
                status: "Eliminated " + expectedEliminationOrder + "nd"
            }
        ]

        var result = getTeamList(listOfContestants)

        expect(result.props.runners[0].eliminationOrder).toEqual(2)
    })

    it('should create team names based on merging contestants full names two at a time skipping the first empty one', () => {
        // Arrange
        const firstContestantsFullName = "Some" + " Guy"
        const secondContestantsFullName = "SomeGuys" + " Brother"
        const expectedTeamName = firstContestantsFullName + " & " + secondContestantsFullName

        const listOfContestants = [
            {},
            {
                name: firstContestantsFullName,
                status: "Participating"
            },
            {
                name: secondContestantsFullName,
                status: "Participating"
            }
        ]

        // Act
        var result = getTeamList(listOfContestants)

        expect(result.props.runners[0].teamName).toEqual(expectedTeamName)
    })
})
