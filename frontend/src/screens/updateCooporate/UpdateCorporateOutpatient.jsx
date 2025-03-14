import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
import CheckOutCooporateSteps from '../../component/CheckOutCooporateSteps';


const premiumData = {
  3750000: { M: 423504, 'M+1': 793792, 'M+2': 943438, 'M+3': 1135056, 'M+4': 1297001, 'M+5': 1458946, 'M+6': 1606024, 'M+7': 1769568, 'M+8': 1949765.23, 'M+9': 2148312.45, 'M+10': 2367077.99 },
  3000000: { M: 340991, 'M+1': 635034, 'M+2': 754751, 'M+3': 908045, 'M+4': 1037601, 'M+5': 1167157, 'M+6': 1308349, 'M+7': 1439184, 'M+8': 1583102.05, 'M+9': 1741412.25, 'M+10': 1915553.48 },
  2625000: { M: 330790, 'M+1': 617468, 'M+2': 733451, 'M+3': 882313, 'M+4': 1007931, 'M+5': 1133549, 'M+6': 1196842, 'M+7': 1311322, 'M+8': 1436753.15, 'M+9': 1574181.71, 'M+10': 1724755.62 },
  2400000: { M: 324669, 'M+1': 606928, 'M+2': 720672, 'M+3': 866874, 'M+4': 990129, 'M+5': 1113384, 'M+6': 1194556, 'M+7': 1294076, 'M+8': 1401887.04, 'M+9': 1518680.06, 'M+10': 1645203.26 },
  2250000: { M: 320589, 'M+1': 599901, 'M+2': 712152, 'M+3': 856581, 'M+4': 978261, 'M+5': 1099941, 'M+6': 1187159, 'M+7': 1310827, 'M+8': 1447377.02, 'M+9': 1598151.74, 'M+10': 1764632.83 },
  2100000: { M: 311105, 'M+1': 588757, 'M+2': 684318, 'M+3': 811178, 'M+4': 926380, 'M+5': 1041582, 'M+6': 1165620, 'M+7': 1257204, 'M+8': 1355984.59, 'M+9': 1462526.24, 'M+10': 1577439.01 },
  1875000: { M: 291033, 'M+1': 520522, 'M+2': 630293, 'M+3': 743074, 'M+4': 848559, 'M+5': 954044, 'M+6': 1052095, 'M+7': 1141088, 'M+8': 1237608.99, 'M+9': 1342294.02, 'M+10': 1455834.00 },
  1687500: { M: 274230, 'M+1': 517392, 'M+2': 612285, 'M+3': 733912, 'M+4': 840573, 'M+5': 944803, 'M+6': 1039321, 'M+7': 1110610, 'M+8': 1186787.99, 'M+9': 1268191.43, 'M+10': 1355178.44 },
  1650000: { M: 273483, 'M+1': 513112, 'M+2': 608729, 'M+3': 732080, 'M+4': 835823, 'M+5': 939565, 'M+6': 1036766, 'M+7': 1106863, 'M+8': 1181699.03, 'M+9': 1261594.70, 'M+10': 1346892.19 },
  1500000: { M: 270497, 'M+1': 508173, 'M+2': 602675, 'M+3': 724750, 'M+4': 827332, 'M+5': 929913, 'M+6': 1026547, 'M+7': 1103020, 'M+8': 1185189.21, 'M+9': 1273479.81, 'M+10': 1368347.62 },
  1125000: { M: 266948, 'M+1': 488254, 'M+2': 578595, 'M+3': 695678, 'M+4': 793854, 'M+5': 892031, 'M+6': 985748, 'M+7': 1074927, 'M+8': 1172175.09, 'M+9': 1278220.59, 'M+10': 1393859.92 },
  825000: { M: 264941, 'M+1': 482454, 'M+2': 572403, 'M+3': 695060, 'M+4': 785009, 'M+5': 805646, 'M+6': 813629, 'M+7': 845520, 'M+8': 878661.41, 'M+9': 913101.41, 'M+10': 948891.31 },
  750000: { M: 262934, 'M+1': 478142, 'M+2': 551056, 'M+3': 654174, 'M+4': 706211, 'M+5': 732405, 'M+6': 739663, 'M+7': 768655, 'M+8': 798783.10, 'M+9': 830092.19, 'M+10': 862628.47 },
  675000: { M: 256912, 'M+1': 456733, 'M+2': 504235, 'M+3': 596771, 'M+4': 654992, 'M+5': 659165, 'M+6': 665697, 'M+7': 691789, 'M+8': 718904.79, 'M+9': 747082.97, 'M+10': 776365.62 },
  600000: { M: 240855, 'M+1': 449596, 'M+2': 500633, 'M+3': 575673, 'M+4': 582215, 'M+5': 585924, 'M+6': 591730, 'M+7': 614924, 'M+8': 639026.48, 'M+9': 664073.75, 'M+10': 690102.77 },
  562500: { M: 234165, 'M+1': 446028, 'M+2': 497031, 'M+3': 540251, 'M+4': 545827, 'M+5': 549304, 'M+6': 554747, 'M+7': 576491, 'M+8': 599087.33, 'M+9': 622569.14, 'M+10': 646971.35 },
  487500: { M: 224798, 'M+1': 425213, 'M+2': 467735, 'M+3': 468701, 'M+4': 473050, 'M+5': 476063, 'M+6': 480781, 'M+7': 499626, 'M+8': 519209.02, 'M+9': 539559.92, 'M+10': 560708.50 },
  450000: { M: 216770, 'M+1': 374664, 'M+2': 432201, 'M+3': 432647, 'M+4': 436661, 'M+5': 439443, 'M+6': 443798, 'M+7': 461193, 'M+8': 479269.86, 'M+9': 498055.31, 'M+10': 517577.08 },
  375000: { M: 200713, 'M+1': 356822, 'M+2': 360168, 'M+3': 360539, 'M+4': 363885, 'M+5': 366203, 'M+6': 369832, 'M+7': 384327, 'M+8': 399391.55, 'M+9': 415046.09, 'M+10': 431314.23 }
};
const UpdateCooporateOutPatient = () => {
  const { state, dispatch } = useContext(AuthContext);
     const { userInfo } = state;
     const params = useParams();
         const { id: corpotateId } = params;
          const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [outCategories, setOutCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/cooporate/single/${corpotateId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        setOutCategories(data.outCart.outCategories || []);
        
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [corpotateId, userInfo]);

  const handleAddCategory = () => {
    const newCategory = {
      outId: outCategories.length + 1, outLimit: '', outMembers: 0, outDependencies: {},
      outTotalDependencies: {}, outTotalPremiumValues: {}, outPremiumValues: {}, outTotalPremium: 0, outTotalPremiumM: 0
    };
    setOutCategories([...outCategories, newCategory]);
  };

  const handleLimitChange = (outId, e) => {
    const newCategories = outCategories.map(outCategory =>
      outCategory.outId === outId ? { ...outCategory, outLimit: e.target.value } : outCategory
    );
    setOutCategories(newCategories);
  };

  const handleAddMember = (outId) => {
    const newCategories = outCategories.map(outCategory =>
      outCategory.outId === outId ? { ...outCategory, outMembers: outCategory.outMembers + 1 } : outCategory
    );
    setOutCategories(newCategories);
  };

  const handleRemoveMember = (outId) => {
    const newCategories = outCategories.map(outCategory =>
      outCategory.outId === outId && outCategory.outMembers > 0 ? {
        ...outCategory,
        outMembers: outCategory.outMembers - 1,
        outDependencies: { ...outCategory.outDependencies, [`M+${outCategory.outMembers}`]: undefined }
      } : outCategory
    );
    setOutCategories(newCategories);
  };


  const handleDependencyChange = (outId, label, e) => {
    const value = parseInt(e.target.value) || 0;
    const newCategories = outCategories.map(outCategory =>
      outCategory.outId === outId ? { ...outCategory, outDependencies: { ...outCategory.outDependencies, [label]: value } } : outCategory
    );
    setOutCategories(newCategories);
  };
  const calculateOverallDependenciesTotal = (outCategory) => {
    let outOverallTotal = 0;
    const labels = Object.keys(outCategory.outTotalDependencies);

    for (let i = 0; i < labels.length; i++) {
      outOverallTotal += outCategory.outTotalDependencies[labels[i]] || 0;
    }

    return outOverallTotal;
  };

  const calculateTotalPremiumValue = (outCategory) => {
    let outTotalPremiumValue = 0;
    const memberLabels = Array.from({ length: outCategory.outMembers + 1 }, (_, i) => (i === 0 ? 'M' : `M+${i}`));
    for (let i = 0; i < memberLabels.length; i++) {
      const label = memberLabels[i];
      const outPremiumValuePerMember = (premiumData[outCategory.outLimit]?.[label] || 0) * (outCategory.outDependencies[label] || 0);
      outTotalPremiumValue += outPremiumValuePerMember;
    }
    return outTotalPremiumValue;
  };

  const calculateOverallTotals = () => {
    let outOverallTotalPremium = 0;
    let outOverallDependenciesTotal = 0;
    let outTotalStaffFamily = 0;

    outCategories.forEach(category => {
      outOverallTotalPremium += calculateTotalPremiumValue(category);
      outOverallDependenciesTotal += calculateOverallDependenciesTotal(category);
      const totalMembers = Object.values(category.outDependencies).reduce((sum, value) => sum + value, 0);
      outTotalStaffFamily += totalMembers;
    });

    return { outOverallTotalPremium, outOverallDependenciesTotal, outTotalStaffFamily };
  };

  useEffect(() => {
    const serializedDependencies = JSON.stringify(
        outCategories.map(category => category.outDependencies)
      );
    const updatedCategories = outCategories.map(outCategory => {
      let updatedTotalDependencies = { ...outCategory.outTotalDependencies };
      const labels = Object.keys(outCategory.outDependencies);

      for (let i = 0; i < labels.length; i++) {
        const label = labels[i];
        const value = outCategory.outDependencies[label] || 0;
        let calculatedTotal = value;

        if (label !== 'M') {
          const numDependents = parseInt(label.slice(2));
          calculatedTotal += numDependents * value;
        }

        updatedTotalDependencies[label] = calculatedTotal;
      }

      let outTotalPremiumValue = calculateTotalPremiumValue(outCategory);
      let outTotalPremiumMValue = outTotalPremiumValue;

      const outPremiumValues = Object.keys(outCategory.outDependencies).reduce((acc, key) => {
        acc[key] = premiumData[outCategory.outLimit]?.[key] || 0;
        return acc;
      }, {});

      const outTotalPremiumValues = Object.keys(outCategory.outDependencies).reduce((acc, key) => {
        acc[key] = (premiumData[outCategory.outLimit]?.[key] || 0) * (outCategory.outDependencies[key] || 0);
        return acc;
      }, {});

      return {
        ...outCategory,
        outTotalDependencies: updatedTotalDependencies,
        outTotalPremium: outTotalPremiumValue,
        outTotalPremiumM: outTotalPremiumMValue,
        outPremiumValues,
        outTotalPremiumValues,
      };
    });
    setOutCategories(updatedCategories);
  }, [JSON.stringify (outCategories.map(outCategory => outCategory.outDependencies))]);


  
    const handleSave = () => {
        const outCart = {outCategories,outOverallTotals}
      
        dispatch({ type: 'SET_OUT_CART', payload: outCart });
        localStorage.setItem('outCart', JSON.stringify(outCart));
        console.log(outCart);
        navigate(`/updateDental/${corpotateId}`);
      };
console.log(outCategories);

      const renderCategoryTables = () => {
        return outCategories.map(outCategory => (
          <div key={outCategory.outId}>
            <Row className="my-4">
              <Col>
                <h5>Category {outCategory.outId}</h5>
                <Form>
                  <Form.Group controlId={`limitSelect-${outCategory.outId}`}>
                    <Form.Label>Select Out Patient Limit</Form.Label>
                    <Form.Control as="select" value={outCategory.outLimit} onChange={(e) => handleLimitChange(outCategory.outId, e)}>
                      <option value="">Select...</option>
                      {Object.keys(premiumData).map((outLimitValue) => (
                        <option key={outLimitValue} value={outLimitValue}>
                          {outLimitValue}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <Button style={{ marginRight: "1.2rem", background: "green" }} onClick={() => handleAddMember(outCategory.outId)}>
                  Add Member
                </Button>
                <Button variant="danger" onClick={() => handleRemoveMember(outCategory.outId)}>
                  Remove Member
                </Button>
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Member</th>
                      <th>Premium/family</th>
                      <th>Number of staff/family</th>
                      <th>Total lives</th>
                      <th>Total Premium</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: outCategory.outMembers + 1 }, (_, i) => (i === 0 ? 'M' : `M+${i}`)).map((label) => (
                      <tr key={label}>
                        <td>{label}</td>
                        <td>{premiumData[outCategory.outLimit]?.[label]}</td>
                        <td>
                          <Form.Control type="number" value={outCategory.outDependencies[label] || ''} onChange={(e) => handleDependencyChange(outCategory.outId, label, e)} />
                        </td>
                        <td>{outCategory.outTotalDependencies[label]}</td>
                        <td>{(premiumData[outCategory.outLimit]?.[label] || 0) * (outCategory.outDependencies[label] || 0)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
            <Row className="my-4">
              <Col>
                <h4>Total Premium: {calculateTotalPremiumValue(outCategory)}</h4>
                <h4>Total Beneficiaries: {calculateOverallDependenciesTotal(outCategory)}</h4>
              </Col>
            </Row>
          </div>
        ));
      };
      
  const outOverallTotals = calculateOverallTotals();

  
  return (
    <div>
      <CheckOutCooporateSteps step1 step2 step3/>
      <Container>
        {renderCategoryTables()}
        <Row className="my-4">
          <Col>
            <Button onClick={handleAddCategory}>Add Category</Button>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <Button onClick={handleSave}>Save And Continue</Button>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <h3>Overall Total Premium: {outOverallTotals.outOverallTotalPremium}</h3>
            <h3>Overall Dependencies Total: {outOverallTotals.outOverallDependenciesTotal}</h3>
            <h3>Total Number of Staff/Family: {outOverallTotals.outTotalStaffFamily}</h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateCooporateOutPatient;
