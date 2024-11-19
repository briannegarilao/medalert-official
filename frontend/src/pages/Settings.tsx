import { CSSProperties } from 'react';
import { Card, Button } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';

function SettingPage() {

    const CardStyle: CSSProperties = {
        flexShrink: 0,
        display: 'flex', 
        flexDirection: 'column',
        width: '600px', 
        height: '80px', 
        position: 'relative', 
        marginLeft: '20px', 
        marginTop: '20px', 
        fontFamily: 'Arial',
        fontSize: '18px',
        fontStyle: 'normal',
        fontWeight: 500,
        lineHeight: 'normal',
        color: 'var(--Primary-Base-Black, #000)',
      };
      
      const BgStyle: CSSProperties = {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',  
        margin: '50px',
        background: '#f0f0f0', 
      };
      
      const Header: CSSProperties = {
        display: 'flex',
        width: '300px',
        padding: '3px 193px 8px 11px',
        alignItems: 'center',
        borderRadius: '10px',
        marginBottom: '20px',
        fontSize: '24px',
        fontWeight: 600,
        fontFamily: 'Arial',
        fontStyle: 'normal',
        background: 'var(--Base-White, #FFF)',
      };
      
      const SaveBtn: CSSProperties = {
        display: 'inline-flex',
        padding: '9px 36px 10px 36px',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '10px',
        fontFamily: 'Arial',
        fontSize: '16px',
        fontStyle: 'normal',
        fontWeight: 400,
        lineHeight: 'normal',
        background: 'rgba(19, 62, 135, 0.80)',
        color: '#FFF',
      };
      
      const BtnContainer: CSSProperties = {
        display: 'flex',
        marginTop: '20px', 
        marginLeft: '442px',
      };

      const TitleStyle: CSSProperties = {
        color: 'var(--Primary-Base-Black, #000)',
      }

      const TextStyle: CSSProperties = { 
        color: 'rgba(0, 0, 0, 0.50)'


      }

return (
    <div className="d-flex">
        <Sidebar/>
        <div className="shadow p-3 mb-5 bg-white rounded" style={BgStyle}>
        <div style={Header}> Settings </div>
        
{/*FIRST*/}
    <Card style={CardStyle}>
        <Card.Body>
            <Card.Title style={TitleStyle}> Notification </Card.Title>
            <Card.Text style={TextStyle}> Manage your notifications.  </Card.Text>
                <Button as ="input" type ="submit" value="Edit" style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)'}} />
        </Card.Body> 
    </Card>

{/*SECOND*/}
    <Card style={CardStyle}>
        <Card.Body>
            <Card.Title style={TitleStyle}> Language </Card.Title>
            <Card.Text style={TextStyle}> Choose your preferred language. </Card.Text>
                <Button as ="input" type ="submit" value="Edit" style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)'}} />
        </Card.Body>  
    </Card>
   
{/*THIRD*/}
    <Card style={CardStyle}>
        <Card.Body>
            <Card.Title style={TitleStyle}> Time Zone </Card.Title>
            <Card.Text style={TextStyle}> Choose your time zone based on your location. </Card.Text>
                <Button as ="input" type ="submit" value="Edit" style={{position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)'}} />
        </Card.Body>   
    </Card>
    <div style= {BtnContainer}> 
        <Button as ="input" type ="submit" value="Save Changes" style={SaveBtn} /> 
        </div>  
      </div>
    </div>

    );
}

export default SettingPage;