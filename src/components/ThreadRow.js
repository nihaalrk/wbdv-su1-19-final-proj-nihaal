import React from 'react'

const CourseRow = ({thread}) => {
 return (
   	<tr>
     	<td>
     		<a href={thread.data.url}> {thread.data.title} </a>
     	</td>
        <td>
            {thread.data.ups}
        </td>
        <td>
            {thread.data.num_comments}
        </td>
   	</tr>
 )
}
export default CourseRow;