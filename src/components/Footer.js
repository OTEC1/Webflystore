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
                    <td>
                     <a  href="https://web.facebook.com/webflystore">Like our Page on</a>  &nbsp;<RiFacebookBoxLine/> 
                    </td>
                </tr>


                <tr>
                    <td>
                      <a href="https://www.instagram.com/webflystore_/">Follow us on </a>  &nbsp;<RiInstagramLine/> 
                    </td>
                </tr>


                <tr>
                    <td>
                      <a href="#">Connect with us  </a>   &nbsp; <RiWhatsappLine/> 
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
                       Webflystore Policy  &nbsp;<RiCopyrightLine/> 
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
background:#006eff;
bottom: 0;
display: flex;
flex-wrap:wrap;
margin-top:30px;
clip-path: ellipse(138% 100% at 7.76% 100%);
table{
padding-top:70px;
padding-bottom:50px;
}
@media(max-width:768px){
flex-wrap:wrap;
height:auto;
clip-path: ellipse(267% 100% at -36.8% 100%);
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
margin-top:25px;
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