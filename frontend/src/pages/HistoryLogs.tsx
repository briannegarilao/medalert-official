import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Card, CardGroup } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';

const Pagination: React.CSSProperties = {
    display: 'inline-flex',
    padding: '10px 15px',
    alignItems: 'flex-end',
    gap: '4px',
    position: 'fixed',
    left: '270px',
    bottom: '10px',
  };

const Pages: React.CSSProperties = {
    display: 'inline-flex',
    padding: '10px 15px',
    alignItems: 'flex-end',
    gap: '4px',
    position: 'fixed',
    right: '15px',
    bottom: '10px',


}

const selectStyle: React.CSSProperties = {
    padding: '5px 10px',
    margin : '0 5px',
    borderRadius: '10px',
    background: '#7AB2D3',
    cursor: 'pointer',
    color: 'white',
    border: 'none',

}

const ContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',

};
type Logs = {
    DateTime: string;
    MedName:string;
    Dosage:string;
    Frequency:string;
    MissedDose: number;
    Status:string;

};

const data: Logs[] = [
    {DateTime: '11-16-2024 7:00 PM', MedName: 'Amoxicillin', Dosage: '500mg', Frequency: 'Twice A Week', MissedDose: 0, Status: 'Success'},
    {DateTime: '11-17-2024 8:00 PM', MedName: 'Paracetamol', Dosage: '500mg', Frequency: 'Once A Day', MissedDose: 1 , Status: 'Success'},
    {DateTime: '11-18-2024 9:00 AM', MedName: 'Biogesic', Dosage: '500mg', Frequency: 'Once A Day', MissedDose: 0, Status: 'Success'},
    {DateTime: '11-19-2024 9:00 AM', MedName: 'Biogesic', Dosage: '500mg', Frequency: 'Once A Day', MissedDose: 0, Status: 'Success'}
];


const HistoryLogs: React.FC = () => {
    const [itemsPerPage, setItemsPerPage] = useState(1); 
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handlePaginationChange = (event: 
        React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);

};

    const handlePageChange = (event:
        React.ChangeEvent<HTMLSelectElement>) => {
            setCurrentPage(Number(event.target.value));

};

    const multipleRows = (item: Logs, index: number) => (
        <Row xs={1} md={1} className="Content" key={index}> {/*RowComponent #xs - xtra small screen while md - medium screen*/}
            <Col>
            <CardGroup>
                <Card>
                    <Card.Body>
                        {item.DateTime}
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        {item.MedName}
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        {item.Dosage}
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        {item.Frequency}
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        {item.MissedDose}
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        {item.Status}
                    </Card.Body>
                </Card>
            </CardGroup>
        </Col>
    </Row>

    );

    const StartIndex = (currentPage - 1 ) * itemsPerPage;
    const EndIndex = StartIndex + itemsPerPage;
    const currentData = data.slice(StartIndex, EndIndex);

     return (
        <div className ="d-flex">
        <Sidebar />
        <div style={{ flex: 1, padding: '20px'}}>
        <Row xs={1} md={1} className="TitleHeader"> {/*RowComponent #xs - xtra small screen while md - medium screen*/}
            <Col>
            <CardGroup>
                <Card className="TitleHeader">
                <Card.Header>
                    <small className='text-muted'><center> DATE AND TITLE </center></small>
                </Card.Header>
            </Card>
            <Card>
                <Card.Header>
                    <small className='text-muted'><center> MEDICINE NAME </center></small>
                </Card.Header>
            </Card>
            <Card>
                <Card.Header>
                    <small className='text-muted'><center> DOSAGE </center></small>
                </Card.Header>
            </Card>
            <Card>
                <Card.Header>
                    <small className='text-muted'><center> FREQUENCY </center></small>
                </Card.Header>
            </Card>
            <Card>
                <Card.Header>
                    <small className='text-muted'><center> MISSED DOSES </center></small>
                </Card.Header>
            </Card>
            <Card>
                <Card.Header>
                    <small className='text-muted'><center> STATUS </center></small>
                </Card.Header>
                </Card>
            </CardGroup>
        </Col>
</Row>

    {currentData.map(multipleRows)}

    <div style={Pagination}>
        <div style={ContainerStyle}>
        <select style= {selectStyle} onChange = {handlePaginationChange} value = {itemsPerPage}>
        <option value="1"> 1 </option>
        <option value="2"> 2 </option>
        <option value="3"> 3 </option>
      </select>
      <span> per page </span>
      
    <div style= {Pages}>
        <div style={ContainerStyle}>
        <span> Page </span>

    <select style= {selectStyle} onChange ={handlePageChange} value ={currentPage}>
        {Array.from({ length: totalPages }, (_, i) => (
            <option key={i+1} value={i+1}>
                {i + 1}
            </option>
        ))}
    </select>
    of {totalPages}
                </div>
            </div>
        </div>
      </div>
    </div>
 </div>

    );
};
     
export default HistoryLogs;
      





