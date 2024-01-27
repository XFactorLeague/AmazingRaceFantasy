'use client'
import { Fragment, useState, ReactNode } from 'react'

type ContestantSelectorProps = {
    listOfContestantRoundLists: {
        key: string
        content: ReactNode
    }[]
}

export default function ContestantSelector({ listOfContestantRoundLists }: ContestantSelectorProps) {

    const [selectedContestant, setSelectedContestant] = useState("Andrew")

    return (
        <div className="flex justify-center">
            <select value={selectedContestant} onChange={e => setSelectedContestant(e.target.value)}>
                <option>Andrew</option>
                <option>Cindy</option>
                <option>Jacob</option>
                <option>Jim</option>
                <option>Rachel</option>
            </select>
        </div>
    )
}
