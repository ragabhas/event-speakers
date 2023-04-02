function SpeakerAdd({ eventYear, insertRecord }) {
  return (
    <a href="#" className="addSes">
      <i
        onClick={(event) => {
          event.preventDefault();
          const firstLast = window.prompt("Enter first and last name:");
          const [firstInput, lastInput] = firstLast.split(" ");
          insertRecord({
            id: "99999",
            first: firstInput,
            last: lastInput,
            bio: "New Speaker",
            sessions: [
              {
                id: 999,
                title: "New Session",
                room: {
                  name: "New Room",
                },
                eventYear,
              },
            ],
          });
        }}
      >
        +
      </i>
    </a>
  );
}

export default SpeakerAdd;
