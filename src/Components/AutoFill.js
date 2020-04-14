import React, {Component} from 'react'

class AutoFill extends Component {

    displayItems = (user) => {
        if (user) {
            return user.lastFive.split(",")
        } else {
            return null
        }
    }

    render() {
        return(
            <div className="autofill">
                <td>
                    {
                    this.displayItems(this.props.userRecents).map( obj => {
                        return <tr>obj</tr>
                    })
                    }
                </td>
            </div>
        )
    }
}

export default AutoFill