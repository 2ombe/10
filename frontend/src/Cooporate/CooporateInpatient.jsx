import React, { useContext, useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import CheckOutCooporateSteps from '../component/CheckOutCooporateSteps';

const premiumData = {
  "75,000,000": { M: 183674.3304, "M+1": 275511.4956, "M+2": 353573.08602, "M+3": 427808.12789, "M+4": 489798.2144, "M+5": 551788.30091, "M+6": 613778.38742, "M+7": 1289547, "M+8": 1965315, "M+9": 2641084, "M+10": 3316852, Extra: 675768 },
  "67,500,000": { M: 176786.54301, "M+1": 269389.01792, "M+2": 346838.360572, "M+3": 420308.09273199993, "M+4": 482145.1173, "M+5": 543982.1418679999, "M+6": 605819.166436, "M+7": 667656, "M+8": 729493, "M+9": 791330, "M+10": 853167, Extra: 61837.024568 },
  "63,750,000": { M: 176786.54301, "M+1": 266327.77908, "M+2": 343470.99784799997, "M+3": 416558.0751529999, "M+4": 478318.56875, "M+5": 540079.062347, "M+6": 601839.5559439999, "M+7": 663600, "M+8": 725361, "M+9": 787121, "M+10": 848882, Extra: 61760.49359699999 },
  "60,000,000": { M: 174490.61388, "M+1": 263266.54023999994, "M+2": 340103.63512399996, "M+3": 412808.057574, "M+4": 474492.02019999997, "M+5": 536175.982826, "M+6": 597859.9454519999, "M+7": 659544, "M+8": 721228, "M+9": 782912, "M+10": 844596, Extra: 61683.96262599999 },
  "56,250,000": { M: 172194.68475, "M+1": 260205.30139999997, "M+2": 336736.27239999996, "M+3": 409058.039995, "M+4": 470665.47164999996, "M+5": 532272.9033049999, "M+6": 593880.33496, "M+7": 655488, "M+8": 717095, "M+9": 778703, "M+10": 840310, Extra: 61607.43165499999 },
  "52,500,000": { M: 169898.75561999998, "M+1": 257144.06255999996, "M+2": 333368.90967599995, "M+3": 405308.02241599996, "M+4": 466838.92309999996, "M+5": 528369.823784, "M+6": 589900.724468, "M+7": 651432, "M+8": 712963, "M+9": 774493, "M+10": 836024, Extra: 61530.90068399999 },
  "48,750,000": { M: 167602.82648999998, "M+1": 254082.82372, "M+2": 330001.54695199995, "M+3": 401558.0048369999, "M+4": 463012.37454999995, "M+5": 524466.744263, "M+6": 585921.1139759999, "M+7": 647375, "M+8": 708830, "M+9": 770284, "M+10": 831739, Extra: 61454.36971299999 },
  "45,000,000": { M: 165306.89735999997, "M+1": 251021.58487999998, "M+2": 326634.184228, "M+3": 397807.98725799995, "M+4": 459185.82599999994, "M+5": 520563.664742, "M+6": 581941.503484, "M+7": 643319, "M+8": 1868580, "M+9": 2511900, "M+10": 3155219, Extra: 643319 },
  "41,250,000": { M: 163010.96823, "M+1": 247960.34603999997, "M+2": 323266.821504, "M+3": 394057.96967900003, "M+4": 455359.27744999994, "M+5": 516660.585221, "M+6": 577961.892992, "M+7": 639263, "M+8": 700565, "M+9": 761866, "M+10": 823167, Extra: 61301.307771 },
  "37,500,000": { M: 160715.0391, "M+1": 244899.1072, "M+2": 319899.4587799999, "M+3": 390307.9521, "M+4": 451532.72889999993, "M+5": 512757.5056999999, "M+6": 573982.2825, "M+7": 635207, "M+8": 696432, "M+9": 757657, "M+10": 818881, Extra: 61224.7768 },
  "33,750,000": { M: 159436.97188429997, "M+1": 242740.9338178, "M+2": 316975.9756878, "M+3": 386619.15929779987, "M+4": 447706.1803499999, "M+5": 508800.8544992999, "M+6": 569895.5286486, "M+7": 630990, "M+8": 692085, "M+9": 753180, "M+10": 814274, Extra: 61094.67414929999 },
  "30,000,000": { M: 158158.9046686, "M+1": 240567.45424139994, "M+2": 314037.18640139996, "M+3": 382915.06030139996, "M+4": 443879.6318, "M+5": 504844.2032986, "M+6": 565808.7747972, "M+7": 626773, "M+8": 687738, "M+9": 748702, "M+10": 809667, Extra: 60964.57149859999 },
  "26,250,000": { M: 156888.49055, "M+1": 238401.6277621, "M+2": 311106.0502121, "M+3": 379218.6144021, "M+4": 440053.08324999997, "M+5": 500895.205195, "M+6": 561737.32714, "M+7": 622579, "M+8": 683422, "M+9": 744264, "M+10": 805106, Extra: 60842.12194499999 },
  "22,500,000": { M: 155610.4233343, "M+1": 236228.14818569997, "M+2": 308167.26092569996, "M+3": 375514.51540569996, "M+4": 436226.53469999996, "M+5": 496938.55399429996, "M+6": 557650.5732886, "M+7": 618363, "M+8": 679075, "M+9": 739787, "M+10": 800499, Extra: 60712.01929429999 },
  "18,750,000": { M: 154340.00921569997, "M+1": 234062.32170639996, "M+2": 305236.1247364, "M+3": 371818.0695064, "M+4": 432399.98614999995, "M+5": 492989.55589069996, "M+6": 553579.1256314, "M+7": 614169, "M+8": 674758, "M+9": 735348, "M+10": 795937, Extra: 60589.56974069999 },
  "15,000,000": { M: 153061.942, "M+1": 231888.84212999998, "M+2": 302297.33544999996, "M+3": 368113.97050999996, "M+4": 428573.43759999995, "M+5": 489032.90468999994, "M+6": 549492.3717799999, "M+7": 609952, "M+8": 670411, "M+9": 730871, "M+10": 791330, Extra: 60459.46709 },
  "12,750,000": { M: 146939.46432, "M+1": 218113.26734999998, "M+2": 283164.5927, "M+3": 343624.05978999997, "M+4": 391838.57152, "M+5": 440053.08324999997, "M+6": 488267.59498, "M+7": 536482, "M+8": 584697, "M+9": 632911, "M+10": 681126, Extra: 48214.51172999999 },
  "11,250,000": { M: 141582.29635, "M+1": 202807.07315, "M+2": 260970.61110999997, "M+3": 313776.9811, "M+4": 355869.01514999993, "M+5": 397961.0492, "M+6": 440053.08324999997, "M+7": 482145, "M+8": 524237, "M+9": 566329, "M+10": 608421, Extra: 42092.03405 },
  "10,000,000": { M: 136225.12837999998, "M+1": 195919.28576, "M+2": 247195.03632999997, "M+3": 294644.23835, "M+4": 335205.65297999996, "M+5": 375767.06760999997, "M+6": 416328.48224, "M+7": 456889, "M+8": 497450, "M+9": 538011, "M+10": 578572, Extra: 40561.41463 },
  "8,750,000": { M: 130102.65069999998, "M+1": 182143.71097999997, "M+2": 229592.91299999997, "M+3": 273980.87617999996, "M+4": 313776.9811, "M+5": 353573.08602, "M+6": 393369.19093999994, "M+7": 433165, "M+8": 472961, "M+9": 512757, "M+10": 552553, Extra: 39796.10492 },
  "7,500,000": { M: 128839.88967849998, "M+1": 180498.2951035, "M+2": 227564.84226849998, "M+3": 271838.008992, "M+4": 311481.05197, "M+5": 351162.36043349997, "M+6": 390843.66889699997, "M+7": 430525, "M+8": 470206, "M+9": 509887, "M+10": 549568, Extra: 39681.3084635 },
  "6,250,000": { M: 127561.8224628, "M+1": 178837.57303279996, "M+2": 225521.46534279996, "M+3": 269664.52941559994, "M+4": 309185.12283999997, "M+5": 348736.32865279994, "M+6": 388287.5344656, "M+7": 427839, "M+8": 467390, "M+9": 506941, "M+10": 546492, Extra: 39551.20581279999 },
  "5,000,000": { M: 126283.7552471, "M+1": 177176.85096209997, "M+2": 223478.08841709996, "M+3": 267491.0498392, "M+4": 306889.19370999996, "M+5": 346310.2968721, "M+6": 385731.40003419993, "M+7": 425153, "M+8": 464574, "M+9": 503995, "M+10": 543416, Extra: 39421.1031621 },
  "3,750,000": { M: 125005.68803139999, "M+1": 175516.12889139997, "M+2": 221434.71149139997, "M+3": 265317.57026279997, "M+4": 304593.26457999996, "M+5": 343884.26509139995, "M+6": 383175.2656028, "M+7": 422466, "M+8": 461757, "M+9": 501048, "M+10": 540339, Extra: 39291.000511399994 },
  "2,500,000": { M: 123727.62081569996, "M+1": 173855.40682069998, "M+2": 219391.33456569997, "M+3": 263144.09068639996, "M+4": 302297.33544999996, "M+5": 341458.2333107, "M+6": 380619.13117139996, "M+7": 419780, "M+8": 458941, "M+9": 498102, "M+10": 537263, Extra: 39160.8978607 },
  "1,250,000": { M: 122449.5536, "M+1": 172194.68475, "M+2": 217347.95763999995, "M+3": 260970.61110999997, "M+4": 300001.40631999995, "M+5": 339032.20152999996, "M+6": 378062.99674, "M+7": 417094, "M+8": 456125, "M+9": 495156, "M+10": 534187, Extra: 39030.79521 },
  "750,000": { M: 121110.2616075, "M+1": 169814.57155189998, "M+2": 214776.5170144, "M+3": 257718.04484249998, "M+4": 296366.1851975, "M+5": 335014.32555249997, "M+6": 373662.46590749995, "M+7": 412311, "M+8": 450959, "M+9": 489607, "M+10": 528256, Extra: 38648.140354999996 }
};

const CooporateInpatient = () => {
  const { state, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const savedData = JSON.parse(localStorage.getItem('cooporateCart'));
  const [categories, setCategories] = useState(savedData?.categories ||[
    { id: 1, limit: '', members: 0, dependencies: {}, totalDependencies: {}, totalPremium: 0, totalPremiumM: 0, operationalArea: "" }
  ]);
console.log(categories);



  const handleAddCategory = () => {
    const newCategory = {
      id: categories.length + 1, limit: '', members: 0, dependencies: {},
      totalDependencies: {}, totalPremiumValues: {}, premiumValues: {}, totalPremium: 0, totalPremiumM: 0, operationalArea: ""
    };
    setCategories([...categories, newCategory]);
  };

  const handleOperationalAreaChange = (id, e) => {
    const newCategories = categories.map(category =>
      category.id === id ? { ...category, operationalArea: e.target.value } : category
    );
    setCategories(newCategories);
  };

  const handleLimitChange = (id, e) => {
    const newCategories = categories.map(category =>
      category.id === id ? { ...category, limit: e.target.value } : category
    );
    setCategories(newCategories);
  };

  const handleAddMember = (id) => {
    const newCategories = categories.map(category =>
      category.id === id ? { ...category, members: category.members + 1 } : category
    );
    setCategories(newCategories);
  };

  const handleRemoveMember = (id) => {
    const newCategories = categories.map(category =>
      category.id === id && category.members > 0 ? {
        ...category,
        members: category.members - 1,
        dependencies: { ...category.dependencies, [`M+${category.members}`]: undefined }
      } : category
    );
    setCategories(newCategories);
  };

  const handleDependencyChange = (id, label, e) => {
    const value = parseInt(e.target.value) || 0;
    const newCategories = categories.map(category =>
      category.id === id ? { ...category, dependencies: { ...category.dependencies, [label]: value } } : category
    );
    setCategories(newCategories);
  };

  const calculateOverallDependenciesTotal = (category) => {
    let overallTotal = 0;
    const labels = Object.keys(category.totalDependencies);

    for (let i = 0; i < labels.length; i++) {
      overallTotal += category.totalDependencies[labels[i]] || 0;
    }

    return overallTotal;
  };

  const calculateTotalPremiumValue = (category) => {
    let totalPremiumValue = 0;
    const memberLabels = Array.from({ length: category.members + 1 }, (_, i) => (i === 0 ? 'M' : `M+${i}`));
    for (let i = 0; i < memberLabels.length; i++) {
      const label = memberLabels[i];
      const premiumValuePerMember = (premiumData[category.limit]?.[label] || 0) * (category.dependencies[label] || 0);
      totalPremiumValue += premiumValuePerMember;
    }
    return totalPremiumValue;
  };

  const calculateOverallTotals = () => {
    let overallTotalPremium = 0;
    let overallDependenciesTotal = 0;
    let totalStaffFamily = 0;

    categories.forEach(category => {
      overallTotalPremium += calculateTotalPremiumValue(category);
      overallDependenciesTotal += calculateOverallDependenciesTotal(category);
      const totalMembers = Object.values(category.dependencies).reduce((sum, value) => sum + value, 0);
      totalStaffFamily += totalMembers;
    });

    return { overallTotalPremium, overallDependenciesTotal, totalStaffFamily };
  };

  useEffect(() => {
    const updatedCategories = categories.map(category => {
      let updatedTotalDependencies = { ...category.totalDependencies };
      const labels = Object.keys(category.dependencies);

      for (let i = 0; i < labels.length; i++) {
        const label = labels[i];
        const value = category.dependencies[label] || 0;
        let calculatedTotal = value;

        if (label !== 'M') {
          const numDependents = parseInt(label.slice(2));
          calculatedTotal += numDependents * value;
        }

        updatedTotalDependencies[label] = calculatedTotal;
      }

      let totalPremiumValue = calculateTotalPremiumValue(category);
      let totalPremiumMValue = totalPremiumValue;

      const premiumValues = Object.keys(category.dependencies).reduce((acc, key) => {
        acc[key] = premiumData[category.limit]?.[key] || 0;
        return acc;
      }, {});

      const totalPremiumValues = Object.keys(category.dependencies).reduce((acc, key) => {
        acc[key] = (premiumData[category.limit]?.[key] || 0) * (category.dependencies[key] || 0);
        return acc;
      }, {});

      return {
        ...category,
        totalDependencies: updatedTotalDependencies,
        totalPremium: totalPremiumValue,
        totalPremiumM: totalPremiumMValue,
        premiumValues,
        totalPremiumValues,
      };
    });
    setCategories(updatedCategories);
  }, [JSON.stringify(categories.map(category => category.dependencies))]);

  const handleSave = () => {
    const overallTotals = calculateOverallTotals();
    const cooporateCart = { categories, overallTotals };
    dispatch({ type: 'SET_COOPORATE_CART', payload: cooporateCart });
    localStorage.setItem('cooporateCart', JSON.stringify(cooporateCart));
    console.log(cooporateCart);
    navigate('/outcooporate');
  };

  const renderCategoryTables = () => {
    return categories.map(category => (
      <div key={category.id}>
        <Row className="my-4">
          <Col>
            <h5>Category {category.id}</h5>
            <Form>
              <Form.Group controlId={`limitSelect-${category.id}`}>
                <Form.Label>Select Inpatient Limit</Form.Label>
                <Form.Control as="select" value={category.limit} onChange={(e) => handleLimitChange(category.id, e)}>
                  <option value="">Select...</option>
                  {Object.keys(premiumData).map((limitValue) => (
                    <option key={limitValue} value={limitValue}>
                      {limitValue}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId={`operationalAreaSelect-${category.id}`} className="mt-3">
                <Form.Label>Select Operational Area</Form.Label>
                <Form.Control as="select" value={category.operationalArea} onChange={(e) => handleOperationalAreaChange(category.id, e)}>
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
            <Button style={{ marginRight: "1.2rem", background: "green" }} onClick={() => handleAddMember(category.id)}>
              Add Member
            </Button>
            <Button variant="danger" onClick={() => handleRemoveMember(category.id)}>
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
                {Array.from({ length: category.members + 1 }, (_, i) => (i === 0 ? 'M' : `M+${i}`)).map((label) => (
                  <tr key={label}>
                    <td>{label}</td>
                    <td>{premiumData[category.limit]?.[label]}</td>
                    <td>
                      <Form.Control type="number" value={category.dependencies[label] || ''} onChange={(e) => handleDependencyChange(category.id, label, e)} />
                    </td>
                    <td>{category.totalDependencies[label]}</td>
                    <td>{(premiumData[category.limit]?.[label] || 0) * (category.dependencies[label] || 0)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
        <Row className="my-4">
          <Col>
            <h4>Total Premium: {calculateTotalPremiumValue(category)}</h4>
            <h4>Total Beneficiaries: {calculateOverallDependenciesTotal(category)}</h4>
          </Col>
        </Row>
      </div>
    ));
  };

  const overallTotals = calculateOverallTotals();

  return (
    <div>
      <CheckOutCooporateSteps step1 step2 />
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
            <h3>Overall Total Premium: {overallTotals.overallTotalPremium}</h3>
            <h3>Overall Dependencies Total: {overallTotals.overallDependenciesTotal}</h3>
            <h3>Total Number of Staff/Family: {overallTotals.totalStaffFamily}</h3>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CooporateInpatient;