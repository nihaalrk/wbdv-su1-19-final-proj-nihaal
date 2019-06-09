import React from 'react'

const CourseRow = ({thread}) => {
 return (
   	<tr>
     	<td>
     		<a href={thread.data.url}> {thread.data.title} </a>
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
export default CourseRow;