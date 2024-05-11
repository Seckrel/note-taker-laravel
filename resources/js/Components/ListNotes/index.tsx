export default function ListNote({ notes }) {
    if (!notes || !notes.length) {
        return null;
    }

    return (
        <div className="flex flex-col gap-y-3">
            {notes.map((note) => {
                <div key={note.id}>{note.note}</div>;
            })}
        </div>
    );
}
