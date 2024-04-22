import React from 'react';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import swal from 'sweetalert2';

function Sport({ team, api }) {

    const handleFollowTeam = async (teamID) => {
        try {
            const response = await api.put(`follow/${teamID}`);
            if (response.status === 200) {
                swal.fire("Awesome", "You now follow this team", "success");
            }
        } catch (error) {
            console.log(error.response.status);
            if (error.response.status === 403) {
                swal.fire("Oops", "You already follow this team", "error");
            }
            else {
                swal.fire("Oops", "Something went wrong, please try again", "error");
            }
        }

    }

    return (
        <Col className="mt-2">
            <Card className="team m-2 p-0 custom-card" style={{ margin: "0", padding: "0" }}  >
                <Card.Title className="team-font-size" style={{ backgroundColor: `${team.primary}`, color: "white", width: "100%", padding: "10px 20px", borderTopLeftRadius: "6px", borderTopRightRadius: "6px" }}>
                    {team.code}, {team.name} ({team.conference})
                </Card.Title>
                {/* <Card.Subtitle>{team.conference}, {team.division} </Card.Subtitle> */}
                <Card.Img variant="top" fluid rounded src={team.logo} />
                <Card.Body>
                    <Card.Text className="m-0">
                    </Card.Text>
                    <Button className="button" style={{ borderRadius: "30px" }} size="sm" onClick={() => handleFollowTeam(team.teamID)}>+</Button>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default Sport;
