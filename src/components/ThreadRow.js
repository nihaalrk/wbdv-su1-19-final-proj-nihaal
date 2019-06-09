import React from 'react'

import {Link} from 'react-router-dom'

const ThreadRow = ({thread}) => {
 return (
   	<tr>
     	<td>
     		<Link to={"/threads/" + thread.data.subreddit + "/" + thread.data.id}> {thread.data.title} </Link>
     	</td>
        <td>
            {(new Date(thread.data.created_utc * 1000)).toLocaleDateString("en-US")}
        </td>
        <td>
            {thread.data.ups}
        </td>
   	</tr>
 )
}
export default ThreadRow;