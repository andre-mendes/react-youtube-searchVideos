class ListRepos extends React.Component {
  render() {
    return (
      <div className="repositories">
        {this.props.repos.map((repo) => {
          return (
            <div key={repo.id} className="mdl-card mdl-shadow--2dp">
              <div className="mdl-card__actions mdl-card--border">
                <a href={repo.html_url} target="_blank" className="mdl-button
                  mdl-button--colored mdl-js-button mdl-js-ripple-effect">
                  {repo.name}
                </a>

                <div className="mdl-layout-spacer"></div>

                <a href={repo.html_url} target="_blank">
                  <span className="fa fa-github"></span>
                </a>
              </div>

              <div className="mdl-card__title mdl-card--expand">
                <p>{repo.description}</p>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default ListRepos
