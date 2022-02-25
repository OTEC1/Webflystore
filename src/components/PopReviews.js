import React, { useEffect, useState } from 'react'
import styled from 'styled-components'



const  PopReviews = (props) =>{

    const [list, setlist] = useState([]);


    let carry = []
    useEffect(() => {

        for(var n=0; n <= props.data.length; n++)
            if(props.data[n] != null && props.data[n] != undefined)
                 carry.push(props.data[n]);
                 setlist(carry);

    },[])
    
  return (
    <Container>
        {list.map((v,i) => <div>
                                    <table>

                                        <tr>
                                            <td>
                                            <label>User:  {v.user}</label>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                            <span>‟ {v.review.length > 160 ? v.review.substring(0,165) +" ...": v.review } ˮ</span> 
                                            </td>
                                        </tr>
                                    </table>
                              
                              
                                </div>)}
    </Container>
  )

}


const Container = styled.div`
width: 100%;
display: flex;
overflow-x:scroll;


::-webkit-scrollbar {
display: none;
}



div{
width: 200px;
min-width:200px;
margin: 20px;
height: 280px;
border-radius:10px;
background: #f5f5f5;
font-family: "Poppins", sans-serif;
padding: 20px;

label{
font-weight:700;
}

span{
width: 90%;
max-width:90%;
height: 100%;
}
}

`;

export default PopReviews