import styled  from "styled-components";
import { RiAccountCircleLine, RiCopyrightLine,RiSafeFill, RiFacebookBoxLine, RiInstagramLine, RiMessage2Line, RiTeamLine, RiTwitterLine, RiWhatsappLine, } from 'react-icons/ri';
import {useNavigate, useNavigator} from  'react-router-dom';

const Footer = (props) => {


    const history = useNavigate();


    const nav = (data,index1,index2) => {
        history(`/${data}/`+index1+"/"+index2);
    }

    return(
        <Footers>
            <LEFT> 
            <table>
                <tr>
                    <td onClick={(e) => nav("contact",0,0)}>
                     Contact us &nbsp; <RiMessage2Line/>
                    </td>
                </tr>

                <tr>
                    <td>
                     <a  href={process.env.REACT_APP_FACE_PAGE_LINK}>Like our Page on</a>  &nbsp;<RiFacebookBoxLine/> 
                    </td>
                </tr>


                <tr>
                    <td>
                      <a href="https://www.instagram.com/invites/contact/?i=o8y51paupmy0&utm_content=3qn7nqj">Follow us on </a>  &nbsp;<RiInstagramLine/> 
                    </td>
                </tr>


                <tr>
                    <td>
                      <a href="https://wa.me/message/3WPQF6FPTMA5O1">Connect with us  </a>   &nbsp; <RiWhatsappLine/> 
                    </td>
                </tr>

            </table>
        </LEFT>

        <MIDDLE> 
           <table>
                <tr>
                    <td onClick={(e) => nav("about",0,0)}>
                     About us &nbsp; <RiAccountCircleLine/>
                    </td>
                </tr>

                <tr>
                    <td>
                    Kokocarft policy  &nbsp;<RiCopyrightLine/> 
                    </td>
                </tr>

                <tr>
                    <td onClick={(e) => nav("contact",0,0)}>
                     Connect  &nbsp;<RiTeamLine/> 
                    </td>
                </tr>

                <tr>
                    <td  onClick={(e) => nav("about",800,800)}>
                     Disclaimer  &nbsp;<RiSafeFill/> 
                    </td>
                </tr>

            </table>
        </MIDDLE>


        
        <RIGHT> 
            <table>
                <tr>
                    <td>
                    </td>
                </tr>
            </table>
        </RIGHT>

</Footers>
    )
}





const Footers = styled.div`
position: relative;
height: auto;
width: 100%;
background-image: linear-gradient(to top right,#BA5833, #EC9335);
bottom: 0;
display: flex;
flex-wrap:wrap;
table{
padding-top:50px;
padding-bottom:50px;
}
@media(max-width:768px){
}
`;





const LEFT = styled.div`
width: 35%;
height: 100%;


tr td{
margin: 10px;
font-weight:500;
font-family: "Poppins", sans-serif;
color: #f5f5f5;
display: flex;
justify-content:left;
align-items:center;
text-align:left;
a{
text-decoration:none;
font-family: "Poppins", sans-serif;
color: #f5f5f5;
}
}
@media(max-width:768px){
border-top:1px solid #fff;
margin-top:35px;
width: 90%;
}
`;


const MIDDLE = styled.div`
width: 30%;
height: 100%;



tr td{
margin: 10px;
font-weight:500;
font-family: "Poppins", sans-serif;
color: #f5f5f5;
display: flex;
justify-content:left;
align-items:center;
text-align:left;
}

@media(max-width:768px){
margin-top:35px;
width: 90%;
border-top:1px solid #fff;
}
`;


const RIGHT = styled.div`
width: 35%;
height: 100%;
@media(max-width:768px){
width: 100%;
}
`;

export default Footer;