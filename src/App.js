import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"

import React from "react"
import Split from "react-split"
import {nanoid} from "nanoid"

import "react-mde/lib/styles/css/react-mde-all.css";


// const converter = new Showdown.Converter({
//     tables: true,
//     simplifiedAutoLink: true,
//     strikethrough: true,
//     tasklists: true
// });

export default function App() {
    const [notes, setNotes] = React.useState([])
    const [currentNode, setCurrentNode] = React.useState((notes[0] && notes[0].id) || "")
    const [selectedTab, setSelectedTab] = React.useState<"write" | "preview">("write");
    
    function createNewNote() {
        const newNote = {
            id: nanoid(),
            text: "# Type your text here"
        }
        setNotes(prevNotes => [newNote, ...prevNotes])
        setCurrentNode(newNote.id)
    }

    function updateNote(newText) {
        setNotes(oldNotes => oldNotes.map(oldNote => {
            return oldNote.id == currentNode.id ? {...oldNote, text: newText} : oldNote
        }))
    }

    // function getCurrentNote() {
    //     return notes.find(note => {
    //         return note.id == currentNode.id
    //     })
    // }

    return (
        <div className="main">
            {
                notes.length > 0 ?
                    <Split
                        sizes={[20, 70]}
                    >
                        <Sidebar 
                            notes={notes}
                            currentNode={currentNode}
                            setCurrentNode={setCurrentNode}
                            newNote={createNewNote}
                        />
                        <Editor 
                            currentNode={currentNode}
                            updateNote={updateNote}
                        />
                    </Split>
                :
                <div className="no-notes">
                    <h2>There is no note</h2>
                    <button className="first-note" onClick={createNewNote}>Create First Node</button>
                </div>
            }
        </div>
    )
}
