import React, { useState, useEffect, useContext } from "react";
import { Form, Button, Container, Row, Col, Table } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";


const UpdateLastExpenseForm = () => {
   const { state, dispatch } = useContext(AuthContext);
      const { userInfo } = state;
                      const params = useParams()
                       const [loading, setLoading] = useState(true);
                                  const {id:corpotateId}=params
   
    const navigate = useNavigate()
  const [lastExpenses, setLastExpenses] = useState([]);
  const [currentExpense, setCurrentExpense] = useState("");
  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem("lastExpenses")) || [];
    setLastExpenses(savedExpenses);
  }, []);

  useEffect(() => {
    localStorage.setItem("lastExpenses", JSON.stringify(lastExpenses));
    console.log(lastExpenses);
    
  }, [lastExpenses]);

  const handleAddLastExpense = () => {
    if (currentExpense.trim() === "") {
      alert("Please enter the last expense amount.");
      return;
    }
    
    const newCategory = `Category ${lastExpenses.length + 1}`;
    setLastExpenses((prevExpenses) => [
      ...prevExpenses,
      { category: newCategory, lastExpense: parseFloat(currentExpense) },
    ]);
    
    setCurrentExpense("");
  };

  const handleRemoveLastExpense = (index) => {
    setLastExpenses((prevExpenses) =>
      prevExpenses.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
               
        const newCategory = `Category ${lastExpenses.length + 1}`;
        setLastExpenses((prevExpenses) => [
          ...prevExpenses,
          { category: newCategory, lastExpense: parseFloat(currentExpense) },
        ]);
        localStorage.setItem("lastExpenseCart", JSON.stringify(lastExpenses));
        dispatch({ type: "SET_LAST_INFO", payload:lastExpenses});
        console.log({"Last expenses":lastExpenses});
        setCurrentExpense("");
        navigate(`/exclusions/${corpotateId}`);
    } catch (error) {
        console.log(error);
        
    }
  };

  return (
    <Container>
      <Row className="my-4">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="lastExpense">
              <Form.Label>Last Expense</Form.Label>
              <Form.Control
                type="number"
                value={currentExpense}
                onChange={(e) => setCurrentExpense(e.target.value)}
                placeholder="Enter last expense"
              />
            </Form.Group>

            <Button
              variant="primary"
              onClick={handleAddLastExpense}
              style={{ marginTop: "1rem" }}
            >
              Add Last Expense
            </Button>
          </Form>
        </Col>
      </Row>

      <Row className="my-4">
        <Col>
          <h4>Last Expenses</h4>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Category</th>
                <th>Last Expense</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {lastExpenses.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.category}</td>
                  <td>{expense.lastExpense}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleRemoveLastExpense(index)}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row className="my-4">
        <Col>
          <Button variant="success" onClick={handleSubmit}>
            Save Last Expenses
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateLastExpenseForm;