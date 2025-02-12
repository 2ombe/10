import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CheckOutCooporateSteps from '../component/CheckOutCooporateSteps';

const premiumData = {
  5000000: { M: 690451, 'M+1': 1282046, 'M+2': 1522034, 'M+3': 1830733, 'M+4': 2090856, 'M+5': 2350978, 'M+6': 2591772, 'M+7': 2844495, 'M+8': 3128945, 'M+9': 3441839, 'M+10': 3786023 },
  3750000: { M: 423503.586, 'M+1': 793792.3147000001, 'M+2': 943438.4256, 'M+3': 1135055.7713, 'M+4': 1297001.1043, 'M+5': 1458946.4372999999, 'M+6': 1606024.1703, 'M+7': 1769567.7703000004, 'M+8': 1946524.5473300004, 'M+9': 2141176.0020630005, 'M+10': 2355293.6022693006 },
  3000000: { M: 340991.37952, 'M+1': 635033.85176, 'M+2': 754750.7404799999, 'M+3': 908044.61704, 'M+4': 1037600.8834399999, 'M+5': 1167157.1498399999, 'M+6': 1308348.7999999998, 'M+7': 1439183.68, 'M+8': 1583101.048, 'M+9': 1741411.1528, 'M+10': 1915552.26808 },
  2625000: { M: 330789.97578, 'M+1': 617467.596515, 'M+2': 733451.41672, 'M+3': 882312.7041849999, 'M+4': 1007930.9150349998, 'M+5': 1133549.1258849995, 'M+6': 1196841.8, 'M+7': 1311322.32, 'M+8': 1442454.552, 'M+9': 1586700.0072, 'M+10': 1745370.00792 },
  2400000: { M: 324669.1335359999, 'M+1': 606927.8433679999, 'M+2': 720671.8224640001, 'M+3': 866873.556472, 'M+4': 990128.933992, 'M+5': 1113384.311512, 'M+6': 1194555.9065, 'M+7': 1294075.9039999999, 'M+8': 1423483.4944, 'M+9': 1565831.84384, 'M+10': 1722415.028224 },
  2250000: { M: 320588.57204, 'M+1': 599901.3412700001, 'M+2': 712152.0929599999, 'M+3': 856580.7913299998, 'M+4': 978260.94663, 'M+5': 1099941.10193, 'M+6': 1187159.2755, 'M+7': 1310826.8572299997, 'M+8': 1441909.5429529997, 'M+9': 1586100.497248, 'M+10': 1744710.5469728 },
  2100000: { M: 311104.53, 'M+1': 588756.96, 'M+2': 684318.459, 'M+3': 811178.0974647114, 'M+4': 926380.1868737916, 'M+5': 1041582.2762828714, 'M+6': 1165619.84, 'M+7': 1257204.2560000003, 'M+8': 1382924.6816000003, 'M+9': 1521217.1497600004, 'M+10': 1673338.8647360005 },
  1875000: { M: 291033.27, 'M+1': 520522.0696571996, 'M+2': 630293.3175, 'M+3': 743074.0566667787, 'M+4': 848559.0472394787, 'M+5': 954044.0378121787, 'M+6': 1052095.228384879, 'M+7': 1141088.3, 'M+8': 1255197.13, 'M+9': 1380716.843, 'M+10': 1518788.5273 },
  1687500: { M: 274229.92983717396, 'M+1': 517392.48, 'M+2': 612284.937, 'M+3': 733912.1013418534, 'M+4': 840573.2180999999, 'M+5': 944802.8029313703, 'M+6': 1039321.2300901576, 'M+7': 1110609.72, 'M+8': 1221670.692, 'M+9': 1343837.7612, 'M+10': 1478221.53732 },
  1650000: { M: 273483.4346340065, 'M+1': 513112.47874025983, 'M+2': 608728.7127376538, 'M+3': 732079.7102768683, 'M+4': 835822.5316616491, 'M+5': 939565.3530464303, 'M+6': 1036766.4304312111, 'M+7': 1106863.0848, 'M+8': 1217549.39328, 'M+9': 1339304.332608, 'M+10': 1473234.7658688 },
  1500000: { M: 270497.4538213367, 'M+1': 508172.75146229996, 'M+2': 602674.9223422074, 'M+3': 724750.1460169279, 'M+4': 827331.5212764298, 'M+5': 929912.8965359313, 'M+6': 1026547.2317954327, 'M+7': 1103019.8102, 'M+8': 1213321.79122, 'M+9': 1334653.970342, 'M+10': 1468119.3673762 },
  1125000: { M: 266947.758, 'M+1': 488253.8800948376, 'M+2': 578595.47178938, 'M+3': 695677.5800176596, 'M+4': 793854.4339118459, 'M+5': 892031.2878060318, 'M+6': 985747.861700218, 'M+7': 1074927.48, 'M+8': 1182420.228, 'M+9': 1300662.2508, 'M+10': 1430728.47588 },
  825000: { M: 264940.632, 'M+1': 482453.62, 'M+2': 572402.6, 'M+3': 695060.2999999999, 'M+4': 785009.28, 'M+5': 805645.8009492304, 'M+6': 813629.41, 'M+7': 845520.4120000001, 'M+8': 930072.4532000001, 'M+9': 1023079.69852, 'M+10': 1125387.668372 },
  750000: { M: 262933.506, 'M+1': 478142.01600000006, 'M+2': 551056.4432999999, 'M+3': 654174.4, 'M+4': 706211.0, 'M+5': 732405.2735902095, 'M+6': 739663.1, 'M+7': 768654.9199999999, 'M+8': 845520.412, 'M+9': 930072.4532, 'M+10': 1023079.69852 },
  675000: { M: 256912.128, 'M+1': 456732.67199999996, 'M+2': 504234.654, 'M+3': 596771.0776158733, 'M+4': 654992.118, 'M+5': 659164.7462311886, 'M+6': 665696.7899999999, 'M+7': 691789.428, 'M+8': 760968.3708, 'M+9': 837065.20788, 'M+10': 920771.728668 },
  600000: { M: 240855.12, 'M+1': 449596.224, 'M+2': 500632.9779, 'M+3': 575673.472, 'M+4': 582215.216, 'M+5': 585924.2188721676, 'M+6': 591730.48, 'M+7': 614923.936, 'M+8': 676416.3296, 'M+9': 744057.96256, 'M+10': 818463.758816 },
  562500: { M: 234164.7, 'M+1': 446028.0, 'M+2': 497031.30179999996, 'M+3': 540251.415, 'M+4': 545826.765, 'M+5': 549303.9551926572, 'M+6': 554747.325, 'M+7': 576491.19, 'M+8': 634140.309, 'M+9': 697554.3399, 'M+10': 767309.77389 },
  487500: { M: 224798.11200000002, 'M+1': 425213.36, 'M+2': 467734.696, 'M+3': 468701.08999999997, 'M+4': 473049.863, 'M+5': 476063.4278336363, 'M+6': 480781.01499999996, 'M+7': 499625.698, 'M+8': 549588.2678, 'M+9': 604547.09458, 'M+10': 665001.804038 },
  450000: { M: 216769.608, 'M+1': 374664, 'M+2': 432201.132, 'M+3': 432647.16, 'M+4': 436661.412, 'M+5': 439443.1641541257, 'M+6': 443798, 'M+7': 461193, 'M+8': 507312.3, 'M+9': 558043.53, 'M+10': 613847.883 },
  375000: { M: 200712.6, 'M+1': 356822.39999999997, 'M+2': 360167.61, 'M+3': 360539.3, 'M+4': 363884.51, 'M+5': 366203.6367951048, 'M+6': 369831.55, 'M+7': 384327.45999999996, 'M+8': 422760.305, 'M+9': 465036.3355, 'M+10': 511539.96905 },
};

