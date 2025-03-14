import React, { useContext, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const blockersData = [
    { blockerName: "LIAISON INSURANCE BROKERS Ltd", lisenceNumber: "B001/2019", telephone: "+250252600430" },
    { blockerName: "ZION INSURANCE BROKERS Ltd", lisenceNumber: "B04/2020", telephone: "+250788591262" },
    { blockerName: "SAFE INSURANCE BROKERS Ltd", lisenceNumber: "B10/2020", telephone: "+250788303831" },
    { blockerName: "ALPHA INSURANCE BROKER Ltd", lisenceNumber: "B05/2020", telephone: "+250789310018" },
    { blockerName: "CONNECT INSURANCE BROKERAGE SERVICES Ltd", lisenceNumber: "B02/2020", telephone: "+250788307697" },
    { blockerName: "CUZO INSURANCE BROKERS Ltd", lisenceNumber: "B01/2020", telephone: "+250788301802" },
    { blockerName: "ASCOMA RWANDA Ltd", lisenceNumber: "B07/2020", telephone: "+250788301385" },
    { blockerName: "GLOBAL RISK INSURANCE BROKERS Ltd", lisenceNumber: "B08/2019", telephone: "+250788300272" },
    { blockerName: "FALCON INSURANCE SERVICES Ltd", lisenceNumber: "B03/2020", telephone: "+250788844659" },
    { blockerName: "STAPPLE BROKERAGE Ltd", lisenceNumber: "B09/2020", telephone: "+250788501097" },
    { blockerName: "ALLIANCE INSURANCE BROKERS Ltd", lisenceNumber: "B012/2019", telephone: "+250788503733" },
    { blockerName: "ZAMARA ACTUARIES, ADMINISTRATORS AND INSURANCE BROKERS", lisenceNumber: "B11/2020", telephone: "+250788588132" },
    { blockerName: "REINSURANCE BROKERS SOLUTION", lisenceNumber: "RB 001/2020", telephone: "+250788304303" },
    { blockerName: "MIRKA INSURANCE SERVICES Ltd", lisenceNumber: "B01/2022", telephone: "+250788381123" },
    { blockerName: "MAICARE INSURANCE BROKERS Ltd", lisenceNumber: "B01/2023", telephone: "+250791054029" },
  ];

  const agentData = [
    { blockerName: "AFFORDABLE PLUS LTD" },
    { blockerName: "AFRICAN CONNECT GROUP LTD" },
    { blockerName: "APEX INSURANCE AGENCY LTD" },
    { blockerName: "AUTHENTIC GENERAL SERVICES LTD" },
    { blockerName: "BIZALBE Ltd" },
    { blockerName: "BRAVO INSURANCE AGENT LTD" },
    { blockerName: "BUSABIZWA RICHARD" },
    { blockerName: "CAPH LTD" },
    { blockerName: "COVENANT DEALERS COMPANY LTD" },
    { blockerName: "COVERWISE" },
    { blockerName: "CYARISIMA JULIETTE" },
    { blockerName: "CYNTHIA AGENCY" },
    { blockerName: "DACLAS INSURANCE AGENCY" },
    { blockerName: "DAMAXRU" },
    { blockerName: "DAVRAY TRADING COMPANY" },
    { blockerName: "DEBORA MAHIRWE" },
    { blockerName: "DOVE GENERAL MESSENGERS LTD" },
    { blockerName: "EMMANUEL MUHIRWA" },
    { blockerName: "EMMANUEL NGIRUWONSANGA" },
    { blockerName: "FREXI LTD" },
    { blockerName: "GLORIOSE UWIMPUHWE" },
    { blockerName: "GOG TECH & SERVICES SOLUTIONS LTD" },
    { blockerName: "HAFASHIMANA FRANCOIS" },
    { blockerName: "HARERIMANA PAUL" },
    { blockerName: "HEXAKOMB LTD" },
    { blockerName: "IDUKUNDIRIKI ANNY VIOLENE" },
    { blockerName: "J AND F MAX" },
    { blockerName: "KAMPUNDU DONATHA" },
    { blockerName: "KANYARWUNGA KWISANGA JEAN CLAUDE" },
    { blockerName: "KARENZI AUGUSTIN" },
    { blockerName: "KAYIRANGA ANICET" },
    { blockerName: "KAYITESI ADELINE" },
    { blockerName: "KIVULI INSURANCE AGENCY" },
    { blockerName: "KWABU LTD" },
    { blockerName: "MAURICIUS MANAGEMENT" },
    { blockerName: "MILLIONS REASON Ltd" },
    { blockerName: "MUREKATETE ANNAH" },
    { blockerName: "MUSABYIREMA PIERRE CLAVER" },
    { blockerName: "MUSANGANYA JOSEPH" },
    { blockerName: "MUTANGANA JOSUE" },
    { blockerName: "MUTEMBANEMA RAISSA" },
    { blockerName: "MUTONI CHANTAL" },
    { blockerName: "MWLT" },
    { blockerName: "NARADA AGENCY LTD" },
    { blockerName: "NIYONKURU JONATHAN" },
    { blockerName: "NIYONSENGA ROGER" },
    { blockerName: "NTAKIRUTIMANA EMMANUEL" },
    { blockerName: "NYIRAMAHORO Delphine" },
    { blockerName: "NYIRANSABIMANA DORCAS" },
    { blockerName: "NYIRARUKUNDO CECILE" },
    { blockerName: "PATER ADVISORS" },
    { blockerName: "UWAYEZU PROSPER" },
    { blockerName: "RISK ADVISOR LTD" },
    { blockerName: "RUGEMA SIFA BETTY" },
    { blockerName: "RUKUNDO SANDRINE" },
    { blockerName: "RUT P COMPANY LTD" },
    { blockerName: "RUTINYWA THIERRY SERUVUMBA" },
    { blockerName: "SANYU MOLLY" },
    { blockerName: "SEBINTU PATRICK BASABOSE" },
    { blockerName: "SEMANA JEAN PIERRE" },
    { blockerName: "SHEMA CHASTE" },
    { blockerName: "SHIZZ INSURANCE AGENCY" },
    { blockerName: "SMART ADVISOR LTD" },
    { blockerName: "TASS GATEWAY AND TRAVELS LTD" },
    { blockerName: "TELLA FINANCIAL ADVISORS LTD" },
    { blockerName: "THE FAMU'S CO LTD" },
    { blockerName: "TRIPLE TM GENERAL SERVICES LTD" },
    { blockerName: "TSINDA GENERAL SERVICES (TGS) Ltd" },
    { blockerName: "TWAHIRWA REGINE" },
    { blockerName: "UMUTESI ANNE LYSE" },
    { blockerName: "UMUTESI CHANTAL" },
    { blockerName: "UWAMAHORO MARIE GRACE" },
    { blockerName: "UWINEZA MARIE ROSE" },
    { blockerName: "UWIZEYE MOLLY" },
    { blockerName: "UWIZEYIMANA IMMACULEE" },
    { blockerName: "WIBABARA CELINE" },
    { blockerName: "WIHOGORA ESPERANCE" },
    { blockerName: "ZAZA TRUST LEGACY LIMITED" },
  ];

  const IshemaAgentOrBlocker = () => {
    const navigate = useNavigate();
    const { dispatch } = useContext(AuthContext);
    const savedBlockerData = JSON.parse(localStorage.getItem("blockerInfo")) || {
      category: "agent",
      selectedBlocker: "",
      selectedAgent: "",
      email: "",
      phoneNumber: "",
    };
    const [blockerInfo, setBlockerInfo] = useState(savedBlockerData);
  
    const handleInputChange = (field, value) => {
      setBlockerInfo((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const data = {
        category: blockerInfo.category,
        selectedBlocker: blockerInfo.category === "blocker" ? blockerInfo.selectedBlocker : null,
        selectedAgent: blockerInfo.category === "agent" ? blockerInfo.selectedAgent : null,
        email: blockerInfo.category === "agent" ? blockerInfo.email : null,
        phoneNumber: blockerInfo.category === "agent" ? blockerInfo.phoneNumber : null,
      };
  
      try {
        localStorage.setItem("blockerInfo", JSON.stringify(data));
        dispatch({ type: "SET_BLOCKER_INFO", payload: data });
        console.log("Blocker Info saved:", data);
        toast.success("Data saved successfully!");
        navigate("/ishemaIn");
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred while saving data.");
      }
    };
  
    return (
      <Container>
        <Row className="my-4">
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="category">
                <Form.Label>Select Category</Form.Label>
                <Form.Control
                  as="select"
                  value={blockerInfo.category}
                  onChange={(e) => handleInputChange("category", e.target.value)}
                >
                  <option value="agent">Agent</option>
                  <option value="blocker">Blocker</option>
                </Form.Control>
              </Form.Group>
  
              {blockerInfo.category === "blocker" && (
                <Form.Group controlId="blockerSelect">
                  <Form.Label>Select Blocker</Form.Label>
                  <Form.Control
                    as="select"
                    value={blockerInfo.selectedBlocker}
                    onChange={(e) => handleInputChange("selectedBlocker", e.target.value)}
                  >
                    <option value="">Select a blocker</option>
                    {blockersData.map((blocker, index) => (
                      <option key={index} value={blocker.blockerName}>
                        {blocker.blockerName} - {blocker.lisenceNumber} - {blocker.telephone}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              )}
  
              {blockerInfo.category === "agent" && (
                <>
                  <Form.Group controlId="agentSelect">
                    <Form.Label>Select Agent</Form.Label>
                    <Form.Control
                      as="select"
                      value={blockerInfo.selectedAgent}
                      onChange={(e) => handleInputChange("selectedAgent", e.target.value)}
                    >
                      <option value="">Select an agent</option>
                      {agentData.map((agent, index) => (
                        <option key={index} value={agent.blockerName}>
                          {agent.blockerName}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
  
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      value={blockerInfo.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      placeholder="Enter email"
                    />
                  </Form.Group>
  
                  <Form.Group controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      value={blockerInfo.phoneNumber}
                      onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                      placeholder="Enter phone number"
                    />
                  </Form.Group>
                </>
              )}
  
              <Button variant="primary" type="submit" style={{ marginTop: "1rem" }}>
                Save
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default IshemaAgentOrBlocker;