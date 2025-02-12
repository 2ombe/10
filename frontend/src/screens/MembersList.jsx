import React, { useState, useEffect, useContext } from "react";
import { Table, Container, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const MembersList = () => {
  const navigate = useNavigate()
  const [members, setMembers] = useState(null);
  const { state } = useContext(AuthContext);
  const { userInfo } = state;
  const params = useParams();
  const { id: categoryId } = params;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/members/${categoryId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setMembers(response.data);
        console.log(response.data);
      } catch (error) {
        setError("Error fetching members");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [categoryId, userInfo]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  if (!members) {
    return <p>No members found</p>;
  }

  return (
    <Container>
      <h2 className="my-4">Members List</h2>
      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Principal Member Name</th>
            <th>Principal Member Age</th>
            <th>Spouse Name</th>
            <th>Spouse Age</th>
            <th>Children</th>
          </tr>
        </thead>
        <tbody>
          {members.families && members.families.length > 0 ? (
            members.families.map((family, familyIdx) => (
              <tr key={familyIdx}>
                <td>{family.principalMember.name}</td>
                <td>{family.principalMember.age}</td>
                <td>{family.spouse.name}</td>
                <td>{family.spouse.age}</td>
                <td>
                  <ul>
                    {family.children.map((child, childIdx) => (
                      <li key={childIdx}>
                        {child.name} ({child.age} years)
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No members found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Button onClick={()=>navigate("/cooporateList")}>
        Back
      </Button>
    </Container>
  );
};

export default MembersList;
