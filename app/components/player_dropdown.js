export const PlayerDropdown = ({ players, onItemClick }) => {
  return (
    <ul className="dropdown-list">
      {players.map((player, index) => (
        <li key={index} className="dropdown-item">
          <button onClick={() => onItemClick(player)} className="dropdown-item-button">
            {player.name} - {player.rating}
          </button>
        </li>
      ))}
    </ul>
  );
}
