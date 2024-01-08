const LoggedInNav = ({ context }) => {
  return (
    <div
        onClick={() => context.actions.logout()}
        className="horizontal-nav-link"
      >
        <p className="horizontal-nav-link-text">Logout</p>
    </div>
  )
}

export default LoggedInNav