const CooporateOutPatient = () => {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const savedOutData = JSON.parse(localStorage.getItem('cooporateCart'));
  const transformedCategories = savedOutData?.categories?.map(category => ({
      outId: category.id,
      outLimit: category.limit,
      outMembers: category.members,
      outDependencies: category.dependencies||{},
      outTotalDependencies: category.totalDependencies||{},
      outPremiumValues:category.premiumValues,
      outTotalPremiumValues:category.totalPremiumValues,
      outTotalPremium: category.totalPremium,
      outTotalPremiumM: category.totalPremiumM,
      operationalArea: category.operationalArea
    }))||[
    { outId: 1, outLimit: '', outMembers: 0, outDependencies: {}, outTotalDependencies: {},outPremiumValues:{},outTotalPremiumValues:{}, outTotalPremium: 0, outTotalPremiumM: 0,operationalArea:"" }
  ];
  const [outCategories, setOutCategories] = useState(transformedCategories);



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

   const handleOperationalAreaChange = (id, e) => {
    const newCategories = outCategories.map(outCategory =>
      outCategory.id === id ? { ...outCategory, operationalArea: e.target.value } : outCategory
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
  }, [outCategories.map(outCategory => outCategory.outDependencies)]);


  
    const handleSave = () => {
        const outCart = {outCategories,outOverallTotals}
      
        dispatch({ type: 'SET_OUT_CART', payload: outCart });
        localStorage.setItem('outCart', JSON.stringify(outCart));
        console.log(outCart);
        navigate('/denta');
      };

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
                   <Form.Group controlId={`operationalAreaSelect-${outCategory.id}`} className="mt-3">
                                  <Form.Label>Select Operational Area</Form.Label>
                                  <Form.Control as="select" value={outCategory.operationalArea} onChange={(e) => handleOperationalAreaChange(outCategory.id, e)}>
                                    <option value="">Select...</option>
                                    <option value="Rwanda">Rwanda</option>
                                    <option value="East Africa">East Africa</option>
                                    <option value="India">India</option>
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

export default CooporateOutPatient;
