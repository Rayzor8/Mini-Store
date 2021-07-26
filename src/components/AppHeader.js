import React from 'react'

const AppHeader = ({title}) => {
    return (
        <header>
            <h1>{title}</h1>
        </header>
    )
}

AppHeader.defaultProps = {
    title: 'Default Title Props',
}; // if pass props null, set default AppContent props

export default AppHeader
