export const PlayerDropdown = ({ players, onItemClick }) => {
  return (
    <div className="dropdown">
      <button className="dropbtn">Select Player</button>
      <div className="dropdown-content">
        {players.map((player) => (
          <span key={player.id} onClick={() => onItemClick(player)}>
            {player.name} - {player.rating}
          </span>
        ))}
      </div>
    </div>
  )
}
